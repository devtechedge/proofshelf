import type { NextRequest } from "next/server";
import { desc, eq } from "drizzle-orm";
import { CARDS } from "@/data/catalog";
import { getDb } from "@/db/client";
import { cardProgress, rounds } from "@/db/schema";
import { getMasterySummary, getReviewCards, type CardProgress } from "@/domain/game";
import { readAccountRef } from "@/server/session";
import { errorResponse, jsonResponse } from "@/server/http";

export const dynamic = "force-dynamic";

function emptyProgress() {
  return {
    summary: { practiced: 0, mastered: 0, total: CARDS.length, percent: 0 },
    reviewCardIds: [] as string[],
    recentRounds: [] as Array<{
      id: string;
      mode: string;
      seed: string;
      score: number;
      total: number;
      correct: number;
      calibrationFlags: number;
      completedAt: string;
    }>,
  };
}

export async function GET(request: NextRequest) {
  try {
    const accountRef = await readAccountRef(request);
    if (!accountRef) return jsonResponse(emptyProgress());
    const db = await getDb();
    const [progressRows, roundRows] = await Promise.all([
      db.select().from(cardProgress).where(eq(cardProgress.accountRef, accountRef)),
      db
        .select({
          id: rounds.id,
          mode: rounds.mode,
          seed: rounds.seed,
          score: rounds.score,
          total: rounds.total,
          correct: rounds.correct,
          calibrationFlags: rounds.calibrationFlags,
          completedAt: rounds.completedAt,
        })
        .from(rounds)
        .where(eq(rounds.accountRef, accountRef))
        .orderBy(desc(rounds.completedAt))
        .limit(5),
    ]);
    const progress: CardProgress[] = progressRows.map((row) => ({
      cardId: row.cardId,
      attempts: row.attempts,
      correct: row.correct,
      lastSelectedVerdict: row.lastSelectedVerdict,
      lastConfidence: row.lastConfidence as 1 | 2 | 3,
      updatedAt: row.updatedAt.toISOString(),
    }));
    return jsonResponse({
      summary: getMasterySummary(CARDS, progress),
      reviewCardIds: getReviewCards(CARDS, progress).map((card) => card.id),
      recentRounds: roundRows.map((round) => ({ ...round, completedAt: round.completedAt.toISOString() })),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
