import Link from "next/link";
import { ShieldCheck, PackageCheck, Truck, PackageX, Mail, Phone } from "lucide-react";

export function ProductCancellationPolicy() {
  return (
    <section className="mt-14 sm:mt-16">
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-600" />
            <h2 className="text-xl font-bold text-ink">Cancellation &amp; Refund Policy</h2>
          </div>
          <p className="mt-1 text-sm text-muted">
            Clear, transparent policies for orders, deliveries, and returns.
          </p>
        </div>
        <Link
          href="/policies/refund"
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline"
        >
          View Full Policy &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 1. Pre-Dispatch Cancellation */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <PackageCheck className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Stage 1</span>
              <h3 className="font-bold text-ink">1. Pre-Dispatch Cancellation</h3>
            </div>
          </div>

          <ul className="mt-4 flex-1 space-y-2.5 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>You can cancel your order anytime before it leaves our warehouse.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>Once shipped, orders cannot be canceled.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <div className="w-full">
                <span>To cancel, contact us immediately:</span>
                <div className="mt-2 space-y-1.5 rounded-lg bg-slate-50 p-2.5 text-xs">
                  <a
                    href="mailto:vivanwave@gmail.com"
                    className="flex items-center gap-1.5 font-medium text-brand-700 hover:underline"
                  >
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    vivanwave@gmail.com
                  </a>
                  <a
                    href="tel:+919310880635"
                    className="flex items-center gap-1.5 font-medium text-brand-700 hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    +91 9310 880635
                  </a>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>
                Pre-dispatch cancellations receive a full refund (minus payment gateway fees) within 3–4 business days.
              </span>
            </li>
          </ul>
        </div>

        {/* 2. Refusing Delivery (Post-Dispatch) */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Stage 2</span>
              <h3 className="font-bold text-ink">2. Refusing Delivery (Post-Dispatch)</h3>
            </div>
          </div>

          <p className="mt-4 text-xs font-medium text-slate-500">
            If you refuse delivery after dispatch, a partial refund will be processed under these conditions:
          </p>

          <ul className="mt-2.5 flex-1 space-y-2.5 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>The package must return to us completely unopened and sealed.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>
                <strong className="text-slate-700">Deductions:</strong> Gateway fees, packaging costs, and two-way courier charges will be subtracted from the refund amount.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span>The balance will be refunded after inspection.</span>
            </li>
          </ul>
        </div>

        {/* 3. Post-Delivery (No Returns / No Refunds) */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <PackageX className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Stage 3</span>
              <h3 className="font-bold text-ink">3. Post-Delivery (No Returns / No Refunds)</h3>
            </div>
          </div>

          <ul className="mt-4 flex-1 space-y-2.5 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
              <span>
                Once the package is accepted and opened, <strong className="text-slate-700">no returns or refunds are allowed under any circumstances</strong> (even if unused).
              </span>
            </li>
          </ul>

          <div className="mt-6 rounded-xl border border-rose-100 bg-rose-50/70 p-3 text-xs text-rose-800">
            Please ensure you inspect the outer packaging before accepting and opening the delivery.
          </div>
        </div>
      </div>
    </section>
  );
}
