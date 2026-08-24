import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Rating } from "@/components/ui/Rating";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  // Duplicate the list so the right-to-left marquee loops seamlessly.
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading eyebrow="Loved across India" title="What our customers say" />
      </Container>

      <div className="group mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)]">
        <div
          className="flex w-max gap-5 group-hover:[animation-play-state:paused]"
          style={{ animation: "vw-marquee 40s linear infinite" }}
        >
          {loop.map((t, i) => (
            <figure
              key={i}
              className="flex w-[320px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Rating value={t.rating} />
              <blockquote className="mt-3 flex-1 text-sm text-slate-700">“{t.quote}”</blockquote>
              <figcaption className="mt-4 border-t border-slate-100 pt-3">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-muted">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
