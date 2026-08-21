import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Compact star rating with optional review count. */
export function Rating({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  const rounded = Math.round(value);
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rounded ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200",
            )}
          />
        ))}
      </span>
      <span className="text-sm font-medium text-slate-700">{value.toFixed(1)}</span>
      {typeof count === "number" ? (
        <span className="text-sm text-muted">({count})</span>
      ) : null}
    </div>
  );
}
