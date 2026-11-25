import type { NextRequest } from "next/server";
import { CARDS } from "@/data/catalog";
import { buildRound, dailySeed, getReviewCards, seededShuffle, type CardProgress } from "@/domain/game";
import { toPublicCard } from "@/domain/cards";
import { getDb } from "@/db/client";
import { cardProgress } from "@/db/schema";
import { readAccountRef } from "@/server/session";
import { errorResponse, jsonResponse, HttpError } from "@/server/http";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const mode = request.nextUrl.searchParams.get("mode") ?? "daily";
    if (!["daily", "review", "practice"].includes(mode)) {
      throw new HttpError(400, "Unknown game mode.");
    }
    const requestedSeed = request.nextUrl.searchParams.get("seed");
    const seed = requestedSeed ?? (mode === "daily" ? dailySeed() : `practice:${Date.now()}`);
    if (!/^[A-Za-z0-9:_.-]{1,80}$/.test(seed)) {
      throw new HttpError(400, "Invalid round seed.");
    }

    let cards = buildRound(CARDS, seed, 5);
    if (mode === "review") {
      const accountRef = await readAccountRef(request);
      if (!accountRef) {
        return jsonResponse({ mode, seed, cards: [], total: 0, needsPractice: true });
      }
      const db = await getDb();
      const rows = await db.select().from(cardProgress).where(eq(cardProgress.accountRef, accountRef));
      const progress: CardProgress[] = rows.map((row) => ({
        cardId: row.cardId,
        attempts: row.attempts,
        correct: row.correct,
        lastSelectedVerdict: row.lastSelectedVerdict,
        lastConfidence: row.lastConfidence as 1 | 2 | 3,
        updatedAt: row.updatedAt.toISOString(),
      }));
      const review = getReviewCards(CARDS, progress);
      const practiced = new Set(progress.map((entry) => entry.cardId));
      const fresh = seededShuffle(CARDS.filter((card) => !practiced.has(card.id)), `fresh:${seed}`);
      cards = [...review, ...fresh].slice(0, 5);
    }

    return jsonResponse({
      mode,
      seed,
      cards: cards.map(toPublicCard),
      total: cards.length,
      needsPractice: mode === "review" && cards.length === 0,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
