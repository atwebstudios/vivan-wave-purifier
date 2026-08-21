"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { ProductImage } from "@/components/product/ProductImage";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ButtonLink } from "@/components/ui/Button";
import { formatINR, MIN_ADVANCE_RATE } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/** Slide-over cart, driven by the cart context's `isOpen` state. */
export function CartDrawer() {
  const { isOpen, closeCart, lines, totals, setQty, remove } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-slate-900/40 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeCart}
        aria-hidden
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-ink">
            Your Cart {totals.itemCount > 0 ? `(${totals.itemCount})` : ""}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-muted">Your cart is empty.</p>
            <ButtonLink href="/products" onClick={closeCart} variant="secondary">
              Browse products
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {lines.map(({ product, qty, lineTotal }) => (
                <div key={product.id} className="flex gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={closeCart}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                  >
                    <ProductImage product={product} />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={closeCart}
                        className="line-clamp-2 text-sm font-semibold text-ink hover:text-brand-700"
                      >
                        {product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="text-xs text-slate-400 hover:text-red-600"
                        aria-label={`Remove ${product.name}`}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper value={qty} onChange={(q) => setQty(product.id, q)} />
                      <span className="text-sm font-semibold text-ink">{formatINR(lineTotal)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-slate-200 px-5 py-4">
              <div className="space-y-1.5 text-sm">
                <Row label="Subtotal" value={formatINR(totals.subtotal)} />
                <Row
                  label={`Advance payable now (${Math.round(MIN_ADVANCE_RATE * 100)}%)`}
                  value={formatINR(totals.minAdvance)}
                  strong
                />
                <Row label="Balance due later" value={formatINR(totals.balanceDue)} muted />
              </div>
              <p className="mt-2 text-xs text-muted">Prices are inclusive of all taxes.</p>
              <div className="mt-4 grid gap-2">
                <ButtonLink href="/checkout" onClick={closeCart} size="lg">
                  Checkout • Pay {formatINR(totals.minAdvance)}
                </ButtonLink>
                <ButtonLink href="/cart" onClick={closeCart} variant="outline">
                  View full cart
                </ButtonLink>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function Row({
  label,
  value,
  strong,
  muted,
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn(muted ? "text-muted" : "text-slate-600", strong && "font-semibold text-ink")}>
        {label}
      </span>
      <span className={cn("tabular-nums", strong ? "font-bold text-brand-700" : muted ? "text-muted" : "text-ink")}>
        {value}
      </span>
    </div>
  );
}
