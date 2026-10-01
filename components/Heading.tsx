"use client";

import { createElement, useRef } from "react";
import { gsap, SplitText } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";
import { cn } from "@/lib/utils";

type Mode = "lines" | "words" | "chars" | "scrub";

interface Props {
  as?: "h1" | "h2" | "h3" | "p" | "blockquote" | "div" | "span";
  mode?: Mode;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  start?: string;
}

/**
 * Text reveal utility. `lines`: masked line rise. `words`/`chars`: staggered rise.
 * `scrub`: words light up as the section scrolls (used for long statements).
 */
export function Heading({ as = "h2", mode = "lines", className, children, delay = 0, start = "top 88%" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useReadyGsap(ref, (el) => {
    if (mode === "scrub") {
      SplitText.create(el, {
        type: "words",
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { opacity: 1 });
          return gsap.fromTo(
            self.words,
            { opacity: 0.14 },
            { opacity: 1, stagger: 0.12, ease: "none", scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } },
          );
        },
      });
      return;
    }
    SplitText.create(el, {
      type: mode,
      mask: mode,
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { opacity: 1 });
        const targets = mode === "lines" ? self.lines : mode === "words" ? self.words : self.chars;
        return gsap.from(targets, {
          yPercent: 115,
          duration: mode === "chars" ? 0.9 : 1.25,
          stagger: mode === "chars" ? 0.025 : mode === "words" ? 0.06 : 0.1,
          ease: "expo.out",
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      },
    });
  });

  return createElement(as, { ref, "data-split": "", className: cn(className) }, children);
}
