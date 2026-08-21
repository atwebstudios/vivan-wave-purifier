import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about ordering, advance payment, installation and service.",
};

export default function FaqPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted">Everything you need to know about ordering and service.</p>
      </div>
      <div className="mt-10">
        <FaqAccordion items={faqs} />
      </div>
    </Container>
  );
}
