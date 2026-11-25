# Security policy

## Supported version

The current `v1.0.0` release line receives security fixes. Earlier snapshots are not supported.

## Reporting a vulnerability

Use GitHub's private vulnerability reporting for this repository. Do not open a public issue for a suspected vulnerability. Include the affected route, reproduction steps, impact, and any relevant request or response details with secrets removed.

## Security model

ProofShelf is an anonymous educational game. It does not provide accounts, passwords, payments, clinician access, or medical-record storage.

- A random 32-byte session token is stored in an `httpOnly`, `Secure`, `SameSite=Lax` cookie in production.
- The server stores only the token's SHA-256 account reference.
- Every progress and round row is scoped by `account_ref` and indexed.
- Mutations reject cross-origin requests and validate payloads with Zod.
- Database access uses Drizzle parameter binding.
- The application sets a restrictive Content Security Policy, frame denial, MIME-sniffing protection, referrer policy, permissions policy, and HSTS in production.
- The erase endpoint deletes the anonymous account and cascading child rows, then clears the cookie.

## Data handled

ProofShelf stores game answers, scores, confidence selections, round seeds, and timestamps. It does not ask for names, email addresses, diagnoses, medication lists, or supplement doses. Users should not enter sensitive health information into free-form fields because the current product does not provide them.

## Known limitations

- Losing or clearing the browser cookie removes access to the associated progress.
- The game is not a medical device, interaction checker, diagnostic tool, or personalized recommendation service.
- The curated catalog is an educational snapshot reviewed on 26 November 2026. It is not a complete or continuously updated systematic review.
- Retailer links document market discovery only and do not verify product identity, purity, contamination, or manufacturing quality.
- Serverless platforms may apply their own infrastructure, logging, retention, and availability controls.

## Safe harbor

Good-faith security research is welcome. Do not test with another person's data, attempt mass account creation, degrade service, or publish private information. Stop and report if you encounter real user data.
