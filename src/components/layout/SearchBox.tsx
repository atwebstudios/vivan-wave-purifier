"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchProducts, getFeaturedProducts } from "@/data/products";
import { getCategory } from "@/data/categories";
import { trendingSearches } from "@/data/search";
import { ProductImage } from "@/components/product/ProductImage";
import { formatINR } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const popularProducts = getFeaturedProducts().slice(0, 6);

const MAX_RESULTS = 8;

/**
 * Header search. A pill trigger opens a centered modal dialog that filters the
 * catalog live as you type. Enter or "View all" goes to the shop page.
 */
export function SearchBox({ className, full }: { className?: string; full?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search products"
        className={cn(
          "flex h-10 items-center gap-2 rounded-full border border-slate-300 bg-white px-4 text-sm text-slate-400 transition-colors hover:border-brand-400",
          full ? "w-full" : "w-64",
          className,
        )}
      >
        <Search className="h-5 w-5 shrink-0" />
        <span>Search products…</span>
      </button>

      {open ? <SearchModal onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const q = query.trim();
  const results = useMemo(() => (q ? searchProducts(q).slice(0, MAX_RESULTS) : []), [q]);

  // Focus input + lock body scroll while open. (mounted gate makes the portal SSR-safe.)
  useEffect(() => {
    setMounted(true);
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => setActive(-1), [q]);

  function goToShop() {
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    onClose();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chosen = results[active];
      if (chosen) {
        router.push(`/products/${chosen.slug}`);
        onClose();
      } else {
        goToShop();
      }
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="relative flex max-h-[80vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search products…"
            className="h-8 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-slate-400"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="grid h-7 w-7 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-50"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {q.length === 0 ? (
            <div className="px-4 py-5">
              {/* Trending searches */}
              <p className="text-xs font-bold uppercase tracking-wide text-muted">Trending Now</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Search className="h-3.5 w-3.5 text-slate-400" />
                    {term}
                  </button>
                ))}
              </div>

              {/* Popular products */}
              <p className="mt-6 text-xs font-bold uppercase tracking-wide text-muted">
                Popular Products
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {popularProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="group rounded-xl border border-slate-200 p-2 transition-colors hover:border-brand-300 hover:bg-slate-50"
                  >
                    <div className="overflow-hidden rounded-lg border border-slate-100">
                      <ProductImage product={p} />
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs font-medium text-ink">{p.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-brand-700">{formatINR(p.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <ul className="py-1">
              {results.map((p, i) => {
                const cat = getCategory(p.category);
                return (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={onClose}
                      onMouseEnter={() => setActive(i)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5",
                        active === i ? "bg-brand-50" : "hover:bg-slate-50",
                      )}
                    >
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-100">
                        <ProductImage product={p} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                        <p className="truncate text-xs text-muted">{cat?.name}</p>
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-brand-700">
                        {formatINR(p.price)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-muted">
                No products found for “<span className="font-medium text-ink">{q}</span>”.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {q.length > 0 ? (
          <button
            type="button"
            onClick={goToShop}
            className="flex w-full items-center justify-center gap-1 border-t border-slate-100 bg-slate-50 py-3 text-sm font-semibold text-brand-700 hover:bg-slate-100"
          >
            View all results for “{q}” →
          </button>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
