import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Database, FlaskConical, LockKeyhole, ShieldCheck, Store } from "lucide-react";
import { VERDICTS } from "@/domain/game";

export const metadata: Metadata = {
  title: "Method and safety",
  description: "How ProofShelf selects cards, grades claims, separates retailer discovery from evidence, and protects anonymous progress.",
};

const sourceLinks = [
  { label: "NIH Office of Dietary Supplements", href: "https://ods.od.nih.gov/" },
  { label: "NCCIH", href: "https://www.nccih.nih.gov/" },
  { label: "MedlinePlus herbs and supplements", href: "https://medlineplus.gov/druginfo/herb_All.html" },
  { label: "FDA dietary supplement information", href: "https://www.fda.gov/food/dietary-supplements/information-consumers-using-dietary-supplements" },
];

export default function MethodPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--violet)]">The rules behind the reveal</p>
        <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.08em]">Evidence labels, not health verdicts.</h1>
        <p className="mt-5 text-base leading-7 text-[var(--muted)]">ProofShelf grades a specific claim, not an entire ingredient, brand, or person. A supported claim can still be wrong for an individual. An unsupported claim is not proof that every use is ineffective.</p>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.05em]">Four verdicts</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {VERDICTS.map((verdict) => (
            <article key={verdict.id} className={`verdict-${verdict.id} rounded-3xl border border-[var(--line)] p-6`} style={{ background: "var(--verdict-soft)" }}>
              <h3 className="font-display text-lg font-semibold tracking-[-0.04em]" style={{ color: "var(--verdict-color)" }}>{verdict.label}</h3>
              <p className="mt-2 text-sm leading-6">{verdict.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 lg:grid-cols-2">
        <article className="rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6 sm:p-8">
          <Store className="text-[var(--violet)]" size={24} aria-hidden="true" />
          <h2 className="mt-4 font-display text-xl font-semibold tracking-[-0.045em]">Retailers discover. Sources substantiate.</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">NOW Foods and iHerb public pages were used to identify commonly marketed ingredient families. ProofShelf does not claim a live top-100 sales ranking, popularity score, endorsement, or efficacy inference from those pages.</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Every retailer source is labeled market discovery. It never carries a health claim by itself.</p>
        </article>
        <article className="rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6 sm:p-8">
          <FlaskConical className="text-[var(--violet)]" size={24} aria-hidden="true" />
          <h2 className="mt-4 font-display text-xl font-semibold tracking-[-0.045em]">Claims stay narrow.</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">A card states one falsifiable claim and records the form, route, population, outcome, and limitation that matter. Evidence does not transfer automatically between salts, extracts, routes, blends, or brands.</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Unknown remains unknown. Small trials, biomarker changes, animal studies, and retailer testimonials are not treated as proof of clinical benefit.</p>
        </article>
        <article className="rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6 sm:p-8">
          <Database className="text-[var(--violet)]" size={24} aria-hidden="true" />
          <h2 className="mt-4 font-display text-xl font-semibold tracking-[-0.045em]">100 cards, reviewed 26 November 2026.</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">The seed catalog contains exactly 100 ingredient families across nine categories. Each card has aliases, a form, a route, a claim, a verdict, an explanation, a label clue, a safety note, source ids, and a review date.</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">The catalog is a curated educational starting point, not a complete list of supplements or a systematic review of every product.</p>
        </article>
        <article className="rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6 sm:p-8">
          <LockKeyhole className="text-[var(--violet)]" size={24} aria-hidden="true" />
          <h2 className="mt-4 font-display text-xl font-semibold tracking-[-0.045em]">Anonymous, scoped, erasable.</h2>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">No account or email is required. A random opaque token is stored in an httpOnly cookie. Only its SHA-256 account reference is stored server-side. Progress rows are scoped to that reference.</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Erase My Progress deletes the account and child rows, then clears the cookie. Clearing browser cookies also removes access to the progress.</p>
        </article>
      </section>

      <section className="mt-14 rounded-[28px] border border-[var(--line)] bg-[var(--coral-soft)] p-6 sm:p-8">
        <ShieldCheck className="text-[var(--coral)]" size={26} aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.05em]">Safety is part of the content.</h2>
        <div className="mt-4 grid gap-4 text-sm leading-6 sm:grid-cols-2">
          <p>ProofShelf does not diagnose, prescribe, recommend doses, or tell someone to start or stop a supplement. It does not verify product identity, purity, contamination, or manufacturing quality.</p>
          <p>Pregnancy, breastfeeding, children, surgery, kidney or liver disease, autoimmune disease, transplant status, and anticoagulant use are reasons to involve a qualified clinician or pharmacist.</p>
          <p>U.S. supplements are not FDA-approved for safety and effectiveness before marketing. A structure or function disclaimer does not substantiate a claim.</p>
          <p>Reject cure, treat, prevent-disease, guaranteed weight loss, guaranteed cognition, immune-boost, generic detox, and lifespan-extension claims.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.05em]">Primary source hubs</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {sourceLinks.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] p-4 text-sm font-bold hover:border-[var(--violet)] hover:text-[var(--violet)]">
              {source.label}<ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
        </div>
        <Link href="/cards" className="button-primary mt-7">Inspect the source trail on every card</Link>
      </section>
    </div>
  );
}
