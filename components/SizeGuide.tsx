"use client";

import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations";
import { useOverlay } from "@/lib/useOverlay";
import { SIZE_CHARTS } from "@/data/site";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

const TABS = ["Size chart", "How to measure", "Fit & model"] as const;

export function SizeGuide({ open, onClose, product }: { open: boolean; onClose: () => void; product: Product }) {
  const root = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Size chart");
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  useOverlay(open, onClose, root);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (open) {
        gsap.set(el, { visibility: "visible" });
        gsap.fromTo("[data-sg-scrim]", { opacity: 0 }, { opacity: 1, duration: 0.5 });
        gsap.fromTo("[data-sg-panel]", { y: 40, opacity: 0, clipPath: "inset(8% 0% 0% 0%)" }, { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.out" });
      } else {
        gsap.to("[data-sg-scrim]", { opacity: 0, duration: 0.3 });
        gsap.to("[data-sg-panel]", { y: 20, opacity: 0, duration: 0.35, onComplete: () => void gsap.set(el, { visibility: "hidden" }) });
      }
    },
    { dependencies: [open], scope: root },
  );

  const chart = product.department === "Men" ? SIZE_CHARTS.Men : SIZE_CHARTS.Women;
  const conv = (v: string) =>
    unit === "cm" ? v : v.replace(/\d+/g, (n) => String(Math.round(Number(n) / 2.54)));
  const accessories = product.department === "Accessories";

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-labelledby="sg-title" aria-hidden={!open} inert={!open} className="invisible fixed inset-0 z-[140] flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" tabIndex={-1} aria-label="Close size guide" data-sg-scrim onClick={onClose} className="absolute inset-0 bg-ink/50" />
      <div data-sg-panel data-lenis-prevent className="relative flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden bg-ivory text-ink">
        <div className="flex items-start justify-between gap-6 border-b hairline px-6 py-6 md:px-10">
          <div>
            <p className="eyebrow text-stone">{product.name}</p>
            <h2 id="sg-title" className="font-serif mt-2 text-4xl leading-none md:text-5xl">Size guide</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close size guide" className="-mr-2 flex h-10 w-10 items-center justify-center">
            <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>

        <div role="tablist" aria-label="Size guide sections" className="flex gap-8 border-b hairline px-6 md:px-10">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              id={`sg-tab-${t}`}
              aria-selected={tab === t}
              aria-controls="sg-panel"
              onClick={() => setTab(t)}
              className={cn("eyebrow relative h-12 transition-colors", tab === t ? "text-ink" : "text-stone hover:text-ink")}
            >
              {t}
              <span className={cn("absolute inset-x-0 bottom-0 h-px bg-ink transition-transform duration-500", tab === t ? "scale-x-100" : "scale-x-0")} />
            </button>
          ))}
        </div>

        <div id="sg-panel" role="tabpanel" aria-labelledby={`sg-tab-${tab}`} className="flex-1 overflow-y-auto px-6 py-8 md:px-10">
          {tab === "Size chart" && (
            <div>
              {accessories ? (
                <p className="text-sm leading-relaxed text-stone">This piece is offered in a single size{product.sizes.length > 1 ? ` range (${product.sizes.join(", ")})` : ""}. Belts: S fits 76–84 cm, M 84–92 cm, L 92–100 cm at the waist.</p>
              ) : (
                <>
                  <div className="mb-5 flex items-center justify-between">
                    <p className="eyebrow text-stone">Body measurements</p>
                    <div className="flex" role="group" aria-label="Units">
                      {(["cm", "in"] as const).map((u) => (
                        <button key={u} type="button" aria-pressed={unit === u} onClick={() => setUnit(u)} className={cn("eyebrow h-8 w-10 border", unit === u ? "border-ink bg-ink text-ivory" : "border-ink/20")}>{u}</button>
                      ))}
                    </div>
                  </div>
                  <table className="w-full text-left text-sm">
                    <caption className="sr-only">Size chart in {unit === "cm" ? "centimetres" : "inches"}</caption>
                    <thead>
                      <tr className="border-b hairline">
                        {chart.cols.map((c) => (
                          <th key={c} scope="col" className="eyebrow py-3 font-medium text-stone">{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {chart.rows.map((r) => (
                        <tr key={r[0]} className={cn("border-b hairline", product.sizes.includes(r[0]) ? "" : "text-stone/60")}>
                          <th scope="row" className="num py-3.5 font-medium">{r[0]}</th>
                          {r.slice(1).map((v, i) => (
                            <td key={i} className="num py-3.5">{conv(v)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          )}

          {tab === "How to measure" && (
            <ol className="space-y-6">
              {[
                ["Bust / Chest", "Measure around the fullest part, keeping the tape level and snug, not tight."],
                ["Waist", "Measure around the narrowest part of your torso, usually just above the navel."],
                ["Hip", "Measure around the fullest part of the hips, about 20 cm below the waist."],
              ].map(([t, c], i) => (
                <li key={t} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="eyebrow num text-stone">0{i + 1}</span>
                  <div>
                    <h3 className="eyebrow">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone">{c}</p>
                  </div>
                </li>
              ))}
              <li className="text-sm text-stone">Between sizes? Choose the larger for a relaxed fit, the smaller for a closer line.</li>
            </ol>
          )}

          {tab === "Fit & model" && (
            <div className="space-y-8">
              {product.model ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="border-t hairline pt-4">
                    <p className="eyebrow text-stone">Model</p>
                    <p className="font-serif mt-2 text-3xl">Model is {product.model.height}</p>
                  </div>
                  <div className="border-t hairline pt-4">
                    <p className="eyebrow text-stone">Wearing</p>
                    <p className="font-serif mt-2 text-3xl">Size {product.model.wearing}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-stone">No model sizing is listed for this piece.</p>
              )}
              <div>
                <p className="eyebrow">Fit</p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-stone">
                  {product.category === "Blazers" || product.category === "Outerwear"
                    ? "Cut with a relaxed shoulder and room through the body. True to size; size down for a closer fit."
                    : product.category === "Knitwear"
                      ? "Close through the body, with stretch that recovers. True to size."
                      : "Cut true to size with a considered, easy proportion. If between sizes, take your usual size."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
