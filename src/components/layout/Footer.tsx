import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { categories } from "@/data/categories";

const quickLinks = [
  { href: "/products", label: "Shop All" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQs" },
  { href: "/service-network", label: "Service Network" },
];

const policyLinks = [
  { href: "/policies/terms", label: "Terms of Service" },
  { href: "/policies/privacy", label: "Privacy Policy" },
  { href: "/policies/refund", label: "Refund & Cancellation" },
  { href: "/policies/shipping", label: "Shipping & Delivery" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <Container className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Logo size="lg" />
          <p className="mt-3 text-sm font-semibold tracking-wide text-brand-700">
            Soft Water. Pure Flow.
          </p>
          <p className="mt-3 text-sm text-muted">
            Whole-house water softeners and iron removers for Indian homes and businesses.
            Pay just 20% advance to order.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Categories</h3>
          <ul className="mt-3 space-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/products/category/${c.slug}`}
                  className="text-sm text-muted hover:text-brand-700"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Company</h3>
          <ul className="mt-3 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Policies</h3>
          <ul className="mt-3 space-y-2">
            {policyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-brand-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-slate-200">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Vivanwave. All rights reserved.</p>
          <p>Soft Water · Pure Flow · India</p>
        </Container>
      </div>
    </footer>
  );
}
