# Persoonlijke App Store

Een eigen app store: zelfgebouwde apps voor het hele gezin, geleverd via één webpagina
rechtstreeks op je telefoon. Geen server, geen tussenpartijen — elke app is een
zelfstandige web-app en **alle data blijft lokaal op je eigen apparaat**.

## Hoe het werkt

- **`index.html`** is de "App Store": een startpagina in echte App Store-stijl met
  een uitgelicht-kaart, "Geïnstalleerd" en "Alle apps", zelf ook installeerbaar als app.
- Elke app leeft in **`apps/<naam>/`** als één zelfstandig HTML-bestand (plus een
  webmanifest, service worker en iconen zodat hij als PWA installeerbaar is).
- Publicatie gaat automatisch via GitHub Actions naar **GitHub Pages** bij elke push naar `main`.
- Installeren: de store en de apps tonen een **Installeer-knop** — op Android opent die
  het echte installatievenster; op iPhone/iPad toont hij de twee stappen via de deelknop
  (Apple staat directe installatie door websites niet toe).

## Een nieuwe app toevoegen

1. Vraag een AI-agent (bijv. Claude Code): *"Bouw een app die X doet in `apps/x/`,
   één zelfstandig HTML-bestand zonder externe afhankelijkheden, Apple-designstijl,
   data lokaal in localStorage."*
2. Voeg de app toe aan het `APPS`-array onderaan `index.html`.
3. Commit, push — klaar.

## Apps

### 📊 Grip — persoonlijk financieel dashboard (`apps/finance/`)

Upload je bankafschriften (CSV) en krijg grip op je geld:

- **Import**: herkent CSV-exports van **ING, Rabobank en ABN AMRO** automatisch, plus een
  generieke parser voor andere banken. Dubbele transacties worden overgeslagen, dus
  maandelijks (of met twee jaar historie in één keer) uploaden is veilig.
- **Inzicht**: inkomsten, uitgaven en netto per maand, uitgaven per categorie
  (automatische categorisering met Nederlandse winkels/bedrijven, handmatig aan te passen),
  en automatische detectie van je **vaste lasten**.
- **Plan om financieel gezond te worden** — gebaseerd op Nibud-vuistregels en de
  YNAB-methode: mini-buffer → dure schulden aflossen → volledige buffer
  (indicatie geïnspireerd op de Nibud BufferBerekenaar) → potjes voor echte uitgaven → beleggen.
- **Bestedingsruimte**: wat je per maand (en per week) vrij kunt uitgeven na vaste
  lasten en spaardoelen.
- **Doelen/potjes**: buffer, auto, kind, onderhoud huis, kleding, vakantie — met
  voorgestelde bedragen, maandbedrag of einddatum, voortgang en haalbaarheidscheck.
- **Accounts voor het hele gezin**: inloggen met e-mail + wachtwoord. Ieders gegevens
  worden lokaal versleuteld (PBKDF2 + AES-GCM) met een sleutel uit het eigen wachtwoord —
  gezinsleden (en de beheerder) kunnen elkaars gegevens dus niet inzien. Er is geen server;
  het e-mailadres is alleen een inlognaam.
- **Omgevingen**: per account meerdere administraties, bijv. 👤 Persoonlijk en
  🏠 Gezamenlijk (voor de en/of-rekening), elk met eigen transacties, doelen en instellingen.
- **Handleiding**: `apps/finance/handleiding.html` — stap-voor-stap uitleg, inclusief hoe je
  bij ING, Rabobank en ABN AMRO je afschriften downloadt.
- **Privacy**: alles draait in de browser; er verlaat niets je apparaat.
  Reservekopie exporteren/herstellen als JSON kan via Instellingen.

> Grip geeft inzicht en algemene vuistregels; het is geen financieel advies.

## Lokaal bekijken

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
