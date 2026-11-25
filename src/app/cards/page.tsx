import type { Metadata } from "next";
import { CATALOG, CATEGORIES } from "@/data/catalog";
import { CardLibrary } from "@/components/card-library";

export const metadata: Metadata = {
  title: "100-card evidence library",
  description: "Browse 100 sourced supplement claim cards by ingredient, category, and evidence verdict.",
};

export default async function CardsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  const category = CATEGORIES.includes(params.category as (typeof CATEGORIES)[number]) ? params.category! : "All";
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--violet)]">The full shelf</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.075em]">100 claims. Sources attached.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">Search by ingredient, alias, or exact claim. Each card separates the marketing statement from the evidence verdict, label clue, safety note, and references.</p>
        </div>
        <div className="flex gap-6 lg:pb-1">
          <div><p className="font-display text-3xl font-semibold tracking-[-0.06em]">100</p><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Ingredient families</p></div>
          <div><p className="font-display text-3xl font-semibold tracking-[-0.06em]">9</p><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Categories</p></div>
        </div>
      </div>
      <div className="mt-10">
        <CardLibrary cards={CATALOG} initialCategory={category} />
      </div>
    </div>
  );
}
