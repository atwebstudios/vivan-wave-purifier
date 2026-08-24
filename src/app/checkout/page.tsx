"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Truck, CreditCard, CheckCircle2, Lock } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { ButtonLink, Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/product/ProductImage";
import { formatINR, MIN_ADVANCE_RATE } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const options = [
  { rate: 0.2, label: "20% Advance", note: "Pay balance on delivery", recommended: true },
  { rate: 0.5, label: "50% Advance", note: "Pay balance on delivery" },
  { rate: 1, label: "Full Payment", note: "Hassle-free delivery" },
];

export default function CheckoutPage() {
  const { lines, totals, ready } = useCart();
  const router = useRouter();
  const [rate, setRate] = useState(MIN_ADVANCE_RATE);

  if (ready && lines.length === 0) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-muted">Add items before checking out.</p>
        <ButtonLink href="/products" size="lg" className="mt-6">
          Browse products
        </ButtonLink>
      </Container>
    );
  }

  const dueToday = Math.round(totals.subtotal * rate);
  const balance = totals.subtotal - dueToday;

  function placeOrder() {
    // Front-end demo flow. Razorpay verification + order emails are wired in Phase 2/3.
    router.push(`/checkout/success?advance=${dueToday}&balance=${balance}`);
  }

  return (
    <Container className="py-10 sm:py-12">
      <h1 className="text-4xl font-bold tracking-tight text-ink">Checkout</h1>
      <p className="mt-2 text-muted">Please provide your details to complete the order.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Left column */}
        <div className="space-y-6">
          {/* Delivery details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <Truck className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h2 className="text-xl font-bold text-ink">Delivery Details</h2>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" placeholder="John Doe" />
              <Input label="Phone Number" type="tel" placeholder="+91 98765 43210" />
              <Input label="Email Address" type="email" placeholder="john@example.com" className="sm:col-span-2" />
              <Input label="Street Address" placeholder="123 Ocean View Drive" className="sm:col-span-2" />
              <Input label="City" placeholder="Mumbai" />
              <Input label="Pincode" placeholder="400001" />
            </div>
          </section>

          {/* Payment options */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <CreditCard className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h2 className="text-xl font-bold text-ink">Payment Options</h2>
            </div>
            <p className="mt-1 text-sm text-muted">Choose how you&apos;d like to pay today.</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {options.map((o) => {
                const active = rate === o.rate;
                return (
                  <button
                    key={o.rate}
                    type="button"
                    onClick={() => setRate(o.rate)}
                    className={cn(
                      "relative rounded-xl border-2 p-4 text-left transition-colors",
                      active ? "border-brand-700 bg-brand-50/50" : "border-slate-200 hover:border-brand-300",
                    )}
                  >
                    {o.recommended ? (
                      <span className="absolute -top-2.5 left-3 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white">
                        RECOMMENDED
                      </span>
                    ) : null}
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "grid h-4 w-4 place-items-center rounded-full border-2",
                          active ? "border-brand-700" : "border-slate-300",
                        )}
                      >
                        {active ? <span className="h-2 w-2 rounded-full bg-brand-700" /> : null}
                      </span>
                      <span className="text-sm font-semibold text-ink">{o.label}</span>
                    </span>
                    <p className="mt-2 text-lg font-bold text-brand-700">
                      {formatINR(Math.round(totals.subtotal * o.rate))}
                    </p>
                    <p className="text-xs text-muted">{o.note}</p>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-xl font-bold text-ink">Order Summary</h2>

          <div className="mt-5 space-y-4 border-b border-slate-100 pb-5">
            {lines.map(({ product, variant, qty, lineTotal }) => (
              <div key={`${product.id}:${variant.id}`} className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-100">
                  <ProductImage product={product} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{product.name}</p>
                  <p className="truncate text-xs text-muted">{variant.label} • Qty {qty}</p>
                </div>
                <span className="text-sm font-bold text-brand-700">{formatINR(lineTotal)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
              In Stock — Ready to Ship
            </span>
          </div>

          <dl className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-sm">
            <Row label="Subtotal" value={formatINR(totals.subtotal)} />
            <Row label="Installation" value="Free" valueClass="text-emerald-600 font-semibold" />
            <Row label="Taxes" value="Included" muted />
          </dl>

          <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
            <span className="font-bold text-ink">Total Due Today</span>
            <div className="text-right">
              <p className="text-2xl font-bold text-brand-700">{formatINR(dueToday)}</p>
              {balance > 0 ? (
                <p className="text-xs text-muted">Balance {formatINR(balance)} on delivery</p>
              ) : null}
            </div>
          </div>

          <Button size="lg" className="mt-5 w-full" onClick={placeOrder}>
            <Lock className="h-4 w-4" />
            Pay {formatINR(dueToday)} Securely
          </Button>
          <p className="mt-3 text-center text-xs text-muted">256-bit SSL Encryption</p>
        </aside>
      </div>
    </Container>
  );
}

function Row({
  label,
  value,
  valueClass,
  muted,
}: {
  label: string;
  value: string;
  valueClass?: string;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <dt className="text-slate-600">{label}</dt>
      <dd className={cn(muted ? "text-muted" : "font-medium text-ink", valueClass)}>{value}</dd>
    </div>
  );
}

function Input({
  label,
  type = "text",
  placeholder,
  className,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
      />
    </div>
  );
}
