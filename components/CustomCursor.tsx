"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer } from "@/lib/animations";

const LABELS: Record<string, string> = { view: "View", explore: "Explore", open: "Open", drag: "Drag", close: "Close" };
const INTERACTIVE = "a, button, input, textarea, select, label, [role='button'], [data-cursor]";

/** Minimal circular cursor for fine pointers. Grows into a labelled circle over products, images and CTAs. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el || !isFinePointer()) return;
    document.documentElement.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    let visible = false;
    let mode = "";

    const setMode = (next: string, text: string) => {
      if (next === mode && label.current?.textContent === text) return;
      mode = next;
      if (label.current) label.current.textContent = text;
      const big = next === "label";
      const link = next === "link";
      el.style.mixBlendMode = big ? "normal" : "difference";
      gsap.to(el, {
        width: big ? 86 : link ? 38 : 12,
        height: big ? 86 : link ? 38 : 12,
        backgroundColor: big ? "#f5f1e8" : link ? "rgba(245,241,232,0)" : "#f5f1e8",
        borderColor: link ? "#f5f1e8" : "rgba(245,241,232,0)",
        duration: 0.5,
        ease: "expo.out",
        overwrite: "auto",
      });
      gsap.to(label.current, { autoAlpha: big ? 1 : 0, duration: 0.25, delay: big ? 0.08 : 0 });
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
      }
      x(e.clientX);
      y(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element | null)?.closest?.(INTERACTIVE) as HTMLElement | null;
      if (!t) return setMode("", "");
      const key = t.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (key && LABELS[key]) return setMode("label", LABELS[key]);
      if (t.matches("input, textarea")) return setMode("", "");
      setMode("link", "");
    };
    const onLeave = () => {
      visible = false;
      gsap.to(el, { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[500] hidden h-3 w-3 items-center justify-center rounded-full border border-transparent bg-ivory [@media(hover:hover)_and_(pointer:fine)]:flex"
      style={{ mixBlendMode: "difference", opacity: 0, visibility: "hidden" }}
    >
      <span ref={label} className="eyebrow text-[0.625rem] text-ink opacity-0" />
    </div>
  );
}
