"use client";

import { useState } from "react";
import { FaqItem } from "@/types/content";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span className="font-medium text-ink">{item.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className={cn("shrink-0 text-ink-soft transition-transform", open && "rotate-45")}
                >
                  <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </h3>
            {open && (
              <div id={`faq-panel-${i}`} className="px-5 pb-4 text-sm text-ink-soft">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
