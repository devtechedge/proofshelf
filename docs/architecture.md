# Architecture

ProofShelf is a Next.js App Router product with a static researched catalog and a small account-scoped Postgres backend for anonymous game progress.

## Request path

1. The browser loads a server-rendered page from Next.js.
2. Client components call same-origin route handlers for rounds, card reveals, progress, and deletion.
3. Route handlers validate input and resolve authoritative card data from the static catalog.
4. Progress mutations run inside a Drizzle transaction.
5. Every private row is filtered or written with the account reference derived from the session cookie.

## Modules

- `src/data`: card and source types, the 100-card catalog, source registry, and the three-card landing demo.
- `src/domain`: deterministic shuffle, round construction, grading, calibration, review ordering, mastery, Label Lens question generation, and public-card projection.
- `src/db`: Drizzle schema, idempotent Postgres DDL, and the database driver boundary.
- `src/server`: anonymous sessions, origin checks, validation, typed HTTP errors, and response helpers.
- `src/app/api`: catalog, round, progress, health, and session deletion endpoints.
- `src/components`: evidence card, verdict bins, confidence control, game table, result panel, progress ribbon, library, and site chrome.
- `src/app`: landing, play, library, card detail, method, metadata, sitemap, robots, and recovery states.

## Deterministic game core

A string seed is hashed into a 32-bit state. A fixed linear-congruential generator drives a Fisher-Yates shuffle. The same seed and catalog always produce the same round. Daily mode uses the UTC date. Practice mode accepts an explicit seed. Review mode combines missed or overconfident cards with unseen cards.

The server grades every submitted answer against the catalog. The client never submits a score. Correct answers earn 100 points. A high-confidence miss raises a calibration flag. Mastery requires two attempts with both correct.

## Database

Production uses Neon Postgres through `pg` and Drizzle. Local development and tests use embedded PGLite when `DATABASE_URL` is absent. Both drivers execute the same idempotent DDL and use the same schema.

Tables:

- `accounts`: one row per opaque account reference.
- `card_progress`: attempts, correct answers, last verdict, last confidence, and update time per card.
- `rounds`: mode, seed, score, totals, calibration flags, and completion time.

Every table has `account_ref`. Child rows cascade when an account is deleted. Unique indexes prevent duplicate card progress and duplicate daily-round records per account.

## Privacy boundary

The session cookie contains a random 32-byte token. The raw token is never stored in the database. The server stores its SHA-256 digest as the account reference. The cookie is `httpOnly`, `Secure` in production, and `SameSite=Lax`.

There is no email, password, profile, medication list, or health-record field. Erasing progress deletes the account and all child rows, then clears the cookie.

## Content boundary

The catalog is static and editorial. No runtime model generates health claims. Retailer sources are explicitly marked as market discovery and cannot serve as the only evidence source for a card. Every card stores a review date, explanation, label clue, safety note, and source ids.

ProofShelf is educational. It does not diagnose, prescribe, verify products, recommend doses, or claim to be a comprehensive interaction service.

## Verification

- Vitest covers deterministic game logic, catalog integrity, schema constraints, session hashing, and API persistence.
- Playwright covers the landing demo, daily round, replay protection, reload persistence, review mode, Label Lens, library search, card detail, theme persistence, 404, and mobile overflow.
- Axe scans landing, game, library, and card detail for WCAG A and AA violations on desktop and mobile projects.
- GitHub Actions runs lint, strict typecheck, unit tests, production build, Chromium installation, and the browser suite.
