"use client";

import { useEffect } from "react";
import { afterReady, gsap, prefersReducedMotion } from "./animations";

/**
 * Runs GSAP setup inside a scoped context once the page is uncovered (preloader / transition mask gone).
 * Everything created inside is reverted on unmount. Skipped for reduced-motion users — the
 * `reduced` callback may be used to show final states.
 */
export function useReadyGsap(
  scope: React.RefObject<HTMLElement | null>,
  setup: (root: HTMLElement) => void,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {}, root);
    const cancel = afterReady(() => ctx.add(() => setup(root)));
    return () => {
      cancel();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
