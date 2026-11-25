# API reference

All endpoints are same-origin JSON routes under `/api`. Mutations enforce an Origin check when the header is present. Input is validated with Zod. The browser never submits a score.

## GET `/api/cards`

Returns full evidence cards for the library.

Query parameters:

- `q`: case-insensitive ingredient, alias, or claim search, maximum 80 characters.
- `category`: exact category label.
- `verdict`: `supported`, `mixed`, `preliminary`, or `unsupported`.

Response:

```json
{
  "cards": [],
  "total": 0,
  "catalogTotal": 100
}
```

## GET `/api/cards/:id`

Returns one authoritative card and its resolved sources. The game uses this only after the player locks an answer.

Response:

```json
{
  "card": {
    "id": "collagen-hydrolysate",
    "verdict": "preliminary",
    "explanation": "..."
  },
  "sources": []
}
```

Returns `404` for an unknown id.

## GET `/api/round`

Builds a round without exposing verdicts, explanations, sources, or safety notes.

Query parameters:

- `mode`: `daily`, `review`, or `practice`. Defaults to `daily`.
- `seed`: optional explicit seed for deterministic practice rounds.

Response:

```json
{
  "mode": "daily",
  "seed": "2026-11-26",
  "cards": [],
  "total": 5,
  "needsPractice": false
}
```

Review mode returns an empty list with `needsPractice: true` when no session or review cards exist.

## POST `/api/rounds`

Validates and grades a complete round, writes progress and the round record in one transaction, and returns the authoritative result.

Request:

```json
{
  "mode": "daily",
  "seed": "2026-11-26",
  "answers": [
    {
      "cardId": "collagen-hydrolysate",
      "selectedVerdict": "preliminary",
      "confidence": 2
    }
  ]
}
```

Rules:

- One to ten answers.
- Card ids must exist in the catalog.
- A card cannot appear twice in one submission.
- Confidence must be `1`, `2`, or `3`.
- A new session receives an opaque cookie in the `201` response.
- Repeating the same account, mode, and seed returns `409`.
- Invalid payloads return `422`.
- Cross-origin mutations return `403`.

Response includes `roundId` and `result`, with score, total, correct count, calibration flags, and per-answer explanations.

## GET `/api/progress`

Returns the current session's mastery summary, review card ids, and five most recent rounds. A visitor without a valid session receives an empty summary.

Response:

```json
{
  "summary": {
    "practiced": 0,
    "mastered": 0,
    "total": 100,
    "percent": 0
  },
  "reviewCardIds": [],
  "recentRounds": []
}
```

## DELETE `/api/session`

Deletes the current anonymous account and cascading progress, then clears the session cookie. Returns `200` with `{ "status": "erased" }` even when no account exists.

## GET `/api/health`

Runs `select 1` and reports the active database driver and catalog size.

Response:

```json
{
  "status": "ok",
  "database": "postgres",
  "cards": 100
}
```

Local development without `DATABASE_URL` reports `pglite`. Production with Neon reports `postgres`.
