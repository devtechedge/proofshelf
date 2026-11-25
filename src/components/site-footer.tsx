import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div className="max-w-2xl">
          <Logo compact />
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            ProofShelf is an educational game, not medical advice. It does not diagnose, prescribe, recommend doses, or verify product quality. Talk with a qualified clinician or pharmacist about your own medicines and health conditions.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-start gap-x-6 gap-y-3 text-sm font-bold">
          <Link href="/play" className="hover:text-[var(--violet)]">Play</Link>
          <Link href="/cards" className="hover:text-[var(--violet)]">Card library</Link>
          <Link href="/method" className="hover:text-[var(--violet)]">Method</Link>
          <a href="https://ods.od.nih.gov/" target="_blank" rel="noreferrer" className="hover:text-[var(--violet)]">NIH ODS</a>
          <a href="https://www.nccih.nih.gov/" target="_blank" rel="noreferrer" className="hover:text-[var(--violet)]">NCCIH</a>
        </nav>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-2 border-t border-[var(--line)] px-4 py-5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <span>100 claim cards. Sources on every reveal.</span>
        <span>Built for curiosity, not certainty.</span>
      </div>
    </footer>
  );
}
