"use client";

import dynamic from "next/dynamic";

const DemoGame = dynamic(() => import("@/components/demo-game").then((module) => module.DemoGame), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-[520px] place-items-center rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-8 text-center" aria-busy="true">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Setting the evidence table</p>
    </div>
  ),
});

export function DemoGameLoader() {
  return <DemoGame />;
}
