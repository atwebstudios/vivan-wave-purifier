import Link from "next/link";
import { Droplets, GlassWater, Container as ContainerIcon, ShowerHead, Wrench, CalendarClock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/lib/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<CategorySlug, LucideIcon> = {
  "water-softeners": Droplets,
  "ro-purifiers": GlassWater,
  "tank-filters": ContainerIcon,
  "appliance-filters": ShowerHead,
  "service-kits": Wrench,
  "amc-services": CalendarClock,
};

export function CategoryGrid() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Shop by need"
          title="Find the right solution"
          subtitle="From whole-home softening to drinking-water purification and appliance protection."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((c) => {
            const Icon = categoryIcons[c.slug];
            return (
            <Link
              key={c.slug}
              href={`/products/category/${c.slug}`}
              className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-5 text-white transition-transform hover:-translate-y-0.5",
                c.gradient,
              )}
            >
              <Icon className="h-8 w-8" strokeWidth={1.8} />
              <div className="mt-8">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="mt-1 text-sm text-white/85">{c.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                  Explore
                  <span className="transition-transform group-hover:translate-x-1">→</span>
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
