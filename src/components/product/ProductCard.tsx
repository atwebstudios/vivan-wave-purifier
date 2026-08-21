import Link from "next/link";
import { Star, CreditCard } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/product/ProductImage";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { Price } from "@/components/ui/Price";
import { formatINR, MIN_ADVANCE_RATE } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  premium: "bg-gold-500 text-white",
  bestseller: "bg-brand-600 text-white",
};
const badgeLabel: Record<NonNullable<Product["badge"]>, string> = {
  premium: "PREMIUM SERIES",
  bestseller: "BESTSELLER",
};

/** Service-type items advertise availability; hardware advertises the 20% advance. */
function isServiceItem(p: Product) {
  return p.category === "service-kits" || p.category === "amc-services";
}

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const advance = Math.round(product.price * MIN_ADVANCE_RATE);

  return (
    <div
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg",
        product.badge === "premium" ? "border-gold-400/60" : "border-slate-200",
      )}
    >
      <Link href={`/products/${product.slug}`} className="relative block">
        <ProductImage
          product={product}
          priority={priority}
          className="transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.badge ? (
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide",
              badgeStyles[product.badge],
            )}
          >
            {badgeLabel[product.badge]}
          </span>
        ) : null}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-1 text-xs font-semibold text-ink shadow-sm">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {product.rating.toFixed(1)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 font-semibold text-ink hover:text-brand-700"
        >
          {product.name}
        </Link>

        <Price price={product.price} mrp={product.mrp} />

        {isServiceItem(product) ? (
          <span className="inline-flex items-center gap-1.5 self-start rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Always Available in Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 self-start rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <CreditCard className="h-3.5 w-3.5" />
            Pay just {formatINR(advance)} (20%) now
          </span>
        )}

        <div className="mt-auto pt-1">
          <AddToCartButton
            productId={product.id}
            size="sm"
            variant="outline"
            className="w-full border-brand-300 text-brand-700 hover:border-brand-600 hover:bg-brand-600 hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
