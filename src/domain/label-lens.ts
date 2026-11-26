import type { EvidenceCard } from "@/data/types";
import { seededShuffle } from "@/domain/game";

export type LabelLensQuestion = {
  cardId: string;
  form: string;
  route: EvidenceCard["route"];
  options: string[];
  correctOption: string;
};

export function buildLabelLensRound(cards: readonly EvidenceCard[], seed: string, count = 5): LabelLensQuestion[] {
  if (!Number.isInteger(count) || count < 1 || count > cards.length) {
    throw new Error("Label Lens size must fit the catalog.");
  }
  const selected = seededShuffle(cards, `label-lens:${seed}`).slice(0, count);
  return selected.map((card, index) => {
    const sameCategory = cards.filter((candidate) => candidate.id !== card.id && candidate.category === card.category);
    const fallback = cards.filter((candidate) => candidate.id !== card.id && candidate.ingredient !== card.ingredient);
    const distractors = seededShuffle([...sameCategory, ...fallback], `distractors:${seed}:${card.id}:${index}`)
      .filter((candidate, candidateIndex, all) => all.findIndex((item) => item.ingredient === candidate.ingredient) === candidateIndex)
      .slice(0, 3)
      .map((candidate) => candidate.ingredient);
    const options = seededShuffle([card.ingredient, ...distractors], `options:${seed}:${card.id}:${index}`);
    return {
      cardId: card.id,
      form: card.form,
      route: card.route,
      options,
      correctOption: card.ingredient,
    };
  });
}
