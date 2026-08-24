"use client";

import Link from "next/link";
import { Trash2, Truck, BadgeCheck, Lock, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { ProductImage } from "@/components/product/ProductImage";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { ButtonLink, Button } from "@/components/ui/Button";
import { formatINR, MIN_ADVANCE_RATE } from "@/lib/pricing";

export default function CartPage() {
  const { lines, totals, setQty, remove, clear, ready } = useCart();

  if (ready && lines.length === 0) {
    return (
      <Container className="py-20 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-50 text-brand-600">
            <ShoppingCart className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-2xl font-bold text-ink">Your cart is empty</h1>
          <p className="mt-2 text-muted">
            Add water softeners, purifiers or filters — pay just 20% to reserve them.
          </p>
          <ButtonLink href="/products" size="lg" className="mt-6">
            Browse products
          </ButtonLink>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-12">
      <h1 className="text-4xl font-bold tracking-tight text-ink">Your Cart</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div className="space-y-5">
          <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {lines.map(({ product, variant, qty, lineTotal }) => (
              <div key={`${product.id}:${variant.id}`} className="flex gap-4 p-4 sm:p-5">
                <Link
                  href={`/products/${product.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-100"
                >
                  <ProductImage product={product} />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      {product.badge === "premium" ? (
                        <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-gold-500/15 px-2 py-0.5 text-[10px] font-bold tracking-wide text-gold-600">
                          PREMIUM SERIES
                        </span>
                      ) : null}
                      <Link
                        href={`/products/${product.slug}`}
                        className="block font-semibold text-ink hover:text-brand-700"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-sm text-muted">{variant.label}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id, variant.id)}
                      className="text-slate-400 hover:text-red-600"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 className="h-5 w-5" strokeWidth={1.8} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="text-lg font-bold text-brand-700">{formatINR(lineTotal)}</span>
                    <QuantityStepper value={qty} onChange={(q) => setQty(product.id, variant.id, q)} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Installation banner */}
          <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-cloud p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Truck className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Free Standard Installation</p>
              <p className="text-sm text-muted">
                Our certified technicians will set up your device within 48 hours of delivery.
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <ButtonLink href="/products" variant="ghost" size="sm">
              ← Continue shopping
            </ButtonLink>
            <Button variant="ghost" size="sm" onClick={clear} className="text-slate-500">
              Clear cart
            </Button>
          </div>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-xl font-bold text-ink">Order Summary</h2>

          <dl className="mt-5 space-y-3 border-b border-slate-100 pb-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-600">Subtotal ({totals.itemCount} items)</dt>
              <dd className="font-semibold text-ink">{formatINR(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-600">Standard Installation</dt>
              <dd className="font-semibold text-emerald-600">Free</dd>
            </div>
          </dl>

          {/* Advance highlight card */}
          <div className="mt-5 flex items-center justify-between rounded-xl bg-brand-600 p-4 text-white">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5" />
              <div>
                <p className="text-sm font-bold leading-tight">Advance Payable Now (20%)</p>
                <p className="text-xs text-brand-100">Secure your order and schedule installation.</p>
              </div>
            </div>
            <span className="text-xl font-bold">{formatINR(totals.minAdvance)}</span>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
            <span className="font-semibold text-ink">Balance Due at Installation</span>
            <span className="font-bold text-ink">{formatINR(totals.balanceDue)}</span>
          </div>

          <ButtonLink href="/checkout" size="lg" className="mt-5 w-full">
            Proceed to Checkout →
          </ButtonLink>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
            <Lock className="h-3.5 w-3.5" />
            Secure 256-bit SSL Encryption
          </p>
        </aside>
      </div>
    </Container>
  );
}
