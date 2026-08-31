# AQUORA aufs Handy bringen

Sechs Dateien, kein Build, keine Kosten. Rechne mit zehn Minuten.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die ganze App, Logo eingebettet |
| `manifest.webmanifest` | Name, Farben, Icons für die Installation |
| `sw.js` | Offline-Betrieb |
| `icon-192.png`, `icon-512.png` | App-Icon |
| `apple-touch-icon.png` | Icon für iPhone und iPad |

Alle sechs müssen im **gleichen Ordner** liegen, ohne Unterordner.

## Aufschalten mit GitHub Pages

1. Auf github.com anmelden, oben rechts **New repository**. Name z. B. `aquora`, Sichtbarkeit **Public** (bei Private funktioniert Pages im Gratis-Konto nicht). **Create repository**.
2. Im leeren Repository **uploading an existing file** anklicken, alle sechs Dateien hineinziehen, unten **Commit changes**.
3. **Settings → Pages**. Unter *Source* **Deploy from a branch** wählen, Branch `main`, Ordner `/ (root)`, **Save**.
4. Eine bis zwei Minuten warten. Oben auf derselben Seite erscheint die Adresse: `https://DEINNAME.github.io/aquora/`.
5. Diese Adresse am Handy im Browser öffnen. **Android/Chrome:** Menü → *App installieren*. **iPhone/Safari:** Teilen-Symbol → *Zum Home-Bildschirm*.
6. Fertig. Das Icon liegt auf dem Homescreen, die App startet ohne Browserleiste und läuft auch ohne Empfang.

## Wichtig

**Die Daten liegen im Browser des jeweiligen Geräts.** Jede Person hat ihren eigenen Bestand. Nichts wird übertragen, nichts synchronisiert. Das ist so gewollt — aber es heisst auch:

- Nach jeder Erfassungsrunde **Daten sichern** drücken. Die JSON-Datei gehört in die Cloud oder auf den Praxisrechner.
- Auf einem neuen Gerät: **Daten laden** und die Sicherung auswählen.
- Browserdaten löschen oder App deinstallieren löscht den Bestand. Ohne Sicherung ist er weg.
- Auf dem iPhone räumt Safari Daten von Webseiten weg, die wochenlang nicht geöffnet werden. Als installierte App vom Homescreen passiert das nicht — deshalb wirklich installieren, nicht bloss als Lesezeichen ablegen.

## Änderungen später

`index.html` im Repository bearbeiten oder neu hochladen. Zusätzlich in `sw.js` die Zeile `const CACHE = "aquora-v1"` auf `"aquora-v2"` ändern, sonst zeigen bereits installierte Geräte weiterhin die alte Version.

## Wenn das Repository öffentlich ist

Der Code liegt öffentlich, die Daten nicht — die entstehen erst im Browser der Nutzerin. Trotzdem: die Adresse ist erratbar, wer sie kennt, sieht die leere App. Kein Problem, solange dort keine Halterdaten hinterlegt sind, und die liegen nur lokal.
