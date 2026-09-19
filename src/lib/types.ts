// Core domain types for the storefront.
// NOTE: there is intentionally NO stock/inventory field — every product is always available.

export type CategorySlug =
  | "water-softeners"
  | "aqua-clean"
  | "dual-combo"
  | "iron-removers"
  | "tank-filters"
  | "ro-ionizers"
  | "spare-filters";

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

/** Operation mode of a vessel product. */
export type Operation = "Manual" | "Automatic";

/** Which selectable axes a product exposes, in the order the dropdowns should render. */
export type VariantAxis = "operation" | "material" | "size" | "connection";

/** Structured attributes of a single variant; drive the cascading selectors. */
export interface VariantAttrs {
  operation?: Operation;
  material?: "FRP" | "SS304";
  /** Vessel size as diameter×height inches, e.g. "10×54". */
  size?: string;
  /** Valve / inlet-outlet connection option, e.g. '1"' or '1.5"'. */
  connection?: string;
}

/** A purchasable variant of a product, each with its own price. */
export interface Variant {
  id: string;
  label: string;
  mrp: number; // ₹ original (GST-inclusive)
  price: number; // ₹ selling (GST-inclusive)
  /** Structured attributes; present on multi-axis products (softeners, aqua clean, etc.). */
  attrs?: VariantAttrs;
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
  /**
   * Feature tag driving the coloured pill:
   *  - "iron"       → orange "Iron Reduction"
   *  - "multistage" → blue "Multi-Stage Protection"
   */
  tag?: "iron" | "multistage";
  /** Operation modes this product offers (for browse/filter). Derived from variants when omitted. */
  operations?: Operation[];
  /** Ordered selector axes to render on the product page (multi-axis products only). */
  variantAxes?: VariantAxis[];
  /** Marketing highlight bullets shown on the product page. */
  highlights: string[];
  /** Purchasable variants. First entry is the default. */
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
