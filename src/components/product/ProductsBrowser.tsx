"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { categories } from "@/data/categories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Popularity" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top rated" },
];

// Short chip labels shown on the shop page.
const chipLabels: Record<string, string> = {
  "water-softeners": "Softeners",
  "iron-removers": "Iron Removers",
};

const PAGE_SIZE = 8;

export function ProductsBrowser({
  products,
  initialQuery = "",
}: {
  products: Product[];
  initialQuery?: string;
}) {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [page, setPage] = useState(1);
  const q = initialQuery.trim().toLowerCase();

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return Number(b.isFeatured ?? false) - Number(a.isFeatured ?? false);
      }
    });
    return list;
  }, [products, q, category, sort]);

  // Reset to page 1 whenever the result set changes.
  useEffect(() => setPage(1), [category, sort, q]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const pageItems = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div>
      {/* Heading row */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Our Products</h1>
          <p className="mt-1.5 text-muted">
            {filtered.length} {filtered.length === 1 ? "product" : "products"} found
            {q ? <span className="text-slate-500"> for “{initialQuery}”</span> : null}
          </p>
        </div>

        <label className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600">
          Sort by:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-transparent font-medium text-ink outline-none"
          >
            {sortOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          All
        </Chip>
        {categories.map((c) => (
          <Chip key={c.slug} active={category === c.slug} onClick={() => setCategory(c.slug)}>
            {chipLabels[c.slug] ?? c.name}
          </Chip>
        ))}
      </div>

      <div className="mt-8">
        <ProductGrid products={pageItems} priorityCount={4} />
      </div>

      {/* Pagination */}
      {pageCount > 1 ? (
        <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
          <PageBtn disabled={current === 1} onClick={() => setPage(current - 1)} aria="Previous page">
            ‹
          </PageBtn>
          {Array.from({ length: pageCount }).map((_, i) => (
            <PageBtn key={i} active={current === i + 1} onClick={() => setPage(i + 1)}>
              {i + 1}
            </PageBtn>
          ))}
          <PageBtn disabled={current === pageCount} onClick={() => setPage(current + 1)} aria="Next page">
            ›
          </PageBtn>
        </nav>
      ) : null}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-brand-700 bg-brand-700 text-white"
          : "border-slate-300 bg-white text-slate-700 hover:border-brand-400 hover:text-brand-700",
      )}
    >
      {children}
    </button>
  );
}

function PageBtn({
  active,
  disabled,
  onClick,
  aria,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  aria?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={aria}
      aria-current={active ? "page" : undefined}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border text-sm font-semibold transition-colors disabled:opacity-40",
        active
          ? "border-brand-700 bg-brand-700 text-white"
          : "border-slate-300 bg-white text-slate-600 hover:border-brand-400 hover:text-brand-700",
      )}
    >
      {children}
    </button>
  );
}
