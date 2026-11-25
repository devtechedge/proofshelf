import { describe, expect, it } from "vitest";
import { CARDS, CATALOG, CATEGORIES, getCardById, getCardBySlug, getSourcesForCard } from "@/data/catalog";
import { SOURCES } from "@/data/sources";

const expectedCounts = {
  Vitamins: 14,
  Minerals: 12,
  "Marine oils and fats": 7,
  "Protein and performance": 15,
  Cognition: 3,
  Botanicals: 21,
  "Medicinal mushrooms": 3,
  "Gut and metabolic": 13,
  Specialties: 12,
};

describe("evidence catalog", () => {
  it("contains exactly 100 unique cards and slugs", () => {
    expect(CATALOG).toHaveLength(100);
    expect(CARDS).toBe(CATALOG);
    expect(new Set(CATALOG.map((card) => card.id)).size).toBe(100);
    expect(new Set(CATALOG.map((card) => card.slug)).size).toBe(100);
  });

  it("matches the researched category counts", () => {
    expect(CATEGORIES).toHaveLength(9);
    for (const category of CATEGORIES) {
      expect(CATALOG.filter((card) => card.category === category)).toHaveLength(expectedCounts[category]);
    }
  });

  it("resolves every source and keeps market discovery separate from evidence", () => {
    const sourceIds = new Set(SOURCES.map((source) => source.id));
    for (const source of SOURCES) {
      expect(source.url).toMatch(/^https:\/\//);
    }
    for (const card of CATALOG) {
      expect(card.sourceIds.length).toBeGreaterThan(0);
      expect(card.sourceIds.every((sourceId) => sourceIds.has(sourceId))).toBe(true);
      const evidenceSources = getSourcesForCard(card.id).filter((source) => source.kind !== "market-discovery");
      expect(evidenceSources.length).toBeGreaterThan(0);
    }
  });

  it("includes the required supplement examples", () => {
    for (const id of [
      "collagen-hydrolysate",
      "nac",
      "triple-strength-fish-oil-epa-dha-concentrate",
      "zinc-picolinate",
      "liposomal-glutathione",
      "ghk-cu-copper-tripeptide",
    ]) {
      expect(getCardById(id)).toBeDefined();
    }
  });

  it("has complete teaching content and no em dash characters", () => {
    for (const card of CATALOG) {
      expect(card.claim.length).toBeGreaterThan(20);
      expect(card.explanation.length).toBeGreaterThan(40);
      expect(card.labelClue.length).toBeGreaterThan(20);
      expect(card.safetyNote.length).toBeGreaterThan(20);
    }
    expect(JSON.stringify(CATALOG)).not.toContain("\u2014");
    expect(JSON.stringify(SOURCES)).not.toContain("\u2014");
  });

  it("supports stable id and slug lookups", () => {
    const card = CATALOG[0]!;
    expect(getCardById(card.id)).toBe(card);
    expect(getCardBySlug(card.slug)).toBe(card);
    expect(getCardById("missing")).toBeUndefined();
    expect(getCardBySlug("missing")).toBeUndefined();
  });
});
