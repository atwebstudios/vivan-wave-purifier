import {
  Sparkles,
  Smile,
  WashingMachine,
  Droplets,
  Flame,
  ShieldCheck,
  Truck,
  Leaf,
  Gauge,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const benefits: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Sparkles, title: "Prevents Hair Damage", desc: "Softer water keeps hair smooth and reduces hair fall." },
  { Icon: Smile, title: "Prevents Skin Damage", desc: "Gentler water helps keep skin soft and healthy." },
  { Icon: WashingMachine, title: "Protects Appliances", desc: "Stops scale build-up in pipes, taps and machines." },
  { Icon: Droplets, title: "Better Detergent Lather", desc: "More lather using less soap and detergent." },
  { Icon: Flame, title: "Protects Heaters & Washers", desc: "Extends the life of geysers and washing machines." },
  { Icon: ShieldCheck, title: "All India Warranty", desc: "Backed by warranty and support across India." },
  { Icon: Truck, title: "Doorstep Delivery", desc: "Delivered and installed right at your home." },
  { Icon: Leaf, title: "Food Grade Resin", desc: "Safe, food-grade ion-exchange resin inside." },
  { Icon: Gauge, title: "600–8000 LPH Models", desc: "A size for every home, villa and business." },
];

export function Benefits() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="India's Bestselling Water Softener Brand"
          title="Why families choose Vivaan Wave"
          subtitle="Softer water that protects your home, your appliances and your family — delivered and installed with care."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm transition-transform group-hover:scale-105">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
