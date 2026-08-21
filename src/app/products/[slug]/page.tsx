import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductImage } from "@/components/product/ProductImage";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Price } from "@/components/ui/Price";
import { Rating } from "@/components/ui/Rating";
import { getCategory } from "@/data/categories";
import { getProduct, getRelatedProducts, products } from "@/data/products";

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

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Always Available
            </span>
            <ProductImage product={product} priority className="rounded-3xl" />
          </div>

          {/* Info */}
          <div>
            {category ? (
              <Link
                href={`/products/category/${category.slug}`}
                className="text-sm font-semibold text-brand-600"
              >
                {category.name}
              </Link>
            ) : null}
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">{product.name}</h1>
            <div className="mt-3">
              <Rating value={product.rating} count={product.reviewCount} />
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

        {/* Specs */}
        {product.specs.length > 0 ? (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-ink">Specifications</h2>
            <dl className="mt-4 grid gap-x-8 gap-y-3 rounded-2xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 border-b border-slate-100 pb-2">
                  <dt className="text-sm text-muted">{s.label}</dt>
                  <dd className="text-sm font-medium text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

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
