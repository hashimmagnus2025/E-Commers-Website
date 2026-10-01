"use client";

import { useRef } from "react";
import { gsap } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";
import { world } from "@/data/campaign";
import { cn } from "@/lib/utils";
import { Media } from "./Media";

/**
 * The Veloce World. On desktop the section pins and the campaign frames travel sideways as you scroll.
 * On touch/small screens it is a native snap carousel.
 */
export function HorizontalWorld() {
  const root = useRef<HTMLElement>(null);

  useReadyGsap(root, (el) => {
    const track = el.querySelector<HTMLElement>("[data-w-track]");
    const viewport = el.querySelector<HTMLElement>("[data-w-viewport]");
    if (!track || !viewport) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (hover: hover)", () => {
      const distance = () => track.scrollWidth - viewport.clientWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
  });

  /* The wrapper stays React-owned: ScrollTrigger's pin-spacer is inserted inside it, never beside React's nodes. */
  return (
    <div>
    <section ref={root} aria-labelledby="world-title" className="relative bg-ink text-paper lg:h-screen">
      <div className="flex flex-col justify-center lg:h-screen">
        <div className="gutter flex items-end justify-between pb-8 pt-20 lg:absolute lg:left-0 lg:right-0 lg:top-0 lg:z-10 lg:pb-0 lg:pt-24 lg:pointer-events-none">
          <div className="flex items-center gap-4">
            <span className="eyebrow num text-paper/50">06</span>
            <span className="h-px w-10 bg-paper/30" />
            <p className="eyebrow text-paper/60">The world</p>
          </div>
          <p className="eyebrow hidden text-paper/50 lg:block">Scroll →</p>
        </div>

        <div data-w-viewport className="no-scrollbar overflow-x-auto pb-20 lg:[@media(hover:hover)]:overflow-hidden lg:py-16 lg:pb-16">
          <div data-w-track className="flex w-max items-center gap-6 [padding-inline:var(--gutter)] snap-x snap-mandatory lg:snap-none lg:gap-12 lg:pr-[10vw]">
            <div className="flex w-[78vw] shrink-0 snap-start flex-col justify-center lg:w-[34vw]">
              <h2 id="world-title" className="display display-lg">
                The
                <br />
                Veloce
                <br />
                World
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/70">Five ways of looking at one wardrobe. Move through it.</p>
            </div>

            {world.map((w, i) => (
              <figure key={w.label} className={cn("group relative w-[72vw] shrink-0 snap-center sm:w-[48vw] lg:w-[26vw]", i % 2 === 1 ? "lg:mt-24" : "lg:-mt-16")}>
                <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                  <Media src={w.image} alt={`${w.label}: Veloce campaign frame`} sizes="(min-width:1024px) 30vw, 72vw" position={w.position} className="transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]" />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between">
                  <span className="display text-[clamp(2rem,3.4vw,3.5rem)]">{w.label}</span>
                  <span className="eyebrow num text-paper/50">{w.number} / 05</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
