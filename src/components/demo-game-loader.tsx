"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DemoGame = dynamic(() => import("@/components/demo-game").then((module) => module.DemoGame), {
  ssr: false,
});

export function DemoGameLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -120px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {mounted ? (
        <DemoGame />
      ) : (
        <div className="grid min-h-[520px] place-items-center rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-8 text-center" aria-busy="true">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">Setting the evidence table</p>
        </div>
      )}
    </div>
  );
}
