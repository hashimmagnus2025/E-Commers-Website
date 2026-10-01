"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Check, Minus, Plus, Star } from "lucide-react";
import { gsap } from "@/lib/animations";
import { useReadyGsap } from "@/lib/useReadyGsap";
import { cn, formatPrice } from "@/lib/utils";
import { RETURNS_NOTE, SHIPPING_NOTE, type Product } from "@/data/products";
import { useShop } from "./ShopProvider";
import { ProductGallery } from "./ProductGallery";
import { SizeGuide } from "./SizeGuide";
import { Accordion } from "./Accordion";
import { WishlistButton } from "./WishlistButton";

export function ProductView({ product }: { product: Product }) {
  const { addToBag } = useShop();
  const root = useRef<HTMLDivElement>(null);
  const sizeRef = useRef<HTMLDivElement>(null);
  const single = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(single ? product.sizes[0] : null);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState<"idle" | "adding" | "added">("idle");
  const [error, setError] = useState(false);
  const [guide, setGuide] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* info column: staggered entrance, CTA last */
  useReadyGsap(root, (el) => {
    const items = el.querySelectorAll("[data-p-in]");
    gsap.set(items, { opacity: 0, y: 26 });
    gsap.to(items, { opacity: 1, y: 0, duration: 1.1, stagger: 0.09, ease: "expo.out", delay: 0.5 });
  });

  const pickSize = (s: string) => {
    setSize(s);
    setError(false);
    const btn = sizeRef.current?.querySelector(`[data-size="${s}"]`);
    if (btn) gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  };

  const add = async () => {
    if (!size) {
      setError(true);
      if (sizeRef.current) gsap.fromTo(sizeRef.current, { x: -8 }, { x: 0, duration: 0.7, ease: "elastic.out(1, 0.25)" });
      sizeRef.current?.querySelector<HTMLElement>("button")?.focus();
      return;
    }
    setStatus("adding");
    const sources = Array.from(document.querySelectorAll<HTMLElement>("[data-fly-source]"));
    const source = sources.find((s) => s.getBoundingClientRect().width > 0) ?? null;
    await addToBag(product, { size, color: color.name, quantity: qty, source });
    setStatus("added");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2200);
  };

  const discount = product.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0;

  return (
    <div ref={root} className="gutter grid grid-cols-[minmax(0,1fr)] gap-10 pb-24 pt-[calc(var(--nav-h)+1.25rem)] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
      <ProductGallery images={product.images} name={product.name} />

      <div className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start lg:pb-10">
        <nav data-p-in aria-label="Breadcrumb" className="eyebrow flex flex-wrap gap-2 text-stone">
          <Link href="/shop" className="u-link">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/shop?department=${product.department}`} className="u-link">{product.department}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.category}</span>
        </nav>

        <div data-p-in className="mt-6 flex items-start justify-between gap-6">
          <h1 className="font-serif text-[clamp(2.75rem,5vw,4.75rem)] leading-[0.95] tracking-[-0.015em]">{product.name}</h1>
          <div className="flex gap-2 pt-2">
            {product.isNew && <span className="eyebrow border border-ink/25 px-2.5 py-1 text-[0.625rem]">New</span>}
            {product.isSale && <span className="eyebrow bg-ink px-2.5 py-1 text-[0.625rem] text-ivory">Sale</span>}
          </div>
        </div>

        <div data-p-in className="mt-5 flex items-center gap-3 text-sm text-stone">
          <span className="flex" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5" strokeWidth={1.2} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
            ))}
          </span>
          <span className="num">{product.rating.toFixed(1)}</span>
          <span className="num">· {product.reviews} reviews</span>
          <span className="sr-only">Rated {product.rating} out of 5</span>
        </div>

        <p data-p-in className="num mt-6 flex items-baseline gap-4 text-2xl">
          {formatPrice(product.price)}
          {product.compareAtPrice && (
            <>
              <span className="text-base text-stone line-through"><span className="sr-only">Was </span>{formatPrice(product.compareAtPrice)}</span>
              <span className="eyebrow text-bronze">Save {discount}%</span>
            </>
          )}
        </p>

        <p data-p-in className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-stone">{product.description}</p>

        <div data-p-in className="mt-8">
          <p className="eyebrow flex items-center justify-between">
            <span>Colour <span className="text-stone">— {color.name}</span></span>
          </p>
          <div className="mt-3 flex gap-3" role="radiogroup" aria-label="Colour">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                role="radio"
                aria-checked={color.name === c.name}
                aria-label={c.name}
                onClick={() => setColor(c)}
                className={cn("flex h-10 w-10 items-center justify-center rounded-full border p-[3px] transition-colors duration-300", color.name === c.name ? "border-ink" : "border-ink/15 hover:border-ink/50")}
              >
                <span className="block h-full w-full rounded-full border border-black/10" style={{ background: c.hex }} />
              </button>
            ))}
          </div>
        </div>

        <div data-p-in className="mt-8">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Size {size && <span className="text-stone">— {size}</span>}</p>
            {!single && (
              <button type="button" onClick={() => setGuide(true)} className="eyebrow text-stone transition-colors hover:text-ink">
                <span className="u-link">Size guide</span>
              </button>
            )}
          </div>
          <div ref={sizeRef} role="radiogroup" aria-label="Size" aria-describedby={error ? "size-error" : undefined} className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                data-size={s}
                aria-checked={size === s}
                onClick={() => pickSize(s)}
                className={cn(
                  "eyebrow h-12 min-w-14 border px-4 transition-all duration-500 ease-[var(--ease-expo)]",
                  size === s ? "border-ink bg-ink text-ivory" : error ? "border-bronze/60 hover:border-ink" : "border-ink/20 hover:border-ink",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <p id="size-error" role="alert" className="eyebrow mt-2 h-4 text-bronze">{error ? "Please select a size" : ""}</p>
        </div>

        <div data-p-in className="mt-4 flex items-center gap-4">
          <div className="flex items-center border hairline" role="group" aria-label="Quantity">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center">
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span className="num w-8 text-center text-sm" aria-live="polite">{qty}</span>
            <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(9, q + 1))} className="flex h-12 w-12 items-center justify-center">
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <p className="text-xs text-stone">In stock · Ships in 2 working days</p>
        </div>

        <div data-p-in className="mt-6 grid grid-cols-[1fr_auto] gap-3">
          <button
            type="button"
            onClick={add}
            disabled={status === "adding"}
            className={cn(
              "eyebrow relative flex h-14 items-center justify-center overflow-hidden transition-colors duration-500",
              status === "added" ? "bg-bronze text-paper" : "bg-ink text-ivory hover:bg-charcoal",
            )}
            data-cursor="open"
          >
            <span key={status} className="flex items-center gap-2 animate-[fadeup_0.6s_var(--ease-expo)]">
              {status === "added" ? (
                <>
                  Added <Check className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                </>
              ) : status === "adding" ? (
                "Adding…"
              ) : (
                `Add to bag — ${formatPrice(product.price * qty)}`
              )}
            </span>
          </button>
          <WishlistButton productId={product.id} name={product.name} label="Wishlist" className="h-14 border hairline px-5 transition-colors hover:bg-ink hover:text-ivory" />
        </div>

        <div data-p-in className="mt-10">
          <Accordion
            items={[
              { title: "Details", content: <ul className="list-disc space-y-1.5 pl-4">{product.details.map((d) => <li key={d}>{d}</li>)}</ul> },
              { title: "Materials", content: <ul className="space-y-1.5">{product.materials.map((m) => <li key={m}>{m}</li>)}</ul> },
              { title: "Care", content: <ul className="list-disc space-y-1.5 pl-4">{product.care.map((c) => <li key={c}>{c}</li>)}</ul> },
              { title: "Shipping", content: <p>{SHIPPING_NOTE}</p> },
              { title: "Returns", content: <p>{RETURNS_NOTE}</p> },
            ]}
          />
        </div>
      </div>

      <SizeGuide open={guide} onClose={() => setGuide(false)} product={product} />
    </div>
  );
}
