"use client";

import { cn } from "@/lib/utils";

/** Controlled quantity stepper (−  n  +). Minimum enforced value is 1. */
export function QuantityStepper({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-slate-300",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-9 w-9 place-items-center rounded-full text-lg text-slate-600 hover:bg-slate-100 disabled:opacity-40"
        disabled={value <= 1}
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className="grid h-9 w-9 place-items-center rounded-full text-lg text-slate-600 hover:bg-slate-100"
      >
        +
      </button>
    </div>
  );
}
