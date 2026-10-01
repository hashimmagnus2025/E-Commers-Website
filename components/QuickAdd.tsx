"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { gsap } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { useShop } from "./ShopProvider";

/** Quick add: a bar slides up over the image, expands to a size selector, and confirms with ADDED ✓. */
export function QuickAdd({ product, imageBox }: { product: Product; imageBox: React.RefObject<HTMLElement | null> }) {
  const { addToBag } = useShop();
  const single = product.sizes.length === 1;
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<string | null>(single ? product.sizes[0] : null);
  const [status, setStatus] = useState<"idle" | "adding" | "added">("idle");
  const [hint, setHint] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (open && panel.current) {
      gsap.fromTo(panel.current, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: "expo.out" });
      gsap.from(panel.current.querySelectorAll("[data-q]"), { opacity: 0, y: 10, duration: 0.6, stagger: 0.05, delay: 0.15, ease: "expo.out" });
    }
  }, [open]);

  const close = () => {
    if (!panel.current) return setOpen(false);
    gsap.to(panel.current, { yPercent: 100, duration: 0.45, ease: "expo.inOut", onComplete: () => setOpen(false) });
    trigger.current?.focus();
  };

  const add = async () => {
    if (!size) {
      setHint(true);
      if (panel.current) gsap.fromTo(panel.current.querySelector("[data-sizes]"), { x: -6 }, { x: 0, duration: 0.6, ease: "elastic.out(1,0.3)" });
      return;
    }
    setStatus("adding");
    const img = imageBox.current?.querySelector("img") ?? imageBox.current;
    await addToBag(product, { size, source: img as HTMLElement | null });
    setStatus("added");
    timer.current = setTimeout(() => {
      setStatus("idle");
      if (!single) setSize(null);
      setOpen(false);
    }, 1700);
  };

  return (
    <>
      {!open && (
        <button
          ref={trigger}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Quick add ${product.name}`}
          className={cn(
            "eyebrow absolute inset-x-0 bottom-0 z-20 flex h-11 items-center justify-between bg-paper/95 px-4 text-ink backdrop-blur-sm",
            "translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] focus-visible:translate-y-0 group-focus-within:translate-y-0 group-hover:translate-y-0",
            "[@media(hover:none)]:translate-y-0",
          )}
        >
          Quick add <Plus className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
        </button>
      )}

      {open && (
        <div ref={panel} role="group" aria-label={`Quick add ${product.name}`} className="absolute inset-x-0 bottom-0 z-30 bg-paper p-4 text-ink">
          <div className="flex items-center justify-between" data-q>
            <p className="eyebrow">{single ? "One size" : "Select size"}</p>
            <button type="button" onClick={close} aria-label="Close quick add" className="-mr-2 flex h-8 w-8 items-center justify-center">
              <X className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
            </button>
          </div>
          {!single && (
            <div data-sizes data-q className="mt-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Size">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={size === s}
                  onClick={() => {
                    setSize(s);
                    setHint(false);
                  }}
                  className={cn(
                    "eyebrow h-9 min-w-9 border px-2.5 transition-colors duration-300",
                    size === s ? "border-ink bg-ink text-ivory" : "border-ink/20 hover:border-ink",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <p data-q className="eyebrow mt-2 h-4 text-bronze" role="alert">
            {hint ? "Please select a size" : ""}
          </p>
          <button
            type="button"
            data-q
            onClick={add}
            disabled={status === "adding"}
            className={cn(
              "eyebrow mt-1 flex h-11 w-full items-center justify-center gap-2 transition-colors duration-500",
              status === "added" ? "bg-bronze text-paper" : "bg-ink text-ivory hover:bg-charcoal",
            )}
          >
            {status === "added" ? (
              <>
                Added <Check className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </>
            ) : (
              "Add to bag"
            )}
          </button>
        </div>
      )}
    </>
  );
}
