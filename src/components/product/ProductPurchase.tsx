"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Product, VariantAxis } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { Button } from "@/components/ui/Button";
import { formatINR, MIN_ADVANCE_RATE } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const AXIS_LABEL: Record<VariantAxis, string> = {
  operation: "Operation",
  material: "Material",
  size: "Vessel Size",
  connection: "Connection",
};

function optionLabel(axis: VariantAxis, value: string) {
  return axis === "size" ? `${value} in` : value;
}

/** Variant selector (cascading) + quantity + add-to-cart / buy-now for the product page. */
export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();

  const axes = product.variantAxes ?? [];

  // Options for `axis` given the selections made on the axes before it.
  function optionsFor(axis: VariantAxis, sel: Record<string, string | undefined>): string[] {
    const prior = axes.slice(0, axes.indexOf(axis));
    const matches = product.variants.filter((v) =>
      prior.every((a) => v.attrs?.[a] === sel[a]),
    );
    const seen: string[] = [];
    for (const v of matches) {
      const val = v.attrs?.[axis];
      if (val && !seen.includes(val)) seen.push(val);
    }
    return seen;
  }

  // Force a selection to be internally valid: walk axes left→right, keep desired value
  // if still available, else fall back to the first option.
  function normalize(desired: Record<string, string | undefined>): Record<string, string | undefined> {
    const s: Record<string, string | undefined> = {};
    for (const a of axes) {
      const opts = optionsFor(a, s);
      s[a] = opts.length ? (opts.includes(desired[a] ?? "") ? desired[a] : opts[0]) : undefined;
    }
    return s;
  }

  const [sel, setSel] = useState<Record<string, string | undefined>>(() =>
    normalize((product.variants[0].attrs ?? {}) as Record<string, string | undefined>),
  );

  const variant = useMemo(() => {
    return (
      product.variants.find((v) => axes.every((a) => v.attrs?.[a] === sel[a])) ??
      product.variants[0]
    );
  }, [product, axes, sel]);

  const [qty, setQty] = useState(1);
  const lineTotal = variant.price * qty;
  const advance = Math.round(lineTotal * MIN_ADVANCE_RATE);
  const isMultiAxis = axes.length > 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {isMultiAxis ? (
        <div className="mb-4 space-y-4">
          {axes.map((axis) => {
            const opts = optionsFor(axis, sel);
            if (opts.length < 2 && axis === "connection") return null; // single/no connection → hide
            if (opts.length === 0) return null;
            return (
              <div key={axis}>
                <p className="mb-2 text-sm font-medium text-slate-600">{AXIS_LABEL[axis]}</p>
                <div className="flex flex-wrap gap-2">
                  {opts.map((val) => {
                    const active = sel[axis] === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setSel(normalize({ ...sel, [axis]: val }))}
                        className={cn(
                          "rounded-xl border-2 px-3.5 py-2 text-sm font-semibold transition-colors",
                          active
                            ? "border-brand-700 bg-brand-50/60 text-brand-800"
                            : "border-slate-200 text-slate-700 hover:border-brand-300",
                        )}
                      >
                        {optionLabel(axis, val)}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : product.variants.length > 1 ? (
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-slate-600">Option</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {product.variants.map((v) => {
              const active = v.id === variant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSel({ __single: v.id })}
                  className={cn(
                    "rounded-xl border-2 p-3 text-left transition-colors",
                    active ? "border-brand-700 bg-brand-50/50" : "border-slate-200 hover:border-brand-300",
                  )}
                >
                  <span className="text-sm font-semibold text-ink">{v.label}</span>
                  <span className="mt-1 block text-sm font-bold text-brand-700">
                    {formatINR(v.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Selected variant summary */}
      <p className="mb-3 text-xs text-muted">
        Selected: <span className="font-medium text-slate-600">{variant.label}</span>
      </p>

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
            add(product.id, variant.id, qty);
            router.push("/checkout");
          }}
        >
          Buy Now • Pay {formatINR(advance)} →
        </Button>
        <Button size="lg" variant="outline" onClick={() => add(product.id, variant.id, qty)}>
          Add to Cart
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        Always available • Balance payable on delivery/installation
      </p>
    </div>
  );
}
