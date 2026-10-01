"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap, ScrollTrigger, getLenis, prefersReducedMotion, setCovered } from "@/lib/animations";
import { useShop } from "./ShopProvider";

const here = () => window.location.pathname + window.location.search;

/**
 * Intercepts internal link clicks: a mask rises over the page, the route changes underneath,
 * then the mask lifts away. Navigation starts immediately — the mask never blocks it.
 */
export function PageTransition() {
  const router = useRouter();
  const panel = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const { setBagOpen, setSearchOpen, setMenuOpen } = useShop();
  const closers = useRef({ setBagOpen, setSearchOpen, setMenuOpen });
  useEffect(() => {
    closers.current = { setBagOpen, setSearchOpen, setMenuOpen };
  });

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    gsap.set(el, { clipPath: "inset(100% 0% 0% 0%)", autoAlpha: 0 });

    const reveal = () => {
      getLenis()?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
      gsap
        .timeline({
          onComplete: () => {
            gsap.set(el, { autoAlpha: 0 });
            busy.current = false;
            ScrollTrigger.refresh();
          },
        })
        .to(el.firstElementChild, { opacity: 0, duration: 0.25 }, 0)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8, ease: "expo.inOut" }, 0.05)
        .add(() => setCovered(false), 0.3);
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const next = url.pathname + url.search;
      if (next === here()) {
        if (url.hash) return;
        e.preventDefault();
        getLenis()?.scrollTo(0);
        return;
      }
      if (url.pathname === window.location.pathname && url.hash) return;
      e.preventDefault();
      if (busy.current) return;
      closers.current.setBagOpen(false);
      closers.current.setSearchOpen(false);
      closers.current.setMenuOpen(false);

      if (prefersReducedMotion()) {
        router.push(next);
        return;
      }
      busy.current = true;
      setCovered(true);
      const start = here();
      gsap
        .timeline({
          onComplete: () => {
            const t0 = performance.now();
            const poll = () => {
              if (here() !== start || performance.now() - t0 > 3000) {
                setTimeout(reveal, 140);
              } else {
                requestAnimationFrame(poll);
              }
            };
            poll();
          },
        })
        .set(el, { autoAlpha: 1, clipPath: "inset(100% 0% 0% 0%)" })
        .set(el.firstElementChild, { opacity: 0 })
        .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "expo.inOut" })
        .to(el.firstElementChild, { opacity: 1, duration: 0.3 }, 0.25);
      router.push(next);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return (
    <div
      ref={panel}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center bg-ink text-ivory"
      style={{ visibility: "hidden" }}
    >
      <span className="font-serif text-4xl tracking-[-0.02em]">Veloce.</span>
    </div>
  );
}
