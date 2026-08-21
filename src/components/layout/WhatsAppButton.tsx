import { RiWhatsappFill } from "@remixicon/react";
import { cn } from "@/lib/utils";

/** Floating WhatsApp contact button. Replace the number with the client's WhatsApp line. */
export function WhatsAppButton({ phone = "919999012123" }: { phone?: string }) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hi Vivanwave, I have a question about your water purifiers.",
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105",
      )}
    >
      <RiWhatsappFill className="h-7 w-7" />
    </a>
  );
}
