"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";
import { cn } from "@/lib/utils";
import { Media } from "./Media";

/**
 * Desktop: thumbnails + large image with wipe transitions and click-to-zoom.
 * Mobile: native snap carousel, image first.
 */
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [slide, setSlide] = useState(0);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const z = useRef(1);
  const first = useRef(true);
  const stage = useRef<HTMLDivElement>(null);

  /* entrance: images reveal one after another */
  useReadyGsap(root, (el) => {
    gsap.set(el.querySelectorAll("[data-g-reveal]"), { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(el.querySelectorAll("[data-g-scale]"), { scale: 1.12 });
    gsap
      .timeline({ defaults: { ease: "expo.inOut" } })
      .to(el.querySelectorAll("[data-g-reveal]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, stagger: 0.14 }, 0)
      .to(el.querySelectorAll("[data-g-scale]"), { scale: 1, duration: 1.8, stagger: 0.14, ease: "expo.out" }, 0);
  });

  /* wipe to the selected image */
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const next = layers.current[active];
    if (!next) return;
    if (prefersReducedMotion()) {
      next.style.zIndex = String(++z.current);
      return;
    }
    next.style.zIndex = String(++z.current);
    gsap.fromTo(next, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" });
    gsap.fromTo(next.firstElementChild, { scale: 1.1 }, { scale: 1, duration: 1.4, ease: "expo.out" });
  }, [active]);

  const toggleZoom = (e: React.MouseEvent) => {
    const box = stage.current;
    if (!box) return;
    const imgWrap = layers.current[active]?.firstElementChild as HTMLElement | null;
    if (!imgWrap) return;
    const r = box.getBoundingClientRect();
    const ox = ((e.clientX - r.left) / r.width) * 100;
    const oy = ((e.clientY - r.top) / r.height) * 100;
    const next = !zoom;
    setZoom(next);
    gsap.to(imgWrap, { scale: next ? 2.1 : 1, transformOrigin: `${ox}% ${oy}%`, duration: 0.9, ease: "expo.out" });
  };

  const onMove = (e: React.MouseEvent) => {
    if (!zoom) return;
    const box = stage.current;
    const imgWrap = layers.current[active]?.firstElementChild as HTMLElement | null;
    if (!box || !imgWrap) return;
    const r = box.getBoundingClientRect();
    gsap.to(imgWrap, { transformOrigin: `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`, duration: 0.5, ease: "power3.out", overwrite: "auto" });
  };

  const select = (i: number) => {
    if (i === active) return;
    if (zoom) {
      setZoom(false);
      const cur = layers.current[active]?.firstElementChild;
      if (cur) gsap.to(cur, { scale: 1, duration: 0.4 });
    }
    setActive(i);
  };

  return (
    <div ref={root} className="min-w-0">
      {/* desktop */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-[5.5rem_1fr]">
        <div className="flex flex-col gap-3" role="group" aria-label="Product images">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={cn("relative aspect-[4/5] overflow-hidden bg-cream transition-opacity duration-500", i === active ? "opacity-100" : "opacity-50 hover:opacity-100")}
            >
              <div data-g-reveal className="absolute inset-0">
                <div data-g-scale className="absolute inset-0">
                  <Media src={src} alt="" sizes="90px" />
                </div>
              </div>
              <span className={cn("absolute inset-x-0 bottom-0 h-px bg-ink transition-transform duration-500", i === active ? "scale-x-100" : "scale-x-0")} />
            </button>
          ))}
        </div>

        <div className="relative">
          <div ref={stage} data-fly-source className={cn("relative aspect-[4/5] overflow-hidden bg-cream", zoom ? "cursor-zoom-out" : "cursor-zoom-in")} onMouseMove={onMove}>
            <div data-g-reveal className="absolute inset-0">
              <div data-g-scale className="absolute inset-0">
                {images.map((src, i) => (
                  <div key={src + i} ref={(n) => void (layers.current[i] = n)} className="absolute inset-0" style={{ zIndex: i === 0 ? 1 : 0 }} aria-hidden={i !== active}>
                    <div className="absolute inset-0 will-change-transform">
                      <Media src={src} alt={i === active ? `${name}, view ${i + 1}` : ""} sizes="(min-width:1024px) 48vw, 100vw" position="50% 30%" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={toggleZoom}
              aria-pressed={zoom}
              aria-label={zoom ? "Zoom out" : "Zoom in on image"}
              data-cursor="explore"
              className="absolute inset-0 z-[60]"
            />
            <span className="pointer-events-none absolute bottom-4 right-4 z-[70] flex h-10 w-10 items-center justify-center bg-paper/90 text-ink">
              {zoom ? <Minus className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" /> : <Plus className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />}
            </span>
          </div>
          <p className="eyebrow num mt-3 text-stone" aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</p>
        </div>
      </div>

      {/* mobile */}
      <div className="lg:hidden">
        <div
          data-fly-source
          className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(e) => {
            const t = e.currentTarget;
            setSlide(Math.round(t.scrollLeft / t.clientWidth));
          }}
          role="group"
          aria-label="Product images"
        >
          {images.map((src, i) => (
            <div key={src + i} className="relative aspect-[4/5] w-full shrink-0 snap-center bg-cream">
              <div data-g-reveal className="absolute inset-0">
                <div data-g-scale className="absolute inset-0">
                  <Media src={src} alt={`${name}, view ${i + 1} of ${images.length}`} sizes="100vw" position="50% 30%" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden="true">
            {images.map((_, i) => (
              <span key={i} className={cn("h-px transition-all duration-500", i === slide ? "w-8 bg-ink" : "w-4 bg-ink/30")} />
            ))}
          </div>
          <p className="eyebrow num text-stone">{slide + 1} / {images.length}</p>
        </div>
      </div>
    </div>
  );
}
