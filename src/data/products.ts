import type { Product } from "@/lib/types";

/**
 * Static product catalog (~scaffold). Every item is always available — no stock field.
 * To scale to ~100 products, keep appending entries in the same shape.
 * Prices are in ₹ and treated as GST-inclusive.
 */
export const products: Product[] = [
  // ---------------- Water Softeners ----------------
  {
    id: "ws-auto-s75",
    badge: "premium",
    slug: "auto-softener-s75",
    name: "AquaSoft Auto S-75 Water Softener",
    category: "water-softeners",
    shortDesc: "Self-regenerating softener for 1–2 BHK flats.",
    longDesc:
      "The AquaSoft Auto S-75 removes hardness automatically with a self-regenerating ion-exchange resin, protecting your appliances and giving softer skin and hair. Ideal for apartments with 1–2 bathrooms.",
    specs: [
      { label: "Capacity", value: "Up to 2000 LPH" },
      { label: "Technology", value: "Ion-exchange resin" },
      { label: "Regeneration", value: "Automatic (timer + LCD)" },
      { label: "Best for", value: "1–2 BHK flats" },
    ],
    images: [],
    mrp: 28990,
    price: 23990,
    rating: 4.6,
    reviewCount: 128,
    isFeatured: true,
    highlights: [
      "Automatic self-regeneration — no manual effort",
      "Smart LCD panel with low-salt alarm",
      "Inbuilt bypass valve",
    ],
  },
  {
    id: "ws-auto-s100",
    slug: "auto-softener-s100",
    name: "AquaSoft Auto S-100 Water Softener",
    category: "water-softeners",
    shortDesc: "Higher-capacity softener for 2–3 BHK homes.",
    longDesc:
      "A higher flow-rate softener for medium homes, delivering 100% hardness-free water across multiple bathrooms and the kitchen simultaneously.",
    specs: [
      { label: "Capacity", value: "Up to 3000 LPH" },
      { label: "Technology", value: "Ion-exchange resin" },
      { label: "Regeneration", value: "Automatic (timer + LCD)" },
      { label: "Best for", value: "2–3 BHK homes" },
    ],
    images: [],
    mrp: 36990,
    price: 30990,
    rating: 4.7,
    reviewCount: 96,
    isFeatured: true,
    highlights: [
      "Handles multiple bathrooms at once",
      "Dual-function regeneration motor",
      "Low-salt & service alarms",
    ],
  },
  {
    id: "ws-hybrid-h150",
    badge: "premium",
    slug: "hybrid-softener-h150",
    name: "AquaSoft Hybrid H-150 Softener + Carbon",
    category: "water-softeners",
    shortDesc: "Softener + carbon/sand hybrid for villas.",
    longDesc:
      "Combines softening with a carbon and sand filtration stage to remove odour, turbidity and hardness — engineered for large homes and villas.",
    specs: [
      { label: "Capacity", value: "Up to 4000 LPH" },
      { label: "Technology", value: "Softener + carbon + sand" },
      { label: "Regeneration", value: "Automatic" },
      { label: "Best for", value: "Villas / large homes" },
    ],
    images: [],
    mrp: 52990,
    price: 44990,
    rating: 4.8,
    reviewCount: 61,
    highlights: [
      "Odour, turbidity & hardness-free water",
      "Three-in-one hybrid media",
      "LP protection during regeneration",
    ],
  },

  // ---------------- RO Purifiers ----------------
  {
    id: "ro-home-9l",
    badge: "bestseller",
    slug: "ro-uv-uf-9l",
    name: "PureDrop RO + UV + UF 9L Purifier",
    category: "ro-purifiers",
    shortDesc: "7-stage RO+UV+UF with mineral boost.",
    longDesc:
      "A 7-stage RO + UV + UF purifier with a TDS controller and mineral cartridge that retains essential minerals while removing dissolved impurities and microbes.",
    specs: [
      { label: "Stages", value: "7 (RO+UV+UF+Mineral)" },
      { label: "Storage", value: "9 litres" },
      { label: "Suitable TDS", value: "Up to 2000 ppm" },
      { label: "Best for", value: "Home drinking water" },
    ],
    images: [],
    mrp: 18990,
    price: 13990,
    rating: 4.5,
    reviewCount: 214,
    isFeatured: true,
    highlights: [
      "RO + UV + UF triple purification",
      "Mineral boost cartridge",
      "TDS controller for balanced taste",
    ],
  },
  {
    id: "ro-alkaline-10l",
    badge: "premium",
    slug: "ro-alkaline-10l",
    name: "PureDrop Alkaline RO 10L Purifier",
    category: "ro-purifiers",
    shortDesc: "Alkaline + antioxidant RO purifier.",
    longDesc:
      "Adds an alkaline and antioxidant stage on top of RO+UV purification for pH-balanced, great-tasting water.",
    specs: [
      { label: "Stages", value: "8 (RO+UV+Alkaline)" },
      { label: "Storage", value: "10 litres" },
      { label: "pH", value: "Alkaline 8.5–9.5" },
      { label: "Best for", value: "Health-focused homes" },
    ],
    images: [],
    mrp: 22990,
    price: 17490,
    rating: 4.6,
    reviewCount: 88,
    highlights: [
      "Alkaline + antioxidant water",
      "8-stage purification",
      "Copper-look premium finish",
    ],
  },
  {
    id: "ro-commercial-50lph",
    slug: "commercial-ro-50lph",
    name: "PureDrop Commercial RO Plant 50 LPH",
    category: "ro-purifiers",
    shortDesc: "Commercial RO plant for offices & shops.",
    longDesc:
      "A 50 litres-per-hour commercial RO plant with stainless steel storage, ideal for offices, cafes, schools and small businesses.",
    specs: [
      { label: "Output", value: "50 LPH" },
      { label: "Storage", value: "SS insulated tank" },
      { label: "Membrane", value: "Industrial grade" },
      { label: "Best for", value: "Offices / shops" },
    ],
    images: [],
    mrp: 74990,
    price: 62990,
    rating: 4.7,
    reviewCount: 34,
    highlights: [
      "50 LPH continuous output",
      "Stainless steel storage",
      "Low maintenance design",
    ],
  },

  // ---------------- Tank & Mainline Filters ----------------
  {
    id: "tf-sky-tank",
    badge: "bestseller",
    slug: "sky-tank-filter",
    name: "Ionix-style Sky Tank Filter (4-Stage)",
    category: "tank-filters",
    shortDesc: "4-stage overhead tank filter for whole home.",
    longDesc:
      "Fits at your overhead tank inlet to filter sediment, iron and odour before water reaches your home — protecting every tap and appliance.",
    specs: [
      { label: "Stages", value: "4 (sediment + carbon + iron)" },
      { label: "Flow", value: "Up to 2000 LPH" },
      { label: "Fitting", value: "Overhead tank inlet" },
      { label: "Best for", value: "Flats & independent homes" },
    ],
    images: [],
    mrp: 21450,
    price: 16500,
    rating: 4.5,
    reviewCount: 152,
    isFeatured: true,
    highlights: [
      "Whole-home protection",
      "Removes sediment, iron & odour",
      "Easy overhead-tank fitting",
    ],
  },
  {
    id: "tf-treo",
    slug: "treo-tank-filter",
    name: "Treo Tank Filter (2-Stage)",
    category: "tank-filters",
    shortDesc: "Compact 2-stage mainline filter.",
    longDesc:
      "A compact 2-stage mainline filter for basic sediment and odour removal — an affordable entry into whole-home filtration.",
    specs: [
      { label: "Stages", value: "2 (sediment + carbon)" },
      { label: "Flow", value: "Up to 1500 LPH" },
      { label: "Fitting", value: "Mainline / inlet" },
      { label: "Best for", value: "1–2 BHK flats" },
    ],
    images: [],
    mrp: 15400,
    price: 10800,
    rating: 4.3,
    reviewCount: 73,
    highlights: [
      "Affordable whole-home filtration",
      "Compact footprint",
      "Quick DIY-friendly fitting",
    ],
  },
  {
    id: "tf-supreme",
    slug: "supreme-tank-filter",
    name: "Supreme Tank Filter (6-Stage)",
    category: "tank-filters",
    shortDesc: "Premium 6-stage filter for villas.",
    longDesc:
      "Our flagship 6-stage mainline filter with extended media life, engineered for kothis and villas with high water usage.",
    specs: [
      { label: "Stages", value: "6" },
      { label: "Flow", value: "Up to 4000 LPH" },
      { label: "Media life", value: "Extended" },
      { label: "Best for", value: "Villas / kothis" },
    ],
    images: [],
    mrp: 36300,
    price: 26500,
    rating: 4.8,
    reviewCount: 41,
    highlights: [
      "6-stage deep filtration",
      "Extended media life",
      "High flow for large homes",
    ],
  },

  // ---------------- Appliance Filters ----------------
  {
    id: "af-shower",
    slug: "shower-filter",
    name: "FreshFlow Shower Filter",
    category: "appliance-filters",
    shortDesc: "Vitamin-C shower filter for softer skin & hair.",
    longDesc:
      "Reduces chlorine and impurities at your shower head with a replaceable vitamin-C cartridge for noticeably softer skin and hair.",
    specs: [
      { label: "Type", value: "Inline shower filter" },
      { label: "Media", value: "Vitamin-C + KDF" },
      { label: "Cartridge life", value: "~3 months" },
      { label: "Fitting", value: "Standard shower arm" },
    ],
    images: [],
    mrp: 2499,
    price: 1499,
    rating: 4.2,
    reviewCount: 305,
    highlights: [
      "Softer skin & hair",
      "Tool-free installation",
      "Replaceable cartridge",
    ],
  },
  {
    id: "af-washing-machine",
    slug: "washing-machine-filter",
    name: "FreshFlow Washing Machine Inlet Filter",
    category: "appliance-filters",
    shortDesc: "Protects your washing machine from scaling.",
    longDesc:
      "Fits on the washing machine inlet hose to reduce sediment and hardness, extending appliance life and improving wash quality.",
    specs: [
      { label: "Type", value: "Inlet hose filter" },
      { label: "Media", value: "Anti-scaling" },
      { label: "Cartridge life", value: "~4 months" },
      { label: "Fitting", value: "Standard inlet hose" },
    ],
    images: [],
    mrp: 1999,
    price: 1199,
    rating: 4.1,
    reviewCount: 141,
    highlights: [
      "Prevents scaling damage",
      "Brighter, softer laundry",
      "Easy hose fitting",
    ],
  },
  {
    id: "af-geyser",
    slug: "geyser-filter",
    name: "FreshFlow Geyser Protection Filter",
    category: "appliance-filters",
    shortDesc: "Anti-scaling filter for your water heater.",
    longDesc:
      "Reduces hardness reaching your geyser, preventing scale build-up on the heating element and extending its lifespan.",
    specs: [
      { label: "Type", value: "Inline geyser filter" },
      { label: "Media", value: "Polyphosphate anti-scale" },
      { label: "Cartridge life", value: "~6 months" },
      { label: "Fitting", value: "Geyser inlet" },
    ],
    images: [],
    mrp: 2299,
    price: 1399,
    rating: 4.3,
    reviewCount: 98,
    highlights: [
      "Protects heating element",
      "Lower electricity bills",
      "Longer geyser life",
    ],
  },

  // ---------------- Service & Spare Kits ----------------
  {
    id: "sk-ro-membrane",
    slug: "ro-membrane-80gpd",
    name: "Genuine RO Membrane 80 GPD",
    category: "service-kits",
    shortDesc: "Replacement RO membrane for home purifiers.",
    longDesc:
      "A genuine 80 GPD RO membrane compatible with most domestic RO purifiers — restores purification performance.",
    specs: [
      { label: "Type", value: "RO membrane" },
      { label: "Rating", value: "80 GPD" },
      { label: "Compatibility", value: "Most domestic RO" },
      { label: "Life", value: "~12–18 months" },
    ],
    images: [],
    mrp: 1499,
    price: 999,
    rating: 4.4,
    reviewCount: 187,
    highlights: [
      "Genuine spare part",
      "Restores purification",
      "Wide compatibility",
    ],
  },
  {
    id: "sk-filter-set",
    badge: "bestseller",
    slug: "ro-filter-service-kit",
    name: "RO 3-Filter Service Kit (Sediment + Carbon)",
    category: "service-kits",
    shortDesc: "Sediment + pre-carbon + post-carbon set.",
    longDesc:
      "A complete pre/post filter service kit to refresh your RO purifier — includes sediment, pre-carbon and post-carbon filters.",
    specs: [
      { label: "Includes", value: "Sediment + 2 carbon" },
      { label: "Compatibility", value: "Standard 10\" housings" },
      { label: "Life", value: "~6–8 months" },
      { label: "Type", value: "Service kit" },
    ],
    images: [],
    mrp: 899,
    price: 599,
    rating: 4.5,
    reviewCount: 240,
    isFeatured: true,
    highlights: [
      "Complete refresh kit",
      "Fits standard housings",
      "Better taste & flow",
    ],
  },

  // ---------------- AMC & Installation ----------------
  {
    id: "amc-standard",
    slug: "amc-standard-plan",
    name: "Annual Maintenance Plan — Standard",
    category: "amc-services",
    shortDesc: "3 scheduled services + priority support for 1 year.",
    longDesc:
      "Keep your purifier running perfectly with three scheduled maintenance visits over a year, priority support, and discounted spares. Filters billed separately.",
    specs: [
      { label: "Visits", value: "3 per year" },
      { label: "Support", value: "Priority" },
      { label: "Spares", value: "Discounted (billed separately)" },
      { label: "Coverage", value: "1 year" },
    ],
    images: [],
    mrp: 2999,
    price: 1999,
    rating: 4.6,
    reviewCount: 76,
    highlights: [
      "3 scheduled service visits",
      "Priority support line",
      "Discounted genuine spares",
    ],
  },
  {
    id: "amc-installation",
    slug: "professional-installation",
    name: "Professional Installation Service",
    category: "amc-services",
    shortDesc: "Expert installation of any purifier or filter.",
    longDesc:
      "Our trained technician installs and configures your purifier, softener or filter at your home, including a water-quality check and usage walkthrough.",
    specs: [
      { label: "Includes", value: "Installation + testing" },
      { label: "Water test", value: "TDS & hardness check" },
      { label: "Walkthrough", value: "Usage & care guide" },
      { label: "Type", value: "One-time service" },
    ],
    images: [],
    mrp: 1499,
    price: 899,
    rating: 4.7,
    reviewCount: 133,
    highlights: [
      "Trained technician",
      "Water-quality check included",
      "Usage & care walkthrough",
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
