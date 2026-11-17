import type { Operation, Product, Variant } from "@/lib/types";
import { deriveMrp } from "@/lib/pricing";

/**
 * Vivanwave product catalog — built from the client's official price handoff
 * (Website Product & Price Handoff v1.0) and the Tank Filter price list.
 *
 * Pricing rules (confirmed with owner):
 *  - Vessel families (Softener / Aqua Clean / Dual Combo / Pro Iron): the handoff gives a
 *    single GST-inclusive selling price; MRP is auto-derived (deriveMrp) so a 15–20% "off"
 *    shows. Prices are final — no GST added, no breakup.
 *  - Tank Filters & Spare Filters: real MRP + price from their list (24–40% off) are used as-is.
 *  - Every product is always available (no stock field). Pan-India delivery.
 */

// ---- Variant builders for the multi-axis vessel families ----

type Row = { op: Operation; mat: "FRP" | "SS304"; size: string; conn?: string; price: number };

function buildVariants(rows: Row[]): Variant[] {
  return rows.map((r) => {
    const idParts = [
      r.op,
      r.mat,
      r.size.replace("×", "x"),
      r.conn?.replace(/"/g, "").replace(".", ""),
    ].filter(Boolean);
    const id = idParts.join("-").toLowerCase();
    const label = [r.op, r.mat === "SS304" ? "SS304" : "FRP", `${r.size} in`, r.conn]
      .filter(Boolean)
      .join(" · ");
    return {
      id,
      label,
      price: r.price,
      mrp: deriveMrp(r.price, id),
      attrs: { operation: r.op, material: r.mat, size: r.size, connection: r.conn },
    };
  });
}

/** Cheapest variant's price/mrp, mirrored to the product for "starting at" card display. */
function fromCheapest(variants: Variant[]) {
  const min = variants.reduce((a, b) => (b.price < a.price ? b : a));
  return { price: min.price, mrp: min.mrp };
}

// SS304 rows shared by both Manual & Automatic (handoff lists SS304 once).
function ss304Rows(prices: { size: string; conn?: string; price: number }[]): Row[] {
  const ops: Operation[] = ["Manual", "Automatic"];
  return ops.flatMap((op) => prices.map((p) => ({ op, mat: "SS304" as const, ...p })));
}

const VESSEL_AXES = ["operation", "material", "size", "connection"] as const;

// ================= WATER SOFTENER =================
const softenerVariants = buildVariants([
  // Manual FRP
  { op: "Manual", mat: "FRP", size: "10×54", price: 37800 },
  { op: "Manual", mat: "FRP", size: "13×54", price: 41800 },
  // Automatic FRP
  { op: "Automatic", mat: "FRP", size: "10×54", price: 52800 },
  { op: "Automatic", mat: "FRP", size: "13×54", price: 57800 },
  { op: "Automatic", mat: "FRP", size: "14×65", conn: '1"', price: 67800 },
  { op: "Automatic", mat: "FRP", size: "14×65", conn: '1.5"', price: 73800 },
  { op: "Automatic", mat: "FRP", size: "16×65", conn: '1"', price: 79800 },
  { op: "Automatic", mat: "FRP", size: "16×65", conn: '1.5"', price: 85800 },
  // SS304 (Manual + Automatic, same prices)
  ...ss304Rows([
    { size: "10×54", price: 59800 },
    { size: "13×54", price: 68800 },
    { size: "14×65", conn: '1"', price: 79800 },
    { size: "14×65", conn: '1.5"', price: 85800 },
    { size: "16×65", conn: '1"', price: 90800 },
    { size: "16×65", conn: '1.5"', price: 99800 },
  ]),
]);

// ================= AQUA CLEAN =================
const aquaCleanVariants = buildVariants([
  { op: "Manual", mat: "FRP", size: "10×54", price: 28800 },
  { op: "Manual", mat: "FRP", size: "13×54", price: 31800 },
  { op: "Automatic", mat: "FRP", size: "10×54", price: 34800 },
  { op: "Automatic", mat: "FRP", size: "13×54", price: 39800 },
  { op: "Automatic", mat: "FRP", size: "14×65", conn: '1"', price: 45800 },
  { op: "Automatic", mat: "FRP", size: "14×65", conn: '1.5"', price: 51800 },
  { op: "Automatic", mat: "FRP", size: "16×65", conn: '1"', price: 68800 },
  { op: "Automatic", mat: "FRP", size: "16×65", conn: '1.5"', price: 75800 },
  ...ss304Rows([
    { size: "10×54", price: 40800 },
    { size: "13×54", price: 45800 },
    { size: "14×65", conn: '1"', price: 58800 },
    { size: "14×65", conn: '1.5"', price: 65800 },
    { size: "16×65", conn: '1"', price: 81800 },
    { size: "16×65", conn: '1.5"', price: 90800 },
  ]),
]);

// ================= DUAL VESSEL COMBO =================
// One package price; offered in Automatic control.
function comboRows(): Row[] {
  const base: { mat: "FRP" | "SS304"; size: string; conn?: string; price: number }[] = [
    { mat: "FRP", size: "13×54", price: 88800 },
    { mat: "SS304", size: "13×54", price: 113800 },
    { mat: "FRP", size: "14×65", conn: '1"', price: 109800 },
    { mat: "FRP", size: "14×65", conn: '1.5"', price: 124800 },
    { mat: "SS304", size: "14×65", conn: '1"', price: 129800 },
    { mat: "SS304", size: "14×65", conn: '1.5"', price: 146800 },
    { mat: "FRP", size: "16×65", conn: '1"', price: 139800 },
    { mat: "FRP", size: "16×65", conn: '1.5"', price: 159800 },
    { mat: "SS304", size: "16×65", conn: '1"', price: 169800 },
    { mat: "SS304", size: "16×65", conn: '1.5"', price: 183800 },
  ];
  return base.map((b) => ({ op: "Automatic" as const, ...b }));
}
const comboVariants = buildVariants(comboRows());

// ================= PRO IRON REMOVER =================
const ironVariants = buildVariants([
  { op: "Manual", mat: "FRP", size: "10×54", price: 29800 },
  { op: "Manual", mat: "FRP", size: "13×54", price: 39800 },
  { op: "Automatic", mat: "FRP", size: "10×54", price: 36800 },
  { op: "Automatic", mat: "FRP", size: "13×54", price: 46800 },
]);

// ---- Single-variant helper for tank filters & spares (real MRP + price) ----
function single(price: number, mrp: number): Variant[] {
  return [{ id: "standard", label: "Standard", price, mrp }];
}

export const products: Product[] = [
  // ==================== WATER SOFTENERS ====================
  {
    id: "water-softener",
    slug: "water-softener",
    name: "Vivanwave Automatic Water Softener",
    category: "water-softeners",
    shortDesc: "Whole-house softener — Manual, Automatic & SS304, up to 16×65.",
    longDesc:
      "The Vivanwave Water Softener reduces calcium & magnesium hardness across your whole home using an efficient ion-exchange process — softer water for skin, hair, washing and appliances. Choose Manual or Automatic operation, an FRP or SS304 stainless-steel vessel, and the vessel size that fits your home. Larger 14×65 and 16×65 vessels offer 1\" and 1.5\" connection options.",
    specs: [
      { label: "Operation", value: "Manual / Automatic" },
      { label: "Material", value: "FRP or SS304 Stainless Steel" },
      { label: "Vessel Sizes", value: "10×54, 13×54, 14×65, 16×65 (inch)" },
      { label: "Connection", value: "1\" / 1.5\" (on 14×65 & 16×65)" },
      { label: "Technology", value: "Ion-Exchange Softening" },
      { label: "Installation", value: "Whole House / Main Line" },
    ],
    images: [
      "/products/water-softener-automatic.png",
      "/products/water-softener-manual.png",
      "/products/water-softener-ss304.png",
    ],
    ...fromCheapest(softenerVariants),
    rating: 4.8,
    reviewCount: 214,
    isFeatured: true,
    badge: "bestseller",
    tag: "multistage",
    operations: ["Manual", "Automatic"],
    variantAxes: [...VESSEL_AXES],
    highlights: [
      "Skin-friendly, reduces hair fall from hard water",
      "Better washing efficiency, less detergent",
      "Efficient ion-exchange reduces calcium & magnesium",
      "Manual, Automatic & SS304 options",
      "User-friendly & low maintenance",
    ],
    variants: softenerVariants,
  },

  // ==================== AQUA CLEAN ====================
  {
    id: "aqua-clean",
    slug: "aqua-clean",
    name: "Vivanwave Aqua Clean Premium Filter",
    category: "aqua-clean",
    shortDesc: "Premium whole-house filtration — Manual, Automatic & SS304.",
    longDesc:
      "Vivanwave Aqua Clean is a premium whole-house filtration vessel that delivers cleaner, better-tasting water for the entire home. It helps reduce viruses & bacteria, controls odour & taste, protects against scale, and reduces sediment. Available in Manual, Automatic and SS304 stainless-steel builds across multiple vessel sizes.",
    specs: [
      { label: "Operation", value: "Manual / Automatic" },
      { label: "Material", value: "FRP or SS304 Stainless Steel" },
      { label: "Vessel Sizes", value: "10×54, 13×54, 14×65, 16×65 (inch)" },
      { label: "Connection", value: "1\" / 1.5\" (on 14×65 & 16×65)" },
      { label: "Type", value: "Whole-House Filtration Vessel" },
      { label: "Installation", value: "Whole House / Main Line" },
    ],
    images: [
      "/products/aqua-clean-automatic.png",
      "/products/aqua-clean-manual.png",
      "/products/aqua-clean-ss304.png",
    ],
    ...fromCheapest(aquaCleanVariants),
    rating: 4.7,
    reviewCount: 156,
    isFeatured: true,
    tag: "multistage",
    operations: ["Manual", "Automatic"],
    variantAxes: [...VESSEL_AXES],
    highlights: [
      "Reduces viruses & bacteria for safer water",
      "Advanced filtration for cleaner, purer water",
      "Odour & taste control",
      "Scale protection for pipes & appliances",
      "Reduces dirt, rust & suspended sediment",
    ],
    variants: aquaCleanVariants,
  },

  // ==================== DUAL VESSEL COMBO ====================
  {
    id: "dual-combo",
    slug: "dual-vessel-combo",
    name: "Vivanwave Dual Vessel Combo (Aqua Clean + Softener + Brine Tank)",
    category: "dual-combo",
    shortDesc: "Complete system: Aqua Clean + Water Softener + Brine Tank (Automatic).",
    longDesc:
      "The Vivanwave Dual Vessel Combo is a complete whole-house water system that pairs an Aqua Clean filtration vessel with a Water Softener vessel of the same size, plus the Brine Tank — filtration and softening in one package. Automatic operation with an FRP or SS304 build. The selected vessel size applies to both vessels.",
    specs: [
      { label: "Includes", value: "Aqua Clean + Water Softener + Brine Tank" },
      { label: "Operation", value: "Automatic" },
      { label: "Material", value: "FRP or SS304 Stainless Steel" },
      { label: "Vessel Sizes (each)", value: "13×54, 14×65, 16×65 (inch)" },
      { label: "Connection", value: "1\" / 1.5\" (on 14×65 & 16×65)" },
      { label: "Installation", value: "Whole House / Main Line" },
    ],
    images: ["/products/dual-combo-frp.png", "/products/dual-combo-ss304.png"],
    ...fromCheapest(comboVariants),
    rating: 4.9,
    reviewCount: 88,
    isFeatured: true,
    badge: "premium",
    tag: "multistage",
    operations: ["Automatic"],
    variantAxes: ["material", "size", "connection"],
    highlights: [
      "Filtration + softening in one complete system",
      "Aqua Clean + Water Softener + Brine Tank included",
      "Same size applies to both vessels",
      "Automatic operation & SS304 options",
      "Best value whole-house solution",
    ],
    variants: comboVariants,
  },

  // ==================== PRO IRON REMOVER ====================
  {
    id: "pro-iron-remover",
    slug: "pro-iron-remover",
    name: "Vivanwave Pro Iron Remover",
    category: "iron-removers",
    shortDesc: "Whole-house iron removal — Manual & Automatic FRP.",
    longDesc:
      "The Vivanwave Pro Iron Remover reduces excess iron and its common problems — reddish-brown staining, metallic taste and odour — while protecting plumbing, fittings and appliances. It also helps with sediment, manganese, scale and chemical/toxin reduction. Available in Manual and Automatic FRP builds in 10×54 and 13×54 sizes.",
    specs: [
      { label: "Product Type", value: "Whole-House Iron Removal Filter" },
      { label: "Operation", value: "Manual / Automatic" },
      { label: "Material", value: "FRP" },
      { label: "Vessel Sizes", value: "10×54, 13×54 (inch)" },
      { label: "Installation", value: "Whole House / Main Line" },
    ],
    images: ["/products/pro-iron-automatic.png", "/products/pro-iron-manual.png"],
    ...fromCheapest(ironVariants),
    rating: 4.6,
    reviewCount: 74,
    isFeatured: true,
    tag: "iron",
    operations: ["Manual", "Automatic"],
    variantAxes: ["operation", "size"],
    highlights: [
      "Removes iron & reddish-brown staining",
      "Sediment filtration",
      "Bad smell & odour removal",
      "Manganese removal",
      "Scale removal",
      "Chemical & toxins reduction",
    ],
    variants: ironVariants,
  },

  // ==================== TANK FILTERS ====================
  // Hydro family (branded / higher tier) and Clear family, plus Iron variants.
  {
    id: "tf-hydro-ultra",
    slug: "hydro-ultra-4-stage",
    name: "Vivanwave Hydro Ultra — 4 Stage Tank Filter",
    category: "tank-filters",
    shortDesc: "4-stage: Sediment Yarn · Washable UF · Carbon · Iron & Scale.",
    longDesc:
      "The Vivanwave Hydro Ultra is our top 4-stage tank filtration system for comprehensive whole-house protection: a Sediment Yarn filter, Washable UF filter, Hardness Reduction Carbon filter and an Iron & Scale Reduction filter working together for cleaner, better water.",
    specs: [
      { label: "Stages", value: "4 Stage" },
      { label: "Stage 1", value: "Sediment Yarn Filter" },
      { label: "Stage 2", value: "Washable UF Filter" },
      { label: "Stage 3", value: "Hardness Reduction Carbon Filter" },
      { label: "Stage 4", value: "Iron & Scale Reduction Filter" },
      { label: "Installation", value: "Wall-mounted / Main Line" },
    ],
    images: ["/products/hydro-ultra-filter.png"],
    price: 19800,
    mrp: 30000,
    rating: 4.9,
    reviewCount: 63,
    isFeatured: true,
    badge: "premium",
    highlights: [
      "Complete 4-stage protection",
      "Sediment Yarn + Washable UF",
      "Hardness reduction carbon stage",
      "Iron & scale reduction stage",
      "Whole-house / mainline fit",
    ],
    variants: single(19800, 30000),
  },
  {
    id: "tf-clear-guard",
    slug: "clear-guard-4-stage",
    name: "Vivanwave Clear Guard — 4 Stage Tank Filter",
    category: "tank-filters",
    shortDesc: "4-stage: 1 Life Mesh · Washable UF · Carbon · Iron & Scale.",
    longDesc:
      "The Vivanwave Clear Guard is a 4-stage tank filter combining a 1 Life Mesh filter, Washable UF filter, Hardness Reduction Carbon filter and an Iron & Scale Reduction filter for strong whole-house filtration at great value.",
    specs: [
      { label: "Stages", value: "4 Stage" },
      { label: "Stage 1", value: "1 Life Mesh Filter" },
      { label: "Stage 2", value: "Washable UF Filter" },
      { label: "Stage 3", value: "Hardness Reduction Carbon Filter" },
      { label: "Stage 4", value: "Iron & Scale Reduction Filter" },
      { label: "Installation", value: "Wall-mounted / Main Line" },
    ],
    images: ["/products/clear-guard.png"],
    price: 15900,
    mrp: 26500,
    rating: 4.8,
    reviewCount: 51,
    isFeatured: true,
    highlights: [
      "4-stage whole-house filtration",
      "1 Life Mesh first stage",
      "Washable UF filter",
      "Hardness reduction carbon",
      "Iron & scale reduction",
    ],
    variants: single(15900, 26500),
  },
  {
    id: "tf-hydro-prime",
    slug: "hydro-prime-3-stage",
    name: "Vivanwave Hydro Prime — 3 Stage Tank Filter",
    category: "tank-filters",
    shortDesc: "3-stage: Sediment Bag · Carbon · Iron & Scale.",
    longDesc:
      "The Vivanwave Hydro Prime is a 3-stage tank filter with a Sediment Bag filter, Hardness Reduction Carbon filter and an Iron & Scale Reduction filter — reliable whole-house protection for most homes.",
    specs: [
      { label: "Stages", value: "3 Stage" },
      { label: "Stage 1", value: "Sediment Bag Filter" },
      { label: "Stage 2", value: "Hardness Reduction Carbon Filter" },
      { label: "Stage 3", value: "Iron & Scale Reduction Filter" },
      { label: "Installation", value: "Wall-mounted / Main Line" },
    ],
    images: ["/products/hydro-prime.png"],
    price: 12800,
    mrp: 18000,
    rating: 4.7,
    reviewCount: 46,
    isFeatured: true,
    badge: "bestseller",
    tag: "iron",
    highlights: [
      "3-stage whole-house filtration",
      "Sediment bag first stage",
      "Hardness reduction carbon",
      "Iron & scale reduction",
      "Easy to maintain",
    ],
    variants: single(12800, 18000),
  },
  {
    id: "tf-clear-pro",
    slug: "clear-pro-3-stage",
    name: "Vivanwave Clear Pro — 3 Stage Tank Filter",
    category: "tank-filters",
    shortDesc: "3-stage: Sediment Bag · Carbon · Iron & Scale.",
    longDesc:
      "The Vivanwave Clear Pro is a value 3-stage tank filter with a Sediment Bag filter, Hardness Reduction Carbon filter and an Iron & Scale Reduction filter for clean, better-tasting whole-house water.",
    specs: [
      { label: "Stages", value: "3 Stage" },
      { label: "Stage 1", value: "Sediment Bag Filter" },
      { label: "Stage 2", value: "Hardness Reduction Carbon Filter" },
      { label: "Stage 3", value: "Iron & Scale Reduction Filter" },
      { label: "Installation", value: "Wall-mounted / Main Line" },
    ],
    images: ["/products/clear-pro.png"],
    price: 8800,
    mrp: 15000,
    rating: 4.7,
    reviewCount: 58,
    tag: "iron",
    highlights: [
      "3-stage whole-house filtration",
      "Sediment bag first stage",
      "Hardness reduction carbon",
      "Iron & scale reduction",
      "Great value",
    ],
    variants: single(8800, 15000),
  },
  {
    id: "tf-clear-pro-iron",
    slug: "clear-pro-iron-3-stage",
    name: "Vivanwave Clear Pro Iron — 3 Stage Tank Filter",
    category: "tank-filters",
    shortDesc: "3-stage with dedicated Iron Reduction filter.",
    longDesc:
      "The Vivanwave Clear Pro Iron is a 3-stage tank filter tuned for iron-affected water: a Sediment Bag filter, Hardness Reduction Carbon filter and a dedicated Iron Reduction filter to tackle staining, metallic taste and odour.",
    specs: [
      { label: "Stages", value: "3 Stage" },
      { label: "Stage 1", value: "Sediment Bag Filter" },
      { label: "Stage 2", value: "Hardness Reduction Carbon Filter" },
      { label: "Stage 3", value: "Iron Reduction Filter" },
      { label: "Installation", value: "Wall-mounted / Main Line" },
    ],
    images: ["/products/clear-pro-iron.png"],
    price: 11900,
    mrp: 17000,
    rating: 4.7,
    reviewCount: 39,
    tag: "iron",
    highlights: [
      "3-stage filtration for iron water",
      "Dedicated iron reduction stage",
      "Sediment bag first stage",
      "Hardness reduction carbon",
      "Reduces staining & metallic taste",
    ],
    variants: single(11900, 17000),
  },
  {
    id: "tf-hydro-lite",
    slug: "hydro-lite-2-stage",
    name: "Vivanwave Hydro Lite — 2 Stage Tank Filter",
    category: "tank-filters",
    shortDesc: "2-stage: Sediment Bag + Anti Scaling · Carbon.",
    longDesc:
      "The Vivanwave Hydro Lite is a compact 2-stage tank filter with a Sediment Bag + Anti Scaling filter and a Hardness Reduction Carbon filter — an easy entry into whole-house filtration.",
    specs: [
      { label: "Stages", value: "2 Stage" },
      { label: "Stage 1", value: "Sediment Bag + Anti Scaling Filter" },
      { label: "Stage 2", value: "Hardness Reduction Carbon Filter" },
      { label: "Installation", value: "Wall-mounted / Main Line" },
    ],
    images: ["/products/hydro-lite.png"],
    price: 9900,
    mrp: 15000,
    rating: 4.6,
    reviewCount: 44,
    tag: "multistage",
    highlights: [
      "Compact 2-stage filtration",
      "Sediment bag + anti-scaling stage",
      "Hardness reduction carbon",
      "Easy install & maintenance",
      "Whole-house / mainline fit",
    ],
    variants: single(9900, 15000),
  },
  {
    id: "tf-clear-plus",
    slug: "clear-plus-2-stage",
    name: "Vivanwave Clear Plus — 2 Stage Tank Filter",
    category: "tank-filters",
    shortDesc: "2-stage: Sediment Bag + Anti Scaling · Carbon.",
    longDesc:
      "The Vivanwave Clear Plus is a value 2-stage tank filter with a Sediment Bag + Anti Scaling filter and a Hardness Reduction Carbon filter for cleaner everyday water.",
    specs: [
      { label: "Stages", value: "2 Stage" },
      { label: "Stage 1", value: "Sediment Bag + Anti Scaling Filter" },
      { label: "Stage 2", value: "Hardness Reduction Carbon Filter" },
      { label: "Installation", value: "Wall-mounted / Main Line" },
    ],
    images: ["/products/clear-plus.png"],
    price: 6900,
    mrp: 11500,
    rating: 4.6,
    reviewCount: 67,
    tag: "multistage",
    highlights: [
      "Value 2-stage filtration",
      "Sediment bag + anti-scaling stage",
      "Hardness reduction carbon",
      "Most affordable whole-house filter",
      "Easy to maintain",
    ],
    variants: single(6900, 11500),
  },
  {
    id: "tf-clear-plus-iron",
    slug: "clear-plus-iron-2-stage",
    name: "Vivanwave Clear Plus Iron — 2 Stage Tank Filter",
    category: "tank-filters",
    shortDesc: "2-stage with dedicated Iron Reduction filter.",
    longDesc:
      "The Vivanwave Clear Plus Iron is a 2-stage tank filter for iron-affected water: a Sediment Bag + Anti Scaling filter and a dedicated Iron Reduction filter.",
    specs: [
      { label: "Stages", value: "2 Stage" },
      { label: "Stage 1", value: "Sediment Bag + Anti Scaling Filter" },
      { label: "Stage 2", value: "Iron Reduction Filter" },
      { label: "Installation", value: "Wall-mounted / Main Line" },
    ],
    images: ["/products/clear-plus-iron.png"],
    price: 8000,
    mrp: 12500,
    rating: 4.6,
    reviewCount: 41,
    tag: "iron",
    highlights: [
      "2-stage filtration for iron water",
      "Dedicated iron reduction stage",
      "Sediment bag + anti-scaling stage",
      "Reduces staining & odour",
      "Compact & easy install",
    ],
    variants: single(8000, 12500),
  },

  // ==================== 20-INCH HEAVY-DUTY WASHING MACHINE WATER FILTERS ====================
  {
    id: "wm-filter-blue",
    sku: "VWWMBLUE",
    badge: "bestseller",
    slug: "vivanwave-20-inch-washing-machine-filter-blue",
    name: "Vivanwave 20-Inch Heavy-Duty Washing Machine Water Filter with Sediment Bag & Anti-Scaling Technology (Blue Cap)",
    subtitle: "Long-Lasting Solution for Hard Water, Limescale & Muddy Water | Top Load & Front Load",
    category: "tank-filters",
    shortDesc:
      "20-Inch Heavy-Duty Washing Machine Water Filter with Sediment Bag & Anti-Scaling Media. 1-Year Cartridge Life.",
    longDesc:
      "Why Choose Vivanwave 20-Inch Filter Over Ordinary Small Filters?\n\nMost washing machine filters available in the market come in small, compact sizes whose cartridges get choked in just 4 to 6 months, forcing you to spend money on frequent replacements.\n\nThe Vivanwave 20-Inch Heavy-Duty Filter (Royal Blue Cap) is a solid, permanent solution engineered for Indian water conditions. Its large 20-inch housing holds significantly higher filtration capacity—keeping your water clean, protecting your expensive appliances year-round, and giving you up to 1 full year of hassle-free performance without frequent maintenance.\n\nHow It Works (Simple & Effective):\n• Sediment Bag: Traps mud, dust, and rust before water enters your machine, ensuring only crystal-clear water reaches your laundry.\n• Anti-Scaling Media: Controls hard-water minerals to stop limescale from forming inside the machine drum and heating coil. This protects your washing machine, extends appliance life, and delivers noticeably cleaner, brighter, and softer clothes.",
    specs: [
      { label: "Brand", value: "Vivanwave" },
      { label: "SKU", value: "VWWMBLUE" },
      { label: "Cap Color", value: "Royal Blue Cap" },
      { label: "Product Size & Type", value: "20-Inch Heavy-Duty Single-Stage Water Filter (01)" },
      {
        label: "Filtration Media",
        value: "High-Capacity Sediment Bag + Polyphosphate Anti-Scaling Media",
      },
      {
        label: "Pressure Gauge",
        value: "Built-In Analog PSI Gauge (0–100 PSI) with Air-Release Valve",
      },
      {
        label: "Compatibility",
        value: "All Front-Load & Top-Load Washing Machines (also ideal for Geyser & Dishwasher inlets)",
      },
      {
        label: "Body Material",
        value: "Heavy-Duty BPA-Free Food-Grade Housing with Wall-Mount Bracket",
      },
      {
        label: "Cartridge Life",
        value: "Up to 1 Year (varies based on raw water quality and laundry usage)",
      },
      {
        label: "Appliance Protection",
        value: "Drum, Heating Coil, Solenoid Valves & Internal Plumbing",
      },
      {
        label: "Mounting Type",
        value: "Wall Mountable with Heavy-Duty Steel Bracket",
      },
      {
        label: "Flow Rate",
        value: "High-Flow Rate with Zero Pressure Drop",
      },
    ],
    images: [
      "/products/washing-machine-filter-blue.png",
      "/products/washing-machine-clothes-softness.jpg",
      "/products/washing-machine-drum-protection.jpg",
      "/products/washing-machine-compatibility.png",
    ],
    mrp: 5100,
    price: 4400,
    rating: 4.9,
    reviewCount: 58,
    isFeatured: true,
    highlights: [
      "20-Inch Heavy-Duty Size (1 Year Life): Unlike small, ordinary filters that clog up in just 4–6 months, this full-size 20-inch system is built as a long-term, permanent solution with up to 1 year of cartridge life.",
      "Dual-Action 01 Filtration: Combines a high-capacity Sediment Bag to trap mud, rust, and dust with Anti-Scaling media to stop hard-water mineral deposits.",
      "Built-In Pressure Gauge: Lets you monitor water pressure in real time so you know the exact moment the cartridge needs cleaning or replacement.",
      "Protects Your Appliances: Prevents limescale buildup on the drum, heating coil, and inlet valves—extending the life of your washing machine and reducing costly repairs.",
      "Brighter, Softer Laundry: Stops mineral stiffness and yellow/muddy stains, keeping whites bright and fabrics soft.",
      "Universal Compatibility: Fits all standard Top-Load and Front-Load washing machines (LG, Samsung, Bosch, IFB, Whirlpool, Haier, etc.) with zero drop in water flow.",
    ],
    faqs: [
      {
        q: "How is this better than small washing machine filters?",
        a: "Ordinary small filters have limited media capacity and get choked within 4 to 6 months. Our 20-inch heavy-duty system acts as a permanent, high-capacity solution that lasts up to 1 year, protects your appliances better, and handles heavy mud and hard water effortlessly.",
      },
      {
        q: "Does it clean muddy or rusty water before it enters the washing machine?",
        a: "Yes. The integrated Sediment Bag traps mud, sand, dust, and rust particles so clean, clear water reaches your clothes.",
      },
      {
        q: "Will this fit my washing machine?",
        a: "Yes. It works seamlessly with all brands of both Front-Load and Top-Load washing machines (LG, Samsung, Bosch, IFB, Whirlpool, Haier, etc.).",
      },
      {
        q: "Will it remove old limescale already inside my machine?",
        a: "This filter prevents new limescale from forming. To clear heavy existing scale inside an older drum, run a single cycle with a descaling tablet, and let the Vivanwave 20-Inch Filter keep it scale-free going forward.",
      },
    ],
    variants: single(4400, 5100),
  },
  {
    id: "wm-filter-black",
    sku: "VWWMBLACK",
    badge: "bestseller",
    slug: "vivanwave-20-inch-washing-machine-filter-black",
    name: "Vivanwave 20-Inch Heavy-Duty Washing Machine Water Filter — Black Cap",
    subtitle: "Sediment Bag & Anti-Scaling Technology | Top Load & Front Load (Black Cap)",
    category: "tank-filters",
    shortDesc:
      "20-Inch Heavy-Duty Washing Machine Water Filter with Sediment Bag & Anti-Scaling Media. 1-Year Cartridge Life.",
    longDesc:
      "Why Choose Vivanwave 20-Inch Filter Over Ordinary Small Filters?\n\nMost washing machine filters available in the market come in small, compact sizes whose cartridges get choked in just 4 to 6 months, forcing you to spend money on frequent replacements.\n\nThe Vivanwave 20-Inch Heavy-Duty Filter (Matte Black Cap) is a solid, permanent solution engineered for Indian water conditions. Its large 20-inch housing holds significantly higher filtration capacity—keeping your water clean, protecting your expensive appliances year-round, and giving you up to 1 full year of hassle-free performance without frequent maintenance.\n\nHow It Works (Simple & Effective):\n• Sediment Bag: Traps mud, dust, and rust before water enters your machine, ensuring only crystal-clear water reaches your laundry.\n• Anti-Scaling Media: Controls hard-water minerals to stop limescale from forming inside the machine drum and heating coil. This protects your washing machine, extends appliance life, and delivers noticeably cleaner, brighter, and softer clothes.",
    specs: [
      { label: "Brand", value: "Vivanwave" },
      { label: "SKU", value: "VWWMBLACK" },
      { label: "Cap Color", value: "Matte Black Cap" },
      { label: "Product Size & Type", value: "20-Inch Heavy-Duty Single-Stage Water Filter (01)" },
      {
        label: "Filtration Media",
        value: "High-Capacity Sediment Bag + Polyphosphate Anti-Scaling Media",
      },
      {
        label: "Pressure Gauge",
        value: "Built-In Analog PSI Gauge (0–100 PSI) with Air-Release Valve",
      },
      {
        label: "Compatibility",
        value: "All Front-Load & Top-Load Washing Machines (also ideal for Geyser & Dishwasher inlets)",
      },
      {
        label: "Body Material",
        value: "Heavy-Duty BPA-Free Food-Grade Housing with Wall-Mount Bracket",
      },
      {
        label: "Cartridge Life",
        value: "Up to 1 Year (varies based on raw water quality and laundry usage)",
      },
      {
        label: "Appliance Protection",
        value: "Drum, Heating Coil, Solenoid Valves & Internal Plumbing",
      },
      {
        label: "Mounting Type",
        value: "Wall Mountable with Heavy-Duty Steel Bracket",
      },
      {
        label: "Flow Rate",
        value: "High-Flow Rate with Zero Pressure Drop",
      },
    ],
    images: [
      "/products/washing-machine-filter-black.png",
      "/products/washing-machine-clothes-softness.jpg",
      "/products/washing-machine-drum-protection.jpg",
      "/products/washing-machine-compatibility.png",
    ],
    mrp: 4200,
    price: 3680,
    rating: 4.8,
    reviewCount: 46,
    isFeatured: true,
    highlights: [
      "20-Inch Heavy-Duty Size (1 Year Life): Unlike small, ordinary filters that clog up in just 4–6 months, this full-size 20-inch system is built as a long-term, permanent solution with up to 1 year of cartridge life.",
      "Dual-Action 01 Filtration: Combines a high-capacity Sediment Bag to trap mud, rust, and dust with Anti-Scaling media to stop hard-water mineral deposits.",
      "Built-In Pressure Gauge: Lets you monitor water pressure in real time so you know the exact moment the cartridge needs cleaning or replacement.",
      "Protects Your Appliances: Prevents limescale buildup on the drum, heating coil, and inlet valves—extending the life of your washing machine and reducing costly repairs.",
      "Brighter, Softer Laundry: Stops mineral stiffness and yellow/muddy stains, keeping whites bright and fabrics soft.",
      "Universal Compatibility: Fits all standard Top-Load and Front-Load washing machines (LG, Samsung, Bosch, IFB, Whirlpool, Haier, etc.) with zero drop in water flow.",
    ],
    faqs: [
      {
        q: "How is this better than small washing machine filters?",
        a: "Ordinary small filters have limited media capacity and get choked within 4 to 6 months. Our 20-inch heavy-duty system acts as a permanent, high-capacity solution that lasts up to 1 year, protects your appliances better, and handles heavy mud and hard water effortlessly.",
      },
      {
        q: "Does it clean muddy or rusty water before it enters the washing machine?",
        a: "Yes. The integrated Sediment Bag traps mud, sand, dust, and rust particles so clean, clear water reaches your clothes.",
      },
      {
        q: "Will this fit my washing machine?",
        a: "Yes. It works seamlessly with all brands of both Front-Load and Top-Load washing machines (LG, Samsung, Bosch, IFB, Whirlpool, Haier, etc.).",
      },
      {
        q: "Will it remove old limescale already inside my machine?",
        a: "This filter prevents new limescale from forming. To clear heavy existing scale inside an older drum, run a single cycle with a descaling tablet, and let the Vivanwave 20-Inch Filter keep it scale-free going forward.",
      },
    ],
    variants: single(3680, 4200),
  },

  // ==================== RO + IONIZER ====================
  {
    id: "ro-ionizer-50",
    sku: "VW7IO",
    badge: "premium",
    slug: "ro-ionizer-50lph",
    name: "Vivan Wave - T-7 Water Ionizer with 7 Titanium Plates WITH 50LPH INBUILT RO Self-Serviceable Filters",
    subtitle: "Advanced Multi-Stage Purification & Electrolysis Technology for Home & Office",
    category: "ro-ionizers",
    shortDesc: "7 Platinum Titanium Plates + 50 LPH Inbuilt 400 GPD RO + Self-Serviceable Filters.",
    longDesc:
      "Upgrade your home and workspace hydration with the Vivan Wave - T-7 Water Ionizer with 7 Titanium Plates WITH 50LPH INBUILT RO Self-Serviceable Filters. This state-of-the-art hybrid system combines commercial-grade Reverse Osmosis filtration with medical-grade titanium electrolysis inside a single sleek unit. It delivers pure, hydrogen-rich, micro-clustered alkaline drinking water with optimal pH balance, protecting your health while eliminating recurring technician maintenance costs.",
    specs: [
      { label: "Brand & Model", value: "Vivan Wave - T-7 Water Ionizer" },
      { label: "SKU", value: "VW7IO" },
      { label: "Core Technology", value: "7 Platinum-Coated Titanium Plates + 50LPH Inbuilt RO" },
      { label: "Dimensions (Unit)", value: "15.5″ (H) × 8.0″ (W) × 15.5″ (D) / 394 × 203 × 394 mm" },
      { label: "Titanium Plate Dimensions", value: "135 mm × 75 mm × 0.5 mm (7 Solid Plates)" },
      { label: "Purification Stages", value: "Multi-Stage Pre-Filter + RO + UV + UF + 7-Plate Chamber" },
      { label: "Purification Capacity", value: "50 – 60 Litres Per Hour (LPH)" },
      { label: "RO Membrane & Pump", value: "400 GPD Heavy-Duty RO Membrane & 400 GPD Booster Pump" },
      { label: "Pre-Filter Media", value: "3-in-1 Sediment + 1100 IV Coconut Shell Activated Carbon" },
      { label: "In-Tank Sterilization", value: "5W UVC LED Germicidal Lamp" },
      { label: "Storage Tank Capacity", value: "7 Liters Antibacterial Food-Grade Tank" },
      { label: "Filter Maintenance", value: "Quick-Change DIY Self-Serviceable Cartridges" },
      { label: "TDS Capability", value: "Works efficiently on raw water up to 2000 PPM TDS" },
      { label: "Power Consumption", value: "RO Mode: ~60W | Ionizer Active Mode: ~150W" },
      { label: "Operating Voltage", value: "230V AC / Heavy Duty SMPS (DC 36V – 10A)" },
      { label: "Cabinet & Mounting", value: "Premium ABS Engineering Plastic (Tabletop & Wall Mountable)" },
    ],
    images: [
      "/products/ionizer-transparent.png",
      "/products/ionizer-7-stage-filtration.jpg",
      "/products/ionizer-features-callout.jpg",
      "/products/ionizer-health-benefits.jpg",
      "/products/ionizer-customer-reviews.jpg",
      "/products/ionizer-lifestyle-hero.jpg",
      "/Ionizer.png",
    ],
    mrp: 185000,
    price: 158800,
    rating: 4.9,
    reviewCount: 42,
    isFeatured: true,
    highlights: [
      "7 Platinum-Coated Titanium Plates for stable electrolysis & antioxidant -ORP",
      "50 LPH Heavy-Duty Inbuilt RO with 400 GPD pump & membrane",
      "Self-Serviceable Filters Architecture — zero technician dependency",
      "Advanced Multi-Stage Sterilization with 1100 IV Carbon, UF & 5W UVC LED",
      "Smart Touch Digital Display with real-time TDS monitoring & filter lifespan",
      "Automatic TDS Adjuster retaining essential minerals for crisp, natural taste",
      "Dual Mounting: Sleek tabletop or space-saving wall mountable design",
    ],
    variants: single(158800, 185000),
  },

  // ==================== SPARE FILTERS ====================
  {
    id: "spare-mesh-filter",
    slug: "1-life-mesh-filter",
    name: "Vivanwave 1 Life Mesh Filter",
    category: "spare-filters",
    shortDesc: "Replacement 1 Life Mesh filter cartridge.",
    longDesc:
      "Genuine Vivanwave 1 Life Mesh Filter — the reusable first-stage mesh used in Vivanwave tank filters. Keep spare filtration performance at its best.",
    specs: [
      { label: "Type", value: "1 Life Mesh Filter" },
      { label: "Use", value: "First-stage mesh / replacement" },
    ],
    images: ["/products/mesh-filter.png"],
    price: 5700,
    mrp: 7500,
    rating: 4.6,
    reviewCount: 28,
    highlights: ["Genuine Vivanwave spare", "Reusable mesh media", "First-stage protection"],
    variants: single(5700, 7500),
  },
  {
    id: "spare-sediment-bag",
    slug: "sediment-bag-filter",
    name: "Vivanwave Sediment Bag Filter",
    category: "spare-filters",
    shortDesc: "Replacement sediment bag filter.",
    longDesc:
      "Genuine Vivanwave Sediment Bag Filter — replacement sediment stage for Vivanwave tank filters to reduce dirt, sand and suspended particles.",
    specs: [
      { label: "Type", value: "Sediment Bag Filter" },
      { label: "Use", value: "Sediment stage / replacement" },
    ],
    images: ["/products/sediment-bag-filter.png"],
    price: 3700,
    mrp: 5000,
    rating: 4.5,
    reviewCount: 33,
    highlights: ["Genuine Vivanwave spare", "Reduces dirt & sand", "Easy replacement"],
    variants: single(3700, 5000),
  },
  {
    id: "spare-sediment-yarn",
    slug: "sediment-yarn-filter",
    name: "Vivanwave Sediment Yarn Filter",
    category: "spare-filters",
    shortDesc: "Replacement sediment yarn filter.",
    longDesc:
      "Genuine Vivanwave Sediment Yarn Filter — fine sediment yarn stage for Vivanwave tank filters.",
    specs: [
      { label: "Type", value: "Sediment Yarn Filter" },
      { label: "Use", value: "Fine sediment stage / replacement" },
    ],
    images: ["/products/sediment-yarn-filter.png"],
    price: 3900,
    mrp: 5200,
    rating: 4.6,
    reviewCount: 24,
    highlights: ["Genuine Vivanwave spare", "Fine yarn sediment media", "Easy replacement"],
    variants: single(3900, 5200),
  },
  {
    id: "spare-sediment-bag-black",
    slug: "sediment-bag-filter-black",
    name: "Vivanwave Sediment Bag Filter (Black)",
    category: "spare-filters",
    shortDesc: "Replacement black sediment bag filter.",
    longDesc:
      "Genuine Vivanwave Sediment Bag Filter (Black edition) — replacement sediment stage for Vivanwave tank filters.",
    specs: [
      { label: "Type", value: "Sediment Bag Filter (Black)" },
      { label: "Use", value: "Sediment stage / replacement" },
    ],
    images: ["/products/sediment-bag-filter-black.png"],
    price: 2400,
    mrp: 3200,
    rating: 4.5,
    reviewCount: 19,
    highlights: ["Genuine Vivanwave spare", "Black-housing sediment bag", "Easy replacement"],
    variants: single(2400, 3200),
  },
];

// ---- Lookups & helpers ----
export const productBySlug = new Map(products.map((p) => [p.slug, p]));
export const productById = new Map(products.map((p) => [p.id, p]));

export function getProduct(slug: string): Product | undefined {
  return productBySlug.get(slug);
}

export function getProductsByCategory(category: string): Product[] {
  const target = category === "pre-filters" ? "spare-filters" : category;
  return products.filter((p) => p.category === target);
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
      p.category.toLowerCase().includes(q) ||
      (p.sku && p.sku.toLowerCase().includes(q)) ||
      p.slug.toLowerCase().includes(q),
  );
}

/** Resolve a variant by id, falling back to the product's first variant. */
export function getVariant(product: Product, variantId: string) {
  return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
}
