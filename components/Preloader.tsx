"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion, setCovered, getLenis } from "@/lib/animations";

const SEEN_KEY = "veloce-preloader-seen";

/** Branded intro: wordmark, tagline and a 000→100 counter, then a cinematic mask lift. Plays once per session. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      let seen = false;
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1";
      } catch {
        /* storage unavailable */
      }
      if (seen || prefersReducedMotion()) {
        setDone(true);
        setCovered(false);
        return;
      }
      getLenis()?.stop();
      document.documentElement.style.overflow = "hidden";

      const state = { n: 0 };
      const letters = el.querySelectorAll("[data-letter]");
      const lines = el.querySelectorAll("[data-tag]");
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {
            /* storage unavailable */
          }
          document.documentElement.style.overflow = "";
          getLenis()?.start();
          setDone(true);
        },
      });
      tl.from(letters, { yPercent: 110, duration: 1, stagger: 0.06, ease: "expo.out" }, 0.1)
        .from(lines, { yPercent: 110, duration: 0.9, stagger: 0.12, ease: "expo.out" }, 0.55)
        .to(
          state,
          {
            n: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter.current) counter.current.textContent = String(Math.round(state.n)).padStart(2, "0");
            },
          },
          0.1,
        )
        .to(el.querySelectorAll("[data-out]"), { yPercent: -30, opacity: 0, duration: 0.6, ease: "power3.in" }, 1.75)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.05, ease: "expo.inOut" }, 1.85)
        .add(() => setCovered(false), 2.25);
    },
    { scope: root },
  );

  if (done) return null;
  return (
    <div
      ref={root}
      id="preloader"
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink text-ivory"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="gutter flex justify-between pt-6">
        <span className="eyebrow overflow-hidden" data-out>
          <span className="block" data-tag>Spring / Summer 2026</span>
        </span>
        <span className="eyebrow overflow-hidden" data-out>
          <span className="block" data-tag>New Delhi</span>
        </span>
      </div>

      <div className="gutter text-center" data-out>
        <h1 className="display flex justify-center overflow-hidden text-[clamp(3.5rem,13vw,12rem)] normal-case tracking-[-0.03em]" aria-label="Veloce">
          {"VELOCE.".split("").map((c, i) => (
            <span key={i} data-letter className="block">
              {c}
            </span>
          ))}
        </h1>
        <p className="eyebrow mt-6 text-ivory/70">
          <span className="block overflow-hidden"><span className="block" data-tag>Contemporary essentials</span></span>
          <span className="block overflow-hidden"><span className="block" data-tag>for a life in motion.</span></span>
        </p>
      </div>

      <div className="gutter flex items-end justify-between pb-6" data-out>
        <span className="eyebrow text-ivory/60">Loading</span>
        <span className="font-serif num text-[clamp(3rem,8vw,7rem)] leading-none">
          <span ref={counter}>00</span>
        </span>
      </div>
    </div>
  );
}
