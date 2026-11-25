import type { NextRequest } from "next/server";
import { sql } from "drizzle-orm";
import { CARDS, getCardById } from "@/data/catalog";
import { getDb } from "@/db/client";
import { cardProgress, rounds } from "@/db/schema";
import { gradeRound } from "@/domain/game";
import { assertSameOrigin, getOrCreateAccount } from "@/server/session";
import { roundSubmissionSchema } from "@/server/validation";
import { errorResponse, jsonResponse, RoundAlreadyPlayedError } from "@/server/http";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    assertSameOrigin(request);
    const payload = await request.json().catch(() => null);
    const parsed = roundSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      return jsonResponse({ error: "The round submission is invalid." }, { status: 422 });
    }
    const submission = parsed.data;
    if (submission.answers.some((answer) => !getCardById(answer.cardId))) {
      return jsonResponse({ error: "The round contains an unknown card." }, { status: 422 });
    }
    const result = gradeRound(CARDS, submission.answers);
    const { accountRef, token, isNew } = await getOrCreateAccount(request);
    const db = await getDb();

    const roundId = await db.transaction(async (tx) => {
      const inserted = await tx
        .insert(rounds)
        .values({
          accountRef,
          mode: submission.mode,
          seed: submission.seed,
          score: result.score,
          total: result.total,
          correct: result.correct,
          calibrationFlags: result.calibrationFlags,
        })
        .onConflictDoNothing({ target: [rounds.accountRef, rounds.mode, rounds.seed] })
        .returning({ id: rounds.id });
      if (!inserted[0]) throw new RoundAlreadyPlayedError();

      for (const answer of result.answers) {
        const correctIncrement = answer.correct ? 1 : 0;
        await tx
          .insert(cardProgress)
          .values({
            accountRef,
            cardId: answer.cardId,
            attempts: 1,
            correct: correctIncrement,
            lastSelectedVerdict: answer.selectedVerdict,
            lastConfidence: answer.confidence,
          })
          .onConflictDoUpdate({
            target: [cardProgress.accountRef, cardProgress.cardId],
            set: {
              attempts: sql`${cardProgress.attempts} + 1`,
              correct: sql`${cardProgress.correct} + ${correctIncrement}`,
              lastSelectedVerdict: answer.selectedVerdict,
              lastConfidence: answer.confidence,
              updatedAt: new Date(),
            },
          });
      }
      return inserted[0]!.id;
    });

    return jsonResponse({ roundId, result }, { status: 201 }, isNew ? token : undefined);
  } catch (error) {
    return errorResponse(error);
  }
}
