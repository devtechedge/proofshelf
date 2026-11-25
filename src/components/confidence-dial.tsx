"use client";

type ConfidenceDialProps = {
  value: 1 | 2 | 3;
  onChange: (value: 1 | 2 | 3) => void;
  disabled?: boolean;
};

const options = [
  { value: 1 as const, label: "Unsure", detail: "I am guessing" },
  { value: 2 as const, label: "Leaning", detail: "I have a reason" },
  { value: 3 as const, label: "Certain", detail: "I would defend it" },
];

export function ConfidenceDial({ value, onChange, disabled = false }: ConfidenceDialProps) {
  return (
    <fieldset disabled={disabled}>
      <legend className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">How confident are you?</legend>
      <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] p-2">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`min-h-[58px] rounded-xl px-2 py-2 text-center transition-colors ${
              value === option.value ? "bg-[var(--ink)] text-[var(--paper)]" : "text-[var(--muted)] hover:bg-[var(--violet-soft)] hover:text-[var(--ink)]"
            }`}
          >
            <span className="block text-sm font-bold">{option.label}</span>
            <span className="mt-1 hidden text-[10px] leading-4 sm:block">{option.detail}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
