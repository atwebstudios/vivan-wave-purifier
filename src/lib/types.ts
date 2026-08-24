// Core domain types for the storefront.
// NOTE: there is intentionally NO stock/inventory field — every product is always available.

export type CategorySlug = "water-softeners" | "iron-removers";

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

/** A purchasable variant of a product (e.g. FRP vs SS 304 vessel), each with its own price. */
export interface Variant {
  id: string;
  label: string;
  mrp: number; // ₹ original (GST-inclusive)
  price: number; // ₹ selling (GST-inclusive)
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
  /** Default (first variant) pricing, mirrored here for card display. */
  mrp: number;
  price: number;
  rating: number; // 0–5
  reviewCount: number;
  isFeatured?: boolean;
  /** Optional corner badge shown on cards/detail. */
  badge?: "premium" | "bestseller";
  /** Marketing highlight bullets shown on the product page. */
  highlights: string[];
  /** Purchasable variants (e.g. FRP / SS 304 vessel). First entry is the default. */
  variants: Variant[];
}

/** A cart line as persisted in the browser (product + chosen variant). */
export interface CartLine {
  productId: string;
  variantId: string;
  qty: number;
}

/** A cart line joined with its resolved product + variant + computed line total. */
export interface ResolvedCartLine {
  product: Product;
  variant: Variant;
  qty: number;
  lineTotal: number;
}
