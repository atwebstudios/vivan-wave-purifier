import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Rating } from "@/components/ui/Rating";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Loved across India"
          title="What our customers say"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5"
            >
              <Rating value={t.rating} />
              <blockquote className="mt-3 flex-1 text-sm text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t border-slate-100 pt-3">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-muted">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
