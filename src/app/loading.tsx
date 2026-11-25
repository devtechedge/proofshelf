export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading ProofShelf">
      <div className="h-3 w-40 animate-pulse rounded-full bg-[var(--line)]" />
      <div className="mt-5 h-14 max-w-2xl animate-pulse rounded-2xl bg-[var(--line)]" />
      <div className="mt-3 h-5 max-w-xl animate-pulse rounded-full bg-[var(--line)]" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="h-[460px] animate-pulse rounded-[28px] bg-[var(--line)]" />
        <div className="h-[460px] animate-pulse rounded-[28px] bg-[var(--line)]" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
