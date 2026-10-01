"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useShop } from "./ShopProvider";
import { Media } from "./Media";
import { ButtonLink } from "./Button";

export function CartView() {
  const { lines, subtotal, count, updateQuantity, removeLine, hydrated } = useShop();
  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 250;

  if (!hydrated) return <div className="min-h-[40svh]" aria-busy="true" />;

  if (lines.length === 0)
    return (
      <div className="flex flex-col items-start gap-6 border-t hairline py-20">
        <p className="font-serif text-5xl leading-none md:text-7xl">Your bag is empty.</p>
        <p className="max-w-sm text-stone">Pieces you add will wait here. Begin with the new season.</p>
        <ButtonLink href="/shop" variant="solid">Shop all</ButtonLink>
      </div>
    );

  return (
    <div className="grid gap-16 lg:grid-cols-12">
      <ul className="border-t hairline lg:col-span-8">
        {lines.map((l) => (
          <li key={l.key} className="grid grid-cols-[6.5rem_1fr] gap-5 border-b hairline py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
            <Link href={`/product/${l.slug}`} className="relative block aspect-[4/5] bg-cream" data-cursor="view">
              <Media src={l.image} alt={l.name} sizes="150px" />
            </Link>
            <div className="flex flex-col justify-between gap-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/product/${l.slug}`} className="font-serif text-2xl leading-tight sm:text-3xl">{l.name}</Link>
                  <p className="eyebrow mt-2 text-stone">Size {l.size} · {l.color}</p>
                </div>
                <p className="num">{formatPrice(l.price * l.quantity)}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center border hairline">
                  <button type="button" aria-label={`Decrease quantity of ${l.name}`} onClick={() => updateQuantity(l.key, -1)} className="flex h-10 w-10 items-center justify-center"><Minus className="h-3 w-3" aria-hidden="true" /></button>
                  <span className="num w-8 text-center text-sm" aria-live="polite">{l.quantity}</span>
                  <button type="button" aria-label={`Increase quantity of ${l.name}`} onClick={() => updateQuantity(l.key, 1)} className="flex h-10 w-10 items-center justify-center"><Plus className="h-3 w-3" aria-hidden="true" /></button>
                </div>
                <button type="button" onClick={() => removeLine(l.key)} className="eyebrow text-stone"><span className="u-link">Remove</span></button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside aria-label="Order summary" className="lg:col-span-4 lg:self-start lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
        <div className="border-t hairline pt-6">
          <h2 className="eyebrow">Summary <span className="num text-stone">({count})</span></h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-stone">Subtotal</dt><dd className="num">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-stone">Shipping</dt><dd className="num">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd></div>
          </dl>
          <div className="mt-6 flex items-baseline justify-between border-t hairline pt-6">
            <span className="eyebrow">Total</span>
            <span className="font-serif num text-4xl">{formatPrice(subtotal + shipping)}</span>
          </div>
          <div className="mt-8 grid gap-3">
            <ButtonLink href="/checkout" variant="solid">Checkout</ButtonLink>
            <ButtonLink href="/shop">Continue shopping</ButtonLink>
          </div>
        </div>
      </aside>
    </div>
  );
}
