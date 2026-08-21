// Core domain types for the storefront.
// NOTE: there is intentionally NO stock/inventory field — every product is always available.

export type CategorySlug =
  | "water-softeners"
  | "ro-purifiers"
  | "tank-filters"
  | "appliance-filters"
  | "service-kits"
  | "amc-services";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  /** Tailwind gradient stops for placeholder art, e.g. "from-sky-500 to-cyan-400". */
  gradient: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  shortDesc: string;
  longDesc: string;
  specs: Spec[];
  /** Optional real image paths; when empty a CSS placeholder is rendered. */
  images: string[];
  mrp: number; // original price in ₹ (GST-inclusive)
  price: number; // selling price in ₹ (GST-inclusive)
  rating: number; // 0–5
  reviewCount: number;
  isFeatured?: boolean;
  /** Optional corner badge shown on cards/detail. */
  badge?: "premium" | "bestseller";
  /** Marketing highlight bullets shown on the product page. */
  highlights: string[];
}

/** A cart line as persisted in the browser (kept minimal; product data is resolved from the catalog). */
export interface CartLine {
  productId: string;
  qty: number;
}

/** A cart line joined with its resolved product + computed line total. */
export interface ResolvedCartLine {
  product: Product;
  qty: number;
  lineTotal: number;
}
