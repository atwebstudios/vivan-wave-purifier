import type { Metadata } from "next";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Vivanwave for product queries, installation and support.",
};

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Contact Us</h1>
          <p className="mt-3 text-muted">
            Have a question about a product, installation or service? Send us a message and our
            team will help you choose the right solution.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><Phone className="h-5 w-5" /></span>
              <div>
                <dt className="text-muted">Phone</dt>
                <dd className="font-medium text-ink">+91 99990 12123</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><Mail className="h-5 w-5" /></span>
              <div>
                <dt className="text-muted">Email</dt>
                <dd className="font-medium text-ink">support@aquapure.example</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><MessageCircle className="h-5 w-5" /></span>
              <div>
                <dt className="text-muted">WhatsApp</dt>
                <dd className="font-medium text-ink">Chat via the button in the corner</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
