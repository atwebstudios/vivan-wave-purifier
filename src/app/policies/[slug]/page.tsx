import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { policies, policyBySlug } from "@/data/policies";
import { Mail, Phone, PackageCheck, Truck, PackageX, ShieldCheck } from "lucide-react";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/policies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const policy = policyBySlug.get(slug);
  if (!policy) return { title: "Policy not found" };
  return { title: policy.title, description: policy.intro };
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const { slug } = await params;
  const policy = policyBySlug.get(slug);
  if (!policy) notFound();

  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <div className="flex items-center gap-2.5">
        <ShieldCheck className="h-7 w-7 text-brand-600" />
        <h1 className="text-3xl font-bold tracking-tight text-ink">{policy.title}</h1>
      </div>
      <p className="mt-3 text-muted">{policy.intro}</p>

      {slug === "refund" ? (
        <div className="mt-10 space-y-6">
          {/* 1. Pre-Dispatch Cancellation */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <PackageCheck className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-bold text-ink">1. Pre-Dispatch Cancellation</h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
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
                <div>
                  <span>To cancel, contact us immediately:</span>
                  <div className="mt-2 space-y-1.5 rounded-lg bg-slate-50 p-3 text-xs">
                    <a
                      href="mailto:vivanwave@gmail.com"
                      className="flex items-center gap-2 font-medium text-brand-700 hover:underline"
                    >
                      <Mail className="h-4 w-4 text-slate-400" />
                      Email: vivanwave@gmail.com
                    </a>
                    <a
                      href="tel:+919310880635"
                      className="flex items-center gap-2 font-medium text-brand-700 hover:underline"
                    >
                      <Phone className="h-4 w-4 text-slate-400" />
                      Phone: +91 9310 880635
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
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Truck className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-bold text-ink">2. Refusing Delivery (Post-Dispatch)</h2>
            </div>
            <p className="mt-3 text-sm text-slate-700">
              If you refuse delivery after dispatch, a partial refund will be processed under these conditions:
            </p>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>The package must return to us completely unopened and sealed.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>
                  <strong className="text-slate-800">Deductions:</strong> Gateway fees, packaging costs, and two-way courier charges will be subtracted from the refund amount.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>The balance will be refunded after inspection.</span>
              </li>
            </ul>
          </div>

          {/* 3. Post-Delivery (No Returns / No Refunds) */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <PackageX className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-bold text-ink">3. Post-Delivery (No Returns / No Refunds)</h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                <span>
                  Once the package is accepted and opened, <strong className="text-slate-800">no returns or refunds are allowed under any circumstances</strong> (even if unused).
                </span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {policy.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-semibold text-ink">{s.heading}</h2>
              <p className="mt-1.5 text-slate-700">{s.body}</p>
            </section>
          ))}
        </div>
      )}
    </Container>
  );
}
