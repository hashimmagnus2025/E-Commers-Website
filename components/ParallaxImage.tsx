"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";
import { cn } from "@/lib/utils";
import { Media } from "./Media";

interface Props {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  position?: string;
  /** Percentage travel over the scroll range. Keep small — 8–14. */
  amount?: number;
  zoom?: number;
  preload?: boolean;
  children?: React.ReactNode;
}

/** Image taller than its frame that drifts slowly against the scroll. Disabled on small screens. */
export function ParallaxImage({ src, alt, sizes, className, position, amount = 10, zoom, preload, children }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useReadyGsap(root, (el) => {
    const layer = el.querySelector("[data-parallax]");
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        layer,
        { yPercent: -amount },
        { yPercent: amount, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
    ScrollTrigger.refresh();
  });

  return (
    <div ref={root} className={cn("relative overflow-hidden bg-cream", className)}>
      <div data-parallax className="absolute -inset-y-[12%] inset-x-0 md:-inset-y-[14%]">
        <Media src={src} alt={alt} sizes={sizes} position={position} zoom={zoom} preload={preload} />
      </div>
      {children}
    </div>
  );
}
