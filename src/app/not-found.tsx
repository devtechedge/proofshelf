import Link from "next/link";
import { ArrowLeft, Search } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--violet)]">404 / Card missing</span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.07em] sm:text-5xl">This claim is not on the shelf.</h1>
      <p className="mt-4 max-w-lg text-sm leading-6 text-[var(--muted)]">The card may have moved or the address may be wrong. The full 100-card library is still available.</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/cards" className="button-primary"><Search size={16} aria-hidden="true" /> Search the library</Link>
        <Link href="/" className="button-secondary"><ArrowLeft size={16} aria-hidden="true" /> Go home</Link>
      </div>
    </div>
  );
}
