import { describe, expect, it } from "vitest";
import type { EvidenceCard } from "@/data/types";
import { buildRound, dailySeed, getMasterySummary, getReviewCards, gradeRound, seededShuffle } from "@/domain/game";

const cards: EvidenceCard[] = [
  {
    id: "a",
    slug: "a",
    ingredient: "A",
    aliases: [],
    category: "Vitamins",
    form: "form",
    route: "oral",
    claim: "Claim A",
    verdict: "supported",
    explanation: "Because A.",
    labelClue: "Look for A.",
    safetyNote: "Caution A.",
    sourceIds: ["source-a"],
    tags: [],
  },
  {
    id: "b",
    slug: "b",
    ingredient: "B",
    aliases: [],
    category: "Minerals",
    form: "form",
    route: "oral",
    claim: "Claim B",
    verdict: "mixed",
    explanation: "Because B.",
    labelClue: "Look for B.",
    safetyNote: "Caution B.",
    sourceIds: ["source-b"],
    tags: [],
  },
  {
    id: "c",
    slug: "c",
    ingredient: "C",
    aliases: [],
    category: "Specialties",
    form: "form",
    route: "oral",
    claim: "Claim C",
    verdict: "preliminary",
    explanation: "Because C.",
    labelClue: "Look for C.",
    safetyNote: "Caution C.",
    sourceIds: ["source-c"],
    tags: [],
  },
];

describe("seededShuffle", () => {
  it("is deterministic and does not mutate the source", () => {
    const first = seededShuffle(cards, "2026-11-26");
    const second = seededShuffle(cards, "2026-11-26");
    expect(first).toEqual(second);
    expect(first).not.toBe(cards);
    expect(cards.map((card) => card.id)).toEqual(["a", "b", "c"]);
  });

  it("changes order for a different seed", () => {
    expect(seededShuffle(cards, "2026-11-26")).not.toEqual(seededShuffle(cards, "2026-11-27"));
  });
});

describe("buildRound", () => {
  it("returns the requested number of unique cards", () => {
    const round = buildRound(cards, "daily", 2);
    expect(round).toHaveLength(2);
    expect(new Set(round.map((card) => card.id)).size).toBe(2);
  });

  it("rejects impossible round sizes", () => {
    expect(() => buildRound(cards, "daily", 4)).toThrow();
  });
});

describe("gradeRound", () => {
  it("scores correct answers and flags high-confidence mistakes", () => {
    const result = gradeRound(cards, [
      { cardId: "a", selectedVerdict: "supported", confidence: 2 },
      { cardId: "b", selectedVerdict: "unsupported", confidence: 3 },
      { cardId: "c", selectedVerdict: "preliminary", confidence: 1 },
    ]);
    expect(result.score).toBe(200);
    expect(result.correct).toBe(2);
    expect(result.total).toBe(3);
    expect(result.calibrationFlags).toBe(1);
  });

  it("rejects duplicate and unknown answers", () => {
    expect(() =>
      gradeRound(cards, [
        { cardId: "a", selectedVerdict: "supported", confidence: 1 },
        { cardId: "a", selectedVerdict: "supported", confidence: 1 },
      ]),
    ).toThrow(/Duplicate/);
    expect(() => gradeRound(cards, [{ cardId: "missing", selectedVerdict: "mixed", confidence: 1 }])).toThrow(/Unknown/);
  });
});

describe("progress helpers", () => {
  it("puts missed and overconfident cards into review", () => {
    const review = getReviewCards(cards, [
      { cardId: "a", attempts: 2, correct: 2, lastSelectedVerdict: "supported", lastConfidence: 2, updatedAt: "2026-11-26" },
      { cardId: "b", attempts: 1, correct: 0, lastSelectedVerdict: "supported", lastConfidence: 3, updatedAt: "2026-11-25" },
      { cardId: "c", attempts: 1, correct: 1, lastSelectedVerdict: "preliminary", lastConfidence: 1, updatedAt: "2026-11-24" },
    ]);
    expect(review.map((card) => card.id)).toEqual(["b"]);
  });

  it("summarizes mastery without counting practice as mastery", () => {
    const summary = getMasterySummary(cards, [
      { cardId: "a", attempts: 2, correct: 2, lastSelectedVerdict: "supported", lastConfidence: 2, updatedAt: "2026-11-26" },
      { cardId: "b", attempts: 3, correct: 3, lastSelectedVerdict: "mixed", lastConfidence: 2, updatedAt: "2026-11-26" },
      { cardId: "c", attempts: 1, correct: 1, lastSelectedVerdict: "preliminary", lastConfidence: 1, updatedAt: "2026-11-26" },
    ]);
    expect(summary).toEqual({ practiced: 3, mastered: 2, total: 3, percent: 67 });
  });

  it("uses a UTC day for the daily seed", () => {
    expect(dailySeed(new Date("2026-11-26T23:30:00Z"))).toBe("2026-11-26");
  });
});
