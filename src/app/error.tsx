"use client";

import { RefreshCw } from "@/components/icons";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--coral)]">The table hit a snag</span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.07em] sm:text-5xl">Try that read again.</h1>
      <p className="mt-4 max-w-lg text-sm leading-6 text-[var(--muted)]">The page could not finish loading. Your saved progress has not been changed by this error.</p>
      <button type="button" className="button-primary mt-7" onClick={reset}><RefreshCw size={16} aria-hidden="true" /> Retry</button>
    </div>
  );
}
