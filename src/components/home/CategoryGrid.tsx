import Link from "next/link";
import Image from "next/image";
import { Droplets, Filter, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import type { CategorySlug } from "@/lib/types";

const categoryMeta: Record<CategorySlug, { Icon: LucideIcon; image: string }> = {
  "water-softeners": { Icon: Droplets, image: "/cat-softeners.webp" },
  "iron-removers": { Icon: Filter, image: "/cat-iron.webp" },
};

export function CategoryGrid() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Shop by need"
          title="Find the right solution"
          subtitle="Whole-house water softeners and iron removers for every home and business."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {categories.map((c) => {
            const { Icon, image } = categoryMeta[c.slug];
            const count = getProductsByCategory(c.slug).length;
            return (
              <Link
                key={c.slug}
                href={`/products/category/${c.slug}`}
                className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-xl"
              >
                <Image
                  src={image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/45 to-brand-950/5" />

                <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-brand-700 shadow-sm backdrop-blur">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
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
