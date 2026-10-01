"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { gsap, ScrollTrigger, afterReady, prefersReducedMotion } from "@/lib/animations";
import { useMagnetic } from "@/lib/useMagnetic";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";
import { useShop } from "./ShopProvider";
import { MobileMenu } from "./MobileMenu";

const OVER_HERO = ["/", "/campaign"];

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, 0.3);
  return (
    <Link
      ref={ref}
      href={href}
      aria-current={active ? "page" : undefined}
      className="eyebrow group relative inline-block px-3 py-2"
    >
      <span className={cn("u-link", active && "u-link-static")}>{children}</span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { count, setSearchOpen, setBagOpen, setMenuOpen, hydrated } = useShop();
  const overHero = OVER_HERO.includes(pathname);
  const header = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const bagRef = useRef<HTMLButtonElement>(null);
  const prevCount = useRef(count);
  const searchRef = useRef<HTMLButtonElement>(null);
  useMagnetic(bagRef, 0.25);
  useMagnetic(searchRef, 0.25);

  /* transparent over hero → compact floating bar on scroll */
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const base = overHero ? "#f5f1e8" : "#0f0e0c";
    gsap.set(el, { color: base, backgroundColor: "rgba(250,248,243,0)", height: "var(--nav-h)", marginTop: 0, marginInline: 0 });
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ paused: true, defaults: { duration: 0.6, ease: "expo.out" } })
        .to(el, {
          color: "#0f0e0c",
          backgroundColor: "rgba(250,248,243,0.92)",
          height: 56,
          marginTop: 10,
          marginInline: "clamp(0.5rem, 1.6vw, 1.5rem)",
          boxShadow: "0 1px 0 rgba(15,14,12,0.08)",
        });
      const st = ScrollTrigger.create({
        start: 60,
        end: "max",
        onToggle: (self) => (self.isActive ? tl.play() : tl.reverse()),
      });
      if (window.scrollY > 60) tl.progress(1);
      return () => st.kill();
    });
    return () => ctx.revert();
  }, [overHero]);

  /* entrance */
  useEffect(() => {
    const el = header.current;
    if (!el || prefersReducedMotion()) return;
    gsap.set(el, { autoAlpha: 0, y: -16 });
    return afterReady(() => {
      gsap.to(el, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.9 });
    });
  }, []);

  /* bag count bump */
  useEffect(() => {
    if (count !== prevCount.current && hydrated) {
      prevCount.current = count;
      if (countRef.current) gsap.fromTo(countRef.current, { yPercent: 90, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
      if (bagRef.current) gsap.fromTo(bagRef.current, { scale: 1 }, { scale: 1.18, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
    } else prevCount.current = count;
  }, [count, hydrated]);

  return (
    <>
      <header ref={header} className="fixed inset-x-0 top-0 z-[100]">
        <div ref={bar} className="relative flex items-center justify-between backdrop-blur-[10px] [padding-inline:var(--gutter)]" style={{ height: "var(--nav-h)" }}>
          <Link href="/" aria-label="Veloce — home" className="font-serif text-[1.75rem] uppercase leading-none tracking-[0.02em]">
            Veloce.
          </Link>

          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.href} href={l.href} active={pathname === l.href || pathname.startsWith(l.href + "/")}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              ref={searchRef}
              type="button"
              onClick={() => setSearchOpen(true)}
              className="eyebrow flex h-11 items-center gap-2 px-2.5"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px] lg:hidden" strokeWidth={1.4} aria-hidden="true" />
              <span className="hidden lg:inline"><span className="u-link">Search</span></span>
            </button>
            <Link href="/account" className="eyebrow hidden h-11 items-center px-2.5 lg:flex" aria-label="Account">
              <span className="u-link">Account</span>
            </Link>
            <button
              ref={bagRef}
              type="button"
              data-bag-target
              onClick={() => setBagOpen(true)}
              className="eyebrow flex h-11 items-center gap-2 px-2.5"
              aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <ShoppingBag className="h-[18px] w-[18px] lg:hidden" strokeWidth={1.4} aria-hidden="true" />
              <span className="hidden lg:inline"><span className="u-link">Bag</span></span>
              <span className="inline-flex h-4 min-w-4 overflow-hidden num" aria-hidden="true">
                <span ref={countRef} className="block text-[0.6875rem] leading-4 tracking-normal">
                  {count}
                </span>
              </span>
            </button>
            <button type="button" onClick={() => setMenuOpen(true)} className="flex h-11 w-11 items-center justify-center lg:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu />
    </>
  );
}
