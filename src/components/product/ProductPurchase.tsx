"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { formatINR, MIN_ADVANCE_RATE } from "@/lib/pricing";

/** Quantity + add-to-cart / buy-now controls for the product detail page. */
export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);

  const lineTotal = product.price * qty;
  const advance = Math.round(lineTotal * MIN_ADVANCE_RATE);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
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
          <dt className="flex items-center gap-1.5 font-semibold text-brand-700">
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
            add(product.id, qty);
            router.push("/checkout");
          }}
        >
          Buy Now • Pay {formatINR(advance)} →
        </Button>
        <Button size="lg" variant="outline" onClick={() => add(product.id, qty)}>
          Add to Cart
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        Always available • Balance payable on delivery/installation
      </p>
    </div>
  );
}
