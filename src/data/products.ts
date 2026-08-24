import type { Product } from "@/lib/types";

/**
 * Vivaan Wave product catalog. Every item is always available — no stock field.
 * Each product ships in two vessel variants: FRP (default) and SS 304 stainless steel.
 *
 * ⚠️ PRICES ARE PLACEHOLDERS — update `mrp`/`price` on each variant (and the mirrored
 *    top-level `mrp`/`price`, which equals the FRP variant) with the real values.
 */
export const products: Product[] = [
  // ---------------- Water Softeners ----------------
  {
    id: "sw-50",
    slug: "50l-water-softener",
    name: "50L Whole House Water Softener",
    category: "water-softeners",
    shortDesc: "Compact 4000 LPH softener for independent homes.",
    longDesc:
      "The Vivaan Wave 50L Water Softener is a compact whole-house softening system designed for homes facing hard water problems. Using advanced ion-exchange technology, it reduces calcium and magnesium hardness to help provide soft water throughout the property. With 50 litres of high-capacity resin and a flow rate of up to 4000 litres per hour, it suits independent houses, builder floors, duplexes and bungalows.",
    specs: [
      { label: "Vessel Size", value: "10 x 54 Inch FRP" },
      { label: "Resin Capacity", value: "50 Litres" },
      { label: "Maximum Flow Rate", value: "Up to 4000 LPH" },
      { label: "Works Up to Hardness", value: "1200 ppm" },
      { label: "OBR @ 250 ppm", value: "Up to 10,000 Litres" },
      { label: "Technology", value: "Ion Exchange Softening" },
      { label: "Installation", value: "Whole House / Main Line" },
      { label: "Regeneration", value: "Fully Automatic" },
      { label: "Application", value: "Independent Houses, Builder Floors, Duplexes & Bungalows" },
    ],
    images: ["/2.1.png"],
    mrp: 29990,
    price: 24990,
    rating: 4.6,
    reviewCount: 96,
    isFeatured: true,
    badge: "bestseller",
    highlights: [
      "Up to 4000 LPH high flow",
      "50L high-capacity ion-exchange resin",
      "Works with hardness up to 1200 ppm",
      "Up to 10,000 L OBR at 250 ppm",
      "Fully automatic self-regeneration",
      "Reduces calcium & magnesium hardness",
    ],
    variants: [
      { id: "frp", label: "FRP Vessel", mrp: 29990, price: 24990 },
      { id: "ss304", label: "SS 304 Stainless Steel Vessel", mrp: 42990, price: 36990 },
    ],
  },
  {
    id: "sw-75",
    slug: "75l-water-softener",
    name: "75L Whole House Water Softener",
    category: "water-softeners",
    shortDesc: "4000 LPH softener for villas & large families.",
    longDesc:
      "Say goodbye to hard water with the Vivaan Wave 75L Water Softener. Designed for whole-house treatment, it uses advanced ion-exchange technology to reduce calcium and magnesium hardness and provide soft water throughout your home. With up to 4000 litres per hour flow, it is ideal for villas, independent houses, duplexes and large families.",
    specs: [
      { label: "Vessel Size", value: "13 x 54 Inch FRP" },
      { label: "Resin Capacity", value: "75 Litres" },
      { label: "Maximum Flow Rate", value: "Up to 4000 LPH" },
      { label: "Works Up to Hardness", value: "1200 ppm" },
      { label: "OBR @ 250 ppm", value: "Up to 15,000 Litres" },
      { label: "Inlet / Outlet", value: "1 Inch" },
      { label: "Technology", value: "Ion Exchange Softening" },
      { label: "Regeneration", value: "Fully Automatic" },
      { label: "Application", value: "Homes, Villas, Duplexes & Large Families" },
    ],
    images: ["/2.1.png"],
    mrp: 38990,
    price: 32990,
    rating: 4.7,
    reviewCount: 128,
    isFeatured: true,
    highlights: [
      "Up to 4000 LPH high flow",
      "75L high-capacity ion-exchange resin",
      "Works with hardness up to 1200 ppm",
      "Up to 15,000 L OBR at 250 ppm",
      "1 inch inlet / outlet",
      "Fully automatic self-regeneration",
    ],
    variants: [
      { id: "frp", label: "FRP Vessel", mrp: 38990, price: 32990 },
      { id: "ss304", label: "SS 304 Stainless Steel Vessel", mrp: 54990, price: 46990 },
    ],
  },
  {
    id: "sw-100",
    slug: "100l-water-softener",
    name: "100L Whole House Water Softener",
    category: "water-softeners",
    shortDesc: "High-capacity softener for homes & light commercial.",
    longDesc:
      "The Vivaan Wave 100L Water Softener is a high-capacity whole-house softening system for residential and light-commercial properties facing hard water. Using advanced ion-exchange technology, it reduces calcium and magnesium hardness across the property. With 100 litres of resin and up to 4000 LPH flow, it suits independent houses, villas, farmhouses, guest houses and light commercial applications.",
    specs: [
      { label: "Vessel Size", value: "14 x 65 Inch FRP" },
      { label: "Resin Capacity", value: "100 Litres" },
      { label: "Maximum Flow Rate", value: "Up to 4000 LPH" },
      { label: "Works Up to Hardness", value: "1500 ppm" },
      { label: "OBR @ 250 ppm", value: "Up to 20,000 Litres" },
      { label: "Inlet / Outlet", value: "1 Inch / 1.5 Inch options" },
      { label: "Technology", value: "Ion Exchange Softening" },
      { label: "Regeneration", value: "Fully Automatic" },
      { label: "Application", value: "Homes, Villas, Farmhouses, Guest Houses & Light Commercial" },
    ],
    images: ["/2.1.png"],
    mrp: 49990,
    price: 42990,
    rating: 4.8,
    reviewCount: 74,
    isFeatured: true,
    highlights: [
      "Up to 4000 LPH high flow",
      "100L high-capacity ion-exchange resin",
      "Works with hardness up to 1500 ppm",
      "Up to 20,000 L OBR at 250 ppm",
      "1 inch & 1.5 inch inlet/outlet options",
      "Fully automatic self-regeneration",
    ],
    variants: [
      { id: "frp", label: "FRP Vessel", mrp: 49990, price: 42990 },
      { id: "ss304", label: "SS 304 Stainless Steel Vessel", mrp: 69990, price: 59990 },
    ],
  },
  {
    id: "sw-150",
    slug: "150l-high-flow-water-softener",
    name: "150L High Flow Water Softener",
    category: "water-softeners",
    shortDesc: "8000 LPH high-flow softener for commercial use.",
    longDesc:
      "The Vivaan Wave 150L Water Softener is a high-capacity automatic system for residential, commercial and high water-consumption applications. Using advanced ion-exchange technology, it reduces calcium and magnesium hardness across the property. With 150 litres of resin and a high-flow capacity of up to 8000 litres per hour, it suits properties needing higher flow and greater softening capacity — hotels, restaurants, schools, clinics and institutions.",
    specs: [
      { label: "Vessel Size", value: "16 x 65 Inch FRP" },
      { label: "Resin Capacity", value: "150 Litres" },
      { label: "Maximum Flow Rate", value: "Up to 8000 LPH" },
      { label: "Works Up to Hardness", value: "1500 ppm" },
      { label: "OBR @ 250 ppm", value: "Up to 30,000 Litres" },
      { label: "Inlet / Outlet", value: "1.5 Inch High Flow" },
      { label: "Technology", value: "Ion Exchange Softening" },
      { label: "Regeneration", value: "Fully Automatic" },
      { label: "Application", value: "Homes, Villas, Hotels, Restaurants, Schools, Clinics & Commercial" },
    ],
    images: ["/2.1.png"],
    mrp: 69990,
    price: 59990,
    rating: 4.8,
    reviewCount: 52,
    isFeatured: true,
    badge: "premium",
    highlights: [
      "Up to 8000 LPH high flow",
      "150L high-capacity ion-exchange resin",
      "Works with hardness up to 1500 ppm",
      "Up to 30,000 L OBR at 250 ppm",
      "1.5 inch high-flow inlet / outlet",
      "Fully automatic self-regeneration",
    ],
    variants: [
      { id: "frp", label: "FRP Vessel", mrp: 69990, price: 59990 },
      { id: "ss304", label: "SS 304 Stainless Steel Vessel", mrp: 96990, price: 84990 },
    ],
  },

  // ---------------- Iron Removers ----------------
  {
    id: "iron-pro",
    slug: "pro-iron-remover",
    name: "Pro Iron Remover",
    category: "iron-removers",
    shortDesc: "Self-cleaning whole-house iron removal, 4000 LPH.",
    longDesc:
      "The Vivaan Wave Pro Iron Remover is a whole-house filtration system that reduces excess iron and common iron-related problems. Its advanced media-based filtration helps reduce iron deposits, reddish-brown staining, metallic taste and odour while protecting plumbing, fittings and appliances. With up to 4000 litres per hour flow and fully automatic self-cleaning, it suits independent houses, villas, farmhouses and light commercial use.",
    specs: [
      { label: "Product Type", value: "Whole House Iron Removal Filter" },
      { label: "Vessel Size", value: "13 x 54 Inch FRP" },
      { label: "Maximum Flow Rate", value: "Up to 4000 LPH" },
      { label: "Filtration Technology", value: "Advanced Media-Based Iron Removal" },
      { label: "Cleaning", value: "Automatic Backwash / Self-Cleaning" },
      { label: "Operation", value: "Fully Automatic" },
      { label: "Installation", value: "Whole House / Main Line" },
      { label: "Application", value: "Homes, Villas, Farmhouses & Light Commercial" },
    ],
    images: ["/2.1.png"],
    mrp: 32990,
    price: 27990,
    rating: 4.5,
    reviewCount: 61,
    highlights: [
      "Up to 4000 LPH high flow",
      "Advanced iron-removal media",
      "Reduces reddish-brown iron stains",
      "Reduces metallic taste & odour",
      "Fully automatic self-cleaning backwash",
      "Protects taps, fittings & appliances",
    ],
    variants: [
      { id: "frp", label: "FRP Vessel", mrp: 32990, price: 27990 },
      { id: "ss304", label: "SS 304 Stainless Steel Vessel", mrp: 46990, price: 39990 },
    ],
  },
];

// ---- Lookups & helpers ----
export const productBySlug = new Map(products.map((p) => [p.slug, p]));
export const productById = new Map(products.map((p) => [p.id, p]));

export function getProduct(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
}

/** Resolve a variant by id, falling back to the product's first variant. */
export function getVariant(product: Product, variantId: string) {
  return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
}
