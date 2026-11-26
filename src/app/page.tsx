import Link from "next/link";
import { ArrowRight, BrainCircuit, Layers3, ScanLine, ShieldCheck } from "@/components/icons";
import { DemoGameLoader } from "@/components/demo-game-loader";
import { CATEGORIES } from "@/data/catalog";

export default function HomePage() {
  return (
    <div>
      <section className="dot-field border-b border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper-strong)] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em]">
                <span className="h-2 w-2 rounded-full bg-[var(--coral)]" /> Supplement evidence, made playable
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.7rem,7vw,6.4rem)] font-semibold leading-[0.94] tracking-[-0.085em]">
                The claim is easy. <span className="text-[var(--violet)]">The evidence is the game.</span>
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg">
                Sort 100 supplement claim cards into four evidence verdicts. Rate your confidence. Flip the card. Learn what the research can actually support.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/play" className="button-primary">Play today&apos;s round <ArrowRight size={16} aria-hidden="true" /></Link>
                <Link href="/cards" className="button-secondary">Browse 100 cards</Link>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-3 border-y border-[var(--line)] py-5 sm:max-w-2xl">
            <div><p className="font-display text-2xl font-semibold tracking-[-0.06em] sm:text-3xl">100</p><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Sourced cards</p></div>
            <div><p className="font-display text-2xl font-semibold tracking-[-0.06em] sm:text-3xl">4</p><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Evidence verdicts</p></div>
            <div><p className="font-display text-2xl font-semibold tracking-[-0.06em] sm:text-3xl">0</p><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Dose prescriptions</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--violet)]">Try it now</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">Three claims. No sign-up.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--muted)]">Choose a verdict, set your confidence, and reveal the reasoning. Your answer is a calibration tool, not a medical decision.</p>
        </div>
        <DemoGameLoader />
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper-strong)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--violet)]">The loop</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-[-0.06em] sm:text-4xl">Read. Commit. Reveal. Recalibrate.</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">The game rewards a well-calibrated read, not blind certainty. Missed and overconfident claims return in your review queue.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: ScanLine, step: "01", title: "Read the claim", text: "Ingredient, form, route, and exact wording. No brand hype." },
                { icon: BrainCircuit, step: "02", title: "Trust your read", text: "Pick a verdict and say how confident you are before the reveal." },
                { icon: Layers3, step: "03", title: "Build judgment", text: "See sources, limitations, label clues, and safety notes on every card." },
              ].map((item) => (
                <article key={item.step} className="rounded-3xl border border-[var(--line)] p-5">
                  <div className="flex items-center justify-between"><item.icon size={22} className="text-[var(--violet)]" aria-hidden="true" /><span className="font-mono text-xs text-[var(--muted)]">{item.step}</span></div>
                  <h3 className="mt-8 font-display text-base font-semibold tracking-[-0.04em]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--violet)]">Explore the shelf</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">Nine families of claims.</h2>
          </div>
          <Link href="/cards" className="button-ghost">Open the card library <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((category, index) => (
            <Link key={category} href={`/cards?category=${encodeURIComponent(category)}`} className="rounded-full border border-[var(--line)] bg-[var(--paper-strong)] px-4 py-2.5 text-sm font-bold transition-colors hover:border-[var(--violet)] hover:text-[var(--violet)]">
              <span className="mr-2 font-mono text-[10px] text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</span>{category}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 rounded-[28px] border border-[var(--line)] bg-[var(--cyan-soft)] p-6 sm:flex-row sm:items-center sm:p-8">
          <ShieldCheck className="shrink-0 text-[var(--violet)]" size={30} aria-hidden="true" />
          <div className="flex-1">
            <h2 className="font-display text-lg font-semibold tracking-[-0.04em]">Evidence literacy, not personal medical advice.</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">ProofShelf never diagnoses, prescribes, or tells you what dose to take. Retailer pages help discover common ingredients. NIH, NCCIH, MedlinePlus, Cochrane, and FDA sources carry the evidence and safety context.</p>
          </div>
          <Link href="/method" className="button-secondary shrink-0">Read the method</Link>
        </div>
      </section>
    </div>
  );
}
