"use client";

import { useEffect } from "react";
import { gsap, isFinePointer } from "./animations";

/** Subtle magnetic pull for pointer devices. Pass strength 0–1. */
export function useMagnetic<T extends HTMLElement>(ref: React.RefObject<T | null>, strength = 0.25) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer()) return;
    const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * strength);
      y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      x(0);
      y(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, strength]);
}
