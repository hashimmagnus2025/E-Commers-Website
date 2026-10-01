"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger, isFinePointer } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";
import { campaign } from "@/data/campaign";
import { Media } from "./Media";
import { ButtonLink, TextLink } from "./Button";

/** Full-screen campaign hero with a sequenced entrance and restrained pointer parallax. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useReadyGsap(root, (el) => {
    const q = gsap.utils.selector(el);
    const mask = q("[data-h-mask]");
    const scale = q("[data-h-scale]");

    gsap.set(mask, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(scale, { scale: 1.08 });
    gsap.set(q("[data-h-line]"), { yPercent: 115 });
    gsap.set(q("[data-h-fade]"), { opacity: 0, y: 18 });
    gsap.set(q("[data-h-scroll]"), { opacity: 0 });

    gsap
      .timeline({ defaults: { ease: "expo.out" } })
      .to(mask, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }, 0)
      .to(scale, { scale: 1, duration: 2.2 }, 0)
      .to(q("[data-h-label]"), { opacity: 1, y: 0, duration: 1 }, 0.9)
      .to(q("[data-h-line]"), { yPercent: 0, duration: 1.4, stagger: 0.14 }, 1.0)
      .to(q("[data-h-copy]"), { opacity: 1, y: 0, duration: 1.1 }, 1.5)
      .to(q("[data-h-cta]"), { opacity: 1, y: 0, duration: 1.1, stagger: 0.1 }, 1.65)
      .to(q("[data-h-scroll]"), { opacity: 1, duration: 1 }, 1.9);

    /* scroll: image drifts slower than the page */
    gsap.to(q("[data-h-drift]"), {
      yPercent: 12,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(q("[data-h-text]"), {
      yPercent: -8,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom 20%", scrub: true },
    });

    /* pointer: image and text move gently in opposite directions */
    if (isFinePointer()) {
      const imgX = gsap.quickTo(q("[data-h-img]")[0], "x", { duration: 1.4, ease: "power3.out" });
      const imgY = gsap.quickTo(q("[data-h-img]")[0], "y", { duration: 1.4, ease: "power3.out" });
      const txtX = gsap.quickTo(q("[data-h-text]")[0], "x", { duration: 1.4, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        imgX(nx * -22);
        imgY(ny * -14);
        txtX(nx * 10);
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    }
    ScrollTrigger.refresh();
  });

  return (
    <section ref={root} aria-label="Spring Summer 2026 campaign" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-ink text-paper">
      <div data-h-drift className="absolute inset-0">
        <div data-h-img className="absolute -inset-[3%]">
          <div data-h-mask className="absolute inset-0">
            <div data-h-scale className="absolute inset-0">
              <Media src={campaign.hero} alt="A model in a tailored Veloce blazer, Spring / Summer 2026 campaign" sizes="100vw" position="50% 22%" preload />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/65" aria-hidden="true" />

      <div data-h-text className="absolute inset-0 flex flex-col justify-between [padding-inline:var(--gutter)] pb-8 pt-[calc(var(--nav-h)+1.5rem)] md:pb-10">
        <div data-h-label data-h-fade className="flex items-center justify-between">
          <p className="eyebrow">Spring / Summer 2026</p>
          <p className="eyebrow hidden sm:block">Campaign 01</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h1 className="display display-xl -ml-[0.04em]" aria-label="Designed to move.">
            <span className="line-mask" aria-hidden="true"><span data-h-line className="line-inner">Designed</span></span>
            <span className="line-mask" aria-hidden="true"><span data-h-line className="line-inner">to move.</span></span>
          </h1>

          <div className="flex max-w-sm flex-col gap-7 lg:pb-3">
            <p data-h-copy data-h-fade className="text-[0.9375rem] leading-relaxed text-paper/85">
              Contemporary essentials shaped around movement, proportion and everyday life.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <div data-h-cta data-h-fade>
                <ButtonLink href="/shop" variant="light">Shop the collection</ButtonLink>
              </div>
              <div data-h-cta data-h-fade>
                <TextLink href="/campaign">Explore campaign</TextLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div data-h-scroll className="absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex" aria-hidden="true">
        <span className="eyebrow text-[0.625rem] text-paper/70">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-paper/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_var(--ease-expo)_infinite] bg-paper" />
        </span>
        <ArrowDown className="sr-only" />
      </div>
    </section>
  );
}
