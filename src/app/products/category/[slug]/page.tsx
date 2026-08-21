import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Category not found" };
  return { title: category.name, description: category.tagline };
}

export default async function CategoryPage({
  params,
}: PageProps<"/products/category/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug);

  return (
    <div className="py-10 sm:py-12">
      <Container>
        <nav className="mb-4 text-sm text-muted">
          <a href="/products" className="hover:text-brand-700">
            Products
          </a>{" "}
          / <span className="text-slate-700">{category.name}</span>
        </nav>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-ink">
            {category.name}
          </h1>
          <p className="mt-2 text-muted">{category.tagline}</p>
        </header>
        <ProductGrid products={items} priorityCount={4} />
      </Container>
    </div>
  );
}
