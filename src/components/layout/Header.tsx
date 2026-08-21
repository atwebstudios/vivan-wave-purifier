"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { SearchBox } from "@/components/layout/SearchBox";
import { cn } from "@/lib/utils";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { totals, ready, openCart } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = ready ? totals.itemCount : 0;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b-1 border-brand-600 bg-white/95 backdrop-blur">
      {/* Promo strip */}
      <div className="bg-brand-950 text-center text-xs font-medium text-brand-100">
        <Container className="py-1.5">
          Soft Water. Pure Flow. • Pay only 20% advance • Serving pan-India
        </Container>
      </div>

      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Logo size="sm" priority />

        {/* Desktop nav — absolutely centered in the header */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-1 text-base font-medium transition-colors",
                isActive(item.href)
                  ? "text-brand-700"
                  : "text-slate-700 hover:text-brand-700",
              )}
            >
              {item.label}
              {isActive(item.href) ? (
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand-600" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop search */}
          <div className="hidden lg:block">
            <SearchBox />
          </div>

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            className="relative grid h-11 w-11 place-items-center rounded-full text-brand-700 hover:bg-brand-50"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-xs font-bold text-white">
                {count}
              </span>
            ) : null}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      <div
        className={cn(
          "overflow-hidden border-t border-slate-100 bg-white md:hidden",
          mobileOpen ? "max-h-[80vh]" : "max-h-0",
          "transition-[max-height] duration-300",
        )}
      >
        <Container className="flex flex-col py-3">
          <div className="mb-2">
            <SearchBox full />
          </div>
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}
          <p className="px-2 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Categories
          </p>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/products/category/${c.slug}`}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-2 py-2 text-sm text-slate-600 hover:bg-slate-50"
            >
              {c.name}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
