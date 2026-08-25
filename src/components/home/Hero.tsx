import Image from "next/image";
import { Award, UsersRound, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HeroGlassRing } from "@/components/home/HeroGlassRing";

const chips = [
  { Icon: Award, label: "10+ Yrs Experience" },
  { Icon: UsersRound, label: "50k+ Happy Customers" },
  { Icon: Star, label: "4.7 Rated" },
];

export function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden rounded-b-[2.5rem] lg:min-h-[calc(100dvh-93px)]">
      {/* Background image */}
      <Image
        src="/hero-bg-2.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      {/* Subtle left overlay for headline legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/60 via-white/25 to-transparent" />

      <Container className="relative grid w-full items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:py-4">
        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-brand-950 sm:text-5xl">
            Cleaner, softer water for every Indian home
          </h1>
          <p className="mt-5 max-w-lg text-lg text-slate-700">
            The most trusted purification solutions with expert installation across India — always
            available, pay just 20% advance to order.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products" size="lg">
              Shop Now
            </ButtonLink>
            <ButtonLink href="/products/category/water-softeners" size="lg" variant="outline">
              View Softeners
            </ButtonLink>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {chips.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 shadow-sm ring-1 ring-slate-200 backdrop-blur-sm"
              >
                <c.Icon className="h-4 w-4 text-brand-600" strokeWidth={2} />
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Glass with revolving water-quality text ring (desktop: right column) */}
        <div className="hidden lg:block">
          <HeroGlassRing />
        </div>
      </Container>
    </section>
  );
}
