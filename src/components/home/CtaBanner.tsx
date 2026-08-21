import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-500 px-6 py-12 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-2xl font-bold sm:text-3xl">
            Ready for better water at home?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-brand-100">
            Reserve your softener, purifier or filter today with just 20% advance.
          </p>
          <div className="relative mt-7 flex justify-center">
            <ButtonLink href="/products" size="lg" variant="secondary">
              Start shopping
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
