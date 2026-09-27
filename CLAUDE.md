# fleet-dashboard

Office-side data logging & review tool for engineers. Companion to the
Fleet Co-Pilot module inside `hmi_portfolio/hmi_ui` (the in-vehicle HMI used by
technician drivers) but fully separate: no shared code, dev server, or port.
Do not import from or write into `hmi_ui/`.

- Stack: React + TypeScript + Vite.
- Dev server: `npm run dev`, fixed to **port 8010** (`vite.config.ts`,
  `strictPort: true` — fails loudly instead of drifting to another port).
- Data classification (`src/types.ts`) intentionally mirrors hmi_ui's
  `lib/models/fleet_models.dart` taxonomy — incident subsystem/severity,
  autonomy state, ODD coverage, payload ingestion, driver monitoring — so
  records logged by technicians in the HMI map 1:1 onto what's reviewed here.
  It's a reproduced taxonomy, not shared code/imports.
- All data in `src/data/fixtures.ts` is simulated/placeholder, same as
  hmi_ui's fixture convention — there is no backend or ingestion pipeline yet.
  Keep new data labeled as fixture until a real source is wired up.
- Colors/typography follow the dataviz skill's validated dark-mode palette
  (`src/styles.css` custom properties: `--status-*`, `--cat-*-*`, chart-chrome
  ink tokens) — reuse those tokens for any new chart/stat UI rather than
  picking new hex values.
- Map (`IncidentMap`) uses Leaflet + OpenStreetMap tiles (free, no API key).
  Marker colors are hardcoded hex (not CSS vars) in `IncidentMap.tsx` because
  Leaflet's `divIcon` HTML string can't read CSS custom properties — keep
  those in sync with `styles.css` if the palette changes.
- Responsive: `main-grid`/`map-grid` collapse to one column at 900px,
  `damage-row` badges go horizontal and padding tightens at 640px.

GitHub Pages deploy: `.github/workflows/deploy.yml` builds and deploys on
every push to `master`. `vite.config.ts` sets `base: '/fleet-dashboard/'`
only for the production build (`command === 'build'`) — local dev still
serves from `/` on port 8010.
