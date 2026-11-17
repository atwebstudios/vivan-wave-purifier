"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Gauge,
  Sparkles,
  CheckCircle2,
  XCircle,
  Flame,
  Eye,
  Award,
  Check,
  Truck,
  Wrench,
  Droplets,
  Shirt,
  Maximize2,
  Layers,
  ChevronDown,
  ArrowRight,
  ShoppingCart,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCancellationPolicy } from "@/components/product/ProductCancellationPolicy";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductGrid } from "@/components/product/ProductGrid";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatINR, MIN_ADVANCE_RATE, soldRecently, viewersNow } from "@/lib/pricing";
import { useCart } from "@/lib/cart-context";
import { products } from "@/data/products";
import type { Product, Category } from "@/lib/types";

interface WashingMachineFilterViewProps {
  product: Product;
  category?: Category;
  related?: Product[];
}

export function WashingMachineFilterView({
  product: initialProduct,
  category,
  related = [],
}: WashingMachineFilterViewProps) {
  const router = useRouter();
  const { add } = useCart();

  // Find both variants (Blue Cap & Black Cap) in the product catalog
  const blueProduct =
    products.find((p) => p.sku === "VWWMBLUE") ?? initialProduct;
  const blackProduct =
    products.find((p) => p.sku === "VWWMBLACK") ?? initialProduct;

  const [activeSku, setActiveSku] = useState<"VWWMBLUE" | "VWWMBLACK">(
    initialProduct.sku === "VWWMBLACK" ? "VWWMBLACK" : "VWWMBLUE",
  );

  const product = activeSku === "VWWMBLUE" ? blueProduct : blackProduct;

  const [qty, setQty] = useState(1);
  const lineTotal = product.price * qty;
  const advanceAmount = Math.round(lineTotal * MIN_ADVANCE_RATE);
  const balanceAmount = lineTotal - advanceAmount;

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = product.faqs ?? [
    {
      q: "How is this better than small washing machine filters?",
      a: "Ordinary small filters have limited media capacity and get choked within 4 to 6 months. Our 20-inch heavy-duty system acts as a permanent, high-capacity solution that lasts up to 1 year, protects your appliances better, and handles heavy mud and hard water effortlessly.",
    },
    {
      q: "Does it clean muddy or rusty water before it enters the washing machine?",
      a: "Yes. The integrated Sediment Bag traps mud, sand, dust, and rust particles so clean, clear water reaches your clothes.",
    },
    {
      q: "Will this fit my washing machine?",
      a: "Yes. It works seamlessly with all brands of both Front-Load and Top-Load washing machines (LG, Samsung, Bosch, IFB, Whirlpool, Haier, etc.).",
    },
    {
      q: "Will it remove old limescale already inside my machine?",
      a: "This filter prevents new limescale from forming. To clear heavy existing scale inside an older drum, run a single cycle with a descaling tablet, and let the Vivanwave 20-Inch Filter keep it scale-free going forward.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50/60 text-slate-800">
      {/* Subtle top ocean blue accent border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600" />

      <Container className="relative py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 sm:text-sm">
          <Link href="/" className="transition hover:text-brand-700">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/products" className="transition hover:text-brand-700">
            Products
          </Link>
          {category ? (
            <>
              <span className="text-slate-400">/</span>
              <Link
                href={`/products/category/${category.slug}`}
                className="transition hover:text-brand-700"
              >
                {category.name}
              </Link>
            </>
          ) : null}
          <span className="text-slate-400">/</span>
          <span className="font-semibold text-slate-900">
            20″ Heavy-Duty Washing Machine Water Filter
          </span>
        </nav>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* Left Column: Product Gallery with Sticky Stability */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 lg:self-start">
            <ProductGallery product={product} priority isSticky={false} />

            {/* 4 Appliance Assurance Badges */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200/90 bg-white p-3 text-center shadow-xs">
                <ShieldCheck className="mx-auto h-5 w-5 text-sky-600" />
                <div className="mt-1 text-xs font-bold text-slate-900">
                  1-Year Life
                </div>
                <div className="text-[10px] text-slate-500">Heavy-Duty 20″</div>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-white p-3 text-center shadow-xs">
                <Gauge className="mx-auto h-5 w-5 text-sky-600" />
                <div className="mt-1 text-xs font-bold text-slate-900">
                  Pressure Gauge
                </div>
                <div className="text-[10px] text-slate-500">Real-Time PSI</div>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-white p-3 text-center shadow-xs">
                <Wrench className="mx-auto h-5 w-5 text-sky-600" />
                <div className="mt-1 text-xs font-bold text-slate-900">
                  Easy DIY
                </div>
                <div className="text-[10px] text-slate-500">Quick Change</div>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-white p-3 text-center shadow-xs">
                <Truck className="mx-auto h-5 w-5 text-sky-600" />
                <div className="mt-1 text-xs font-bold text-slate-900">
                  Fast Delivery
                </div>
                <div className="text-[10px] text-slate-500">Pan-India Transit</div>
              </div>
            </div>
          </div>

          {/* Right Column: Identity, Cap Selector & Purchase */}
          <div className="flex flex-col lg:col-span-6">
            {/* Badges Strip */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-300 bg-sky-50 px-3 py-0.5 text-[11px] font-bold tracking-wider text-sky-800 uppercase shadow-xs">
                <Award className="h-3.5 w-3.5 text-sky-600" />
                Appliance Care Series
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-0.5 font-mono text-[11px] font-bold text-slate-700 shadow-xs">
                SKU: {product.sku}
              </span>
              <span className="rounded-full bg-emerald-600 px-3 py-0.5 text-[11px] font-bold text-white shadow-xs">
                BESTSELLER
              </span>
            </div>

            {/* Product Title & Subtitle */}
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-3xl">
              Vivanwave 20-Inch Heavy-Duty Washing Machine Water Filter
            </h1>
            <p className="mt-1.5 text-base font-semibold text-sky-700">
              Sediment Bag &amp; Anti-Scaling Technology | Top Load &amp; Front Load
            </p>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Long-Lasting Solution for Hard Water, Limescale &amp; Muddy Water (1-Year Filter Life)
            </p>

            {/* Rating & Social Proof */}
            <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-y border-slate-200/80 py-2.5 text-xs sm:text-sm">
              <Rating value={product.rating} count={product.reviewCount} />
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-rose-600">
                <Flame className="h-4 w-4 fill-rose-500 text-rose-500" />
                {soldRecently(product.id)} units sold in last 24h
              </span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <Eye className="h-4 w-4 text-sky-600" />
                {viewersNow(product.id)} viewing now
              </span>
            </div>

            {/* Price & 10% Advance Card */}
            <div className="mt-5 rounded-2xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30 p-5 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Special Launch Price (GST Inclusive)
                  </span>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                      {formatINR(product.price)}
                    </span>
                    {product.mrp > product.price ? (
                      <>
                        <span className="text-base text-slate-400 line-through sm:text-lg">
                          {formatINR(product.mrp)}
                        </span>
                        <span className="rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                          Save {formatINR(product.mrp - product.price)} (
                          {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF)
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
                <span className="text-xs text-slate-500">Free Doorstep Delivery</span>
              </div>

              {/* 10% Advance Highlight Banner */}
              <div className="mt-4 rounded-xl border border-sky-200 bg-sky-100/70 p-3.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 font-bold text-sky-900">
                    <Sparkles className="h-4 w-4 text-sky-600" />
                    Pay Only 10% Advance to Order
                  </span>
                  <span className="font-mono text-base font-black text-sky-900">
                    {formatINR(advanceAmount)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-700">
                  Remaining balance of{" "}
                  <span className="font-semibold text-slate-900">{formatINR(balanceAmount)}</span>{" "}
                  is payable at the time of delivery/installation.
                </p>
              </div>
            </div>

            {/* Cap Color Selection (Blue Cap vs Black Cap) */}
            <div className="mt-5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Choose Cap Color &amp; Model
              </label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveSku("VWWMBLUE")}
                  className={`flex flex-col items-start rounded-xl border-2 p-3 text-left transition-all ${
                    activeSku === "VWWMBLUE"
                      ? "border-sky-600 bg-sky-50/80 shadow-xs ring-2 ring-sky-600/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-900 sm:text-sm">
                      <span className="h-3.5 w-3.5 rounded-full bg-blue-600 ring-2 ring-blue-300" />
                      Royal Blue Cap
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-500">
                      VWWMBLUE
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-extrabold text-sky-800">
                    ₹4,400{" "}
                    <span className="text-xs font-normal text-slate-400 line-through">
                      ₹5,100
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSku("VWWMBLACK")}
                  className={`flex flex-col items-start rounded-xl border-2 p-3 text-left transition-all ${
                    activeSku === "VWWMBLACK"
                      ? "border-sky-600 bg-sky-50/80 shadow-xs ring-2 ring-sky-600/20"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold text-slate-900 sm:text-sm">
                      <span className="h-3.5 w-3.5 rounded-full bg-slate-900 ring-2 ring-slate-400" />
                      Matte Black Cap
                    </span>
                    <span className="font-mono text-xs font-semibold text-slate-500">
                      VWWMBLACK
                    </span>
                  </div>
                  <div className="mt-1 text-sm font-extrabold text-sky-800">
                    ₹3,680{" "}
                    <span className="text-xs font-normal text-slate-400 line-through">
                      ₹4,200
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Quantity & Purchase CTAs */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-800">Select Quantity</span>
                <QuantityStepper value={qty} onChange={setQty} />
              </div>

              <div className="mt-4 flex justify-between border-t border-slate-100 pt-3 text-sm">
                <span className="text-slate-600">Order Total ({qty} unit)</span>
                <span className="font-bold text-slate-900">{formatINR(lineTotal)}</span>
              </div>
              <div className="mt-1 flex justify-between text-xs text-sky-800">
                <span className="font-semibold">Pay 10% Advance Now</span>
                <span className="font-bold">{formatINR(advanceAmount)}</span>
              </div>
              <div className="mt-1 flex justify-between text-xs text-slate-500">
                <span>Balance on Delivery</span>
                <span>{formatINR(balanceAmount)}</span>
              </div>

              <div className="mt-5 grid gap-2.5">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-sky-600 to-blue-700 font-bold text-white shadow-md shadow-sky-600/20 hover:from-sky-500 hover:to-blue-600 active:scale-[0.99]"
                  onClick={() => {
                    const variantId = product.variants[0]?.id ?? "std";
                    add(product.id, variantId, qty);
                    router.push("/checkout");
                  }}
                >
                  Buy Now • Pay {formatINR(advanceAmount)} Advance →
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-slate-300 bg-white font-semibold text-slate-800 hover:bg-slate-50 hover:text-slate-900"
                  onClick={() => {
                    const variantId = product.variants[0]?.id ?? "std";
                    add(product.id, variantId, qty);
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4 text-sky-600" />
                  Add to Cart
                </Button>
              </div>
              <p className="mt-3 text-center text-xs text-slate-500">
                Always in stock • Balance payable on delivery/installation
              </p>
            </div>

            {/* Key Highlights Checklist */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Key Highlights
              </h3>
              <ul className="mt-3 space-y-2.5">
                {product.highlights.map((h) => {
                  const parts = h.split(":");
                  const title = parts[0];
                  const desc = parts.slice(1).join(":");
                  return (
                    <li key={h} className="flex items-start gap-2.5 text-xs text-slate-700 sm:text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                      <span>
                        <strong className="text-slate-900">{title}:</strong>
                        {desc}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* 1. METRICS & TELEMETRY STRIP */}
        <section className="mt-14 sm:mt-16">
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            <div className="rounded-2xl border border-sky-100 bg-white p-5 text-center shadow-xs">
              <ShieldCheck className="mx-auto h-6 w-6 text-sky-600" />
              <div className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                20-Inch
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Up to 1-Year Life
              </div>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 text-center shadow-xs">
              <Gauge className="mx-auto h-6 w-6 text-sky-600" />
              <div className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                0–100 PSI
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Real-Time Gauge
              </div>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 text-center shadow-xs">
              <Layers className="mx-auto h-6 w-6 text-sky-600" />
              <div className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                01 Dual-Action
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Sediment + Anti-Scale
              </div>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-5 text-center shadow-xs">
              <Maximize2 className="mx-auto h-6 w-6 text-sky-600" />
              <div className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Universal
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Top &amp; Front Load
              </div>
            </div>
          </div>
        </section>

        {/* 2. STRATEGIC COMPARISON: 20-INCH HEAVY-DUTY VS ORDINARY SMALL FILTERS */}
        <section className="mt-14 sm:mt-18 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600">
              <Sparkles className="h-4 w-4" />
              Engineered For Indian Water Conditions
            </span>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Why Choose Vivanwave 20-Inch Over Ordinary Small Filters?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              Most washing machine filters available in the market come in small, compact tap sizes whose cartridges choke in just 4 to 6 months, forcing you to pay for frequent replacements. The Vivanwave 20-Inch Heavy-Duty Filter is a permanent, high-capacity solution engineered to handle heavy mud and hard water effortlessly.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Ordinary Small Filters (Problems) */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                  <XCircle className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-rose-950">
                  Ordinary Small Filters
                </h3>
              </div>
              <ul className="mt-5 space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <span>
                    <strong>Chokes in 4–6 Months:</strong> Tiny media chamber gets clogged rapidly by Indian borewell mud and silt.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <span>
                    <strong>Recurring Cartridge Costs:</strong> Forces you to constantly buy expensive replacement cartridges 2–3 times a year.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <span>
                    <strong>Restricts Water Flow:</strong> As small cartridges clog, machine inlet pressure drops, causing slow fills and error codes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                  <span>
                    <strong>Blind Guesswork:</strong> No pressure gauge — you never know when the cartridge is blocked until the machine stops filling.
                  </span>
                </li>
              </ul>
            </div>

            {/* Vivanwave 20-Inch Heavy-Duty (Solution) */}
            <div className="rounded-2xl border border-sky-300 bg-gradient-to-br from-sky-50/80 via-blue-50/40 to-white p-6 shadow-xs ring-1 ring-sky-200">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-white shadow-xs">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Vivanwave 20-Inch Heavy-Duty Filter
                </h3>
              </div>
              <ul className="mt-5 space-y-3 text-xs sm:text-sm text-slate-800">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    <strong>Up to 1 Full Year Cartridge Life:</strong> Massive 20-inch housing holds significantly higher filtration media.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    <strong>Zero Pressure Drop:</strong> High-flow 3/4″ &amp; 1″ plumbing fills washing machines quickly without error codes.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    <strong>Real-Time Analog Pressure Gauge:</strong> Built-in top gauge visually alerts you the exact moment cleaning is needed.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                  <span>
                    <strong>Permanent Appliance Shield:</strong> Heavy-duty BPA-free food-grade housing built to last for decades.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS (SIMPLE & EFFECTIVE) */}
        <section className="mt-14 sm:mt-18 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Dual-Action Technology
            </span>
            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              How It Works (Simple &amp; Effective)
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Combines heavy physical particle trapping with advanced polyphosphate chemical sequestering inside one solid 20-inch cartridge.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Stage 1: Sediment Bag */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <Droplets className="h-6 w-6" />
              </div>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-sky-700">
                Action 01 — Physical Barrier
              </span>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                Sediment Bag
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                Yeh paani mein aane wali saari mitti, dhool (dust) aur zang (rust) ko wahin rok leta hai, taaki aapki machine mein sirf saaf paani jaye.
              </p>
              <div className="mt-4 border-t border-slate-200 pt-3">
                <span className="text-xs font-semibold text-sky-700">
                  ✓ Traps Mud, Sand, Dust &amp; Rust Particles
                </span>
              </div>
            </div>

            {/* Stage 2: Anti-Scaling Media */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-sky-700">
                Action 02 — Chemical Protection
              </span>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                Anti-Scaling Media
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
                Yeh hard water ke minerals ko control karta hai jisse machine ke andar scaling nahi jamti. Isse aapki washing machine kharab nahi hogi, uski life badhegi aur kapde bhi zyada saaf, chamakdaar aur soft dhulenge.
              </p>
              <div className="mt-4 border-t border-slate-200 pt-3">
                <span className="text-xs font-semibold text-sky-700">
                  ✓ Eliminates Scaling • Extends Machine Life • Softer Clothes
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. KEY BENEFITS */}
        <section className="mt-14 sm:mt-18 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              Proven Performance Advantages
            </span>
            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Key Benefits
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Why the Vivanwave 20-Inch Heavy-Duty Filter outperforms ordinary tap-mounted alternatives in both durability and filtration efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Benefit 1 */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-6 shadow-xs transition hover:border-sky-300 hover:shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-xs">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                Built to Last (1 Year Cartridge Life)
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Massive 20-inch media capacity outperforms small tap-mounted filters in both durability and filtration efficiency.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-6 shadow-xs transition hover:border-sky-300 hover:shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-xs">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                Eliminates Limescale
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Keeps heating rods and drums scale-free for faster heating and better detergent lathering.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-6 shadow-xs transition hover:border-sky-300 hover:shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-xs">
                <Shirt className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                Great for Your Clothes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Prevents harsh mineral deposits on fabric fibers, keeping clothes softer and colors vibrant.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-6 shadow-xs transition hover:border-sky-300 hover:shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-xs">
                <Gauge className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                Zero Pressure Drop
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Engineered for high flow rate so your washing machine fills quickly without error codes.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-6 shadow-xs transition hover:border-sky-300 hover:shadow-sm sm:col-span-2 lg:col-span-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white shadow-xs">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">
                Easy Visual Monitoring
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Top-mounted pressure gauge alerts you immediately if sediment buildup restricts flow.
              </p>
            </div>
          </div>
        </section>

        {/* 4. VISUAL SHOWCASE BANNER 1: Protects Heating Coil & Drum */}
        <section className="mt-14 sm:mt-18 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="relative aspect-[16/10] w-full lg:col-span-6">
              <Image
                src="/products/washing-machine-drum-protection.jpg"
                alt="Protects Washing Machine Heating Coil and Drum from Limescale"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-10 lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
                <ShieldCheck className="h-4 w-4" />
                Appliance Longevity
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Protects Your Expensive Appliances
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Hard water deposits white chalky limescale on your washing machine’s heating rods, drum perforations, and inlet solenoid valves. This reduces heating efficiency, causes frequent breakdown calls, and spikes your electricity bill.
              </p>

              <div className="mt-6 space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>Scale-Free Heating Elements:</strong> Heats water faster, saving up to 25% energy.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>Smooth Drum Rotation:</strong> Keeps micro-holes clean and prevents friction tears.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>Zero Solenoid Valve Choking:</strong> Ensures smooth automatic cycle operation.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. VISUAL SHOWCASE BANNER 2: Brighter, Softer Laundry */}
        <section className="mt-14 sm:mt-18 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="p-6 sm:p-10 lg:col-span-6 order-2 lg:order-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
                <Shirt className="h-4 w-4" />
                Superior Fabric Care
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Brighter, Softer &amp; Fresh Laundry
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                Hard water calcium locks into fabric fibers, causing scratchy towels, faded colors, and dingy yellow stains. By neutralizing minerals before water enters your drum, Vivanwave helps detergents lather richly and rinse cleanly.
              </p>

              <div className="mt-6 space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>Rich Detergent Lathering:</strong> Use up to 30% less detergent per wash load.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>Brighter Whites &amp; Colors:</strong> Prevents yellow mud staining and fabric dullness.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span><strong>Gentle On Sensitive Skin:</strong> Removes chemical mineral residue from clothes and towels.</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[16/10] w-full lg:col-span-6 order-1 lg:order-2">
              <Image
                src="/products/washing-machine-clothes-softness.jpg"
                alt="Soft, Fluffy, and Bright Washing Machine Laundry Results"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 6. UNIVERSAL COMPATIBILITY CARD */}
        <section className="mt-14 sm:mt-18 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                100% Universal Compatibility
              </span>
              <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Fits All Brands of Top-Load &amp; Front-Load Machines
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                Engineered with standard high-flow inlet/outlet threads that connect directly to your home waterline and standard washing machine inlet pipes with zero modification.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-bold text-slate-800">
                  LG
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-bold text-slate-800">
                  Samsung
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-bold text-slate-800">
                  Bosch
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-bold text-slate-800">
                  IFB
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-bold text-slate-800">
                  Whirlpool
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-bold text-slate-800">
                  Haier / Siemens
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                * Also ideal for inlet protection on residential dishwashers and high-capacity bathroom geysers.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 lg:col-span-5">
              <Image
                src="/products/washing-machine-compatibility.png"
                alt="Universal Compatibility for Top Load and Front Load Washing Machines"
                fill
                className="object-contain p-2"
              />
            </div>
          </div>
        </section>

        {/* 7. COMPLETE TECHNICAL SPECIFICATIONS TABLE */}
        <section className="mt-14 sm:mt-18 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 gap-2">
            <div>
              <span className="text-xs font-bold tracking-widest text-sky-700 uppercase">
                Product Spec Sheet
              </span>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Technical Specifications
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-sky-700">
              SKU: {product.sku}
            </span>
          </div>

          <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3.5 sm:grid-cols-2">
            {product.specs.map((s) => (
              <div
                key={s.label}
                className="flex justify-between gap-4 border-b border-slate-100 pb-2.5 text-sm"
              >
                <dt className="text-slate-500 font-medium">{s.label}</dt>
                <dd className="font-semibold text-slate-900 text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* 8. INTERACTIVE FAQS */}
        <section className="mt-14 sm:mt-18">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Customer Support
            </span>
            <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Common questions about installation, cartridge life, limescale removal, and machine fit.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-bold text-slate-900 transition hover:bg-slate-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-sky-600 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600 bg-slate-50/50">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. CANCELLATION & REFUND POLICY */}
        <div className="mt-14">
          <ProductCancellationPolicy />
        </div>

        {/* 10. CUSTOMER REVIEWS */}
        <div className="mt-14">
          <ProductReviews product={product} />
        </div>

        {/* 11. RELATED PRODUCTS */}
        {related.length > 0 ? (
          <div className="mt-16 border-t border-slate-200 pt-12">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                Explore More Tank Filters
              </span>
              <h3 className="text-2xl font-bold text-slate-900">You May Also Like</h3>
            </div>
            <ProductGrid products={related} priorityCount={4} />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
