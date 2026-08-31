import type { Category } from "@/lib/types";

/**
 * Product categories — Vivaan Wave's real line-up.
 * `gradient` drives the CSS placeholder art used until real photos are added.
 */
export const categories: Category[] = [
  {
    slug: "water-softeners",
    name: "Water Softeners",
    tagline: "Whole-house softening — 50L to 150L, up to 8000 LPH.",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    slug: "iron-removers",
    name: "Iron Removers",
    tagline: "Remove excess iron, staining, metallic taste & odour.",
    gradient: "from-teal-600 to-emerald-400",
  },
  {
    slug: "ro-ionizers",
    name: "RO + Ionizers",
    tagline: "Smart RO purification with alkaline ionized water.",
    gradient: "from-slate-800 to-brand-700",
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug as Category["slug"]);
}
