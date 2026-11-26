import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/play", label: "Play", mobileLabel: "Play" },
  { href: "/cards", label: "Card library", mobileLabel: "Cards" },
  { href: "/method", label: "Method", mobileLabel: "Method" },
];

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Primary navigation" className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-bold text-[var(--muted)] transition-colors hover:bg-[var(--violet-soft)] hover:text-[var(--ink)] sm:px-4"
              >
                <span className="sm:hidden">{link.mobileLabel}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
