export default function CardsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16" aria-busy="true">
      <div className="h-3 w-40 animate-pulse rounded-full bg-[var(--line)]" />
      <div className="mt-5 h-16 max-w-2xl animate-pulse rounded-2xl bg-[var(--line)]" />
      <div className="mt-10 h-28 animate-pulse rounded-[28px] bg-[var(--line)]" />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-64 animate-pulse rounded-3xl bg-[var(--line)]" />
        ))}
      </div>
      <span className="sr-only">Loading the 100-card evidence library</span>
    </div>
  );
}
