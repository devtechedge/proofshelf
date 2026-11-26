import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET as getCards } from "@/app/api/cards/route";
import { GET as getCard } from "@/app/api/cards/[id]/route";
import { GET as getProgress } from "@/app/api/progress/route";

describe("HTTP cache boundaries", () => {
  it("allows shared caching for public catalog responses", async () => {
    const cards = await getCards(new NextRequest("http://localhost/api/cards"));
    expect(cards.headers.get("cache-control")).toContain("public");
    expect(cards.headers.get("cache-control")).toContain("s-maxage=86400");

    const card = await getCard(new NextRequest("http://localhost/api/cards/nac"), {
      params: Promise.resolve({ id: "nac" }),
    });
    expect(card.headers.get("cache-control")).toContain("public");
  });

  it("keeps anonymous progress dynamic and private", async () => {
    const response = await getProgress(new NextRequest("http://localhost/api/progress"));
    expect(response.headers.get("cache-control") ?? "").not.toContain("public");
  });
});
