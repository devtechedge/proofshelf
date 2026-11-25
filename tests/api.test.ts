import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { getCardById } from "@/data/catalog";
import { toPublicCard } from "@/domain/cards";
import { SESSION_COOKIE } from "@/server/session";
import { roundSubmissionSchema } from "@/server/validation";
import { GET as getRound } from "@/app/api/round/route";
import { POST as submitRound } from "@/app/api/rounds/route";
import { GET as getProgress } from "@/app/api/progress/route";
import { DELETE as deleteSession } from "@/app/api/session/route";

function request(path: string, init?: RequestInit) {
  return new NextRequest(`http://localhost${path}`, {
    ...init,
    headers: { host: "localhost", ...init?.headers },
  });
}

function cookieHeader(token: string) {
  return { cookie: `${SESSION_COOKIE}=${token}` };
}

describe("round validation and public cards", () => {
  it("does not leak answers in a public round card", () => {
    const card = getCardById("collagen-hydrolysate")!;
    const publicCard = toPublicCard(card);
    expect(publicCard.claim).toBe(card.claim);
    expect(publicCard).not.toHaveProperty("verdict");
    expect(publicCard).not.toHaveProperty("explanation");
    expect(publicCard).not.toHaveProperty("sourceIds");
    expect(publicCard).not.toHaveProperty("safetyNote");
  });

  it("rejects duplicate answers and invalid confidence", () => {
    const valid = {
      mode: "daily",
      seed: "2026-11-26",
      answers: [{ cardId: "nac", selectedVerdict: "mixed", confidence: 2 }],
    };
    expect(roundSubmissionSchema.safeParse(valid).success).toBe(true);
    expect(
      roundSubmissionSchema.safeParse({
        ...valid,
        answers: [valid.answers[0], valid.answers[0]],
      }).success,
    ).toBe(false);
    expect(
      roundSubmissionSchema.safeParse({
        ...valid,
        answers: [{ ...valid.answers[0], confidence: 4 }],
      }).success,
    ).toBe(false);
  });
});

describe("game API", () => {
  it("persists a daily round, blocks replay, isolates accounts, and erases data", async () => {
    const seed = `test-${Date.now()}`;
    const roundResponse = await getRound(request(`/api/round?mode=daily&seed=${seed}`));
    expect(roundResponse.status).toBe(200);
    const round = (await roundResponse.json()) as {
      cards: Array<{ id: string }>;
      total: number;
    };
    expect(round.cards).toHaveLength(5);
    expect(round.total).toBe(5);

    const answers = round.cards.map((card) => {
      const fullCard = getCardById(card.id)!;
      return { cardId: card.id, selectedVerdict: fullCard.verdict, confidence: 2 as const };
    });
    const payload = JSON.stringify({ mode: "daily", seed, answers });
    const submitResponse = await submitRound(
      request("/api/rounds", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "http://localhost" },
        body: payload,
      }),
    );
    expect(submitResponse.status).toBe(201);
    const submitted = (await submitResponse.json()) as { result: { score: number; correct: number } };
    expect(submitted.result.score).toBe(500);
    expect(submitted.result.correct).toBe(5);
    const token = submitResponse.cookies.get(SESSION_COOKIE)?.value;
    expect(token).toBeTruthy();

    const replayResponse = await submitRound(
      request("/api/rounds", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "http://localhost", ...cookieHeader(token!) },
        body: payload,
      }),
    );
    expect(replayResponse.status).toBe(409);

    const progressResponse = await getProgress(request("/api/progress", { headers: cookieHeader(token!) }));
    const progress = (await progressResponse.json()) as { summary: { practiced: number; mastered: number } };
    expect(progress.summary.practiced).toBe(5);
    expect(progress.summary.mastered).toBe(0);

    const emptyProgressResponse = await getProgress(request("/api/progress"));
    const emptyProgress = (await emptyProgressResponse.json()) as { summary: { practiced: number } };
    expect(emptyProgress.summary.practiced).toBe(0);

    const eraseResponse = await deleteSession(
      request("/api/session", {
        method: "DELETE",
        headers: { origin: "http://localhost", ...cookieHeader(token!) },
      }),
    );
    expect(eraseResponse.status).toBe(200);
    const erasedProgressResponse = await getProgress(request("/api/progress", { headers: cookieHeader(token!) }));
    const erasedProgress = (await erasedProgressResponse.json()) as { summary: { practiced: number } };
    expect(erasedProgress.summary.practiced).toBe(0);
  });

  it("rejects cross-origin mutations", async () => {
    const response = await submitRound(
      request("/api/rounds", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "https://example.com" },
        body: JSON.stringify({ mode: "daily", seed: "blocked", answers: [] }),
      }),
    );
    expect(response.status).toBe(403);
  });
});
