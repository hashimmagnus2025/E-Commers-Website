"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="border-t hairline">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title} className="border-b hairline">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${base}-${i}`}
                id={`${base}-h-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="eyebrow flex min-h-14 w-full items-center justify-between text-left"
              >
                {item.title}
                <Plus className={cn("h-4 w-4 transition-transform duration-500 ease-[var(--ease-expo)]", isOpen && "rotate-45")} strokeWidth={1.4} aria-hidden="true" />
              </button>
            </h3>
            <div
              id={`${base}-${i}`}
              role="region"
              aria-labelledby={`${base}-h-${i}`}
              className={cn("grid transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <div className="pb-6 text-sm leading-relaxed text-stone">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
