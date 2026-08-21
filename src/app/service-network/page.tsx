import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Service Network",
  description: "Vivanwave serves homes and businesses across major cities in India.",
};

const cities = [
  "Delhi NCR", "Mumbai", "Pune", "Bengaluru", "Hyderabad", "Chennai",
  "Kolkata", "Ahmedabad", "Jaipur", "Bhopal", "Indore", "Lucknow",
  "Chandigarh", "Nagpur", "Surat", "Kochi",
];

export default function ServiceNetworkPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Our Service Network</h1>
        <p className="mt-2 text-muted">
          We deliver and install across India. Confirm exact timelines for your location after
          you order — our team will reach out.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cities.map((city) => (
          <div
            key={city}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-medium text-slate-700"
          >
            <MapPin className="h-4 w-4 text-brand-600" /> {city}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-muted">Don&apos;t see your city? We may still serve you.</p>
        <ButtonLink href="/contact" variant="secondary" className="mt-4">
          Check availability
        </ButtonLink>
      </div>
    </Container>
  );
}
