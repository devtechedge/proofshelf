import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3 rounded-full" aria-label="ProofShelf home">
      <svg viewBox="0 0 44 44" className="h-10 w-10 shrink-0" aria-hidden="true">
        <rect x="5" y="7" width="29" height="32" rx="6" fill="var(--cyan)" transform="rotate(-8 19 23)" />
        <rect x="10" y="5" width="29" height="33" rx="6" fill="var(--lime)" transform="rotate(6 24 21)" />
        <rect x="8" y="7" width="29" height="32" rx="6" fill="var(--paper-strong)" stroke="var(--ink)" strokeWidth="2.5" />
        <path d="M15 16h15M15 22h15M15 28h9" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="33" cy="33" r="7" fill="var(--violet)" stroke="var(--paper-strong)" strokeWidth="2.5" />
        <path d="m30 33 2 2 3.5-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!compact && <span className="hidden font-display text-lg font-semibold tracking-[-0.06em] sm:inline">ProofShelf</span>}
    </Link>
  );
}
