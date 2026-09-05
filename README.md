# CourtAtlas

CourtAtlas is a privacy-conscious navigator for publicly available US court-record search portals. Enter a name once, choose the court systems you want to review, and work through the selected official court or clerk websites from one search workspace.

The current registry contains 49 public entry points across 41 states and jurisdictions. Every source is labeled as statewide, limited, or county-level so partial coverage is not mistaken for a complete statewide search.

## What it does

- Filters court portals by state, court, county, and coverage scope.
- Selects one portal, a filtered group, or every available portal.
- Parses a full name into suggested first, middle, and last-name fields.
- Copies the search name before opening each official source.
- Tracks which selected portals have been opened in the current browser session.
- Identifies sources that require a court notice, CAPTCHA, or free account.
- Keeps search terms and progress in the browser rather than storing a private record database.

CourtAtlas does not scrape court websites, bypass access controls, or represent itself as a government service. Search results must be reviewed and verified on the originating court or clerk website.

## Tech stack

- React 19
- TypeScript
- Vinext / Vite
- Cloudflare Workers-compatible server output
- Lucide icons

The public-source registry lives in `app/portals.ts`. The application interface is in `app/page.tsx`, with styles in `app/globals.css`.

## Local development

Requirements:

- Node.js 22.13 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Create and run a production build:

```bash
npm run build
npm start
```

## Local network access

The LAN command binds the production server to every network interface on port `3100`:

```bash
npm run build
npm run start:lan
```

Open `http://localhost:3100` on this Mac. Other devices on the same local network can use this Mac's current LAN address, for example `http://192.168.4.38:3100`.

The address can change when the network changes. On macOS, find the current address with:

```bash
ipconfig getifaddr "$(route -n get default | awk '/interface:/{print $2; exit}')"
```

If another device cannot connect, confirm both devices are on the same network and allow incoming Node.js connections if macOS Firewall prompts.

## macOS launchd service

The repository includes `deploy/com.jsherman.courtatlas.plist`. It starts the production server at login, keeps it running, and writes logs to:

- `~/Library/Logs/courtatlas.log`
- `~/Library/Logs/courtatlas.error.log`

Install or refresh the service:

```bash
mkdir -p ~/Library/LaunchAgents ~/Library/Logs
cp deploy/com.jsherman.courtatlas.plist ~/Library/LaunchAgents/
launchctl bootout "gui/$(id -u)" ~/Library/LaunchAgents/com.jsherman.courtatlas.plist 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" ~/Library/LaunchAgents/com.jsherman.courtatlas.plist
launchctl enable "gui/$(id -u)/com.jsherman.courtatlas"
launchctl kickstart -k "gui/$(id -u)/com.jsherman.courtatlas"
```

Inspect its status:

```bash
launchctl print "gui/$(id -u)/com.jsherman.courtatlas"
```

Unload it:

```bash
launchctl bootout "gui/$(id -u)" ~/Library/LaunchAgents/com.jsherman.courtatlas.plist
```

The checked-in plist uses `/Users/jay/wsj/courtcrawler` and Homebrew's `/opt/homebrew/bin/npm`. Update those paths before installing it on another Mac or from a different checkout location.

## Adding a court portal

Add an entry to `app/portals.ts` with:

- A stable unique ID.
- State name and abbreviation.
- The court system's public-facing name.
- A precise coverage description.
- `Statewide`, `Limited`, or `County` scope.
- `Open search`, `Court notice`, or `Free account` access type.
- The official public URL.
- A short, factual access note.

Only add a source after confirming that it is operated or authorized by the relevant judiciary or court clerk and that basic public searching does not require payment. Never describe a participating-court or county portal as statewide.

## Important limitations

Public web access does not necessarily authorize automated access. Many courts require terms acceptance, CAPTCHA, account creation, or manual form completion. CourtAtlas deliberately preserves those controls and does not aggregate the records displayed by third-party portals.

Court records may be incomplete, delayed, sealed, expunged, or associated with another person who has a similar name. Do not use this application as the sole basis for legal decisions or eligibility decisions involving employment, housing, credit, insurance, or other regulated purposes.

## License

No open-source license has been selected. All rights are reserved unless the repository owner adds a license.
