import Image from "next/image";
import { Award, UsersRound, Star, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const chips = [
  {
    Icon: Award,
    label: "10+ Yrs Experience",
    color: "text-blue-700 bg-blue-100/80 ring-blue-200",
  },
  {
    Icon: UsersRound,
    label: "50k+ Happy Customers",
    color: "text-emerald-700 bg-emerald-100/80 ring-emerald-200",
  },
  {
    Icon: Star,
    label: "4.7 Rated",
    color: "text-amber-700 bg-amber-100/80 ring-amber-200 fill-amber-500",
  },
];

export function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden rounded-b-[2.5rem] lg:min-h-[calc(100dvh-93px)]">
      {/* Background image */}
      <Image
        src="/bg-image-hero.png"
        alt="Vivanwave Complete Home & Appliance Water Solutions"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-right md:object-center"
      />

      <Container className="relative grid w-full items-center gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:py-4">
        {/* Text */}
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl">
            Cleaner, softer water for every Indian home
          </h1>
          <p className="mt-5 max-w-lg text-lg font-medium text-slate-800">
            The most trusted purification solutions with expert installation across India — always
            available, pay just 10% advance to order.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <ButtonLink
              href="/products"
              size="lg"
              className="bg-gradient-to-r from-brand-600 via-sky-600 to-blue-700 text-white font-bold shadow-lg shadow-brand-600/30 hover:shadow-xl hover:shadow-brand-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all border border-blue-400/30"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 ml-1" />
            </ButtonLink>
            <ButtonLink
              href="/products/category/water-softeners"
              size="lg"
              variant="outline"
              className="border-2 border-slate-300 bg-white font-bold text-slate-900 shadow-md shadow-slate-900/10 hover:border-brand-600 hover:bg-slate-50 hover:text-brand-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              View Softeners
            </ButtonLink>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {chips.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-md shadow-slate-900/10 ring-1 ring-slate-300 transition-transform hover:-translate-y-0.5"
              >
                <span className={`grid h-6 w-6 place-items-center rounded-full ring-1 ${c.color}`}>
                  <c.Icon
                    className={`h-3.5 w-3.5 ${c.color.includes("fill") ? "fill-amber-500" : ""}`}
                    strokeWidth={2.4}
                  />
                </span>
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Spacer to let the background showcase (Ionizer, Softener, Vessel, Tank Filter & Model) shine through */}
        <div className="hidden lg:block min-h-[480px] pointer-events-none" aria-hidden="true" />
      </Container>
    </section>
  );
}
