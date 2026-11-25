import type { CardCategory, EvidenceCard, EvidenceSource } from "../types";
import { SOURCES } from "../sources";
import { BOTANICAL_CARDS } from "./botanicals";
import { COGNITION_CARDS } from "./cognition";
import { GUT_CARDS } from "./gut";
import { MARINE_CARDS } from "./marine";
import { MINERAL_CARDS } from "./minerals";
import { MUSHROOM_CARDS } from "./mushrooms";
import { PROTEIN_CARDS } from "./protein";
import { SPECIALTY_CARDS } from "./specialties";
import { VITAMIN_CARDS } from "./vitamins";

export const CATEGORIES: CardCategory[] = [
  "Vitamins",
  "Minerals",
  "Marine oils and fats",
  "Protein and performance",
  "Cognition",
  "Botanicals",
  "Medicinal mushrooms",
  "Gut and metabolic",
  "Specialties"
];

export const CATALOG: EvidenceCard[] = [
  ...VITAMIN_CARDS,
  ...MINERAL_CARDS,
  ...MARINE_CARDS,
  ...PROTEIN_CARDS,
  ...COGNITION_CARDS,
  ...BOTANICAL_CARDS,
  ...MUSHROOM_CARDS,
  ...GUT_CARDS,
  ...SPECIALTY_CARDS
];

export const CARDS = CATALOG;

const CARDS_BY_ID = new Map(CATALOG.map((card) => [card.id, card]));
const CARDS_BY_SLUG = new Map(CATALOG.map((card) => [card.slug, card]));
const SOURCES_BY_ID = new Map(SOURCES.map((source) => [source.id, source]));

export function getCardBySlug(slug: string): EvidenceCard | undefined {
  return CARDS_BY_SLUG.get(slug);
}

export function getCardById(id: string): EvidenceCard | undefined {
  return CARDS_BY_ID.get(id);
}

export function getSourcesForCard(cardId: string): EvidenceSource[] {
  const card = CARDS_BY_ID.get(cardId);

  if (!card) {
    return [];
  }

  return card.sourceIds.flatMap((sourceId) => {
    const source = SOURCES_BY_ID.get(sourceId);
    return source ? [source] : [];
  });
}
