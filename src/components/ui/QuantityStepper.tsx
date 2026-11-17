"use client";

import { cn } from "@/lib/utils";

/** Controlled quantity stepper (−  n  +). Minimum enforced value is 1. */
export function QuantityStepper({
  value,
  onChange,
  className,
  theme = "light",
}: {
  value: number;
  onChange: (next: number) => void;
  className?: string;
  theme?: "light" | "dark";
}) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border transition-colors",
        isDark
          ? "border-slate-700 bg-slate-800/90 text-slate-100"
          : "border-slate-300 bg-white text-slate-900",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full text-lg transition-colors disabled:opacity-40",
          isDark
            ? "text-slate-300 hover:bg-slate-700 hover:text-white"
            : "text-slate-600 hover:bg-slate-100",
        )}
        disabled={value <= 1}
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full text-lg transition-colors",
          isDark
            ? "text-slate-300 hover:bg-slate-700 hover:text-white"
            : "text-slate-600 hover:bg-slate-100",
        )}
      >
        +
      </button>
    </div>
  );
}
