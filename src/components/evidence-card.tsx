import Link from "next/link";
import { ArrowUpRight, Check, FlaskConical, ShieldAlert } from "lucide-react";
import type { EvidenceCard, EvidenceSource } from "@/data/types";
import type { PublicCard } from "@/domain/cards";
import { getVerdictMeta } from "@/domain/game";

type EvidenceCardProps = {
  card: EvidenceCard | PublicCard;
  revealed?: boolean;
  sources?: EvidenceSource[];
  compact?: boolean;
};

export function EvidenceCard({ card, revealed = false, sources = [], compact = false }: EvidenceCardProps) {
  if (revealed && "verdict" in card) {
    const verdict = getVerdictMeta(card.verdict);
    return (
      <article className={`card-reveal perforated relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6 shadow-[var(--shadow)] sm:p-8 ${compact ? "max-w-2xl" : ""}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">{card.category}</span>
          <span className={`verdict-${card.verdict} rounded-full px-3 py-1.5 font-mono text-xs font-bold`} style={{ background: "var(--verdict-soft)", color: "var(--verdict-color)" }}>
            {verdict.label}
          </span>
        </div>
        <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">{card.ingredient}</h2>
        <p className="mt-3 text-base leading-7 text-[var(--muted)]">{card.explanation}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-[var(--cyan-soft)] p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em]">
              <FlaskConical size={15} aria-hidden="true" /> Label clue
            </div>
            <p className="mt-2 text-sm leading-6">{card.labelClue}</p>
          </div>
          <div className="rounded-2xl bg-[var(--coral-soft)] p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em]">
              <ShieldAlert size={15} aria-hidden="true" /> Safety note
            </div>
            <p className="mt-2 text-sm leading-6">{card.safetyNote}</p>
          </div>
        </div>
        <div className="mt-6 border-t border-[var(--line)] pt-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em]">Sources</h3>
            <Link href={`/cards/${card.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[var(--violet)] hover:underline">
              Full card <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
          {sources.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {sources.slice(0, 4).map((source) => (
                <li key={source.id}>
                  <a href={source.url} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-3 rounded-lg text-sm leading-5 hover:text-[var(--violet)] hover:underline">
                    <span>{source.title}</span>
                    <ArrowUpRight className="mt-0.5 shrink-0" size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-[var(--muted)]">{card.sourceIds.length} sourced references on the full card.</p>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className={`card-enter perforated relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6 shadow-[var(--shadow)] sm:p-8 ${compact ? "max-w-2xl" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">{card.category}</span>
        <span className="rounded-full bg-[var(--violet-soft)] px-3 py-1.5 font-mono text-xs font-bold text-[var(--violet)]">{card.form}</span>
      </div>
      <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--violet)]">{card.ingredient}</p>
      <h2 className="mt-3 font-display text-[clamp(1.55rem,4vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.06em]">{card.claim}</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {card.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[11px] text-[var(--muted)]">#{tag}</span>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
        <span>{card.route} route</span>
        <span className="inline-flex items-center gap-1.5"><Check size={13} aria-hidden="true" /> Choose the evidence verdict</span>
      </div>
    </article>
  );
}
