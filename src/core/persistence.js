const PREFIX = 'memoire.v1.';
const SCHEMA_VERSION = 1;

export function defaultState() {
  return {
    settings: {
      theme: 'rose', motifSet: 'botanik',
      sound: { cards: true, success: true, stamp: true },
      showTime: true, name: 'Judith', schemaVersion: SCHEMA_VERSION
    },
    progress: { starsByLevel: {}, schemaVersion: SCHEMA_VERSION },
    vouchers: { items: [], schemaVersion: SCHEMA_VERSION },
    serial: { nextSerial: 1, schemaVersion: SCHEMA_VERSION }
  };
}

function read(name) {
  const raw = localStorage.getItem(PREFIX + name);
  if (raw === null) return null;
  try { return JSON.parse(raw); }
  catch {
    // Back up the corrupt payload, then clear the original key so subsequent
    // loads don't re-detect and re-back-up the same corruption on every read.
    const backup = `${PREFIX}corrupt.${name}.${Date.now()}`;
    try { localStorage.setItem(backup, raw); } catch {}
    try { localStorage.removeItem(PREFIX + name); } catch {}
    return null;
  }
}

export function loadAll() {
  const out = {};
  for (const name of ['settings', 'progress', 'vouchers', 'serial']) {
    const v = read(name);
    out[name] = v === null ? defaultState()[name] : v;
  }
  return out;
}

export function saveSlice(name, value) {
  try {
    localStorage.setItem(PREFIX + name, JSON.stringify(value));
  } catch (e) {
    console.warn('Speichern fehlgeschlagen:', e);
  }
}
