import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Benefits } from "@/components/home/Benefits";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getFeaturedProducts } from "@/data/products";
import { faqs } from "@/data/faqs";

export default function Home() {
  // Show a varied row of 4: put the RO + Ionizer up front, then fill with the other
  // featured products. Capped at 4 so the grid fills exactly one row (no lonely card).
  const allFeatured = getFeaturedProducts();
  const ionizer = allFeatured.filter((p) => p.category === "ro-ionizers");
  const rest = allFeatured.filter((p) => p.category !== "ro-ionizers");
  const featured = [...ionizer, ...rest].slice(0, 4);

  return (
    <>
      <Hero />
      <TrustBar />

      {/* Featured products */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow="Bestsellers"
              title="Popular right now"
              className="mb-0"
            />
            <ButtonLink href="/products" variant="outline" size="sm" className="hidden sm:inline-flex">
              View all
            </ButtonLink>
          </div>
          <div className="mt-8">
            <ProductGrid products={featured} priorityCount={4} />
          </div>
        </Container>
      </section>

      <CategoryGrid />
      <Benefits />
      <HowItWorks />
      <Testimonials />

      {/* FAQ */}
      <section className="bg-slate-50 py-14 sm:py-16">
        <Container>
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions" />
          <div className="mt-10">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
