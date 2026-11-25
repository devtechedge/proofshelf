"use client";

import { useCallback, useEffect, useState } from "react";
import { Eraser, RefreshCw, Target } from "lucide-react";

type ProgressData = {
  summary: { practiced: number; mastered: number; total: number; percent: number };
  reviewCardIds: string[];
  recentRounds: Array<{ id: string; mode: string; score: number; total: number; completedAt: string }>;
};

const emptyProgress: ProgressData = {
  summary: { practiced: 0, mastered: 0, total: 100, percent: 0 },
  reviewCardIds: [],
  recentRounds: [],
};

export function ProgressRibbon({ refreshKey = 0 }: { refreshKey?: number }) {
  const [progress, setProgress] = useState<ProgressData>(emptyProgress);
  const [loading, setLoading] = useState(true);
  const [erasing, setErasing] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/progress", { cache: "no-store" });
      if (!response.ok) throw new Error("Progress could not be loaded.");
      setProgress((await response.json()) as ProgressData);
    } catch {
      setMessage("Progress is unavailable right now. You can still play.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load, refreshKey]);

  async function erase() {
    if (!window.confirm("Erase all ProofShelf progress stored for this browser? This cannot be undone.")) return;
    setErasing(true);
    setMessage("");
    try {
      const response = await fetch("/api/session", { method: "DELETE" });
      if (!response.ok) throw new Error("Progress could not be erased.");
      setProgress(emptyProgress);
      setMessage("Progress erased.");
    } catch {
      setMessage("Progress could not be erased. Try again.");
    } finally {
      setErasing(false);
    }
  }

  return (
    <section className="rounded-3xl border border-[var(--line)] bg-[var(--paper-strong)] p-5" aria-labelledby="progress-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Your calibration</p><h2 id="progress-title" className="mt-1 font-display text-lg font-semibold tracking-[-0.04em]">Mastery ribbon</h2></div>
        <button type="button" className="button-ghost px-3 text-xs" onClick={() => void load()} disabled={loading}><RefreshCw size={14} aria-hidden="true" /> Refresh</button>
      </div>
      <div className="mt-5 h-3 overflow-hidden rounded-full bg-[var(--line)]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress.summary.percent} aria-label="Catalog mastery">
        <div className="h-full rounded-full bg-[var(--violet)] transition-[width] duration-500" style={{ width: `${progress.summary.percent}%` }} />
      </div>
      <div className="mt-3 flex flex-wrap justify-between gap-2 font-mono text-[11px] text-[var(--muted)]">
        <span>{progress.summary.mastered} mastered</span><span>{progress.summary.practiced} practiced</span><span>{progress.summary.percent}% of {progress.summary.total}</span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[var(--violet-soft)] p-4"><p className="font-display text-2xl font-semibold tracking-[-0.06em]">{progress.reviewCardIds.length}</p><p className="mt-1 text-xs text-[var(--muted)]">cards to review</p></div>
        <div className="rounded-2xl bg-[var(--cyan-soft)] p-4"><p className="font-display text-2xl font-semibold tracking-[-0.06em]">{progress.recentRounds.length}</p><p className="mt-1 text-xs text-[var(--muted)]">recent rounds</p></div>
      </div>
      {progress.reviewCardIds.length > 0 && <a href="/play?mode=review" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--violet)] hover:underline"><Target size={15} aria-hidden="true" /> Open review queue</a>}
      {progress.recentRounds.length > 0 && (
        <ul className="mt-5 space-y-2 border-t border-[var(--line)] pt-4">
          {progress.recentRounds.slice(0, 3).map((round) => (
            <li key={round.id} className="flex items-center justify-between gap-3 text-xs"><span className="capitalize text-[var(--muted)]">{round.mode} round</span><span className="font-mono font-bold">{round.score} pts</span></li>
          ))}
        </ul>
      )}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
        <p className="max-w-[220px] text-[11px] leading-5 text-[var(--muted)]">No account. Progress is tied to an opaque cookie in this browser.</p>
        <button type="button" className="button-ghost shrink-0 px-2 text-xs text-[var(--coral)]" onClick={() => void erase()} disabled={erasing}><Eraser size={14} aria-hidden="true" /> {erasing ? "Erasing" : "Erase"}</button>
      </div>
      {message && <p className="mt-3 text-xs text-[var(--muted)]" role="status">{message}</p>}
    </section>
  );
}
