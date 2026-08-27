import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl px-6 py-12 text-center text-white sm:px-12">
          <Image
            src="/cta-dark-pure-water-bg.jpg"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="absolute inset-0 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-900/70 via-brand-800/58 to-brand-700/48" />
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
