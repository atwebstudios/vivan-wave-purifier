"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Product, VariantAxis } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { useProductVariant } from "@/components/product/ProductVariantContext";
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
export function ProductPurchase({
  product,
  theme = "light",
}: {
  product: Product;
  theme?: "light" | "dark";
}) {
  const isDark = theme === "dark";
  const { add } = useCart();
  const router = useRouter();
  const variantCtx = useProductVariant();

  const axes = useMemo(() => product.variantAxes ?? [], [product.variantAxes]);

  // Options for `axis` given the selections made on the axes before it.
  function optionsForLocal(axis: VariantAxis, selState: Record<string, string | undefined>): string[] {
    const prior = axes.slice(0, axes.indexOf(axis));
    const matches = product.variants.filter((v) =>
      prior.every((a) => v.attrs?.[a] === selState[a]),
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
  function normalizeLocal(desired: Record<string, string | undefined>): Record<string, string | undefined> {
    const s: Record<string, string | undefined> = {};
    for (const a of axes) {
      const opts = optionsForLocal(a, s);
      s[a] = opts.length ? (opts.includes(desired[a] ?? "") ? desired[a] : opts[0]) : undefined;
    }
    return s;
  }

  const [localSel, setLocalSel] = useState<Record<string, string | undefined>>(() =>
    normalizeLocal((product.variants[0].attrs ?? {}) as Record<string, string | undefined>),
  );

  const sel = variantCtx ? variantCtx.sel : localSel;
  const optionsFor = variantCtx ? variantCtx.optionsFor : optionsForLocal;

  const handleSelect = (axis: VariantAxis, val: string) => {
    if (variantCtx) {
      variantCtx.setAttr(axis, val);
    } else {
      setLocalSel(normalizeLocal({ ...localSel, [axis]: val }));
    }
  };

  const handleSingleSelect = (vId: string) => {
    if (variantCtx) {
      variantCtx.setDirectSel({ __single: vId });
    } else {
      setLocalSel({ __single: vId });
    }
  };

  const localVariant = useMemo(() => {
    return (
      product.variants.find((v) => axes.every((a) => v.attrs?.[a] === sel[a])) ??
      product.variants[0]
    );
  }, [product, axes, sel]);

  const variant = variantCtx ? variantCtx.variant : localVariant;

  const [qty, setQty] = useState(1);
  const lineTotal = variant.price * qty;
  const advance = Math.round(lineTotal * MIN_ADVANCE_RATE);
  const isMultiAxis = axes.length > 0;

  return (
      <div
        className={cn(
          "rounded-2xl border p-5 shadow-sm transition-colors",
          isDark
            ? "border-slate-800 bg-slate-900/80 backdrop-blur-md shadow-xl text-slate-100"
            : "border-slate-200 bg-white",
        )}
      >
        {isMultiAxis ? (
          <div className="mb-4 space-y-4">
            {axes.map((axis) => {
              const opts = optionsFor(axis, sel);
              if (opts.length < 2 && axis === "connection") return null; // single/no connection → hide
              if (opts.length === 0) return null;
              return (
                <div key={axis}>
                  <p className={cn("mb-2 text-sm font-medium", isDark ? "text-slate-300" : "text-slate-600")}>
                    {AXIS_LABEL[axis]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opts.map((val) => {
                      const active = sel[axis] === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleSelect(axis, val)}
                          className={cn(
                            "rounded-xl border-2 px-3.5 py-2 text-sm font-semibold transition-colors",
                            active
                                  ? isDark
                              ? "border-sky-400 bg-sky-950/60 text-sky-300"
                              : "border-brand-700 bg-brand-50/60 text-brand-800"
                            : isDark
                              ? "border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-600"
                              : "border-slate-200 text-slate-700 hover:border-brand-300",
                              )
                    }
                            >
                      { optionLabel(axis, val) }
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
        <p className={cn("mb-2 text-sm font-medium", isDark ? "text-slate-300" : "text-slate-600")}>Option</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {product.variants.map((v) => {
            const active = v.id === variant.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => handleSingleSelect(v.id)}
                className={cn(
                  "rounded-xl border-2 p-3 text-left transition-colors",
                  active
                    ? isDark
                      ? "border-sky-400 bg-sky-950/60"
                      : "border-brand-700 bg-brand-50/50"
                    : isDark
                      ? "border-slate-700 bg-slate-800/80 hover:border-slate-600"
                      : "border-slate-200 hover:border-brand-300",
                )}
              >
                  <span className={cn("text-sm font-semibold", isDark ? "text-white" : "text-ink")}>{v.label}</span>
                  <span className={cn("mt-1 block text-sm font-bold", isDark ? "text-sky-400" : "text-brand-700")}>
                    {formatINR(v.price)}
                  </span>
              </button>
            );
          })}
        </div>
      </div>
            ) : null}

      {/* Selected variant summary */}
      <p className={cn("mb-3 text-xs", isDark ? "text-slate-400" : "text-muted")}>
        Selected: <span className={cn("font-medium", isDark ? "text-slate-200" : "text-slate-600")}>{variant.label}</span>
      </p>

      <div className="flex items-center justify-between text-sm">
        <span className={cn("font-medium", isDark ? "text-slate-300" : "text-slate-600")}>Quantity</span>
        <QuantityStepper value={qty} onChange={setQty} theme={isDark ? "dark" : "light"} />
      </div>

      <dl
        className={cn(
          "mt-4 space-y-2 rounded-xl p-4 text-sm transition-colors",
          isDark
            ? "border border-slate-800 bg-slate-900/90 text-slate-300 shadow-md"
            : "bg-slate-50 text-slate-700",
        )}
      >
        <div className="flex justify-between">
          <dt className={isDark ? "text-slate-400" : "text-slate-600"}>Total Amount</dt>
          <dd className={cn("font-semibold", isDark ? "text-white text-base" : "text-ink")}>{formatINR(lineTotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className={cn("font-semibold", isDark ? "text-cyan-400" : "text-brand-700")}>
            Advance now ({Math.round(MIN_ADVANCE_RATE * 100)}%)
          </dt>
          <dd className={cn("font-bold", isDark ? "text-cyan-400 text-base" : "text-brand-700")}>{formatINR(advance)}</dd>
        </div>
        <div className={cn("flex justify-between", isDark ? "text-slate-400" : "text-muted")}>
          <dt>Balance on Delivery</dt>
          <dd className={isDark ? "text-slate-300 font-medium" : undefined}>{formatINR(lineTotal - advance)}</dd>
        </div>
      </dl>

      <div className="mt-5 grid gap-2.5">
        <Button
          size="lg"
          className={isDark ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 active:scale-[0.99]" : undefined}
          onClick={() => {
            add(product.id, variant.id, qty);
            router.push("/checkout");
          }}
        >
          Buy Now • Pay {formatINR(advance)} →
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={isDark ? "border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:text-white" : undefined}
          onClick={() => add(product.id, variant.id, qty)}
        >
          Add to Cart
        </Button>
      </div>
      <p className={cn("mt-3 text-center text-xs", isDark ? "text-slate-400" : "text-muted")}>
        Always available • Balance payable on delivery/installation
      </p>
    </div>
  );
}
