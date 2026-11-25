import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { PlayExperience } from "@/components/play-experience";

export const metadata: Metadata = {
  title: "Play the evidence game",
  description: "Sort five sourced supplement claim cards, calibrate your confidence, and build a review queue from the claims that trip you up.",
};

const modes = [
  { id: "daily", label: "Daily round" },
  { id: "review", label: "Review queue" },
  { id: "practice", label: "Practice" },
] as const;

export default async function PlayPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const params = await searchParams;
  const requested = params.mode;
  const mode = modes.some((item) => item.id === requested) ? (requested as (typeof modes)[number]["id"]) : "daily";
  const copy = {
    daily: { eyebrow: "Five cards. One shared date.", title: "Today's evidence round.", text: "Everyone gets the same UTC-seeded cards. Your score is private to this browser." },
    review: { eyebrow: "Your misses, brought forward.", title: "Review what tripped you up.", text: "Low-accuracy and high-confidence cards return first, followed by unseen claims." },
    practice: { eyebrow: "No daily replay limit.", title: "Practice the whole shelf.", text: "A fresh deterministic sample for another pass. Practice does not replace the daily round." },
  }[mode];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--violet)]">{copy.eyebrow}</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.075em]">{copy.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">{copy.text}</p>
        </div>
        <nav aria-label="Game modes" className="flex flex-wrap gap-2">
          {modes.map((item) => (
            <Link key={item.id} href={item.id === "daily" ? "/play" : `/play?mode=${item.id}`} aria-current={mode === item.id ? "page" : undefined} className={`rounded-full px-4 py-2.5 text-sm font-bold ${mode === item.id ? "bg-[var(--ink)] text-[var(--paper)]" : "border border-[var(--line)] bg-[var(--paper-strong)] text-[var(--muted)] hover:text-[var(--ink)]"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-10">
        <PlayExperience mode={mode} />
      </div>
      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--cyan-soft)] p-4 text-sm leading-6">
        <ShieldCheck className="mt-0.5 shrink-0 text-[var(--violet)]" size={18} aria-hidden="true" />
        <p>This game teaches evidence literacy. It does not assess your personal health, recommend a supplement, or replace a conversation with a clinician or pharmacist.</p>
      </div>
    </div>
  );
}
