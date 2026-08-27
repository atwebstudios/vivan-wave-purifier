import type { Metadata } from "next";
import Image from "next/image";
import { Phone, Mail, MessageCircle, MapPin, Clock, LifeBuoy, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vivanwave — call, WhatsApp or email us for product advice, installation and support across India.",
};

const PHONE = "+91 99990 12123";
const WHATSAPP = "919999012123";
const EMAIL = "support@vivanwave.com";

const methods = [
  {
    Icon: Phone,
    label: "Call us",
    value: PHONE,
    href: "tel:+919999012123",
    action: "Tap to call",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: `https://wa.me/${WHATSAPP}`,
    action: "Open WhatsApp",
    external: true,
  },
  {
    Icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    action: "Send an email",
  },
  {
    Icon: MapPin,
    label: "Service area",
    value: "Serving homes & businesses pan-India",
    href: "/service-network",
    action: "See coverage",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header band */}
      <section className="relative overflow-hidden rounded-b-[2.5rem] text-white">
        <Image
          src="/contact-support-hero-bg-fixed.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover object-top sm:object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/88 via-brand-900/60 to-brand-900/30" />
        <Container className="relative py-14 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">Contact us</p>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            We&apos;re here to help you get softer water
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-100">
            Questions about choosing a softener or iron remover, booking installation, or an existing
            order? Reach out — our team usually replies within 24 hours.
          </p>
        </Container>
      </section>

      {/* Quick contact methods */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {methods.map(({ Icon, label, value, href, action, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted">{label}</p>
                <p className="mt-1 font-semibold text-ink">{value}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-700">
                  {action}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Form + info */}
      <section className="bg-white py-14 sm:py-16">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-ink">Send us a message</h2>
            <p className="mt-1 text-sm text-muted">
              Tell us about your water and space, and we&apos;ll recommend the right system.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Info sidebar */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src="/cat-softeners.webp"
                alt="Vivanwave water softener"
                width={1248}
                height={832}
                className="h-44 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-ink">Prefer to talk it through?</h3>
                <p className="mt-1 text-sm text-muted">
                  Our specialists help you pick the correctly-sized softener or iron remover for your
                  home or business — no guesswork.
                </p>
                <ButtonLink href={`https://wa.me/${WHATSAPP}`} size="sm" className="mt-4">
                  Chat on WhatsApp
                </ButtonLink>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Clock className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-3 font-semibold text-ink">Business hours</h3>
                <p className="mt-1 text-sm text-muted">Mon – Sat, 9:00 AM – 7:00 PM</p>
                <p className="text-sm text-muted">Sunday: Closed</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <LifeBuoy className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-3 font-semibold text-ink">After-sales support</h3>
                <p className="mt-1 text-sm text-muted">Genuine spares, service & warranty backing across India.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
