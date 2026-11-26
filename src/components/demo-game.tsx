"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, RotateCcw, Sparkles } from "@/components/icons";
import { DEMO_CARDS, DEMO_SOURCES } from "@/data/demo";
import type { Verdict } from "@/data/types";
import { ConfidenceDial } from "@/components/confidence-dial";
import { EvidenceCard } from "@/components/evidence-card";
import { VerdictBins } from "@/components/verdict-bins";
import { VERDICTS } from "@/domain/game";

export function DemoGame() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Verdict | null>(null);
  const [confidence, setConfidence] = useState<1 | 2 | 3>(2);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const card = DEMO_CARDS[index]!;

  const reveal = useCallback(() => {
    if (!selected || revealed) return;
    if (selected === card.verdict) setScore((value) => value + 1);
    setRevealed(true);
  }, [card.verdict, revealed, selected]);

  const next = useCallback(() => {
    if (!revealed) return;
    if (index === DEMO_CARDS.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setConfidence(2);
    setRevealed(false);
  }, [index, revealed]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (finished || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select")) return;
      const number = Number(event.key);
      if (!revealed && number >= 1 && number <= VERDICTS.length) {
        event.preventDefault();
        setSelected(VERDICTS[number - 1]!.id);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (revealed) next();
        else reveal();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [finished, next, reveal, revealed]);

  function restart() {
    setIndex(0);
    setSelected(null);
    setConfidence(2);
    setRevealed(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="count-up rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-8 text-center shadow-[var(--shadow)] sm:p-12">
        <Sparkles className="mx-auto text-[var(--violet)]" size={32} aria-hidden="true" />
        <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Demo complete</p>
        <p className="mt-2 font-display text-5xl font-semibold tracking-[-0.08em]">{score}<span className="text-2xl text-[var(--muted)]">/{DEMO_CARDS.length}</span></p>
        <h2 className="mt-4 text-xl font-bold">You just tested three claims.</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[var(--muted)]">The full game adds 100 sourced cards, daily rounds, confidence calibration, and a review queue that remembers what tripped you up.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/play" className="button-primary">Play the daily round <ArrowRight size={16} aria-hidden="true" /></Link>
          <button type="button" onClick={restart} className="button-secondary"><RotateCcw size={16} aria-hidden="true" /> Replay demo</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
      <div>
        <EvidenceCard card={card} revealed={revealed} sources={revealed ? DEMO_SOURCES.filter((source) => card.sourceIds.includes(source.id)) : []} />
      </div>
      <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Claim {index + 1} of {DEMO_CARDS.length}</p>
          <div className="flex gap-1.5" aria-hidden="true">
            {DEMO_CARDS.map((demoCard, dotIndex) => (
              <span key={demoCard.id} className={`h-2 w-7 rounded-full ${dotIndex <= index ? "bg-[var(--violet)]" : "bg-[var(--line)]"}`} />
            ))}
          </div>
        </div>
        {!revealed ? (
          <div className="mt-6 space-y-6">
            <VerdictBins selected={selected} onSelect={setSelected} />
            <ConfidenceDial value={confidence} onChange={setConfidence} />
            <button type="button" className="button-primary w-full" disabled={!selected} onClick={reveal}>
              Reveal the evidence <ArrowRight size={16} aria-hidden="true" />
            </button>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">Keys 1 to 4 choose. Enter reveals.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div className={`verdict-${card.verdict} rounded-2xl p-5`} style={{ background: "var(--verdict-soft)" }}>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--verdict-color)" }}>
                {selected === card.verdict ? "Correct read" : "The claim needed a closer read"}
              </p>
              <p className="mt-2 text-sm leading-6">You chose {VERDICTS.find((verdict) => verdict.id === selected)?.label}. The card shows what the evidence can actually support.</p>
            </div>
            <button type="button" className="button-primary w-full" onClick={next}>
              {index === DEMO_CARDS.length - 1 ? "See demo result" : "Next claim"} <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
        <p className="sr-only" aria-live="polite">{revealed ? `Evidence revealed. Correct verdict: ${card.verdict}.` : ""}</p>
      </div>
    </div>
  );
}
