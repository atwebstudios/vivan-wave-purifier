"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Zap,
  Droplets,
  Gauge,
  Sparkles,
  Activity,
  HeartPulse,
  Wrench,
  Layers,
  CheckCircle2,
  Maximize2,
  Atom,
  Flame,
  Eye,
  Check,
  Truck,
  Award,
  Sliders,
  CheckCheck,
} from "lucide-react";
import type { Product, Category } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductVariantProvider } from "@/components/product/ProductVariantContext";
import { ProductCancellationPolicy } from "@/components/product/ProductCancellationPolicy";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Rating } from "@/components/ui/Rating";
import { soldRecently, viewersNow, formatINR, MIN_ADVANCE_RATE } from "@/lib/pricing";

interface IonizerFlagshipViewProps {
  product: Product;
  category?: Category;
  related: Product[];
}

const PH_MODES = [
  {
    id: "alkaline-strong",
    ph: "9.5 pH",
    title: "Alkaline Detoxing",
    color: "from-blue-600 to-indigo-600",
    badgeBg: "bg-blue-950/80 text-blue-300 border-blue-500/40",
    orp: "-400 to -600 mV ORP",
    h2: "1,200+ ppb H₂",
    desc: "Super-charged with active molecular hydrogen and high antioxidant negative ORP. Ideal for cellular hydration, neutralizing lactic acid after intense workouts, and systemic detoxification.",
    bestFor: "Post-workout recovery, deep hydration, natural antioxidant support",
  },
  {
    id: "alkaline-daily",
    ph: "8.5 – 9.0 pH",
    title: "Daily Drinking & Cooking",
    color: "from-cyan-600 to-blue-600",
    badgeBg: "bg-cyan-950/80 text-cyan-300 border-cyan-500/40",
    orp: "-250 to -400 mV ORP",
    h2: "900+ ppb H₂",
    desc: "Perfect daily hydration pH. Neutralizes dietary acid buildup, promotes smooth digestive balance, and extracts richer flavour when brewing artisanal tea or coffee.",
    bestFor: "Everyday drinking, tea & coffee brewing, rice and soup preparation",
  },
  {
    id: "pure-neutral",
    ph: "7.0 pH",
    title: "Pure Neutral Water",
    color: "from-emerald-600 to-teal-600",
    badgeBg: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
    orp: "Balanced (~0 mV)",
    h2: "Ultra-Purified",
    desc: "Passed through 50 LPH RO, 1100 IV Coconut Carbon, UF membrane, and in-tank 5W UVC LED sterilization. Chemical-free pure water without ionization.",
    bestFor: "Prescription medications, infant milk formula, baby food preparation",
  },
  {
    id: "mild-acidic",
    ph: "5.5 pH",
    title: "Beauty & Skin Care",
    color: "from-rose-500 to-amber-600",
    badgeBg: "bg-rose-950/80 text-rose-300 border-rose-500/40",
    orp: "+200 to +400 mV",
    h2: "Astringent Ionized",
    desc: "Matches the delicate pH balance of healthy human skin (acid mantle). Acts as a chemical-free organic toner that tightens pores, cleanses, and conditions hair.",
    bestFor: "Facial toner, skin cleansing, hair rinse, organic produce washing",
  },
];

export function IonizerFlagshipView({ product, category, related }: IonizerFlagshipViewProps) {
  const advanceAmount = Math.round(product.price * MIN_ADVANCE_RATE);
  const balanceAmount = product.price - advanceAmount;

  const [activePhMode, setActivePhMode] = useState(PH_MODES[0]);

  return (
    <div className="relative min-h-screen bg-[#080d1a] text-slate-100 selection:bg-sky-500 selection:text-white">
      {/* Ambient Luxury Atmospheric Lighting (isolated in overflow-hidden to allow sticky children) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute -right-40 top-32 h-[600px] w-[600px] rounded-full bg-sky-500/8 blur-[160px]" />
        <div className="absolute left-1/3 top-[900px] h-[500px] w-[500px] rounded-full bg-indigo-600/6 blur-[160px]" />
      </div>

      {/* Top Subtle Luxury Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />

      <Container className="relative py-8 sm:py-12">
        {/* Clean Luxury Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-400 sm:text-sm">
          <Link href="/" className="transition hover:text-sky-400">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/products" className="transition hover:text-sky-400">
            Products
          </Link>
          {category ? (
            <>
              <span className="text-slate-600">/</span>
              <Link
                href={`/products/category/${category.slug}`}
                className="transition hover:text-sky-400"
              >
                {category.name}
              </Link>
            </>
          ) : null}
          <span className="text-slate-600">/</span>
          <span className="font-semibold text-slate-200">
            Vivan Wave T-7 Water Ionizer
          </span>
        </nav>

        {/* HERO SECTION */}
        <ProductVariantProvider product={product}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
            {/* Left: Gallery with Zoom & Trust Guarantee Strip (Sticky & Stable on Scroll) */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 lg:self-start">
              <ProductGallery product={product} priority theme="dark" isSticky={false} />

              {/* High-End Appliance Assurance Strip */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-center backdrop-blur-sm">
                  <ShieldCheck className="mx-auto h-5 w-5 text-sky-400" />
                  <div className="mt-1 text-xs font-bold text-slate-200">1-Year Warranty</div>
                  <div className="text-[10px] text-slate-400">Comprehensive</div>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-center backdrop-blur-sm">
                  <Truck className="mx-auto h-5 w-5 text-sky-400" />
                  <div className="mt-1 text-xs font-bold text-slate-200">Insured Transit</div>
                  <div className="text-[10px] text-slate-400">Pan-India delivery</div>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-center backdrop-blur-sm">
                  <Wrench className="mx-auto h-5 w-5 text-sky-400" />
                  <div className="mt-1 text-xs font-bold text-slate-200">Expert Setup</div>
                  <div className="text-[10px] text-slate-400">Tabletop / wall</div>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-center backdrop-blur-sm">
                  <Droplets className="mx-auto h-5 w-5 text-sky-400" />
                  <div className="mt-1 text-xs font-bold text-slate-200">Water Testing</div>
                  <div className="text-[10px] text-slate-400">pH &amp; TDS certified</div>
                </div>
              </div>
            </div>

            {/* Right: Flagship Product Identity & Purchase */}
            <div className="flex flex-col lg:col-span-6">
              {/* Prestige Badges Strip */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-orange-500/15 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-300 uppercase shadow-xs">
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  Flagship Series
                </span>
                <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 font-mono text-[11px] font-bold text-slate-300">
                  SKU: {product.sku ?? "VW7IO"}
                </span>
                <span className="rounded-full border border-sky-500/30 bg-sky-950/60 px-3 py-1 text-[11px] font-bold text-sky-300">
                  7 Platinum Plates • 50 LPH Inbuilt RO
                </span>
              </div>

              {/* Title & Subtitle Hierarchy */}
              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Vivan Wave — T-7 Water Ionizer
              </h1>
              <p className="mt-1.5 text-base font-semibold text-sky-400 sm:text-lg">
                7 Platinum-Coated Titanium Plates with 50 LPH Inbuilt RO &amp; Self-Serviceable Filters
              </p>
              <p className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                Advanced Multi-Stage Purification &amp; Electrolysis Technology for Home &amp; Office
              </p>

              {/* Ratings & Social Proof */}
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-slate-800/80 py-2.5 text-xs sm:text-sm">
                <Rating value={product.rating} count={product.reviewCount} />
                <span className="text-slate-700">|</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-rose-400">
                  <Flame className="h-4 w-4 fill-rose-500 text-rose-500" />
                  {soldRecently(product.id)} systems ordered in last 24h
                </span>
                <span className="hidden sm:inline text-slate-700">|</span>
                <span className="inline-flex items-center gap-1.5 text-slate-400">
                  <Eye className="h-4 w-4 text-sky-400" />
                  {viewersNow(product.id)} customers viewing now
                </span>
              </div>

              {/* Price & 10% Advance Booking Card */}
              <div className="mt-5 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 p-5 shadow-xl backdrop-blur-md">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      All-Inclusive Price
                    </span>
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        {formatINR(product.price)}
                      </span>
                      {product.mrp > product.price ? (
                        <>
                          <span className="text-base text-slate-500 line-through sm:text-lg">
                            {formatINR(product.mrp)}
                          </span>
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                            Save {formatINR(product.mrp - product.price)} (14% OFF)
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">Inclusive of all taxes &amp; shipping</span>
                </div>

                {/* 10% Advance Highlight Banner */}
                <div className="mt-4 rounded-xl border border-sky-500/30 bg-sky-950/40 p-3.5 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 font-semibold text-sky-300">
                      <Sparkles className="h-4 w-4 text-sky-400" />
                      Pay Only 10% Advance to Book
                    </span>
                    <span className="font-mono text-base font-extrabold text-sky-300">
                      {formatINR(advanceAmount)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    Remaining balance of{" "}
                    <span className="font-semibold text-white">{formatINR(balanceAmount)}</span> is payable on
                    delivery &amp; installation.
                  </p>
                </div>
              </div>

              {/* Technical Overview Description */}
              <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
                {product.longDesc}
              </p>

              {/* 4 Core Quick-Specs Matrix */}
              < div className="mt-5 grid grid-cols-2 gap-2.5 text-xs sm:grid-cols-4" >
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3">
                  <span className="text-slate-400 font-medium">Core Electrolysis</span>
                  <div className="mt-0.5 font-bold text-white">7 Solid Platinum Plates</div>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3">
                  <span className="text-slate-400 font-medium">Inbuilt RO Flow</span>
                  <div className="mt-0.5 font-bold text-white">50 – 60 LPH (400 GPD)</div>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3">
                  <span className="text-slate-400 font-medium">Raw Water TDS</span>
                  <div className="mt-0.5 font-bold text-white">Up to 2,000 PPM</div>
                </div>
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-3">
                  <span className="text-slate-400 font-medium">Maintenance</span>
                  <div className="mt-0.5 font-bold text-white">100% DIY Cartridges</div>
                </div>
              </div>

              {/* Highlights Bullet List */}
              {product.highlights.length > 0 ? (
                <div className="mt-5 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    System Capabilities &amp; Highlights
                  </div>
                  <ul className="space-y-2">
                    {product.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Purchase Controls & Checkout Action (Dark Mode) */}
              <div className="mt-6">
                <ProductPurchase product={product} theme="dark" />
              </div>
            </div>
          </div>
        </ProductVariantProvider>

        {/* 1. KEY TELEMETRY METRIC TILES */}
        <section className="mt-16 sm:mt-20">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center shadow-lg backdrop-blur-md">
              <Layers className="mx-auto h-6 w-6 text-sky-400" />
              <div className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">7 Plates</div>
              <div className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Platinum-Coated Titanium
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center shadow-lg backdrop-blur-md">
              <Gauge className="mx-auto h-6 w-6 text-sky-400" />
              <div className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">50–60 LPH</div>
              <div className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Heavy-Duty Inbuilt RO
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center shadow-lg backdrop-blur-md">
              <Activity className="mx-auto h-6 w-6 text-sky-400" />
              <div className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">2,000 PPM</div>
              <div className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Max Raw Water TDS
              </div>
            </div>

            < div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center shadow-lg backdrop-blur-md">
              <Wrench className="mx-auto h-6 w-6 text-sky-400" />
              <div className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">100% DIY</div>
              <div className="mt-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Self-Serviceable Filters
              </div>
            </div>
          </div>
        </section>

        {/* 2. IMAGE SHOWCASE BANNER 1: Lifestyle Hero */}
        <section className="mt-16 sm:mt-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/products/ionizer-lifestyle-hero.jpg"
                alt="Vivanwave T-7 Water Ionizer - Transform Your Water. Transform Your Life."
                fill
                unoptimized
                priority
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE IONIZATION & pH SPECTRUM EXPLORER */}
        <section className="mt-16 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-950/90 p-6 sm:p-10 shadow-xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-400">
                <Sliders className="h-3.5 w-3.5" />
                Precision Electrolysis Spectrum
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                4 Specialized Water Modes at Your Fingertips
              </h2>
              <p className="mt-1.5 text-sm text-slate-300">
                The Vivan Wave T-7 adjusts electrolysis voltage across its 7 titanium plates to produce customized pH levels for drinking, cooking, detoxification, and beauty.
              </p>
            </div>
            <span className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 font-mono text-xs font-semibold text-slate-300 self-start md:self-auto">
              Real-Time Electrolysis Control
            </span>
          </div>

          {/* Mode Tabs */}
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PH_MODES.map((mode) => {
              const isSelected = activePhMode.id === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setActivePhMode(mode)}
                  className={`rounded-2xl border p-4 text-left transition-all ${isSelected
                    ? "border-sky-500 bg-slate-800/90 shadow-lg shadow-sky-500/10 ring-2 ring-sky-500/20"
                    : "border-slate-800/80 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80"
                    }`}
                >
                  <span
                    className={`inline - block rounded - md border px - 2 py - 0.5 text - xs font - extrabold ${mode.badgeBg}`}
                  >
                    {mode.ph}
                  </span>
                  <div className="mt-2 text-sm font-bold text-white">{mode.title}</div>
                  <div className="mt-1 text-[11px] font-medium text-slate-400">{mode.orp}</div>
                </button>
              );
            })}
          </div>

          {/* Mode Detail Panel */}
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-md backdrop-blur-md sm:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded - lg border px - 3 py - 1 text - sm font - black ${activePhMode.badgeBg}`}>
                    {activePhMode.ph}
                  </span>
                  <h3 className="text-xl font-bold text-white">{activePhMode.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  {activePhMode.desc}
                </p>

                <div className="mt-4 flex items-start gap-2 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-300">
                  <CheckCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                  <div>
                    <span className="font-semibold text-white">Recommended Applications: </span>
                    {activePhMode.bestFor}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:col-span-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 text-center">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Antioxidant ORP</div>
                  <div className="mt-1 font-mono text-base font-bold text-sky-300">{activePhMode.orp}</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 text-center">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">Active Hydrogen</div>
                  <div className="mt-1 font-mono text-base font-bold text-teal-300">{activePhMode.h2}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. IMAGE SHOWCASE BANNER 2: 7-Stage Advanced Filtration + Ionization */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Purification &amp; Electrolysis Blueprint</span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              7-Stage Advanced Filtration + Ionization
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Commercial-grade 400 GPD RO demineralizes raw water before medical-grade titanium electrolysis for supreme purity and plate longevity.
            </p>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/products/ionizer-7-stage-filtration.jpg"
                alt="Vivanwave T-7 Water Ionizer - 7-Stage Advanced Filtration + Ionization Exploded View"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE VIVAN WAVE T-7? (3 STRATEGIC PILLARS) */}
        <section className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-10 backdrop-blur-md">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-sky-400">
              <Sparkles className="h-3.5 w-3.5" />
              Why Choose Vivan Wave T-7?
            </span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              The Hybrid Architecture Breakthrough
            </h2>
            <p className="mt-2 text-sm text-slate-300 sm:text-base">
              Standard standalone ionizers frequently fail in Indian water due to rapid plate scaling. The Vivan Wave T-7 pairs commercial-grade RO with medical-grade titanium electrolysis inside one cohesive system.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Pillar 1 */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-md backdrop-blur-md">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-950/80 text-sky-400 border border-blue-500/30">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-sky-400">
                  Pillar 1
                </span>
                <h3 className="mt-1 text-base font-bold text-white">Inbuilt RO Protects Titanium Plates</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Standard standalone ionizers often fail in hard water areas due to scaling on plates. The Vivan Wave T-7 passes water through the 50LPH Inbuilt RO first, ensuring clean, scaled-free water enters the electrolysis chamber for maximum plate life.
                </p>
              </div>
              <div className="mt-6 border-t border-slate-800 pt-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  3× Longer Plate Lifespan
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-md backdrop-blur-md">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-950/80 text-amber-400 border border-amber-500/30">
                  <Wrench className="h-6 w-6" />
                </div>
                <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-amber-400">
                  Pillar 2
                </span>
                <h3 className="mt-1 text-base font-bold text-white">Zero Maintenance Dependency</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  With Self-Serviceable Filters, you no longer need to wait for technicians or pay recurring service visit charges. Modular quick-change cartridges allow effortless DIY maintenance right at home in minutes.
                </p>
              </div>
              <div className="mt-6 border-t border-slate-800 pt-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  Quick DIY Cartridge Replacement
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 shadow-md backdrop-blur-md">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-950/80 text-teal-400 border border-teal-500/30">
                  <Atom className="h-6 w-6" />
                </div>
                <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-teal-400">
                  Pillar 3
                </span>
                <h3 className="mt-1 text-base font-bold text-white">Make in India Excellence</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Built with high-grade components designed specifically to handle tough Indian water conditions up to 2000 PPM TDS, while maintaining global standards of purity and health benefits.
                </p>
              </div>
              <div className="mt-6 border-t border-slate-800 pt-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-teal-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
                  Engineered for High-TDS Water
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. IMAGE SHOWCASE BANNER 3: Smart Architecture & Convenience */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Architecture Breakdown</span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Engineered for Modern Convenience
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Digital Touch Display, DIY Self-Serviceable Filters, Auto-Flush system, and 50%+ high-efficiency water recovery.
            </p>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/products/ionizer-features-callout.jpg"
                alt="Vivanwave T-7 Water Ionizer - Smart Display, Self-Serviceable Filters, Auto-Flush & 50%+ Recovery"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* 7. KEY PERFORMANCE HIGHLIGHTS (6 CLEAN CARDS) */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Engineering Excellence</span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Key Performance Highlights
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-300">
              Selected for medical-grade reliability, continuous high-volume output, and intuitive user operation.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xs transition hover:border-sky-500/40 hover:bg-slate-900/90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/80 text-sky-400 border border-blue-500/30">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">7 Platinum-Coated Titanium Plates</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                High-grade solid titanium plates coated with pure platinum for stable electrolysis, high antioxidant generation (-ORP), and long-lasting performance. Plate dimensions: 135 mm × 75 mm × 0.5 mm each.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xs transition hover:border-sky-500/40 hover:bg-slate-900/90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/80 text-sky-400 border border-blue-500/30">
                <Gauge className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">50 LPH Heavy-Duty Inbuilt RO</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Equipped with a 400 GPD high-pressure booster pump and a 400 GPD membrane to easily handle high-volume drinking and cooking demands (50–60 LPH capacity).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xs transition hover:border-sky-500/40 hover:bg-slate-900/90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-950/80 text-amber-400 border border-amber-500/30">
                <Wrench className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">Self-Serviceable Filters Architecture</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Designed with user-friendly modular cartridges that allow quick DIY cleaning and effortless replacements, saving recurring service charges.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xs transition hover:border-sky-500/40 hover:bg-slate-900/90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-950/80 text-purple-400 border border-purple-500/30">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">Advanced Multi-Stage Sterilization</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Features 3-in-1 Sediment &amp; Carbon pre-filtration (1100 IV Coconut Shell Activated Carbon), UF membrane, and an in-tank 5W UVC LED sterilizer to destroy bacteria, viruses, and bad odors.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xs transition hover:border-sky-500/40 hover:bg-slate-900/90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950/80 text-sky-400 border border-blue-500/30">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">Smart Touch Panel &amp; Digital Controls</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Real-time TDS monitoring, filter lifespan tracking, and digital controls right at your fingertips with responsive touch interface.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xs transition hover:border-sky-500/40 hover:bg-slate-900/90">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-950/80 text-teal-400 border border-teal-500/30">
                <Droplets className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">Automatic TDS Adjuster</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Intelligent mineral controller ensures essential natural minerals like calcium and magnesium are retained for a crisp, natural taste.
              </p>
            </div>
          </div>
        </section>

        {/* 8. IMAGE SHOWCASE BANNER 4: Whole-Body Wellness & Health Benefits */}
        <section className="mt-16 sm:mt-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/products/ionizer-health-benefits.jpg"
                alt="Vivanwave Alkaline Water - Scientifically Designed to Support Whole-Body Wellness"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* 9. HEALTH BENEFITS OF ALKALINE IONIZED WATER (5 CLEAN CARDS) */}
        <section className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-10 backdrop-blur-md">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Scientific Hydration</span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Alkaline Water Isn&apos;t Just Clean — It&apos;s Life-Enhancing
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Ionized alkaline water produced by high-grade platinum electrolysis supports cellular vitality, optimal pH balance, and antioxidant protection.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-950/80 text-rose-400 border border-rose-500/30">
                <HeartPulse className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">Reduces Acidity</h4>
              <p className="mt-1 text-xs text-slate-400">Neutralizes dietary acids and supports comfortable digestion &amp; acid reflux relief.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950/80 text-sky-400 border border-blue-500/30">
                <Droplets className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">Micro-Clustering</h4>
              <p className="mt-1 text-xs text-slate-400">Smaller water molecule clusters penetrate cells 3× faster for cellular hydration.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-950/80 text-amber-400 border border-amber-500/30">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">High Negative ORP</h4>
              <p className="mt-1 text-xs text-slate-400">Rich in active dissolved hydrogen to scavenge free radicals and support vitality.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                <Activity className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">Boosts Energy</h4>
              <p className="mt-1 text-xs text-slate-400">Supports balanced vitality, metabolism, BP/sugar control, and athletic recovery.</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-950/80 text-indigo-400 border border-indigo-500/30">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white">Bone &amp; Gut Health</h4>
              <p className="mt-1 text-xs text-slate-400">Retains essential bio-available calcium and magnesium minerals.</p>
            </div>
          </div>
        </section>

        {/* 10. DIMENSIONS & SPATIAL BLUEPRINT (FROM IONIX REFERENCE) */}
        <section className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 backdrop-blur-md">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Precision Engineering</span>
              <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Dimensions &amp; Spatial Blueprint
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Engineered with an ergonomic form factor that fits seamlessly on kitchen countertops or mounts cleanly on the wall.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 shadow-xs">
                  <Maximize2 className="h-5 w-5 text-sky-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Cabinet Dimensions (H × W × D)</div>
                    <div className="text-sm font-bold text-white">15.5″ × 8.0″ × 15.5″ (394 × 203 × 394 mm)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 shadow-xs">
                  <Layers className="h-5 w-5 text-sky-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Titanium Plate Dimensions</div>
                    <div className="text-sm font-bold text-white">135 mm × 75 mm × 0.5 mm (7 Solid Plates)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-3 shadow-xs">
                  <ShieldCheck className="h-5 w-5 text-sky-400 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Dual-Mount Flexibility</div>
                    <div className="text-sm font-bold text-white">Tabletop / Countertop or Wall Mountable</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-xs lg:col-span-7">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <span className="text-sm text-slate-400">Brand &amp; Model</span>
                  <span className="text-sm font-bold text-white">Vivan Wave - T-7 Water Ionizer</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <span className="text-sm text-slate-400">Model SKU</span>
                  <span className="font-mono text-sm font-bold text-sky-400">{product.sku ?? "VW7IO"}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <span className="text-sm text-slate-400">Inbuilt Storage Tank</span>
                  <span className="text-sm font-semibold text-white">7 Liters (Antibacterial Food-Grade)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <span className="text-sm text-slate-400">Purification Capacity</span>
                  <span className="text-sm font-semibold text-white">50 – 60 LPH (Continuous Flow)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <span className="text-sm text-slate-400">Inlet Water TDS Capability</span>
                  <span className="text-sm font-semibold text-white">Works up to 2,000 PPM TDS</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                  <span className="text-sm text-slate-400">Power Consumption</span>
                  <span className="text-sm font-semibold text-white">RO Mode: ~60W | Ionizer Mode: ~150W</span>
                </div>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-sm text-slate-400">Cabinet Material</span>
                  <span className="text-sm font-semibold text-white">Premium ABS Engineering Plastic</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 11. COMPLETE TECHNICAL SPECIFICATIONS TABLE */}
        <section className="mt-16 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">Executive Spec Sheet</span>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Complete Technical Specifications</h2>
            </div>
            <span className="font-mono text-xs font-semibold text-slate-400">Model SKU: {product.sku ?? "VW7IO"}</span>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3.5 sm:grid-cols-2">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 border-b border-slate-800/70 pb-2.5 text-sm">
                <dt className="text-slate-400 font-medium">{s.label}</dt>
                <dd className="font-semibold text-slate-100 text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 12. THE 4-STEP OWNERSHIP & INSTALLATION JOURNEY */}
        <section className="mt-16 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/70 via-slate-950 to-slate-900/70 p-6 sm:p-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Frictionless Experience</span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              From Reservation to Pure Hydration
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              We make bringing medical-grade ionization to your home effortless with white-glove Pan-India delivery and certified installation.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 font-bold text-sky-400 text-xs border border-blue-500/30">
                01
              </span>
              <h3 className="mt-3 text-base font-bold text-white">Book with 10% Advance</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Pay only {formatINR(advanceAmount)} online now to lock your priority production slot and dispatch allocation.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 font-bold text-sky-400 text-xs border border-blue-500/30">
                02
              </span>
              <h3 className="mt-3 text-base font-bold text-white">Insured Dispatch</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Your unit undergoes 24-point QC testing and ships with full transit insurance directly to your doorstep.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 font-bold text-sky-400 text-xs border border-blue-500/30">
                03
              </span>
              <h3 className="mt-3 text-base font-bold text-white">Doorstep Setup</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                Certified technicians handle countertop positioning or wall mounting, plumbing line connection, and filter prep.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xs">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-950 font-bold text-sky-400 text-xs border border-blue-500/30">
                04
              </span>
              <h3 className="mt-3 text-base font-bold text-white">TDS &amp; Balance</h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                We perform live pH and TDS digital calibration. Pay the balance of {formatINR(balanceAmount)} only once satisfied.
              </p>
            </div>
          </div>
        </section>

        {/* 13. CANCELLATION & REFUND POLICY (DARK THEME) */}
        <ProductCancellationPolicy theme="dark" />

        {/* 14. CUSTOMER REVIEWS INFOGRAPHIC SHOWCASE BANNER */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Verified Customer Experiences</span>
            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Real Stories. Real Health Transformation.
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Discover how families across India experience acid reflux relief, superior cellular hydration, smooth taste, and reliable after-sales service with the Vivan Wave T-7.
            </p>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl backdrop-blur-md">
            <div className="relative aspect-[1024/682] w-full">
              <Image
                src="/products/ionizer-customer-reviews.jpg"
                alt="Vivanwave Ionizer Customer Reviews — Rohit Sharma, Priya Verma, Amit Kumar, Neha Gupta"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* 15. CUSTOMER REVIEWS (DARK THEME) */}
        <ProductReviews product={product} theme="dark" />

        {/* 15. RELATED PRODUCTS */}
        {related.length > 0 ? (
          <div className="mt-16 border-t border-slate-800 pt-12">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Explore Collection</span>
              <h3 className="text-2xl font-bold text-white">You May Also Like</h3>
            </div>
            <ProductGrid products={related} priorityCount={4} />
          </div>
        ) : null}
      </Container>
    </div>
  );
}