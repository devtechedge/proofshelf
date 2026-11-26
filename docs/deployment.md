# Deployment

## Production shape

ProofShelf runs as a Next.js 16 App Router application on Vercel. The public catalog is static. Anonymous game progress uses Neon Postgres through the Vercel Neon integration.

The Vercel project uses the `nextjs` framework preset, public access, and git-linked deployments from `devtechedge/proofshelf`. The production alias is recorded in the repository README and site metadata after the first verified deploy.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Production | Neon pooled Postgres connection string. Its presence selects the `postgres` driver. |
| `DATABASE_URL_UNPOOLED` | Migration tooling | Direct Neon connection string for Drizzle tooling. |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical public alias used by metadata, sitemap, and robots. |

Do not commit real connection strings. The repository includes only `.env.example` placeholders.

## Database setup

The application executes idempotent DDL on its first Postgres connection. It creates the two enum types, three tables, constraints, foreign keys, and indexes if they do not already exist. This makes cold starts and repeated deploys safe.

The canonical Drizzle schema lives in `src/db/schema.ts`. The matching idempotent DDL lives in `src/db/ddl.ts`. Changes must be applied to both and covered by schema tests.

For an explicit migration review:

```bash
npm run db:generate
npm run db:push
```

Use `DATABASE_URL_UNPOOLED` when running Drizzle against Neon.

## Local development

No database service is required for local development. When `DATABASE_URL` is absent, ProofShelf creates an in-memory PGLite database with the same schema. This local data resets when the process restarts and must never be described as persistent.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To use a real local or remote Postgres database, copy `.env.example` to `.env.local` and set the connection variables. Never commit `.env.local`.

## Verification commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run e2e
```

`npm run check` runs lint, typecheck, unit tests, and the production build. Playwright requires Chromium:

```bash
npx playwright install chromium
```

The browser suite runs desktop Chromium and mobile Chromium projects. It covers the demo, daily round, persistence, replay protection, review mode, Label Lens, library, card detail, theme, 404, mobile overflow, and axe scans.

## Production checks

After deployment:

1. Confirm the production alias returns `200` without a Vercel login wall.
2. Confirm `/api/health` reports `postgres` and `100` cards.
3. Play a complete round in a browser.
4. Reload and confirm the mastery ribbon retains the practiced count.
5. Confirm repeating the same daily submission returns `409`.
6. Confirm the review queue contains the missed cards.
7. Confirm the sitemap, robots file, metadata, and social image use the final alias.
8. Capture fresh screenshots from the production URL.

## Rollback and data safety

Application rollbacks are normal Vercel deployment rollbacks. Database DDL is additive and idempotent. Do not remove columns or tables as part of a routine rollback. Use a Neon branch for destructive schema experiments and keep production credentials out of local files and logs.
