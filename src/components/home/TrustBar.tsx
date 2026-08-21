import { Wallet, PackageCheck, Wrench, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  { label: "Pay 20% Advance", Icon: Wallet },
  { label: "Always in Stock", Icon: PackageCheck },
  { label: "Expert Installation", Icon: Wrench },
  { label: "Genuine Spares", Icon: Sparkles },
];

export function TrustBar() {
  return (
    <section className="bg-white">
      <Container className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
        {items.map(({ label, Icon }) => (
          <div key={label} className="flex flex-col items-center gap-3 text-center">
            <Icon className="h-8 w-8 text-brand-600" strokeWidth={1.7} />
            <p className="text-sm font-semibold text-ink">{label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
