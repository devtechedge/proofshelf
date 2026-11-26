import { describe, expect, it } from "vitest";
import { CATALOG } from "@/data/catalog";
import { buildLabelLensRound } from "@/domain/label-lens";

describe("Label Lens", () => {
  it("builds a deterministic five-question round", () => {
    const first = buildLabelLensRound(CATALOG, "2026-11-26");
    const second = buildLabelLensRound(CATALOG, "2026-11-26");
    expect(first).toEqual(second);
    expect(first).toHaveLength(5);
  });

  it("includes one correct and three unique distractors per question", () => {
    const round = buildLabelLensRound(CATALOG, "2026-11-26");
    for (const question of round) {
      expect(question.options).toHaveLength(4);
      expect(new Set(question.options).size).toBe(4);
      expect(question.options.filter((option) => option === question.correctOption)).toHaveLength(1);
    }
  });

  it("rejects impossible round sizes", () => {
    expect(() => buildLabelLensRound(CATALOG, "seed", 101)).toThrow();
  });
});
