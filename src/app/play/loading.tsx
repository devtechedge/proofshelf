export default function PlayLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16" aria-busy="true">
      <div className="h-3 w-44 animate-pulse rounded-full bg-[var(--line)]" />
      <div className="mt-5 h-16 max-w-xl animate-pulse rounded-2xl bg-[var(--line)]" />
      <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="h-[560px] animate-pulse rounded-[28px] bg-[var(--line)]" />
        <div className="h-[420px] animate-pulse rounded-[28px] bg-[var(--line)]" />
      </div>
      <span className="sr-only">Loading the evidence round</span>
    </div>
  );
}
