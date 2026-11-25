"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { EvidenceCard, Verdict } from "@/data/types";
import { CATEGORIES } from "@/data/catalog";
import { getVerdictMeta } from "@/domain/game";

export function CardLibrary({ cards, initialCategory = "All" }: { cards: EvidenceCard[]; initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [verdict, setVerdict] = useState<"All" | Verdict>("All");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return cards.filter((card) => {
      const matchesQuery = !term || [card.ingredient, card.claim, ...card.aliases].join(" ").toLowerCase().includes(term);
      const matchesCategory = category === "All" || card.category === category;
      const matchesVerdict = verdict === "All" || card.verdict === verdict;
      return matchesQuery && matchesCategory && matchesVerdict;
    });
  }, [cards, category, query, verdict]);

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setVerdict("All");
  }

  return (
    <div>
      <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search claim cards</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search an ingredient, alias, or claim" className="h-12 w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] pl-11 pr-10 text-sm outline-none focus:border-[var(--violet)]" />
            {query && <button type="button" onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[var(--muted)] hover:text-[var(--ink)]" aria-label="Clear search"><X size={16} aria-hidden="true" /></button>}
          </label>
          <label className="lg:w-52">
            <span className="sr-only">Filter by category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 text-sm font-bold outline-none focus:border-[var(--violet)]">
              <option value="All">All categories</option>
              {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="lg:w-48">
            <span className="sr-only">Filter by evidence verdict</span>
            <select value={verdict} onChange={(event) => setVerdict(event.target.value as "All" | Verdict)} className="h-12 w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 text-sm font-bold outline-none focus:border-[var(--violet)]">
              <option value="All">All verdicts</option>
              <option value="supported">Well supported</option>
              <option value="mixed">Mixed evidence</option>
              <option value="preliminary">Early evidence</option>
              <option value="unsupported">Not supported</option>
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]" aria-live="polite">{filtered.length} of {cards.length} cards</p>
          {(query || category !== "All" || verdict !== "All") && <button type="button" className="button-ghost min-h-9 px-3 text-xs" onClick={clearFilters}>Clear filters <X size={13} aria-hidden="true" /></button>}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((card, index) => (
            <Link key={card.id} href={`/cards/${card.slug}`} className="group rounded-3xl border border-[var(--line)] bg-[var(--paper-strong)] p-5 transition-all hover:-translate-y-1 hover:border-[var(--violet)] hover:shadow-[var(--shadow-small)]">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">{String(index + 1).padStart(2, "0")} / {card.category}</span>
                <ArrowUpRight size={16} className="shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--violet)]" aria-hidden="true" />
              </div>
              <h2 className="mt-6 font-display text-lg font-semibold leading-tight tracking-[-0.045em]">{card.ingredient}</h2>
              <p className="mt-3 line-clamp-3 min-h-[72px] text-sm leading-6 text-[var(--muted)]">{card.claim}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-4">
                <span className={`verdict-${card.verdict} rounded-full px-3 py-1 font-mono text-[10px] font-bold`} style={{ background: "var(--verdict-soft)", color: "var(--verdict-color)" }}>{getVerdictMeta(card.verdict).label}</span>
                <span className="font-mono text-[10px] text-[var(--muted)]">{card.sourceIds.length} sources</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[28px] border border-dashed border-[var(--line)] bg-[var(--paper-strong)] p-12 text-center">
          <Search className="mx-auto text-[var(--muted)]" size={28} aria-hidden="true" />
          <h2 className="mt-4 font-display text-xl font-semibold tracking-[-0.04em]">No cards match that read.</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Try a broader ingredient name or clear the filters.</p>
          <button type="button" className="button-secondary mt-5" onClick={clearFilters}>Clear filters</button>
        </div>
      )}
    </div>
  );
}
