import { describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { createPgliteDatabase } from "@/db/client";
import { accounts, cardProgress, rounds } from "@/db/schema";
import { accountRefForToken, createSessionToken } from "@/server/session";

describe("database schema", () => {
  it("creates the schema and cascades account deletion", async () => {
    const db = await createPgliteDatabase();
    const accountRef = "acct_test_cascade";
    await db.insert(accounts).values({ accountRef });
    await db.insert(cardProgress).values({
      accountRef,
      cardId: "vitamin-d3",
      attempts: 1,
      correct: 1,
      lastSelectedVerdict: "supported",
      lastConfidence: 2,
    });
    await db.insert(rounds).values({
      accountRef,
      mode: "daily",
      seed: "2026-11-26",
      score: 100,
      total: 1,
      correct: 1,
      calibrationFlags: 0,
    });

    expect(await db.select().from(cardProgress)).toHaveLength(1);
    expect(await db.select().from(rounds)).toHaveLength(1);

    await db.delete(accounts).where(eq(accounts.accountRef, accountRef));
    expect(await db.select().from(cardProgress)).toHaveLength(0);
    expect(await db.select().from(rounds)).toHaveLength(0);
  });

  it("rejects confidence outside the allowed range", async () => {
    const db = await createPgliteDatabase();
    await db.insert(accounts).values({ accountRef: "acct_test_bounds" });
    await expect(
      db.insert(cardProgress).values({
        accountRef: "acct_test_bounds",
        cardId: "nac",
        attempts: 0,
        correct: 0,
        lastSelectedVerdict: "mixed",
        lastConfidence: 4,
      }),
    ).rejects.toThrow();
  });
});

describe("anonymous session tokens", () => {
  it("creates opaque tokens and stable account references", () => {
    const first = createSessionToken();
    const second = createSessionToken();
    expect(first).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(second).not.toBe(first);
    expect(accountRefForToken(first)).toBe(accountRefForToken(first));
    expect(accountRefForToken(first)).not.toContain(first);
  });
});
