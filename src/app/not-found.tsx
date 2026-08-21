import { Droplet } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <Droplet className="mx-auto h-14 w-14 fill-brand-100 text-brand-500" />
      <h1 className="mt-4 text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <ButtonLink href="/" size="lg" className="mt-6">
        Back to home
      </ButtonLink>
    </Container>
  );
}
