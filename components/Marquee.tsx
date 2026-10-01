"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";
import { MARQUEE } from "@/data/site";
import { cn } from "@/lib/utils";

/** Continuous typographic strip. Speeds up slightly with scroll velocity. */
export function Marquee({ items = MARQUEE, className, dark }: { items?: string[]; className?: string; dark?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useReadyGsap(root, (el) => {
    const track = el.querySelector("[data-track]");
    const tween = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 800, 3);
        gsap.to(tween, { timeScale: 1 + v, duration: 0.2, overwrite: true });
        gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.2, overwrite: false });
      },
    });
  });

  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="display px-8 text-[clamp(2.25rem,5.5vw,5rem)] md:px-14">{item}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-bronze" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      role="marquee"
      aria-label={items.join(", ")}
      className={cn("overflow-hidden border-y hairline py-6 md:py-9", dark ? "bg-ink text-ivory" : "text-ink", className)}
    >
      <div data-track className="flex w-max items-center">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
}
