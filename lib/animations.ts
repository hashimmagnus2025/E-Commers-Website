"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;
}
registerGsap();

export { gsap, ScrollTrigger, SplitText };

export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
  soft: "power3.out",
  mask: "expo.inOut",
};

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- lenis handle ---------- */
let lenisInstance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenisInstance = l;
};
export const getLenis = () => lenisInstance;

/* ---------- "page covered" gate ----------
 * While the preloader or a page-transition mask is covering the screen, entrance
 * animations wait here so visitors never miss them.
 */
let covered = true;
const waiters = new Set<() => void>();

export function setCovered(value: boolean) {
  covered = value;
  if (!value) {
    const run = Array.from(waiters);
    waiters.clear();
    run.forEach((fn) => fn());
  }
}

export function afterReady(fn: () => void) {
  if (!covered) {
    fn();
    return () => {};
  }
  waiters.add(fn);
  return () => {
    waiters.delete(fn);
  };
}

/** Splits an element into masked lines that rise into place. Returns a cleanup. */
export function lineReveal(el: Element, opts: { delay?: number; stagger?: number; duration?: number } = {}) {
  const split = SplitText.create(el, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    linesClass: "split-line",
    onSplit(self) {
      gsap.set(el, { autoAlpha: 1 });
      return gsap.from(self.lines, {
        yPercent: 110,
        duration: opts.duration ?? 1.2,
        stagger: opts.stagger ?? 0.1,
        ease: EASE.out,
        delay: opts.delay ?? 0,
      });
    },
  });
  return () => split.revert();
}
