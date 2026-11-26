# Verification record

Verified on 26 November 2026 against `https://proofshelf-ashy.vercel.app`.

## Automated tests

- 30 Vitest unit and integration tests.
- 20 Playwright tests across desktop Chromium and mobile Chromium.
- Eight axe scans covering landing, game, library, and card detail on both projects.
- Production build prerenders 100 card detail pages.

Unit and integration coverage includes deterministic rounds, UTC seeds, scoring, calibration, review ordering, mastery, Label Lens generation, catalog counts, source resolution, required examples, schema constraints, cascade deletion, token hashing, cookie flags, origin rejection, API persistence, replay protection, cache boundaries, and public-card answer hiding.

Browser coverage includes the three-card demo, five-card daily round, server-authoritative score, reload persistence, review mode, Label Lens, library search, card detail, theme persistence, method, 404, mobile overflow, and WCAG A and AA scans.

## Production backend

`GET /api/health` returned:

```json
{"status":"ok","database":"postgres","cards":100}
```

A real anonymous practice-round loop against Neon returned:

| Check | Result |
| --- | --- |
| Submit five correct answers | `201`, score `500` |
| Read progress with the issued cookie | `5` practiced cards |
| Repeat the same round | `409` |
| Erase the session | `200` |
| Read progress after erase | `0` practiced cards |

This proves the public deployment is using the real Postgres path rather than in-memory PGLite.

## Browser QA

Production desktop and mobile captures showed no horizontal overflow at 1440 and 390 pixels. The public alias opened without a Vercel login wall. Console collection found no application errors after the smooth-scroll metadata warning was fixed.

## Accessibility

Axe reported zero detectable WCAG 2.0 A or AA and WCAG 2.1 A or AA violations on:

- Landing.
- Game.
- Library.
- Card detail.

The same checks passed in the desktop and mobile Playwright projects.

## Lighthouse

Desktop Chromium Lighthouse returned 100 for accessibility, best practices, and SEO. Performance scores varied from 32 to 58 across paired synthetic-throttling runs on this Windows machine. The variance tracked main-thread task time while loaded assets stayed constant, so the 95 performance target is not claimed as verified. See `docs/performance.md` for the measured iterations and remaining limitation.

## Release status

The repository is public, the production alias is live, and the build history contains more than 65 substantive commits. The final CI and release checks are recorded after the last push.
