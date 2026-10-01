"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";
import { FOOTER_COLUMNS } from "@/data/site";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useReadyGsap(root, (el) => {
    gsap.from(el.querySelectorAll("[data-f-col]"), {
      opacity: 0,
      y: 30,
      duration: 1.1,
      stagger: 0.08,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 80%", once: true },
    });
    gsap.fromTo(
      el.querySelector("[data-f-mark]"),
      { yPercent: 38 },
      { yPercent: 0, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: true } },
    );
  });

  return (
    <footer ref={root} className="relative overflow-hidden bg-ink text-ivory">
      <div className="gutter grid gap-14 border-t border-ivory/15 pb-10 pt-16 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div data-f-col className="max-w-xs">
          <p className="font-serif text-3xl leading-tight">Contemporary essentials for a life in motion.</p>
          <p className="eyebrow mt-6 text-ivory/50">Designed in New Delhi</p>
        </div>
        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.title} data-f-col aria-label={col.title}>
            <h2 className="eyebrow text-ivory/50">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  {"external" in l && l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="group text-sm">
                      <span className="u-link">{l.label}</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <Link href={l.href} className="group text-sm">
                      <span className="u-link">{l.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="gutter overflow-hidden" aria-hidden="true">
        <div data-f-mark className="display select-none text-center text-[min(30vw,32rem)] leading-[0.82]">
          Veloce.
        </div>
      </div>

      <div className="gutter relative flex flex-col justify-between gap-3 border-t border-ivory/15 py-6 text-ivory/60 sm:flex-row">
        <p className="eyebrow">© 2026 Veloce Studio</p>
        <p className="eyebrow">India / English</p>
      </div>
    </footer>
  );
}
