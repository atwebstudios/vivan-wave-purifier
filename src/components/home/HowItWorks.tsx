import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    n: "1",
    title: "Add to cart",
    desc: "Browse ~100 always-available products and add what you need.",
  },
  {
    n: "2",
    title: "Pay 20% advance",
    desc: "Confirm your order by paying just 20% securely online.",
  },
  {
    n: "3",
    title: "Delivery & installation",
    desc: "Our team delivers and installs, with a water-quality check.",
  },
  {
    n: "4",
    title: "Pay the balance",
    desc: "Settle the remaining amount at delivery or installation.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-50 py-14 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Simple & flexible"
          title="How ordering works"
          subtitle="No full payment upfront — reserve your product or service with a small advance."
        />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 text-base font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
