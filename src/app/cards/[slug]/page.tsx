import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ShieldAlert } from "@/components/icons";
import { CATALOG, getCardBySlug, getSourcesForCard } from "@/data/catalog";
import { EvidenceCard } from "@/components/evidence-card";
import { getVerdictMeta } from "@/domain/game";

const REVIEWED_DATE = "26 November 2026";

export function generateStaticParams() {
  return CATALOG.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) return { title: "Card not found" };
  return {
    title: `${card.ingredient} evidence card`,
    description: card.explanation,
    openGraph: {
      title: `${card.ingredient} | ProofShelf`,
      description: card.claim,
    },
  };
}

export default async function CardDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = getCardBySlug(slug);
  if (!card) notFound();
  const sources = getSourcesForCard(card.id);
  const verdict = getVerdictMeta(card.verdict);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link href="/cards" className="button-ghost mb-7 min-h-9 px-2 text-sm"><ArrowLeft size={15} aria-hidden="true" /> Back to the library</Link>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <EvidenceCard card={card} revealed sources={sources} />
        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className={`verdict-${card.verdict} rounded-3xl p-5`} style={{ background: "var(--verdict-soft)" }}>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--verdict-color)" }}>Evidence verdict</p>
            <h2 className="mt-2 font-display text-xl font-semibold tracking-[-0.045em]" style={{ color: "var(--verdict-color)" }}>{verdict.label}</h2>
            <p className="mt-2 text-sm leading-6">{verdict.description}</p>
          </div>
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--paper-strong)] p-5">
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Card record</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-[var(--muted)]">Category</dt><dd className="mt-1 font-bold">{card.category}</dd></div>
              <div><dt className="text-[var(--muted)]">Form</dt><dd className="mt-1 font-bold">{card.form}</dd></div>
              <div><dt className="text-[var(--muted)]">Route</dt><dd className="mt-1 font-bold capitalize">{card.route}</dd></div>
              <div><dt className="text-[var(--muted)]">Reviewed</dt><dd className="mt-1 font-bold">{REVIEWED_DATE}</dd></div>
            </dl>
            {card.aliases.length > 0 && <div className="mt-4 border-t border-[var(--line)] pt-4"><p className="text-[var(--muted)]">Also called</p><p className="mt-1 text-sm leading-6">{card.aliases.join(", ")}</p></div>}
          </div>
          <Link href="/play?mode=practice" className="button-primary w-full">Practice the shelf <ArrowRight size={16} aria-hidden="true" /></Link>
        </aside>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6 sm:p-8">
          <div className="flex items-center gap-2"><BookOpen size={20} className="text-[var(--violet)]" aria-hidden="true" /><h2 className="font-display text-xl font-semibold tracking-[-0.045em]">Source trail</h2></div>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Retailer links, where present, document market discovery only. They do not substantiate the claim. Evidence and safety notes come from the named institutional, review, trial, or regulatory sources.</p>
          <ul className="mt-6 space-y-4">
            {sources.map((source) => (
              <li key={source.id} className="rounded-2xl border border-[var(--line)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--violet)]">{source.kind.replace("-", " ")}</span><span className="text-xs text-[var(--muted)]">{source.publisher}</span></div>
                <a href={source.url} target="_blank" rel="noreferrer" className="mt-2 flex items-start justify-between gap-3 font-bold leading-6 hover:text-[var(--violet)] hover:underline">{source.title}<ArrowUpRight className="mt-1 shrink-0" size={15} aria-hidden="true" /></a>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{source.note}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--coral-soft)] p-6 sm:p-8">
          <ShieldAlert className="text-[var(--coral)]" size={24} aria-hidden="true" />
          <h2 className="mt-4 font-display text-xl font-semibold tracking-[-0.045em]">Keep the boundary.</h2>
          <p className="mt-3 text-sm leading-6">{card.safetyNote}</p>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">This card is educational. It cannot tell you whether a product is right for you, whether your dose is appropriate, or whether it interacts with your medicines. Ask a qualified clinician or pharmacist about your situation.</p>
        </div>
      </section>
    </div>
  );
}
