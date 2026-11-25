"use client";

import type { Verdict } from "@/data/types";
import { VERDICTS } from "@/domain/game";

type VerdictBinsProps = {
  selected: Verdict | null;
  onSelect: (verdict: Verdict) => void;
  disabled?: boolean;
};

export function VerdictBins({ selected, onSelect, disabled = false }: VerdictBinsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2" aria-label="Evidence verdict choices">
      {VERDICTS.map((verdict, index) => (
        <button
          key={verdict.id}
          type="button"
          disabled={disabled}
          aria-pressed={selected === verdict.id}
          onClick={() => onSelect(verdict.id)}
          className={`verdict-${verdict.id} ${selected === verdict.id ? "bin-pop" : ""} min-h-[92px] rounded-2xl border p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-50`}
          style={{
            borderColor: selected === verdict.id ? "var(--verdict-color)" : "var(--line)",
            background: selected === verdict.id ? "var(--verdict-soft)" : "var(--paper-strong)",
            transform: selected === verdict.id ? "translateY(-3px)" : undefined,
          }}
        >
          <span className="flex items-center justify-between gap-3">
            <span className="font-display text-sm font-semibold tracking-[-0.03em]" style={{ color: "var(--verdict-color)" }}>{verdict.label}</span>
            <kbd className="rounded-md border border-[var(--line)] px-2 py-1 font-mono text-[10px] text-[var(--muted)]">{index + 1}</kbd>
          </span>
          <span className="mt-2 block text-xs leading-5 text-[var(--muted)]">{verdict.description}</span>
        </button>
      ))}
    </div>
  );
}
