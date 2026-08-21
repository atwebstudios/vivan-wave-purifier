import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Vivanwave provides water softeners, RO purifiers, filters and services across India, with a simple 20% advance ordering model.",
};

export default function AboutPage() {
  return (
    <Container className="max-w-3xl py-12 sm:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink">About Vivanwave</h1>
      <div className="mt-6 space-y-4 text-slate-700">
        <p>
          Vivanwave helps Indian homes and businesses get cleaner, softer and safer water. We
          offer a complete range of water softeners, RO purifiers, whole-home tank filters,
          appliance filters and professional services — all always available, with no stock
          waiting.
        </p>
        <p>
          We keep buying simple: reserve any product or service with just a{" "}
          <strong>20% advance</strong>, and pay the balance at delivery or installation. Our
          trained technicians handle fitting, water-quality checks and after-sales support.
        </p>
        <p>
          Whether you live in a compact flat or a large villa, we have a solution sized for your
          water and your space.
        </p>
      </div>
      <ButtonLink href="/products" size="lg" className="mt-8">
        Explore our products
      </ButtonLink>
    </Container>
  );
}
