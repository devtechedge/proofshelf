import type { NextRequest } from "next/server";
import { getCardById, getSourcesForCard } from "@/data/catalog";
import { errorResponse, jsonResponse } from "@/server/http";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const card = getCardById(id);
    if (!card) return jsonResponse({ error: "Card not found." }, { status: 404 });
    return jsonResponse({ card, sources: getSourcesForCard(card.id) });
  } catch (error) {
    return errorResponse(error);
  }
}
