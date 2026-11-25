import type { EvidenceCard } from "@/data/types";

export type PublicCard = Pick<
  EvidenceCard,
  "id" | "slug" | "ingredient" | "aliases" | "category" | "form" | "route" | "claim" | "labelClue" | "tags"
>;

export function toPublicCard(card: EvidenceCard): PublicCard {
  return {
    id: card.id,
    slug: card.slug,
    ingredient: card.ingredient,
    aliases: card.aliases,
    category: card.category,
    form: card.form,
    route: card.route,
    claim: card.claim,
    labelClue: card.labelClue,
    tags: card.tags,
  };
}
