import type { Category } from "@/lib/types";

/**
 * Product categories. Keep this small (6–10 entries) so ~100 products stay organized.
 * The `gradient` + `icon` drive the CSS placeholder art used until real photos are added.
 */
export const categories: Category[] = [
  {
    slug: "water-softeners",
    name: "Water Softeners",
    tagline: "Say goodbye to hard water, scaling & dull skin.",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    slug: "ro-purifiers",
    name: "RO Purifiers",
    tagline: "RO + UV + UF purification for safe drinking water.",
    gradient: "from-blue-600 to-sky-400",
  },
  {
    slug: "tank-filters",
    name: "Tank & Mainline Filters",
    tagline: "Whole-home filtration right at your inlet line.",
    gradient: "from-teal-600 to-emerald-400",
  },
  {
    slug: "appliance-filters",
    name: "Appliance Filters",
    tagline: "Protect geysers, washing machines, taps & showers.",
    gradient: "from-cyan-600 to-teal-400",
  },
  {
    slug: "service-kits",
    name: "Service & Spare Kits",
    tagline: "Genuine filters, membranes & replacement kits.",
    gradient: "from-indigo-500 to-sky-400",
  },
  {
    slug: "amc-services",
    name: "AMC & Installation",
    tagline: "Annual maintenance, installation & repair plans.",
    gradient: "from-slate-600 to-sky-500",
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug as Category["slug"]);
}
