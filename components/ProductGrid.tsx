"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  /** Editorial rhythm: occasional large feature tiles. */
  rhythm?: boolean;
  /** Offset so feature rhythm continues across split grids. */
  offset?: number;
  /** When this changes the whole grid re-animates; otherwise only newly added cards do. */
  resetKey?: string;
  className?: string;
}

/** Responsive grid. 2 columns on mobile, 3 on desktop, with periodic double-width feature tiles. */
export function ProductGrid({ products, rhythm = true, offset = 0, resetKey = "", className }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const key = products.map((p) => p.id).join(",");
  const seen = useRef(new Set<string>());
  const lastReset = useRef(resetKey);

  useReadyGsap(
    root,
    (el) => {
      if (lastReset.current !== resetKey) {
        seen.current.clear();
        lastReset.current = resetKey;
      }
      const cards = gsap.utils
        .toArray<HTMLElement>(el.querySelectorAll("[data-card]"))
        .filter((c) => !seen.current.has(c.dataset.id ?? ""));
      cards.forEach((c) => seen.current.add(c.dataset.id ?? ""));
      if (!cards.length) return;
      gsap.set(cards, { opacity: 0, y: 40 });
      ScrollTrigger.batch(cards, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", overwrite: true }),
      });
    },
    [key, resetKey],
  );

  return (
    <div ref={root} className={cn("grid grid-flow-dense grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-16", className)}>
      {products.map((p, i) => {
        const n = i + offset;
        const feature = rhythm && products.length > 4 && n % 7 === 0;
        const right = feature && Math.floor(n / 7) % 2 === 1;
        return (
          <ProductCard
              key={p.id}
              product={p}
              variant={feature ? "feature" : "default"}
              preload={n < 2}
              sizes={feature ? "(min-width:1024px) 60vw, 100vw" : "(min-width:1024px) 30vw, 48vw"}
              className={feature ? cn("col-span-2 lg:row-span-2", right && "lg:col-start-2") : undefined}
            />
        );
      })}
    </div>
  );
}
