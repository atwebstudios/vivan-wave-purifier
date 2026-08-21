import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ProductsBrowser } from "@/components/product/ProductsBrowser";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse water softeners, RO purifiers, tank filters, appliance filters and services. Pay just 20% advance to order.",
};

export default async function ProductsPage({ searchParams }: PageProps<"/products">) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";

  return (
    <div className="py-10 sm:py-12">
      <Container>
        <ProductsBrowser products={products} initialQuery={q} />
      </Container>
    </div>
  );
}
