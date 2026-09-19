import type { Category } from "@/lib/types";

/**
 * Product categories — Vivanwave's real line-up (6 families + spares).
 * `gradient` drives the CSS placeholder art used until real photos are added.
 */
export const categories: Category[] = [
  {
    slug: "water-softeners",
    name: "Water Softeners",
    tagline: "Manual, Automatic & SS304 whole-house softeners.",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    slug: "aqua-clean",
    name: "Aqua Clean",
    tagline: "Premium whole-house filtration vessels.",
    gradient: "from-blue-600 to-sky-400",
  },
  {
    slug: "dual-combo",
    name: "Dual Vessel Combo",
    tagline: "Aqua Clean + Softener + Brine Tank, one system.",
    gradient: "from-indigo-700 to-blue-500",
  },
  {
    slug: "iron-removers",
    name: "Iron Removers",
    tagline: "Remove iron, staining, metallic taste & odour.",
    gradient: "from-teal-600 to-emerald-400",
  },
  {
    slug: "tank-filters",
    name: "Tank Filters",
    tagline: "Multi-stage tank filtration for every water problem.",
    gradient: "from-cyan-600 to-blue-400",
  },
  {
    slug: "ro-ionizers",
    name: "RO + Ionizers",
    tagline: "Smart RO purification with alkaline ionized water.",
    gradient: "from-slate-800 to-brand-700",
  },
  {
    slug: "spare-filters",
    name: "Spare Filters",
    tagline: "Replacement sediment, yarn & mesh filters.",
    gradient: "from-slate-500 to-slate-400",
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug as Category["slug"]);
}
