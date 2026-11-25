import type { NextRequest } from "next/server";
import { CARDS } from "@/data/catalog";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const query = (params.get("q") ?? "").trim().toLowerCase().slice(0, 80);
  const category = params.get("category");
  const verdict = params.get("verdict");
  const cards = CARDS.filter((card) => {
    const matchesQuery = !query || [card.ingredient, card.claim, ...card.aliases].join(" ").toLowerCase().includes(query);
    const matchesCategory = !category || card.category === category;
    const matchesVerdict = !verdict || card.verdict === verdict;
    return matchesQuery && matchesCategory && matchesVerdict;
  });
  return Response.json({ cards, total: cards.length, catalogTotal: CARDS.length });
}
