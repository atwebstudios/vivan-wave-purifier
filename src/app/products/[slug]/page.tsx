import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Flame, Eye } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductVariantProvider } from "@/components/product/ProductVariantContext";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductCancellationPolicy } from "@/components/product/ProductCancellationPolicy";
import { IonizerFlagshipView } from "@/components/product/IonizerFlagshipView";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { getCategory } from "@/data/categories";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { soldRecently, viewersNow } from "@/lib/pricing";

const tagMeta = {
  iron: { label: "Iron Reduction", className: "bg-orange-100 text-orange-700" },
  multistage: { label: "Multi-Stage Protection", className: "bg-blue-100 text-blue-700" },
} as const;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.shortDesc };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  // Dedicated Ultra-Luxury Flagship View for RO + Ionizer
  if (product.category === "ro-ionizers") {
    return <IonizerFlagshipView product={product} category={category} related={related} />;
  }

  return (
    <div className="py-10 sm:py-12">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted">
          <Link href="/products" className="hover:text-brand-700">
            Products
          </Link>
          {category ? (
            <>
              {" / "}
              <Link
                href={`/products/category/${category.slug}`}
                className="hover:text-brand-700"
              >
                {category.name}
              </Link>
            </>
          ) : null}
          {" / "}
          <span className="text-slate-700">{product.name}</span>
        </nav>

        <ProductVariantProvider product={product}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Gallery with Zoom */}
            <ProductGallery product={product} priority />

            {/* Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {category ? (
                  <Link
                    href={`/products/category/${category.slug}`}
                    className="text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    {category.name}
                  </Link>
                ) : null}
                {product.sku ? (
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-600">
                    SKU: {product.sku}
                  </span>
                ) : null}
                {product.badge ? (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${product.badge === "premium"
                      ? "bg-gold-500 text-white"
                      : "bg-brand-600 text-white"
                      }`}
                  >
                    {product.badge === "premium" ? "PREMIUM SERIES" : "BESTSELLER"}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{product.name}</h1>
              {product.subtitle ? (
                <p className="mt-1 text-sm font-medium text-brand-700 sm:text-base">{product.subtitle}</p>
              ) : null}
              {product.tag ? (
                <span
                  className={`mt-3 inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tagMeta[product.tag].className}`}
                >
                  {tagMeta[product.tag].label}
                </span>
              ) : null}
              <div className="mt-3">
                <Rating value={product.rating} count={product.reviewCount} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                  <Flame className="h-4 w-4 fill-red-500 text-red-500" />
                  {soldRecently(product.id)} sold in last 24 hours
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500">
                  <Eye className="h-4 w-4" />
                  {viewersNow(product.id)} people are viewing right now
                </span>
              </div>
              <div className="mt-4">
                <Price price={product.price} mrp={product.mrp} size="lg" />
                <p className="mt-1 text-xs text-muted">Inclusive of all taxes.</p>
              </div>

              <p className="mt-5 text-slate-700">{product.longDesc}</p>

              {product.highlights.length > 0 ? (
                <ul className="mt-5 space-y-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-6">
                <ProductPurchase product={product} />
              </div>
            </div>
          </div>
        </ProductVariantProvider>

        {/* Specs */}
        {product.specs.length > 0 ? (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-ink">Specifications</h2>
            <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="text-sm font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {/* Cancellation & Refund Policy */}
        <ProductCancellationPolicy />

        {/* Reviews */}
        <ProductReviews product={product} />

        {/* Related */}
        {related.length > 0 ? (
          <div className="mt-16">
            <SectionHeading align="left" title="You may also like" />
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
