import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { categories } from "@/data/categories";

const quickLinks = [
  { href: "/products", label: "Shop All" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQs" },
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
            Pay just 10% advance to order.
          </p>

          <div className="mt-5 space-y-2.5 border-t border-slate-200 pt-4 text-xs text-muted">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span className="leading-relaxed">
                <strong className="text-slate-700">Office Address:</strong><br />
                Vivan Wave, Ace Medley Avenue, 3rd Floor Shop no 28 &amp; Lower Ground Floor Shop No 1, Sector 149, Noida, UP - 201306
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand-600" />
              <a href="tel:+919310880635" className="font-medium text-slate-700 hover:text-brand-700">
                +91 9310 880635
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-brand-600" />
              <a href="mailto:vivanwave@gmail.com" className="font-medium text-slate-700 hover:text-brand-700">
                vivanwave@gmail.com
              </a>
            </div>
          </div>
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
          <p>
            Made with <span className="text-red-500">❤&#xFE0E;</span> by{" "}
            <a
              href="https://www.atwebstudios.com.au/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 hover:underline"
            >
              AtWebStudios
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
