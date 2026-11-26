"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Check, RotateCcw, ScanLine, X } from "@/components/icons";
import type { EvidenceCard } from "@/data/types";
import type { LabelLensQuestion } from "@/domain/label-lens";

export function LabelLensGame({ questions, cards }: { questions: LabelLensQuestion[]; cards: EvidenceCard[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[index]!;
  const card = cards.find((item) => item.id === question.cardId)!;

  const reveal = useCallback(() => {
    if (!selected || revealed) return;
    if (selected === question.correctOption) setScore((value) => value + 1);
    setRevealed(true);
  }, [question.correctOption, revealed, selected]);

  const next = useCallback(() => {
    if (!revealed) return;
    if (index === questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setRevealed(false);
  }, [index, questions.length, revealed]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (finished || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select")) return;
      const number = Number(event.key);
      if (!revealed && number >= 1 && number <= question.options.length) {
        event.preventDefault();
        setSelected(question.options[number - 1]!);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (revealed) next();
        else reveal();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [finished, next, question.options, reveal, revealed]);

  function restart() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="count-up mx-auto max-w-2xl rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-8 text-center shadow-[var(--shadow)] sm:p-12">
        <ScanLine className="mx-auto text-[var(--violet)]" size={30} aria-hidden="true" />
        <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Label Lens complete</p>
        <p className="mt-2 font-display text-5xl font-semibold tracking-[-0.08em]">{score}<span className="text-2xl text-[var(--muted)]">/{questions.length}</span></p>
        <h1 className="mt-4 text-xl font-bold">You read past the front label.</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[var(--muted)]">Form, route, serving size, and proprietary blends tell you what a product is. They do not prove that its health claim is effective.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button type="button" className="button-primary" onClick={restart}><RotateCcw size={16} aria-hidden="true" /> Practice again</button>
          <Link href="/play" className="button-secondary">Play the evidence game <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="perforated card-enter relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6 shadow-[var(--shadow)] sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--violet)]">Label entry</span>
          <span className="rounded-full bg-[var(--cyan-soft)] px-3 py-1 font-mono text-xs font-bold capitalize">{question.route}</span>
        </div>
        <h1 className="mt-7 font-display text-3xl font-semibold leading-tight tracking-[-0.06em] sm:text-4xl">{question.form}</h1>
        <p className="mt-5 text-sm leading-6 text-[var(--muted)]">Which ingredient family does this label entry belong to? Read the chemical form and route before choosing.</p>
        <div className="mt-8 border-t border-[var(--line)] pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">Keys 1 to 4 choose. Enter checks.</div>
      </article>

      <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Label {index + 1} of {questions.length}</p>
        {!revealed ? (
          <div className="mt-5 space-y-3">
            {question.options.map((option, optionIndex) => (
              <button
                key={option}
                type="button"
                aria-pressed={selected === option}
                onClick={() => setSelected(option)}
                className={`flex min-h-[62px] w-full items-center gap-3 rounded-2xl border p-4 text-left text-sm font-bold transition-all ${selected === option ? "border-[var(--violet)] bg-[var(--violet-soft)]" : "border-[var(--line)] bg-[var(--paper-strong)] hover:border-[var(--violet)]"}`}
              >
                <kbd className="rounded-md border border-[var(--line)] px-2 py-1 font-mono text-[10px] text-[var(--muted)]">{optionIndex + 1}</kbd>
                <span>{option}</span>
              </button>
            ))}
            <button type="button" className="button-primary mt-4 w-full" disabled={!selected} onClick={reveal}>Check the label <ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            <div className={`rounded-2xl p-5 ${selected === question.correctOption ? "bg-[var(--lime-soft)]" : "bg-[var(--coral-soft)]"}`}>
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em]">
                {selected === question.correctOption ? <Check size={16} aria-hidden="true" /> : <X size={16} aria-hidden="true" />}
                {selected === question.correctOption ? "Correct match" : `This belongs to ${question.correctOption}`}
              </div>
              <p className="mt-3 text-sm font-bold">{card.labelClue}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{card.safetyNote}</p>
            </div>
            <Link href={`/cards/${card.slug}`} className="text-sm font-bold text-[var(--violet)] hover:underline">Open the full evidence card</Link>
            <button type="button" className="button-primary w-full" onClick={next}>{index === questions.length - 1 ? "See result" : "Next label"} <ArrowRight size={16} aria-hidden="true" /></button>
          </div>
        )}
        <p className="sr-only" aria-live="polite">{revealed ? `Correct ingredient: ${question.correctOption}.` : ""}</p>
      </div>
    </div>
  );
}
