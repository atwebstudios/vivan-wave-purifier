"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Truck, CreditCard, CheckCircle2, Lock, Loader2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Container } from "@/components/ui/Container";
import { ButtonLink, Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/product/ProductImage";
import { formatINR, MIN_ADVANCE_RATE } from "@/lib/pricing";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (resp: Record<string, unknown>) => void) => void;
    };
  }
}

type Plan = "twentyPercent" | "fiftyPercent" | "fullPrice";

const options: { plan: Plan; rate: number; label: string; note: string; recommended?: boolean }[] = [
  { plan: "twentyPercent", rate: 0.2, label: "20% Advance", note: "Pay balance on delivery", recommended: true },
  { plan: "fiftyPercent", rate: 0.5, label: "50% Advance", note: "Pay balance on delivery" },
  { plan: "fullPrice", rate: 1, label: "Full Payment", note: "Hassle-free delivery" },
];

interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
}

const emptyForm: CustomerForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  pincode: "",
};

export default function CheckoutPage() {
  const { lines, totals, ready, clear } = useCart();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<Plan>("twentyPercent");
  const [form, setForm] = useState<CustomerForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerForm, string>>>({});
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

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

  const currentOption = options.find((o) => o.plan === selectedPlan)!;
  const dueToday = Math.round(totals.subtotal * currentOption.rate);
  const balance = totals.subtotal - dueToday;

  function updateField(field: keyof CustomerForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on edit
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function validateForm(): boolean {
    const newErrors: Partial<Record<keyof CustomerForm, string>> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[+]?\d[\d\s-]{8,14}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid phone number";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      newErrors.email = "Enter a valid email";
    if (!form.address.trim()) newErrors.address = "Street address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode.trim()))
      newErrors.pincode = "Enter a valid 6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handlePayment() {
    if (!validateForm()) return;

    setLoading(true);
    setPaymentError(null);

    try {
      // 1. Map cart lines to the format the API expects
      const items = lines.map((l) => ({
        productId: l.product.id,
        variantId: l.variant.id,
        quantity: l.qty,
      }));

      const customer = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        pincode: form.pincode.trim(),
      };

      // 2. Create Razorpay order on the server
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, plan: selectedPlan, customer }),
      });
      const data = await res.json();

      if (!res.ok) {
        setPaymentError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // 3. Open Razorpay Checkout modal
      const rzpOptions = {
        key: data.keyId,
        amount: data.amount,
        currency: "INR",
        name: "Vivaan Wave",
        description: `${currentOption.label} — Water Treatment`,
        order_id: data.orderId,
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone.replace(/\D/g, ""),
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // 4. Verify payment on the server
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                items,
                plan: selectedPlan,
                customer,
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.status === "success") {
              // 5. Clear cart and redirect to success page
              clear();
              router.push(
                `/checkout/success?orderId=${encodeURIComponent(verifyData.orderId)}&paymentId=${encodeURIComponent(verifyData.paymentId)}&advance=${dueToday}&balance=${balance}`,
              );
            } else {
              setPaymentError(
                "Payment could not be verified. Please contact us with your payment ID: " +
                  response.razorpay_payment_id,
              );
            }
          } catch {
            setPaymentError(
              "Verification failed. Don't worry — if your payment was deducted, contact us with Payment ID: " +
                response.razorpay_payment_id,
            );
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => {
            // User closed modal without paying
            setLoading(false);
          },
        },
        theme: { color: "#0f766e" },
      };

      const rzp = new window.Razorpay(rzpOptions);
      rzp.on("payment.failed", (resp: Record<string, unknown>) => {
        const error = resp.error as Record<string, string> | undefined;
        setPaymentError(`Payment failed: ${error?.description ?? "Unknown error"}`);
        setLoading(false);
      });
      rzp.open();
    } catch {
      setPaymentError("Something went wrong. Please check your connection and try again.");
      setLoading(false);
    }
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
              <Input
                name="name"
                label="Full Name"
                placeholder="John Doe"
                autoComplete="name"
                value={form.name}
                onChange={(v) => updateField("name", v)}
                error={errors.name}
              />
              <Input
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
                error={errors.phone}
              />
              <Input
                name="email"
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                className="sm:col-span-2"
                value={form.email}
                onChange={(v) => updateField("email", v)}
                error={errors.email}
              />
              <Input
                name="address"
                label="Street Address"
                placeholder="123 Ocean View Drive"
                autoComplete="street-address"
                className="sm:col-span-2"
                value={form.address}
                onChange={(v) => updateField("address", v)}
                error={errors.address}
              />
              <Input
                name="city"
                label="City"
                placeholder="Mumbai"
                autoComplete="address-level2"
                value={form.city}
                onChange={(v) => updateField("city", v)}
                error={errors.city}
              />
              <Input
                name="pincode"
                label="Pincode"
                placeholder="400001"
                autoComplete="postal-code"
                value={form.pincode}
                onChange={(v) => updateField("pincode", v)}
                error={errors.pincode}
              />
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
                const active = selectedPlan === o.plan;
                return (
                  <button
                    key={o.plan}
                    type="button"
                    onClick={() => setSelectedPlan(o.plan)}
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

          {paymentError ? (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {paymentError}
            </div>
          ) : null}

          <Button
            size="lg"
            className="mt-5 w-full"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                Pay {formatINR(dueToday)} Securely
              </>
            )}
          </Button>
          <p className="mt-3 text-center text-xs text-muted">256-bit SSL Encryption • Powered by Razorpay</p>
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
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  className,
  value,
  onChange,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const id = `checkout-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm outline-none focus:bg-white focus:ring-2",
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-brand-500 focus:ring-brand-100",
        )}
      />
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
