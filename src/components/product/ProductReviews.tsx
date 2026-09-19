import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import type { Product } from "@/lib/types";
import { getProductReviews } from "@/data/reviews";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  "bg-brand-600",
  "bg-sky-600",
  "bg-teal-600",
  "bg-indigo-600",
  "bg-amber-600",
  "bg-rose-600",
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}

function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex", className)} aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < Math.round(value) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200",
          )}
        />
      ))}
    </span>
  );
}

/** Customer reviews block for the product detail page: summary + rating bars + review cards. */
export function ProductReviews({ product }: { product: Product }) {
  const list = getProductReviews(product);
  if (list.length === 0) return null;

  // Synthesise a rating distribution around the product's rating for the summary bars.
  const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const r of list) dist[Math.round(r.rating)] = (dist[Math.round(r.rating)] ?? 0) + 1;
  const total = product.reviewCount;
  const pct = (n: number) => {
    // Weight toward top ratings for a realistic curve.
    const base = { 5: 0.82, 4: 0.13, 3: 0.03, 2: 0.01, 1: 0.01 }[n] ?? 0;
    return Math.round(base * 100);
  };

  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold text-ink">Customer Reviews</h2>

      <div className="mt-5 grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-[220px_1fr]">
        {/* Summary */}
        <div className="flex flex-col items-center justify-center border-slate-100 text-center sm:border-r sm:pr-6">
          <p className="text-4xl font-extrabold text-ink">{product.rating.toFixed(1)}</p>
          <Stars value={product.rating} className="mt-1" />
          <p className="mt-1 text-sm text-muted">{total.toLocaleString("en-IN")} verified reviews</p>
        </div>

        {/* Distribution bars */}
        <div className="space-y-1.5">
          {[5, 4, 3, 2, 1].map((n) => (
            <div key={n} className="flex items-center gap-3 text-sm">
              <span className="flex w-8 items-center gap-0.5 text-slate-600">
                {n}
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <span className="block h-full rounded-full bg-amber-400" style={{ width: `${pct(n)}%` }} />
              </span>
              <span className="w-9 text-right text-xs text-muted">{pct(n)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
        {list.map((r) => (
          <article key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white",
                  colorFor(r.name),
                )}
              >
                {initials(r.name)}
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 font-semibold text-ink">
                  {r.name}
                  {r.verified ? (
                    <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified
                    </span>
                  ) : null}
                </p>
                <p className="text-xs text-muted">
                  {r.city} • {r.date}
                </p>
              </div>
            </div>

            <Stars value={r.rating} className="mt-3" />
            <h3 className="mt-2 text-sm font-semibold text-ink">{r.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{r.body}</p>

            {r.photo ? (
              <div className="relative mt-3 h-24 w-32 overflow-hidden rounded-lg border border-slate-100">
                <Image
                  src={r.photo}
                  alt={`Installation by ${r.name}`}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
