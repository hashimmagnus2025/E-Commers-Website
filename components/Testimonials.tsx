"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { TESTIMONIALS } from "@/data/site";
import { cn } from "@/lib/utils";

/** One large quote at a time with a masked transition. Sample content. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!box.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-t-q]", { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.08 });
      gsap.fromTo("[data-t-n]", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.25, ease: "expo.out" });
    }, box);
    return () => ctx.revert();
  }, [i]);

  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const t = setInterval(() => setI((n) => (n + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, [paused]);

  const t = TESTIMONIALS[i];
  const go = (d: number) => setI((n) => (n + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Customer words"
      className="gutter section bg-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
    >
      <div className="flex items-center gap-4">
        <span className="eyebrow num text-stone">11</span>
        <span className="h-px w-10 bg-ink/30" />
        <p className="eyebrow text-stone">In their words</p>
      </div>

      <div ref={box} className="mt-12 min-h-[22rem] md:mt-20 md:min-h-[30rem]" aria-live={paused ? "polite" : "off"}>
        <h2 className="sr-only">Testimonials</h2>
        <blockquote>
          <p data-t-q className="display display-md max-w-[20ch] !leading-[0.98] normal-case md:max-w-[22ch]">
            “{t.quote}”
          </p>
          <footer data-t-n className="mt-10 flex items-center gap-5">
            <span className="h-px w-10 bg-ink" />
            <span className="eyebrow">{t.name}</span>
            <span className="eyebrow text-stone">{t.city}</span>
          </footer>
        </blockquote>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
          {TESTIMONIALS.map((x, n) => (
            <button
              key={x.name}
              role="tab"
              aria-selected={n === i}
              aria-label={`Testimonial ${n + 1}: ${x.name}`}
              onClick={() => setI(n)}
              className="flex h-8 items-center"
            >
              <span className={cn("block h-px transition-all duration-700", n === i ? "w-12 bg-ink" : "w-6 bg-ink/30")} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center border hairline transition-colors hover:bg-ink hover:text-ivory">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center border hairline transition-colors hover:bg-ink hover:text-ivory">
            <ArrowRight className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="mt-8 text-xs text-stone">Sample testimonials, shown for design purposes.</p>
    </section>
  );
}
