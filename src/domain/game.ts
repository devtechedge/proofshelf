import type { EvidenceCard, RoundAnswer, RoundResult, Verdict } from "@/data/types";

export const VERDICTS: Array<{
  id: Verdict;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    id: "supported",
    label: "Well supported",
    shortLabel: "Supported",
    description: "A narrow claim with consistent, higher-quality human evidence.",
  },
  {
    id: "mixed",
    label: "Mixed evidence",
    shortLabel: "Mixed",
    description: "Results vary by population, form, outcome, or study quality.",
  },
  {
    id: "preliminary",
    label: "Early evidence",
    shortLabel: "Early",
    description: "Small, early, preclinical, or otherwise limited human evidence.",
  },
  {
    id: "unsupported",
    label: "Not supported",
    shortLabel: "Unsupported",
    description: "The claim is contradicted or lacks adequate evidence.",
  },
];

export type CardProgress = {
  cardId: string;
  attempts: number;
  correct: number;
  lastSelectedVerdict: Verdict;
  lastConfidence: 1 | 2 | 3;
  updatedAt: string;
};

export function getVerdictMeta(verdict: Verdict) {
  return VERDICTS.find((item) => item.id === verdict)!;
}

export function dailySeed(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function hashSeed(seed: string) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const result = [...items];
  let state = hashSeed(seed) || 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const swapIndex = state % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]!];
  }
  return result;
}

export function buildRound(cards: readonly EvidenceCard[], seed: string, count = 5) {
  if (!Number.isInteger(count) || count < 1 || count > cards.length) {
    throw new Error("Round size must fit the available card catalog.");
  }
  return seededShuffle(cards, `proofshelf:${seed}`).slice(0, count);
}

export function gradeRound(cards: readonly EvidenceCard[], answers: readonly RoundAnswer[]): RoundResult {
  const byId = new Map(cards.map((card) => [card.id, card]));
  const seen = new Set<string>();
  let score = 0;
  let correct = 0;
  let calibrationFlags = 0;

  const graded = answers.map((answer) => {
    const card = byId.get(answer.cardId);
    if (!card) throw new Error(`Unknown card: ${answer.cardId}`);
    if (seen.has(answer.cardId)) throw new Error(`Duplicate answer: ${answer.cardId}`);
    seen.add(answer.cardId);
    const isCorrect = answer.selectedVerdict === card.verdict;
    if (isCorrect) {
      score += 100;
      correct += 1;
    }
    if (!isCorrect && answer.confidence === 3) calibrationFlags += 1;
    return {
      cardId: card.id,
      selectedVerdict: answer.selectedVerdict,
      confidence: answer.confidence,
      correct: isCorrect,
      actualVerdict: card.verdict,
      explanation: card.explanation,
      sourceIds: card.sourceIds,
    };
  });

  return {
    score,
    total: answers.length,
    correct,
    calibrationFlags,
    answers: graded,
  };
}

export function getReviewCards(cards: readonly EvidenceCard[], progress: readonly CardProgress[]) {
  const byId = new Map(cards.map((card) => [card.id, card]));
  return progress
    .filter((entry) => {
      const missed = entry.correct < entry.attempts;
      const overconfident = entry.lastConfidence === 3 && entry.lastSelectedVerdict !== byId.get(entry.cardId)?.verdict;
      return missed || overconfident;
    })
    .sort((a, b) => {
      const aRatio = a.attempts === 0 ? 0 : a.correct / a.attempts;
      const bRatio = b.attempts === 0 ? 0 : b.correct / b.attempts;
      return aRatio - bRatio || b.updatedAt.localeCompare(a.updatedAt);
    })
    .map((entry) => byId.get(entry.cardId))
    .filter((card): card is EvidenceCard => Boolean(card));
}

export function getMasterySummary(cards: readonly EvidenceCard[], progress: readonly CardProgress[]) {
  const practiced = new Set(progress.map((entry) => entry.cardId));
  const mastered = new Set(
    progress
      .filter((entry) => entry.attempts >= 2 && entry.correct === entry.attempts)
      .map((entry) => entry.cardId),
  );
  return {
    practiced: practiced.size,
    mastered: mastered.size,
    total: cards.length,
    percent: cards.length === 0 ? 0 : Math.round((mastered.size / cards.length) * 100),
  };
}
