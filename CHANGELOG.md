# Changelog

## v1.0.0

Released 26 November 2026.

### Added

- ProofShelf landing page with a playable three-card demo.
- Five-card daily, review, and practice rounds.
- Four evidence verdicts and three-position confidence calibration.
- Server-authoritative scoring and high-confidence miss flags.
- Anonymous Neon Postgres progress with replay protection and erase support.
- Exactly 100 researched supplement claim cards across nine categories.
- Searchable card library and 100 static detail pages.
- Label Lens practice for forms, routes, serving language, and proprietary blends.
- Source registry with retailer discovery separated from evidence sources.
- Method, safety, architecture, API, deployment, verification, and performance documentation.
- Light and dark themes, keyboard play, touch controls, reduced-motion support, and route loading states.
- Web manifest, sitemap, robots rules, favicon, and social preview.
- GitHub Actions, Dependabot, security policy, and MIT license.

### Verified

- 30 Vitest unit and integration tests.
- 20 Playwright tests on desktop and mobile Chromium.
- Zero detectable WCAG A or AA violations in eight axe scans.
- Production health reports `postgres` and 100 cards.
- Live Neon loop proves submit, persistence, replay rejection, and deletion.
- Public Vercel alias returns 200 without a login wall.

### Known limitation

The 95 Lighthouse performance target is not verified. Paired local synthetic runs ranged from 32 to 58 under heavy CPU contention. Accessibility, best practices, and SEO scored 100. A stable remote audit is required before claiming a higher performance score.
