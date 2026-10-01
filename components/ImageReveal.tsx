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
  imgClassName?: string;
  position?: string;
  zoom?: number;
  preload?: boolean;
  delay?: number;
  start?: string;
  children?: React.ReactNode;
}

/** Clip-path + scale reveal triggered by ScrollTrigger. Starts clipped and scaled 1.12, ends open at 1. */
export function ImageReveal({ src, alt, sizes, className, imgClassName, position, zoom, preload, delay = 0, start = "top 90%", children }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useReadyGsap(root, (el) => {
    const mask = el.querySelector("[data-reveal-img]");
    const inner = el.querySelector("[data-inner]");
    const tl = gsap.timeline({
      paused: true,
      delay,
    });
    tl.fromTo(mask, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0).fromTo(
      inner,
      { scale: 1.12 },
      { scale: 1, duration: 1.8, ease: "expo.out" },
      0,
    );
    ScrollTrigger.create({ trigger: el, start, once: true, onEnter: () => tl.play() });
  });

  return (
    <div ref={root} className={cn("relative overflow-hidden bg-cream", className)}>
      <div data-reveal-img className="absolute inset-0">
        <div data-inner className="absolute inset-0">
          <Media src={src} alt={alt} sizes={sizes} className={imgClassName} position={position} zoom={zoom} preload={preload} />
        </div>
      </div>
      {children}
    </div>
  );
}
