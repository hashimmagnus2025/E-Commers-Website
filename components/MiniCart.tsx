"use client";

import { useRef } from "react";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/animations";
import { useOverlay } from "@/lib/useOverlay";
import { formatPrice } from "@/lib/utils";
import { useShop } from "./ShopProvider";
import { Media } from "./Media";
import { ButtonLink } from "./Button";

const FREE_SHIPPING = 5000;

/** Right-hand bag drawer. Full width on mobile. */
export function MiniCart() {
  const { bagOpen, setBagOpen, lines, subtotal, count, updateQuantity, removeLine } = useShop();
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const close = () => setBagOpen(false);
  useOverlay(bagOpen, close, root);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      gsap.set(el, { visibility: "hidden" });
      gsap.set("[data-c-panel]", { xPercent: 100 });
      gsap.set("[data-c-scrim]", { opacity: 0 });
      tl.current = gsap
        .timeline({ paused: true })
        .set(el, { visibility: "visible" })
        .to("[data-c-scrim]", { opacity: 1, duration: 0.5, ease: "power2.out" }, 0)
        .to("[data-c-panel]", { xPercent: 0, duration: 0.8, ease: "expo.out" }, 0)
        .from("[data-c-in]", { opacity: 0, y: 18, duration: 0.7, stagger: 0.05, ease: "expo.out" }, 0.25);
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const t = tl.current;
      if (!t) return;
      if (bagOpen) t.timeScale(1).play();
      else t.timeScale(1.8).reverse();
    },
    { dependencies: [bagOpen] },
  );

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);

  return (
    <div ref={root} role="dialog" aria-modal="true" aria-label="Your bag" aria-hidden={!bagOpen} inert={!bagOpen} className="fixed inset-0 z-[125]">
      <button type="button" tabIndex={-1} aria-label="Close bag" data-c-scrim onClick={close} className="absolute inset-0 bg-ink/45" />
      <aside data-c-panel className="absolute right-0 top-0 flex h-full w-full flex-col bg-ivory text-ink sm:w-[30rem]">
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="eyebrow">Your bag <span className="num text-stone">({count})</span></h2>
          <button type="button" onClick={close} aria-label="Close bag" className="flex h-10 w-10 items-center justify-center">
            <X className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>

        <div className="border-y hairline px-6 py-3" data-c-in>
          <p className="eyebrow text-stone">
            {lines.length === 0
              ? "Complimentary shipping over ₹5,000"
              : remaining > 0
                ? `${formatPrice(remaining)} from complimentary shipping`
                : "Complimentary shipping unlocked"}
          </p>
          <div className="mt-2 h-px w-full bg-ink/15">
            <div className="h-px bg-ink transition-[width] duration-700 ease-[var(--ease-expo)]" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} />
          </div>
        </div>

        <div data-lenis-prevent className="flex-1 overflow-y-auto px-6">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-start justify-center gap-6 py-16" data-c-in>
              <p className="font-serif text-4xl leading-tight">Your bag is empty.</p>
              <p className="max-w-xs text-sm text-stone">Pieces you add will wait here. Begin with the new season.</p>
              <ButtonLink href="/shop">Shop all</ButtonLink>
            </div>
          ) : (
            <ul>
              {lines.map((l) => (
                <li key={l.key} data-c-in className="flex gap-4 border-b hairline py-5">
                  <Link href={`/product/${l.slug}`} className="relative block aspect-[4/5] w-24 shrink-0 overflow-hidden bg-cream">
                    <Media src={l.image} alt={l.name} sizes="96px" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link href={`/product/${l.slug}`} className="text-sm">{l.name}</Link>
                        <p className="eyebrow mt-1.5 text-stone">Size {l.size}{l.color ? ` · ${l.color}` : ""}</p>
                      </div>
                      <p className="num text-sm">{formatPrice(l.price * l.quantity)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border hairline">
                        <button type="button" aria-label={`Decrease quantity of ${l.name}`} onClick={() => updateQuantity(l.key, -1)} className="flex h-9 w-9 items-center justify-center">
                          <Minus className="h-3 w-3" aria-hidden="true" />
                        </button>
                        <span className="num w-7 text-center text-sm" aria-live="polite">{l.quantity}</span>
                        <button type="button" aria-label={`Increase quantity of ${l.name}`} onClick={() => updateQuantity(l.key, 1)} className="flex h-9 w-9 items-center justify-center">
                          <Plus className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>
                      <button type="button" onClick={() => removeLine(l.key)} className="eyebrow text-stone transition-colors hover:text-ink">
                        <span className="u-link">Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t hairline px-6 py-6" data-c-in>
            <div className="flex items-baseline justify-between">
              <span className="eyebrow">Subtotal</span>
              <span className="num font-serif text-3xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-stone">Taxes included. Shipping calculated at checkout.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <ButtonLink href="/cart">View bag</ButtonLink>
              <ButtonLink href="/checkout" variant="solid">Checkout</ButtonLink>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
