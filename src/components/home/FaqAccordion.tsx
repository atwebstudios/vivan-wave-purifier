"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";
import { cn } from "@/lib/utils";

/** Accessible single-open accordion. Reused on the home page and the /faq page. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-ink">{item.q}</span>
              <span
                className={cn(
                  "shrink-0 text-brand-600 transition-transform",
                  isOpen && "rotate-45",
                )}
              >
                <Plus className="h-5 w-5" />
              </span>
            </button>
            <div
              className={cn(
                "grid overflow-hidden px-5 transition-all duration-300",
                isOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <p className="min-h-0 text-sm leading-relaxed text-muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
