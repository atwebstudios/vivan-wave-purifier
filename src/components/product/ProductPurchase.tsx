"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { formatINR, MIN_ADVANCE_RATE } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** Variant selector + quantity + add-to-cart / buy-now for the product detail page. */
export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const lineTotal = variant.price * qty;
  const advance = Math.round(lineTotal * MIN_ADVANCE_RATE);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Variant selector */}
      {product.variants.length > 1 ? (
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-slate-600">Vessel type</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {product.variants.map((v) => {
              const active = v.id === variantId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariantId(v.id)}
                  className={cn(
                    "rounded-xl border-2 p-3 text-left transition-colors",
                    active ? "border-brand-700 bg-brand-50/50" : "border-slate-200 hover:border-brand-300",
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid h-4 w-4 place-items-center rounded-full border-2",
                        active ? "border-brand-700" : "border-slate-300",
                      )}
                    >
                      {active ? <span className="h-2 w-2 rounded-full bg-brand-700" /> : null}
                    </span>
                    <span className="text-sm font-semibold text-ink">{v.label}</span>
                  </span>
                  <span className="mt-1 block pl-6 text-sm font-bold text-brand-700">
                    {formatINR(v.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">Quantity</span>
        <QuantityStepper value={qty} onChange={setQty} />
      </div>

      <dl className="mt-4 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-600">Total Amount</dt>
          <dd className="font-semibold text-ink">{formatINR(lineTotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-semibold text-brand-700">
            Advance now ({Math.round(MIN_ADVANCE_RATE * 100)}%)
          </dt>
          <dd className="font-bold text-brand-700">{formatINR(advance)}</dd>
        </div>
        <div className="flex justify-between text-muted">
          <dt>Balance on Delivery</dt>
          <dd>{formatINR(lineTotal - advance)}</dd>
        </div>
      </dl>

      <div className="mt-5 grid gap-2.5">
        <Button
          size="lg"
          onClick={() => {
            add(product.id, variantId, qty);
            router.push("/checkout");
          }}
        >
          Buy Now • Pay {formatINR(advance)} →
        </Button>
        <Button size="lg" variant="outline" onClick={() => add(product.id, variantId, qty)}>
          Add to Cart
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        Always available • Balance payable on delivery/installation
      </p>
    </div>
  );
}
