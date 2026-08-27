import type { Metadata } from "next";
import Image from "next/image";
import {
  Target,
  Eye,
  FlaskConical,
  Cog,
  Handshake,
  BadgeCheck,
  Check,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The Vivanwave story — our mission, our journey, and the standards behind our whole-house water softeners and iron removers.",
};

const stats = [
  { value: "10+", label: "Years of expertise" },
  { value: "50k+", label: "Installations" },
  { value: "4.7★", label: "Customer rating" },
  { value: "Pan-India", label: "Service reach" },
];

const journey = [
  {
    year: "The beginning",
    title: "Born to fix hard water",
    desc: "Vivanwave started with one frustration shared by millions of Indian homes — scaling, dull skin and damaged appliances caused by hard water — and a simple goal to solve it at the source.",
  },
  {
    year: "Focused range",
    title: "Softeners for every home",
    desc: "We built a focused line of fully-automatic whole-house softeners — 50L, 75L, 100L and 150L — covering compact flats to large villas and light commercial spaces.",
  },
  {
    year: "Beyond softening",
    title: "Iron removal, added",
    desc: "For homes battling reddish-brown staining and metallic taste, we introduced the self-cleaning Pro Iron Remover — extending Vivanwave beyond softening.",
  },
  {
    year: "Premium build",
    title: "SS 304 vessel option",
    desc: "We added a premium SS 304 stainless-steel vessel choice alongside FRP — the same performance, in a build customers can pick to match their needs.",
  },
  {
    year: "Today",
    title: "Trusted across India",
    desc: "Tens of thousands of installations later, Vivanwave is delivered and installed pan-India, backed by genuine spares and after-sales support.",
  },
];

const standards = [
  { Icon: FlaskConical, title: "Food-grade resin & quality media", desc: "We use safe, high-capacity ion-exchange resin and filtration media chosen for long, dependable service life." },
  { Icon: Cog, title: "Fully-automatic engineering", desc: "Programmable valves handle regeneration and backwash on their own — reliable performance with minimal manual effort." },
  { Icon: BadgeCheck, title: "Professional installation & testing", desc: "Trained technicians fit every system and run a water-quality check, so it's set up correctly for your water." },
  { Icon: Handshake, title: "Honest, transparent pricing", desc: "A clear 20% advance to order and the balance at delivery — no hidden costs, no pressure selling." },
];

const promises = [
  "Right-sized recommendations, not overselling",
  "Genuine spares and media, always available",
  "Support you can reach after the sale",
  "Warranty backing across India",
];

export default function AboutPage() {
  return (
    <>
      {/* Header band */}
      <section className="relative overflow-hidden rounded-b-[2.5rem] text-white">
        <Image
          src="/about-hero-nature.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-900/55 to-brand-900/25" />
        <Container className="relative py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">Our story</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            We exist to end hard-water headaches for good
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">
            Vivanwave is a water-treatment company on a simple mission: give every Indian home and
            business genuinely soft, clean water — with honest products, expert installation, and
            zero fuss.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-white">
        <Container className="grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-brand-700">{s.value}</p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Story + image */}
      <section className="py-14 sm:py-16">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative order-last overflow-hidden rounded-3xl border border-slate-200 shadow-sm lg:order-first">
            <Image
              src="/cat-softeners.webp"
              alt="Vivanwave water softener system"
              width={1248}
              height={832}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading align="left" eyebrow="Why we started" title="A problem worth solving" />
            <div className="mt-5 space-y-4 text-slate-700">
              <p>
                Across much of India, the water reaching our taps is hard — rich in calcium and
                magnesium. It leaves white scale on fittings, clogs pipelines, shortens the life of
                geysers and washing machines, and leaves skin and hair dry.
              </p>
              <p>
                Most people just live with it. We didn&apos;t want to. Vivanwave was created to treat
                water at the main supply, so <strong className="text-ink">every</strong> tap in a
                property delivers softer, cleaner water — not just one filter at the kitchen sink.
              </p>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {promises.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-14 sm:py-16">
        <Container className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white">
              <Target className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <h3 className="mt-5 text-xl font-bold text-ink">Our Mission</h3>
            <p className="mt-2 text-slate-700">
              To make soft, safe water affordable and effortless for every Indian home and business —
              through honestly-built systems, fair pricing, and reliable installation and support.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-brand-50 to-white p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white">
              <Eye className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <h3 className="mt-5 text-xl font-bold text-ink">Our Vision</h3>
            <p className="mt-2 text-slate-700">
              To become India&apos;s most trusted water-treatment brand — the name families and
              businesses recommend for soft water, straight dealing, and service that shows up.
            </p>
          </div>
        </Container>
      </section>

      {/* Journey / timeline */}
      <section className="py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Our journey" title="How Vivanwave grew" />
          <ol className="mx-auto mt-10 max-w-3xl">
            {journey.map((j, i) => (
              <li key={i} className="flex gap-5">
                {/* Rail: line + circle share the same centre */}
                <div className="relative flex w-6 flex-none justify-center">
                  {i !== journey.length - 1 && (
                    <span className="absolute left-1/2 top-3 bottom-0 w-0.5 -translate-x-1/2 bg-brand-100" />
                  )}
                  <span className="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                {/* Content */}
                <div className="pb-8">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{j.year}</p>
                  <h3 className="mt-1 text-lg font-bold text-ink">{j.title}</h3>
                  <p className="mt-1 text-sm text-muted">{j.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Our standards */}
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Our standards"
            title="What we hold ourselves to"
            subtitle="The commitments behind every Vivanwave system we deliver and install."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {standards.map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 px-6 py-12 text-center text-white sm:px-12">
            <Image
              src="/cta-dark-pure-water-bg.jpg"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-brand-900/70 via-brand-800/58 to-brand-700/48" />
            <h2 className="relative text-2xl font-bold sm:text-3xl">Have a hard-water problem? Let&apos;s solve it.</h2>
            <p className="relative mx-auto mt-3 max-w-xl text-brand-100">
              Tell us about your water and space, and we&apos;ll recommend the right system — or
              start browsing our range today.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/products" size="lg" variant="secondary">
                Browse products
              </ButtonLink>
              <ButtonLink
                href="/contact"
                size="lg"
                variant="outline"
                className="border-white bg-black/40 text-white backdrop-blur-md hover:border-white hover:bg-black/60 hover:text-white"
              >
                Talk to us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
