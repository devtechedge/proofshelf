import Link from "next/link";
import { ArrowRight, CheckCircle2, RotateCcw, Target, TriangleAlert } from "lucide-react";
import type { PublicCard } from "@/domain/cards";
import type { RoundResult } from "@/data/types";
import { getVerdictMeta } from "@/domain/game";

type RoundResultPanelProps = {
  result: RoundResult;
  cards: PublicCard[];
  mode: "daily" | "review" | "practice";
};

export function RoundResultPanel({ result, cards, mode }: RoundResultPanelProps) {
  const byId = new Map(cards.map((card) => [card.id, card]));
  const missed = result.answers.filter((answer) => !answer.correct);
  const accuracy = result.total === 0 ? 0 : Math.round((result.correct / result.total) * 100);

  return (
    <section className="count-up rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6 shadow-[var(--shadow)] sm:p-8" aria-labelledby="round-result-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--violet)]">{mode} round complete</p>
          <h1 id="round-result-title" className="mt-2 font-display text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">Here is your read.</h1>
        </div>
        <span className="rounded-full bg-[var(--lime-soft)] px-3 py-1.5 font-mono text-xs font-bold">Saved to this browser</span>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-[var(--violet-soft)] p-5"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Score</p><p className="mt-2 font-display text-3xl font-semibold tracking-[-0.06em]">{result.score}</p></div>
        <div className="rounded-2xl bg-[var(--cyan-soft)] p-5"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Accuracy</p><p className="mt-2 font-display text-3xl font-semibold tracking-[-0.06em]">{accuracy}%</p></div>
        <div className="rounded-2xl bg-[var(--coral-soft)] p-5"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Calibration flags</p><p className="mt-2 font-display text-3xl font-semibold tracking-[-0.06em]">{result.calibrationFlags}</p></div>
      </div>

      <div className="mt-7 rounded-2xl border border-[var(--line)] p-5">
        <div className="flex items-start gap-3">
          {result.calibrationFlags > 0 ? <TriangleAlert className="mt-0.5 shrink-0 text-[var(--coral)]" size={20} aria-hidden="true" /> : <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--violet)]" size={20} aria-hidden="true" />}
          <div>
            <h2 className="font-bold">{result.calibrationFlags > 0 ? "Certainty needs a check." : "Your confidence matched your reads."}</h2>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{result.calibrationFlags > 0 ? "At least one high-confidence answer missed the evidence. Those cards move to the front of your review queue." : "No high-confidence misses in this round. Keep checking the source and the limits, not just the verdict."}</p>
          </div>
        </div>
      </div>

      {missed.length > 0 && (
        <div className="mt-7">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Cards to revisit</h2>
          <ul className="mt-3 space-y-2">
            {missed.map((answer) => {
              const card = byId.get(answer.cardId);
              return (
                <li key={answer.cardId} className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--paper)] px-4 py-3">
                  <div><p className="text-sm font-bold">{card?.ingredient ?? answer.cardId}</p><p className="mt-1 text-xs text-[var(--muted)]">Evidence verdict: {getVerdictMeta(answer.actualVerdict).label}</p></div>
                  <Link href={`/cards/${card?.slug ?? answer.cardId}`} className="text-xs font-bold text-[var(--violet)] hover:underline">Open card</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/play?mode=review" className="button-primary"><Target size={16} aria-hidden="true" /> Review mistakes</Link>
        <Link href="/play?mode=practice" className="button-secondary"><RotateCcw size={16} aria-hidden="true" /> Practice again</Link>
        <Link href="/cards" className="button-ghost">Browse library <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
