"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations";
import { useOverlay } from "@/lib/useOverlay";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/** Side drawer on tablet/desktop, bottom sheet on phones. */
export function Drawer({ open, onClose, title, children, footer }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  useOverlay(open, onClose, root);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      gsap.set(el, { visibility: "hidden" });
      gsap.set("[data-d-scrim]", { opacity: 0 });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      tl.current?.kill();
      const mobile = window.matchMedia("(max-width: 639px)").matches;
      const from = mobile ? { yPercent: 100, xPercent: 0 } : { xPercent: 100, yPercent: 0 };
      if (open) {
        gsap.set("[data-d-panel]", from);
        tl.current = gsap
          .timeline()
          .set(el, { visibility: "visible" })
          .to("[data-d-scrim]", { opacity: 1, duration: 0.5 }, 0)
          .to("[data-d-panel]", { xPercent: 0, yPercent: 0, duration: 0.8, ease: "expo.out" }, 0);
      } else {
        tl.current = gsap
          .timeline()
          .to("[data-d-panel]", { ...from, duration: 0.5, ease: "expo.inOut" }, 0)
          .to("[data-d-scrim]", { opacity: 0, duration: 0.4 }, 0)
          .set(el, { visibility: "hidden" });
      }
    },
    { dependencies: [open] },
  );

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label={title} aria-hidden={!open} inert={!open} className="fixed inset-0 z-[125]">
      <button type="button" tabIndex={-1} aria-label={`Close ${title.toLowerCase()}`} data-d-scrim onClick={onClose} className="absolute inset-0 bg-ink/45" />
      <div
        data-d-panel
        className="absolute inset-x-0 bottom-0 flex max-h-[88svh] flex-col bg-ivory text-ink sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[26rem]"
      >
        <div className="flex items-center justify-between border-b hairline px-6 py-5">
          <h2 className="eyebrow">{title}</h2>
          <button type="button" onClick={onClose} aria-label={`Close ${title.toLowerCase()}`} className="-mr-2 flex h-10 w-10 items-center justify-center">
            <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>
        <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {footer && <div className="border-t hairline px-6 py-5">{footer}</div>}
      </div>
    </div>
  );
}
