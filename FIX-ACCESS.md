# Gemeinsamer FIX-Zugang

Vercel Production und Preview benötigen die serverseitige Sensitive-Variable `FIX_GATE_PASSWORD`. Keine `VITE_`-/`NEXT_PUBLIC_`-Variable verwenden und den Wert nie in Quellcode, Logs oder PRs schreiben. Ohne Konfiguration sperrt das Gate mit503.

Die vorgeschaltete Anmeldung schützt App-Dateien und APIs; persönliche Konten und einzeln ausgenommene, selbst authentifizierte Maschinen-Callbacks behalten ihre eigene Prüfung. Secure/HttpOnly/SameSite-Sitzung maximal30Tage; Passwortänderung widerruft Gate-Cookies. Rate-Limit gilt nur pro Laufzeitinstanz.

Abnahme: ohne/falsches/richtiges Passwort, reale App-Dateien und API-Pfade, abgelaufene/manipulierte Cookies, Browserformular mit Same-Origin-Referrerpolicy. Keine pauschalen Pfadausnahmen einführen.

Bereits heruntergeladene Offline-Kopien lassen sich nicht zurückrufen. Ein Worker-Update ohne gültige Sitzung setzt die installierte App auf Netzwerkzugriff zurück, ohne lokale Daten zu löschen.
