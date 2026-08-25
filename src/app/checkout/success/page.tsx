import type { Metadata } from "next";
import { Check, ReceiptText, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { formatINR } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Order Placed",
  description: "Your Vivanwave order has been placed successfully.",
};

export default async function OrderSuccessPage({ searchParams }: PageProps<"/checkout/success">) {
  const sp = await searchParams;
  const advance = Number(typeof sp.advance === "string" ? sp.advance : 0) || 0;
  const balance = Number(typeof sp.balance === "string" ? sp.balance : 0) || 0;
  const orderId = typeof sp.orderId === "string" ? sp.orderId : null;
  const paymentId = typeof sp.paymentId === "string" ? sp.paymentId : null;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-50 to-transparent" />
      <Container className="relative py-14 sm:py-20">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="flex flex-col items-center px-6 py-10 text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-emerald-50">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white">
                <Check className="h-8 w-8" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink">Order Placed Successfully!</h1>
            <p className="mt-2 max-w-md text-muted">
              Thank you for choosing Vivanwave. Your pure water journey begins now.
            </p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 gap-4 border-t border-slate-100 p-6 sm:grid-cols-2">
            <div className="space-y-4">
              {orderId ? (
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted">Order ID</p>
                    <ReceiptText className="h-5 w-5 text-brand-500" strokeWidth={1.8} />
                  </div>
                  <p className="mt-1 break-all text-lg font-bold text-ink">{orderId}</p>
                  <p className="mt-0.5 text-xs text-muted">Use this ID for all future queries</p>
                </div>
              ) : null}

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm font-medium text-slate-600">Advance Paid</span>
                  <span className="font-semibold text-ink">{formatINR(advance)}</span>
                </div>
                <div className="flex items-center justify-between pt-3">
                  <span className="text-sm font-medium text-slate-600">Balance Due</span>
                  <span className="text-lg font-bold text-brand-700">{formatINR(balance)}</span>
                </div>
                {balance > 0 ? (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    Pay on Delivery
                  </span>
                ) : null}
              </div>

              {paymentId ? (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-medium text-muted">Payment ID</p>
                  <p className="mt-1 break-all text-sm font-mono text-slate-700">{paymentId}</p>
                </div>
              ) : null}
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-700">· Next Steps</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  Expert installation will be scheduled within <strong>24 hours</strong>. Our team will
                  contact you shortly to confirm the preferred time.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">· Confirmation Email</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  A detailed receipt has been sent to your email. Please check your inbox (and spam folder).
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-600" />
                  <p className="text-sm font-semibold text-ink">Need help?</p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  Contact us on WhatsApp or call with your Order ID for instant support.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-slate-100 p-6 sm:flex-row sm:justify-center">
            <ButtonLink href="/products" size="lg">
              Continue Shopping →
            </ButtonLink>
            <ButtonLink href="/" variant="outline" size="lg">
              Back to Home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
