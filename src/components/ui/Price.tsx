import { cn } from "@/lib/utils";
import { discountPercent, formatINR } from "@/lib/pricing";

/** Selling price with optional struck-through MRP + discount badge (Ionix-style). */
export function Price({
  price,
  mrp,
  size = "md",
  className,
}: {
  price: number;
  mrp?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const off = mrp ? discountPercent({ price, mrp }) : 0;
  const priceSize =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2 gap-y-1", className)}>
      <span className={cn("font-bold text-ink", priceSize)}>{formatINR(price)}</span>
      {off > 0 && mrp ? (
        <>
          <span className="text-base font-semibold text-rose-500 line-through decoration-rose-400 decoration-[1.5px]">
            {formatINR(mrp)}
          </span>
          <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-700">
            {off}% OFF
          </span>
        </>
      ) : null}
    </div>
  );
}
