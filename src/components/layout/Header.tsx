"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, ChevronDown, Phone } from "lucide-react";
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

const PHONE_DISPLAY = "+91 99990 12123";
const PHONE_TEL = "tel:+919999012123";

export function Header() {
  const { totals, ready, openCart } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const count = ready ? totals.itemCount : 0;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileShopOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b-1 border-brand-600 bg-white/95 backdrop-blur">
        {/* Promo strip */}
        <div className="bg-brand-950 text-center text-xs font-medium text-brand-100">
          <Container className="py-1.5 lg:max-w-none lg:px-0">
            Soft Water. Pure Flow. • Pay only 10% advance • Serving pan-India
          </Container>
        </div>

        <Container className="relative flex h-16 items-center justify-between gap-4 lg:max-w-none lg:px-0">
          <Logo size="sm" priority />

          {/* Desktop nav — absolutely centered in the header */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 md:flex">
            {primaryNav.map((item) =>
              item.label === "Shop" ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative inline-flex items-center gap-1 py-1 text-base font-medium transition-colors",
                      isActive(item.href) ? "text-brand-700" : "text-slate-700 hover:text-brand-700",
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    {isActive(item.href) ? (
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand-600" />
                    ) : null}
                  </Link>

                  {/* Hover dropdown — categories */}
                  <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                      <Link
                        href="/products"
                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                      >
                        All Products
                      </Link>
                      <div className="my-1 h-px bg-slate-100" />
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/products/category/${c.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-700"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-1 text-base font-medium transition-colors",
                    isActive(item.href) ? "text-brand-700" : "text-slate-700 hover:text-brand-700",
                  )}
                >
                  {item.label}
                  {isActive(item.href) ? (
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand-600" />
                  ) : null}
                </Link>
              ),
            )}
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
      </header>

      {/* Mobile drawer + backdrop — rendered OUTSIDE the header so `fixed` is
          viewport-relative (the header's backdrop-blur would otherwise trap it). */}
      <div className="md:hidden" role="dialog" aria-modal="true" aria-hidden={!mobileOpen}>
        {/* Backdrop */}
        <div
          onClick={closeMobile}
          className={cn(
            "fixed inset-0 z-50 bg-slate-900/50 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />

        {/* Drawer panel (slides in from the right) */}
        <aside
          className={cn(
            "fixed right-0 top-0 z-50 flex h-dvh w-[82%] max-w-xs flex-col bg-white shadow-2xl transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <Logo size="sm" />
            <button
              type="button"
              onClick={closeMobile}
              className="grid h-10 w-10 place-items-center rounded-full text-slate-700 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
            <div className="mb-3">
              <SearchBox full />
            </div>

            <Link
              href="/"
              onClick={closeMobile}
              className={cn(
                "rounded-lg px-3 py-3 text-base font-semibold hover:bg-slate-50",
                isActive("/") ? "text-brand-700" : "text-slate-800",
              )}
            >
              Home
            </Link>

            {/* Shop — with chevron toggling the categories accordion */}
            <div>
              <div className="flex items-center">
                <Link
                  href="/products"
                  onClick={closeMobile}
                  className={cn(
                    "flex-1 rounded-lg px-3 py-3 text-base font-semibold hover:bg-slate-50",
                    isActive("/products") ? "text-brand-700" : "text-slate-800",
                  )}
                >
                  Shop
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileShopOpen((v) => !v)}
                  className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-50"
                  aria-label="Toggle categories"
                  aria-expanded={mobileShopOpen}
                >
                  <ChevronDown
                    className={cn("h-5 w-5 transition-transform duration-200", mobileShopOpen && "rotate-180")}
                  />
                </button>
              </div>

              <div
                className={cn(
                  "overflow-hidden transition-[max-height] duration-300",
                  mobileShopOpen ? "max-h-96" : "max-h-0",
                )}
              >
                <div className="ml-3 border-l border-slate-100 pl-3">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/products/category/${c.slug}`}
                      onClick={closeMobile}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/about"
              onClick={closeMobile}
              className={cn(
                "rounded-lg px-3 py-3 text-base font-semibold hover:bg-slate-50",
                isActive("/about") ? "text-brand-700" : "text-slate-800",
              )}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={closeMobile}
              className={cn(
                "rounded-lg px-3 py-3 text-base font-semibold hover:bg-slate-50",
                isActive("/contact") ? "text-brand-700" : "text-slate-800",
              )}
            >
              Contact
            </Link>
          </div>

          {/* Bottom call button */}
          <div className="border-t border-slate-100 p-4">
            <a
              href={PHONE_TEL}
              className="flex items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              <Phone className="h-4 w-4" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
