"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations";
import { useOverlay } from "@/lib/useOverlay";
import { NAV_LINKS } from "@/data/site";
import { useShop } from "./ShopProvider";

const SECONDARY = [
  { label: "Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Contact", href: "/contact" },
];

/** Full-screen mobile navigation. Stays mounted so its open/close timeline can be reversed. */
export function MobileMenu() {
  const { menuOpen, setMenuOpen, setSearchOpen } = useShop();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  useOverlay(menuOpen, () => setMenuOpen(false), root);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)", visibility: "hidden" });
      tl.current = gsap
        .timeline({ paused: true })
        .set(el, { visibility: "visible" })
        .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" })
        .from("[data-m-item]", { yPercent: 110, duration: 1, stagger: 0.07, ease: "expo.out" }, 0.3)
        .from("[data-m-fade]", { opacity: 0, y: 16, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 0.55);
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const t = tl.current;
      if (!t) return;
      if (menuOpen) t.timeScale(1).play();
      else t.timeScale(1.6).reverse();
    },
    { dependencies: [menuOpen] },
  );

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!menuOpen}
      inert={!menuOpen}
      data-lenis-prevent
      className="fixed inset-0 z-[120] flex flex-col overflow-y-auto bg-ink text-ivory"
    >
      <div className="flex h-[var(--nav-h)] shrink-0 items-center justify-between [padding-inline:var(--gutter)]">
        <span className="font-serif text-[1.75rem] uppercase tracking-[0.02em]">Veloce.</span>
        <button type="button" onClick={() => setMenuOpen(false)} className="flex h-11 w-11 items-center justify-center" aria-label="Close menu">
          <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 [padding-inline:var(--gutter)] py-6">
        {NAV_LINKS.map((l, i) => (
          <div key={l.href} className="overflow-hidden">
            <Link
              href={l.href}
              data-m-item
              aria-current={pathname === l.href ? "page" : undefined}
              className="display flex items-baseline gap-4 py-1 text-[clamp(3rem,15vw,5.5rem)]"
            >
              <span className="eyebrow w-6 text-ivory/50">{String(i + 1).padStart(2, "0")}</span>
              {l.label}
            </Link>
          </div>
        ))}
      </nav>

      <div className="flex shrink-0 flex-wrap items-center gap-x-8 gap-y-3 border-t border-ivory/15 [padding-inline:var(--gutter)] py-6">
        <button
          type="button"
          data-m-fade
          className="eyebrow"
          onClick={() => {
            setMenuOpen(false);
            setTimeout(() => setSearchOpen(true), 350);
          }}
        >
          Search
        </button>
        {SECONDARY.map((l) => (
          <Link key={l.href} href={l.href} data-m-fade className="eyebrow">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
