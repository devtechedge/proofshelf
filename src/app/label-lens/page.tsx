import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ScanLine } from "@/components/icons";
import { LabelLensGame } from "@/components/label-lens-game";
import { CATALOG, getCardById } from "@/data/catalog";
import { buildLabelLensRound } from "@/domain/label-lens";
import { dailySeed } from "@/domain/game";

export const metadata: Metadata = {
  title: "Label Lens",
  description: "Practice reading supplement forms, routes, serving language, and proprietary blends without treating label wording as proof of efficacy.",
};

export default function LabelLensPage() {
  const questions = buildLabelLensRound(CATALOG, dailySeed(), 5);
  const cards = questions.map((question) => getCardById(question.cardId)).filter((card) => card !== undefined);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--violet)]">Read the form, not the hype</p>
          <h1 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[1] tracking-[-0.075em]">Label Lens.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">Match five label entries to their ingredient families. Every answer reveals a concrete label clue and safety note from the evidence card.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/cards" className="button-secondary">Browse the library</Link>
          <Link href="/play" className="button-primary">Play the evidence game <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="mt-10">
        <LabelLensGame questions={questions} cards={cards} />
      </div>
      <div className="mx-auto mt-8 flex max-w-5xl items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--cyan-soft)] p-4 text-sm leading-6">
        <ScanLine className="mt-0.5 shrink-0 text-[var(--violet)]" size={18} aria-hidden="true" />
        <p>A label can tell you what is declared and in what form. It cannot by itself prove identity, purity, absorption, superiority, or a health outcome.</p>
      </div>
    </div>
  );
}
