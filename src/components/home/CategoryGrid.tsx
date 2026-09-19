import Link from "next/link";
import Image from "next/image";
import { Droplets, Filter, Zap, Layers, ShieldCheck, Container as ContainerIcon, Wrench, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import type { CategorySlug } from "@/lib/types";

const categoryMeta: Record<CategorySlug, { Icon: LucideIcon; image: string }> = {
  "water-softeners": { Icon: Droplets, image: "/products/water-softener-automatic.png" },
  "aqua-clean": { Icon: ShieldCheck, image: "/products/aqua-clean-automatic.png" },
  "dual-combo": { Icon: Layers, image: "/products/dual-combo-frp.png" },
  "iron-removers": { Icon: Filter, image: "/products/pro-iron-automatic.png" },
  "tank-filters": { Icon: ContainerIcon, image: "/products/hydro-ultra.png" },
  "ro-ionizers": { Icon: Zap, image: "/Ionizer.png" },
  "spare-filters": { Icon: Wrench, image: "/products/mesh-filter.png" },
};

export function CategoryGrid() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Shop by need"
          title="Find the right solution"
          subtitle="Softeners, whole-house filtration, iron removers, tank filters and more — for every home and business."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories
            .filter((c) => c.slug !== "spare-filters")
            .map((c) => {
            const { Icon, image } = categoryMeta[c.slug];
            const count = getProductsByCategory(c.slug).length;
            return (
              <Link
                key={c.slug}
                href={`/products/category/${c.slug}`}
                className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-brand-50 shadow-sm transition-shadow hover:shadow-xl"
              >
                <Image
                  src={image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/25 to-transparent" />

                <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shadow-md">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <span className="absolute right-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
                  {count} {count === 1 ? "product" : "products"}
                </span>

                <div className="relative p-6 text-white">
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <p className="mt-1 max-w-sm text-sm text-white/85">{c.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
