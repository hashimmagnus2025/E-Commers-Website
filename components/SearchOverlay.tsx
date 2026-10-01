"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations";
import { useOverlay } from "@/lib/useOverlay";
import { formatPrice } from "@/lib/utils";
import { searchProducts } from "@/data/products";
import { useShop } from "./ShopProvider";
import { Media } from "./Media";

const TRENDING = ["Blazers", "Dresses", "Trousers", "Knitwear"];

/** Full-screen search. A mask drops in from the top; results animate in as you type. */
export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const results = useMemo(() => searchProducts(query), [query]);
  const close = () => setSearchOpen(false);
  useOverlay(searchOpen, close, root);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)", visibility: "hidden" });
      tl.current = gsap
        .timeline({ paused: true })
        .set(el, { visibility: "visible" })
        .to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "expo.inOut" })
        .from("[data-s-item]", { yPercent: 110, duration: 1, stagger: 0.08, ease: "expo.out" }, 0.35)
        .from("[data-s-fade]", { opacity: 0, y: 14, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 0.55);
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const t = tl.current;
      if (!t) return;
      if (searchOpen) t.timeScale(1).play();
      else t.timeScale(1.6).reverse();
    },
    { dependencies: [searchOpen] },
  );

  useGSAP(
    () => {
      if (!list.current || !results.length) return;
      gsap.from(list.current.children, { opacity: 0, y: 28, duration: 0.7, stagger: 0.05, ease: "expo.out" });
    },
    { dependencies: [results], scope: list },
  );

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label="Search Veloce"
      aria-hidden={!searchOpen}
      inert={!searchOpen}
      data-lenis-prevent
      className="fixed inset-0 z-[130] overflow-y-auto bg-ivory text-ink"
    >
      <div className="flex h-[var(--nav-h)] items-center justify-between [padding-inline:var(--gutter)]">
        <span className="font-serif text-[1.75rem] uppercase tracking-[0.02em]">Veloce.</span>
        <button type="button" onClick={close} className="eyebrow flex h-11 items-center gap-3" aria-label="Close search">
          Close <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
        </button>
      </div>

      <div className="[padding-inline:var(--gutter)] pb-24 pt-8 md:pt-14">
        <p className="eyebrow overflow-hidden text-stone">
          <span data-s-item className="block">Search Veloce</span>
        </p>

        <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-4 overflow-hidden">
          <label htmlFor="site-search" className="sr-only">Search pieces and collections</label>
          <div data-s-item>
            <input
              id="site-search"
              data-autofocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pieces, collections..."
              autoComplete="off"
              className="font-serif w-full border-b border-ink/25 bg-transparent pb-4 text-[clamp(2.25rem,7vw,6.5rem)] leading-none tracking-[-0.02em] placeholder:text-ink/25 focus:border-ink focus:outline-none"
            />
          </div>
        </form>

        {query.trim() === "" ? (
          <div className="mt-12">
            <p data-s-fade className="eyebrow text-stone">Trending</p>
            <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
              {TRENDING.map((t) => (
                <li key={t} data-s-fade>
                  <button type="button" onClick={() => setQuery(t)} className="group flex items-baseline gap-3">
                    <span className="display display-sm u-link">{t}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" strokeWidth={1.4} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-10" aria-live="polite">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-stone">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query.trim()}”
              </p>
              {results.length > 0 && (
                <Link href={`/shop?q=${encodeURIComponent(query.trim())}`} className="eyebrow u-link">View all</Link>
              )}
            </div>
            {results.length === 0 ? (
              <p className="font-serif mt-8 text-3xl text-stone">Nothing yet. Try “blazer” or “silk”.</p>
            ) : (
              <ul ref={list} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
                {results.slice(0, 8).map((p) => (
                  <li key={p.id}>
                    <Link href={`/product/${p.slug}`} className="group block" data-cursor="view">
                      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                        <Media src={p.images[0]} alt={p.name} sizes="(min-width:768px) 22vw, 46vw" className="transition-transform duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]" />
                      </div>
                      <div className="mt-3 flex items-baseline justify-between gap-3">
                        <div>
                          <p className="text-sm">{p.name}</p>
                          <p className="eyebrow mt-1 text-stone">{p.category}</p>
                        </div>
                        <p className="num text-sm">{formatPrice(p.price)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
