"use client";

import { createElement, useRef } from "react";
import { gsap } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";

interface Props {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  y?: number;
  x?: number;
  delay?: number;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: number;
  start?: string;
  duration?: number;
}

/** Fade + slide entrance on scroll. */
export function Reveal({ as = "div", className, children, y = 36, x = 0, delay = 0, stagger, start = "top 90%", duration = 1.2 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useReadyGsap(ref, (el) => {
    const targets = stagger ? Array.from(el.children) : el;
    gsap.set(el, { opacity: 1 });
    gsap.from(targets, {
      opacity: 0,
      y,
      x,
      duration,
      delay,
      stagger: stagger ?? 0,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start, once: true },
    });
  });

  return createElement(as as string, { ref, "data-fade": "", className }, children);
}
