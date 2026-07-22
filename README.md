# Judiths Mega Memofix

Ein liebevoll gestaltetes Memory-Spiel als installierbare Web-App (PWA).
Live: **https://memoire-amber.vercel.app**

---

## Installation auf dem iPhone (empfohlen)

Damit sich das Spiel wie eine echte App anfühlt – mit eigenem Icon, Vollbild
und **haptischem Feedback** – solltest du es zum Home-Bildschirm hinzufügen:

1. Öffne **https://memoire-amber.vercel.app** in **Safari**
   (wichtig: nicht Chrome – nur Safari kann Web-Apps installieren).
2. Tippe unten auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben).
3. Wähle **„Zum Home-Bildschirm"**.
4. Tippe oben rechts auf **„Hinzufügen"**.
5. Starte das Spiel über das neue Icon auf dem Home-Bildschirm.

### Damit die Vibration (Haptik) funktioniert
- **Einstellungen → Töne & Haptik → „Systemhaptik"** muss **aktiviert** sein.
- Haptik gibt es ab **iOS 17.4** und nur bei echtem Antippen.
- Am zuverlässigsten in der installierten Home-Bildschirm-Version.

---

## Installation auf Android

1. Öffne **https://memoire-amber.vercel.app** in **Chrome**.
2. Tippe oben rechts auf das **Drei-Punkte-Menü**.
3. Wähle **„App installieren"** bzw. **„Zum Startbildschirm hinzufügen"**.
4. Bestätige mit **„Installieren"**.

Auf Android funktioniert die Vibration direkt, sofern sie in den
Systemeinstellungen nicht deaktiviert ist.

---

## Auf dem Desktop spielen

Einfach **https://memoire-amber.vercel.app** im Browser öffnen – kein Setup nötig.
(Haptik gibt es am Desktop nicht, das Spiel läuft ansonsten identisch.)

---

## Spielprinzip

- Decke zwei Karten auf und finde die passenden Paare.
- Fünf Schwierigkeitsstufen von *Leicht* bis *Extrem* – mit steigender
  Kartenzahl und kürzerer Anzeigedauer.
- Jede gewonnene Runde schaltet einen **Kusspunkt-Gutschein** frei.

Viel Spaß!

---

## Für Entwickler

```bash
pnpm install     # Abhängigkeiten installieren
pnpm dev         # lokaler Entwicklungsserver
pnpm build       # Produktions-Build
pnpm preview     # Produktions-Build lokal testen
```

Die App wird bei jedem Push auf `main` automatisch über Vercel deployed.
