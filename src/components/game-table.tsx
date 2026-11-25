"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, LoaderCircle, RefreshCw } from "lucide-react";
import type { EvidenceCard as EvidenceCardData, EvidenceSource, RoundAnswer, RoundResult, Verdict } from "@/data/types";
import type { PublicCard } from "@/domain/cards";
import { VERDICTS, getVerdictMeta } from "@/domain/game";
import { ConfidenceDial } from "@/components/confidence-dial";
import { EvidenceCard } from "@/components/evidence-card";
import { RoundResultPanel } from "@/components/round-result";
import { VerdictBins } from "@/components/verdict-bins";

type GameMode = "daily" | "review" | "practice";
type RoundPayload = { mode: GameMode; seed: string; cards: PublicCard[]; total: number; needsPractice?: boolean };
type RevealPayload = { card: EvidenceCardData; sources: EvidenceSource[] };

type GameTableProps = {
  mode: GameMode;
  onComplete?: () => void;
};

export function GameTable({ mode, onComplete }: GameTableProps) {
  const [round, setRound] = useState<RoundPayload | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Verdict | null>(null);
  const [confidence, setConfidence] = useState<1 | 2 | 3>(2);
  const [answers, setAnswers] = useState<RoundAnswer[]>([]);
  const [reveal, setReveal] = useState<RevealPayload | null>(null);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [phase, setPhase] = useState<"loading" | "playing" | "submitting" | "result" | "error">("loading");
  const [error, setError] = useState("");

  const loadRound = useCallback(async () => {
    try {
      const response = await fetch(`/api/round?mode=${mode}`, { cache: "no-store" });
      if (!response.ok) throw new Error("The round could not be loaded.");
      const payload = (await response.json()) as RoundPayload;
      setError("");
      setIndex(0);
      setSelected(null);
      setConfidence(2);
      setAnswers([]);
      setReveal(null);
      setResult(null);
      setRound(payload);
      setPhase(payload.cards.length === 0 ? "result" : "playing");
      if (payload.cards.length === 0) setError(payload.needsPractice ? "No review cards yet. Play a daily round first." : "No cards are available right now.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The round could not be loaded.");
      setPhase("error");
    }
  }, [mode]);

  useEffect(() => {
    let active = true;
    async function fetchInitialRound() {
      try {
        const response = await fetch(`/api/round?mode=${mode}`, { cache: "no-store" });
        if (!response.ok) throw new Error("The round could not be loaded.");
        const payload = (await response.json()) as RoundPayload;
        if (!active) return;
        setError("");
        setIndex(0);
        setSelected(null);
        setConfidence(2);
        setAnswers([]);
        setReveal(null);
        setResult(null);
        setRound(payload);
        setPhase(payload.cards.length === 0 ? "result" : "playing");
        if (payload.cards.length === 0) setError(payload.needsPractice ? "No review cards yet. Play a daily round first." : "No cards are available right now.");
      } catch (cause) {
        if (!active) return;
        setError(cause instanceof Error ? cause.message : "The round could not be loaded.");
        setPhase("error");
      }
    }
    void fetchInitialRound();
    return () => {
      active = false;
    };
  }, [mode]);

  const lockAnswer = useCallback(async () => {
    if (!selected || !round || reveal || phase !== "playing") return;
    const card = round.cards[index];
    if (!card) return;
    setPhase("submitting");
    setError("");
    try {
      const response = await fetch(`/api/cards/${card.id}`, { cache: "no-store" });
      if (!response.ok) throw new Error("The evidence card could not be revealed.");
      const payload = (await response.json()) as RevealPayload;
      setAnswers((current) => [...current, { cardId: card.id, selectedVerdict: selected, confidence }]);
      setReveal(payload);
      setPhase("playing");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The evidence card could not be revealed.");
      setPhase("playing");
    }
  }, [confidence, index, phase, reveal, round, selected]);

  const finishRound = useCallback(async () => {
    if (!round) return;
    setPhase("submitting");
    setError("");
    try {
      const response = await fetch("/api/rounds", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode: round.mode, seed: round.seed, answers }),
      });
      if (response.status === 409) throw new Error("This daily round is already recorded. Open the review queue or play a practice round.");
      if (!response.ok) throw new Error("The round could not be saved.");
      const payload = (await response.json()) as { result: RoundResult };
      setResult(payload.result);
      setPhase("result");
      onComplete?.();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The round could not be saved.");
      setPhase("playing");
    }
  }, [answers, onComplete, round]);

  const next = useCallback(() => {
    if (!reveal || !round) return;
    if (index >= round.cards.length - 1) {
      void finishRound();
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setConfidence(2);
    setReveal(null);
    setError("");
  }, [finishRound, index, reveal, round]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (phase !== "playing" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select")) return;
      const number = Number(event.key);
      if (!reveal && number >= 1 && number <= VERDICTS.length) {
        event.preventDefault();
        setSelected(VERDICTS[number - 1]!.id);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (reveal) next();
        else void lockAnswer();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lockAnswer, next, phase, reveal]);

  if (phase === "loading") {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-8 text-center">
        <div><LoaderCircle className="mx-auto animate-spin text-[var(--violet)]" size={28} aria-hidden="true" /><p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Shuffling the evidence shelf</p></div>
      </div>
    );
  }

  if (phase === "error") {
    return (
      <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-8 text-center">
        <h1 className="font-display text-2xl font-semibold tracking-[-0.05em]">The table could not open.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">{error}</p>
        <button type="button" className="button-primary mt-6" onClick={() => void loadRound()}><RefreshCw size={16} aria-hidden="true" /> Try again</button>
      </div>
    );
  }

  if (phase === "result" && result && round) {
    return <RoundResultPanel result={result} cards={round.cards} mode={round.mode} />;
  }

  if (phase === "result" && round?.cards.length === 0) {
    return (
      <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-8 text-center">
        <h1 className="font-display text-2xl font-semibold tracking-[-0.05em]">Your review queue is clear.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">{error}</p>
        <Link href="/play" className="button-primary mt-6">Play today&apos;s round <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
    );
  }

  if (!round) return null;
  const publicCard = round.cards[index];
  if (!publicCard) return null;
  const displayCard = reveal?.card ?? publicCard;
  const displaySources = reveal?.sources ?? [];

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
      <div>
        <EvidenceCard card={displayCard} revealed={Boolean(reveal)} sources={displaySources} />
      </div>
      <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Claim {index + 1} of {round.total}</p>
          <div className="flex gap-1.5" aria-hidden="true">
            {round.cards.map((card, dotIndex) => (
              <span key={card.id} className={`h-2 w-6 rounded-full sm:w-7 ${dotIndex <= index ? "bg-[var(--violet)]" : "bg-[var(--line)]"}`} />
            ))}
          </div>
        </div>
        {!reveal ? (
          <div className="mt-6 space-y-6">
            <VerdictBins selected={selected} onSelect={setSelected} disabled={phase === "submitting"} />
            <ConfidenceDial value={confidence} onChange={setConfidence} disabled={phase === "submitting"} />
            <button type="button" className="button-primary w-full" disabled={!selected || phase === "submitting"} onClick={() => void lockAnswer()}>
              {phase === "submitting" ? <LoaderCircle className="animate-spin" size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
              {phase === "submitting" ? "Opening evidence" : "Lock answer and reveal"}
            </button>
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">Keys 1 to 4 choose. Enter locks.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div className={`verdict-${reveal.card.verdict} rounded-2xl p-5`} style={{ background: "var(--verdict-soft)" }}>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--verdict-color)" }}>
                {selected === reveal.card.verdict ? "Correct read" : "The claim needed a closer read"}
              </p>
              <p className="mt-2 text-sm leading-6">You chose {getVerdictMeta(selected ?? "mixed").label}. The evidence verdict is {getVerdictMeta(reveal.card.verdict).label}.</p>
            </div>
            <button type="button" className="button-primary w-full" disabled={phase === "submitting"} onClick={next}>
              {phase === "submitting" ? <LoaderCircle className="animate-spin" size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
              {phase === "submitting" ? "Saving round" : index === round.total - 1 ? "Finish and save round" : "Next claim"}
            </button>
          </div>
        )}
        {error && <p className="mt-4 rounded-xl bg-[var(--coral-soft)] p-3 text-sm leading-6 text-[var(--coral)]" role="alert">{error}</p>}
        <p className="sr-only" aria-live="polite">{reveal ? `Evidence revealed. Correct verdict: ${reveal.card.verdict}.` : ""}</p>
      </div>
    </div>
  );
}
