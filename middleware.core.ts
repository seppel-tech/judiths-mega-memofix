/**
 * FIX-Zugangs-Gate — kanonischer Kern.
 *
 * Quelle: ~/dev/fix-gate/middleware.core.ts (Orchestrator-Entwurf).
 * Diese Datei wird WÖRTLICH in jede App kopiert. Sie enthält bewusst KEINE
 * app-spezifischen Werte und KEINEN Import aus `@vercel/functions` — dadurch
 * ist sie ohne Vercel-Laufzeit direkt testbar (node:test / vitest).
 *
 * Verhalten in fester Reihenfolge:
 *   1. öffentliche Pfade (Rechtstexte, gate.css, favicon) → durchlassen
 *   2. FIX_GATE_PASSWORD fehlt/leer                            → 503, FAIL-CLOSED
 *   3. POST /__gate/login                                 → Login verarbeiten
 *   4. gültiges Sitzungs-Cookie                           → durchlassen
 *   5. sonst                                              → 401 + Login-Seite
 *
 * Bewusste Abweichungen vom LIMMOFIX-Vorbild (server/_core/passwordAuth.ts):
 *   - FAIL-CLOSED statt fail-open: LIMMOFIX lässt bei leerem FIX_GATE_PASSWORD alles
 *     durch (passwordLoginRequired() === false). Hier ist ein leeres
 *     FIX_GATE_PASSWORD ein Konfigurationsfehler und sperrt.
 *   - Kein JWT/JWT_SECRET: das Cookie trägt "<ausgestelltAm>.<hash>" mit
 *     hash = SHA-256("<appId>:v1:<passwort>:<ausgestelltAm>"), nie das Passwort
 *     selbst. Der Zeitstempel ist durch das Passwort geschlüsselt und damit
 *     nicht fälschbar — das ergibt eine SERVERSEITIGE Ablaufprüfung ohne
 *     zweites Geheimnis. Wird ein Passwort aus FIX_GATE_PASSWORD entfernt, sind
 *     genau dessen Cookies sofort wertlos (Einzelentzug).
 *   - Rate-Limit ist BEST-EFFORT (siehe rateLimited()): Edge-Instanzen teilen
 *     keinen Speicher. Das ist kein gleichwertiger Ersatz für
 *     express-rate-limit in LIMMOFIX' Einzelprozess.
 *
 * NUR EXAKTE ÖFFENTLICHE PFADE — keine Präfixe. Belegt am 03.08.2026 gegen die
 * Preview-Bereitstellung von zaehlerfix PR #36: mit einem Präfix "/icons" lieferte
 * `/icons/gibt-es-nicht` HTTP 200 mit der vollständigen `index.html`. Ursache ist
 * die Kette „Präfix durchgelassen → Datei existiert nicht → SPA-Catch-All in
 * vercel.json (`/(.*) → /index.html`)". Jede dieser Apps hat so einen Catch-All.
 * Ein Präfix öffnet damit nicht ein Verzeichnis, sondern den gesamten
 * Adressraum darunter. Deshalb wird jede öffentliche Datei einzeln benannt.
 */

export type GateConfig = {
  /** Kurzname der App, klein, [a-z0-9-]. Geht in Cookie-Name und Token ein. */
  appId: string;
  /** Anzeigename auf der Login-Seite. */
  appName: string;
  /**
   * Pfade, die ohne Anmeldung erreichbar bleiben — AUSSCHLIESSLICH exakte
   * Vergleiche, jede Datei einzeln. Siehe Kopfkommentar: Präfixe öffnen wegen
   * des SPA-Catch-All den gesamten Adressraum darunter.
   */
  publicExact: readonly string[];
  /** Existing worker URLs: unauthenticated updates replace a cached app shell. */
  serviceWorkerPaths?: readonly string[];
};

export type RateLimitEntry = { count: number; resetAt: number };

export type GateDeps = {
  appPassword: string | undefined;
  now: number;
  clientIp: string;
  failures: Map<string, RateLimitEntry>;
};

export const LOGIN_PATH = "/__gate/login";
export const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
export const SESSION_MAX_AGE_MS = COOKIE_MAX_AGE_SECONDS * 1000;
/** Toleranz für Uhrendrift zwischen Edge-Instanzen. */
export const CLOCK_SKEW_MS = 5 * 60 * 1000;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_FAILURES = 10;
/** Harte Obergrenze der Fehlversuchs-Ablage je Instanz. Siehe sweepFailures(). */
export const RATE_LIMIT_MAX_ENTRIES = 1024;

export const MSG_WRONG_PASSWORD = "Falsches Passwort.";
export const MSG_RATE_LIMITED =
  "Zu viele Fehlversuche. Bitte in 15 Minuten erneut versuchen.";
export const MSG_NOT_CONFIGURED =
  "Zugang nicht konfiguriert. Diese Anwendung ist vorübergehend gesperrt.";
export const MSG_CROSS_ORIGIN = "Anmeldung nur von dieser Seite aus möglich.";

const MAX_REDIRECT_LENGTH = 512;

/** Cookie-Name je App — zwei FIX-Apps auf einer Domain kollidieren nicht. */
export function cookieName(config: GateConfig): string {
  return `${config.appId}_gate`;
}

/**
 * FIX_GATE_PASSWORD trägt mehrere kommagetrennte Passwörter — eines je Person,
 * damit ein Zugang einzeln entziehbar ist. Leere Teile werden verworfen.
 */
export function parseAppPasswords(raw: string | undefined): string[] {
  if (typeof raw !== "string") return [];
  const passwords: string[] = [];
  for (const part of raw.split(",")) {
    const password = part.trim();
    if (password && !passwords.includes(password)) passwords.push(password);
  }
  return passwords;
}

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value)
  );
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Cookie-Wert zu einem Passwort: "<ausgestelltAm>.<hash>".
 * Der Hash ist über den Zeitstempel MIT gebildet und durch das Passwort
 * geschlüsselt — ein gestohlenes Cookie lässt sich also nicht auf ein neues
 * Ausstellungsdatum umschreiben. Das Passwort selbst verlässt den Server nie.
 */
export async function tokenFor(
  password: string,
  config: GateConfig,
  issuedAt: number
): Promise<string> {
  const hash = await sha256Hex(
    `${config.appId}:v1:${password}:${issuedAt}`
  );
  return `${issuedAt}.${hash}`;
}

/** Zerlegt einen Cookie-Wert; `null`, wenn die Form nicht stimmt. */
export function parseToken(
  value: string
): { issuedAt: number; hash: string } | null {
  const separator = value.indexOf(".");
  if (separator <= 0) return null;
  const issuedAt = Number(value.slice(0, separator));
  const hash = value.slice(separator + 1);
  if (!Number.isSafeInteger(issuedAt) || issuedAt <= 0) return null;
  if (!/^[0-9a-f]{64}$/.test(hash)) return null;
  return { issuedAt, hash };
}

/** Laufzeitgleicher Vergleich zweier Hex-Zeichenketten. */
export function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Nur exakter Vergleich. Kein Präfix, kein Platzhalter — Begründung im
 * Kopfkommentar (belegter Ausbruch über den SPA-Catch-All).
 */
export function isPublicPath(path: string, config: GateConfig): boolean {
  return config.publicExact.includes(path);
}

/**
 * Wehrt browserseitige Fremdanmeldung ab. `Origin` und `Sec-Fetch-Site` setzt
 * der Browser selbst; Skripte können sie nicht fälschen. Fehlen beide, ist der
 * Aufrufer kein Browser (curl, Smoke-Skript) — das ist kein CSRF-Pfad und
 * bleibt erlaubt.
 */
export function isSameOriginRequest(request: Request, url: URL): boolean {
  const origin = request.headers.get("origin");
  if (origin !== null && origin !== url.origin) return false;
  const site = request.headers.get("sec-fetch-site");
  if (site !== null && site !== "same-origin" && site !== "none") return false;
  return true;
}

export function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0) continue;
    if (part.slice(0, separator).trim() !== name) continue;
    return part.slice(separator + 1).trim();
  }
  return undefined;
}

/**
 * Nur repo-eigene, relative Ziele. Wehrt offene Weiterleitung
 * (`//fremd.example`, `https://…`), Backslash-Tricks und Header-Injektion ab.
 */
export function safeRedirect(raw: string | null | undefined): string {
  if (typeof raw !== "string") return "/";
  if (raw.length === 0 || raw.length > MAX_REDIRECT_LENGTH) return "/";
  if (!raw.startsWith("/")) return "/";
  if (raw.startsWith("//")) return "/";
  if (raw.includes("\\")) return "/";
  if (/[\r\n\t\0]/.test(raw)) return "/";
  if (raw.startsWith(LOGIN_PATH)) return "/";
  return raw;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * BEST-EFFORT. Der Zähler lebt im Speicher EINER Edge-Instanz; Vercel verteilt
 * Anfragen auf mehrere Instanzen und friert sie ein. Ein verteilter Angreifer
 * erreicht damit mehr als 10 Versuche je 15 Minuten. Echte Begrenzung braucht
 * einen gemeinsamen Speicher (Vercel Firewall / KV) — siehe BEFUND.md.
 */
export function rateLimited(deps: GateDeps): boolean {
  const entry = deps.failures.get(deps.clientIp);
  if (!entry) return false;
  if (deps.now >= entry.resetAt) {
    deps.failures.delete(deps.clientIp);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX_FAILURES;
}

/**
 * Hält die Ablage beschränkt, OHNE bei jedem Fehlversuch die ganze Karte zu
 * lesen. Eine Räumung bei jedem Fehlversuch (erste Fassung dieses Bauplans)
 * macht N Versuche aus N verschiedenen Adressen zu O(N²) und begrenzt die
 * Größe trotzdem nicht — eine IPv6-Rotation oder ein Scanner treibt damit
 * Rechenzeit und Speicher einer warmen Instanz hoch.
 *
 * Deshalb: im Normalbetrieb gar nichts tun. Erst an der Obergrenze einmal
 * durchräumen, und wenn danach immer noch alles gültig ist, den Eintrag mit dem
 * frühesten Fensterende verdrängen. Damit ist der Speicher hart begrenzt und
 * der Aufwand nur unter Last überhaupt spürbar.
 *
 * Preis, bewusst in Kauf genommen: unter einer Flut kann der Zähler einer
 * einzelnen Adresse verdrängt werden. Das schwächt eine Bremse, die ohnehin
 * best-effort ist (Edge-Instanzen teilen keinen Speicher) — es öffnet keinen
 * Zugang, denn ein Passwort wird dadurch nicht richtig.
 */
export function sweepFailures(deps: GateDeps): void {
  if (deps.failures.size < RATE_LIMIT_MAX_ENTRIES) return;

  for (const [ip, eintrag] of deps.failures) {
    if (deps.now >= eintrag.resetAt) deps.failures.delete(ip);
  }
  if (deps.failures.size < RATE_LIMIT_MAX_ENTRIES) return;

  let zuVerdraengen: string | undefined;
  let fruehestesEnde = Number.POSITIVE_INFINITY;
  for (const [ip, eintrag] of deps.failures) {
    if (eintrag.resetAt < fruehestesEnde) {
      fruehestesEnde = eintrag.resetAt;
      zuVerdraengen = ip;
    }
  }
  if (zuVerdraengen !== undefined) deps.failures.delete(zuVerdraengen);
}

export function registerFailure(deps: GateDeps): void {
  const entry = deps.failures.get(deps.clientIp);
  if (!entry || deps.now >= entry.resetAt) {
    // Nur ein NEUER Eintrag lässt die Ablage wachsen — nur hier wird geräumt.
    sweepFailures(deps);
    deps.failures.set(deps.clientIp, {
      count: 1,
      resetAt: deps.now + RATE_LIMIT_WINDOW_MS,
    });
    return;
  }
  entry.count += 1;
}

function gateHeaders(extra: Record<string, string> = {}): Headers {
  return new Headers({
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store, max-age=0",
    "x-robots-tag": "noindex, nofollow",
    "referrer-policy": "same-origin",
    ...extra,
  });
}

function page(title: string, body: string, appName: string): string {
  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="referrer" content="same-origin" />
    <title>${escapeHtml(title)} | ${escapeHtml(appName)}</title>
    <link rel="stylesheet" href="/gate.css" />
  </head>
  <body class="gate">
    <main class="gate-karte">
${body}
    </main>
  </body>
</html>
`;
}

export function loginPage(
  config: GateConfig,
  options: { status: number; redirectTo: string; error?: string }
): Response {
  const fehler = options.error
    ? `      <p class="gate-fehler" role="alert">${escapeHtml(options.error)}</p>\n`
    : "";
  const body = `      <h1 class="gate-titel">${escapeHtml(config.appName)}</h1>
      <p class="gate-hinweis">Diese Anwendung ist passwortgeschützt.</p>
${fehler}      <form class="gate-form" method="post" action="${LOGIN_PATH}">
        <input type="hidden" name="redirect" value="${escapeHtml(options.redirectTo)}" />
        <label class="gate-label" for="gate-passwort">Passwort</label>
        <input class="gate-feld" id="gate-passwort" name="password" type="password"
               autocomplete="current-password" required autofocus />
        <button class="gate-knopf" type="submit">Anmelden</button>
      </form>`;
  return new Response(page("Anmeldung", body, config.appName), {
    status: options.status,
    headers: gateHeaders(),
  });
}

export function notConfiguredPage(config: GateConfig): Response {
  const body = `      <h1 class="gate-titel">${escapeHtml(config.appName)}</h1>
      <p class="gate-hinweis">${escapeHtml(MSG_NOT_CONFIGURED)}</p>`;
  return new Response(page("Gesperrt", body, config.appName), {
    status: 503,
    headers: gateHeaders({ "retry-after": "3600" }),
  });
}

export function rateLimitPage(config: GateConfig): Response {
  const body = `      <h1 class="gate-titel">${escapeHtml(config.appName)}</h1>
      <p class="gate-fehler" role="alert">${escapeHtml(MSG_RATE_LIMITED)}</p>`;
  return new Response(page("Gesperrt", body, config.appName), {
    status: 429,
    headers: gateHeaders({ "retry-after": String(RATE_LIMIT_WINDOW_MS / 1000) }),
  });
}

export function crossOriginPage(config: GateConfig): Response {
  const body = `      <h1 class="gate-titel">${escapeHtml(config.appName)}</h1>
      <p class="gate-fehler" role="alert">${escapeHtml(MSG_CROSS_ORIGIN)}</p>`;
  return new Response(page("Abgelehnt", body, config.appName), {
    status: 403,
    headers: gateHeaders(),
  });
}

async function matchPassword(
  candidate: string,
  passwords: readonly string[],
  config: GateConfig,
  issuedAt: number
): Promise<string | undefined> {
  if (!candidate) return undefined;
  const candidateToken = await tokenFor(candidate, config, issuedAt);
  let matched: string | undefined;
  // Kein vorzeitiges Verlassen der Schleife: gleiche Anzahl Vergleiche je Versuch.
  for (const password of passwords) {
    const token = await tokenFor(password, config, issuedAt);
    if (timingSafeEqualHex(candidateToken, token)) matched = password;
  }
  return matched;
}

async function hasValidSession(
  request: Request,
  config: GateConfig,
  passwords: readonly string[],
  now: number
): Promise<boolean> {
  const cookie = readCookie(request, cookieName(config));
  if (!cookie) return false;

  const parsed = parseToken(cookie);
  if (!parsed) return false;

  // Serverseitige Ablaufprüfung. `Max-Age` ist nur eine Bitte an den Browser —
  // ein kopiertes Cookie hält sich nicht daran.
  const alter = now - parsed.issuedAt;
  if (alter > SESSION_MAX_AGE_MS) return false;
  if (alter < -CLOCK_SKEW_MS) return false;

  let valid = false;
  for (const password of passwords) {
    const token = await tokenFor(password, config, parsed.issuedAt);
    if (timingSafeEqualHex(cookie, token)) valid = true;
  }
  return valid;
}

async function handleLogin(
  request: Request,
  config: GateConfig,
  deps: GateDeps,
  passwords: readonly string[],
  url: URL
): Promise<Response> {
  if (!isSameOriginRequest(request, url)) return crossOriginPage(config);
  if (rateLimited(deps)) return rateLimitPage(config);

  // Bound the streamed body as Content-Length may be absent or false.
  const reader = request.body?.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  if (reader) {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) {
        await reader.cancel();
        return new Response("Anmeldung zu groß.", { status: 413, headers: gateHeaders() });
      }
      chunks.push(value);
    }
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  const form = new URLSearchParams(new TextDecoder().decode(bytes));
  const target = safeRedirect(form.get("redirect"));
  const matched = await matchPassword(
    form.get("password") ?? "",
    passwords,
    config,
    deps.now
  );

  if (!matched) {
    registerFailure(deps);
    return loginPage(config, {
      status: 401,
      redirectTo: target,
      error: MSG_WRONG_PASSWORD,
    });
  }

  deps.failures.delete(deps.clientIp);
  const token = await tokenFor(matched, config, deps.now);
  return new Response(null, {
    status: 303,
    headers: new Headers({
      location: target,
      "set-cookie":
        `${cookieName(config)}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; ` +
        `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
      "cache-control": "no-store, max-age=0",
    }),
  });
}

/**
 * Kern des Gates. Rückgabe `null` heißt: Anfrage darf durch (der Aufrufer ruft
 * dann `next()`), alles andere ist die fertige Antwort.
 */
export async function gate(
  request: Request,
  config: GateConfig,
  deps: GateDeps
): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (isPublicPath(path, config)) return null;

  const passwords = parseAppPasswords(deps.appPassword);
  if (passwords.length === 0) return notConfiguredPage(config);

  if (path === LOGIN_PATH) {
    if (request.method !== "POST") {
      return loginPage(config, { status: 405, redirectTo: "/" });
    }
    return handleLogin(request, config, deps, passwords, url);
  }

  if (await hasValidSession(request, config, passwords, deps.now)) return null;

  if (config.serviceWorkerPaths?.includes(path) && request.method === "GET") {
    // The browser fetches updates outside its existing worker. Install a tiny
    // network-only worker so an old offline shell cannot keep bypassing the
    // online gate. Do not delete any caches, IndexedDB or user project data.
    return new Response(`self.addEventListener("install",e=>e.waitUntil(self.skipWaiting()));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{if(e.request.mode==="navigate")e.respondWith(fetch(e.request).catch(()=>new Response("Bitte zur Anmeldung eine Internetverbindung herstellen.",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}})));});`, {
      headers: { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-store", "service-worker-allowed": "/" },
    });
  }
  return loginPage(config, {
    status: 401,
    redirectTo: safeRedirect(`${url.pathname}${url.search}`),
  });
}
