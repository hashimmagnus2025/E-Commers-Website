"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useShop } from "./ShopProvider";
import { Media } from "./Media";
import { ButtonLink } from "./Button";

const input = "mt-2 w-full border-0 border-b border-ink/25 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-ink/30 focus:border-ink";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELDS = [
  { name: "email", label: "Email", type: "email", auto: "email", span: 2 },
  { name: "first", label: "First name", type: "text", auto: "given-name", span: 1 },
  { name: "last", label: "Last name", type: "text", auto: "family-name", span: 1 },
  { name: "address", label: "Address", type: "text", auto: "street-address", span: 2 },
  { name: "city", label: "City", type: "text", auto: "address-level2", span: 1 },
  { name: "pin", label: "PIN code", type: "text", auto: "postal-code", span: 1 },
] as const;

/** Static checkout. No payment is taken: placing an order shows a confirmation and clears the bag. */
export function CheckoutView() {
  const { lines, subtotal, clearBag, hydrated } = useShop();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const shipping = subtotal >= 5000 ? 0 : 250;

  if (!hydrated) return <div className="min-h-[40svh]" aria-busy="true" />;

  if (done)
    return (
      <div role="status" className="flex flex-col items-start gap-6 border-t hairline py-20">
        <Check className="h-10 w-10" strokeWidth={1.1} aria-hidden="true" />
        <p className="font-serif text-5xl leading-none md:text-7xl">Thank you.</p>
        <p className="max-w-md text-stone">Your order reference is <span className="num text-ink">{done}</span>. This is a design preview, so no payment was taken and nothing will ship.</p>
        <ButtonLink href="/shop" variant="solid">Continue shopping</ButtonLink>
      </div>
    );

  if (lines.length === 0)
    return (
      <div className="flex flex-col items-start gap-6 border-t hairline py-20">
        <p className="font-serif text-5xl leading-none md:text-7xl">Nothing to check out.</p>
        <ButtonLink href="/shop" variant="solid">Shop all</ButtonLink>
      </div>
    );

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const f of FIELDS) {
      const v = String(d.get(f.name) ?? "").trim();
      if (!v) next[f.name] = "Required";
      else if (f.name === "email" && !EMAIL.test(v)) next[f.name] = "Enter a valid email";
      else if (f.name === "pin" && !/^\d{6}$/.test(v)) next[f.name] = "Enter a 6-digit PIN";
    }
    setErrors(next);
    const firstKey = Object.keys(next)[0];
    if (firstKey) return (e.currentTarget.querySelector(`[name="${firstKey}"]`) as HTMLElement | null)?.focus();
    clearBag();
    setDone(`VLC-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div className="grid gap-16 lg:grid-cols-12">
      <form onSubmit={submit} noValidate className="lg:col-span-7">
        <h2 className="eyebrow border-t hairline pt-6">Delivery</h2>
        <div className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <div key={f.name} className={cn(f.span === 2 && "sm:col-span-2")}>
              <label htmlFor={`co-${f.name}`} className="eyebrow text-stone">{f.label}</label>
              <input id={`co-${f.name}`} name={f.name} type={f.type} autoComplete={f.auto} aria-invalid={!!errors[f.name]} aria-describedby={`co-${f.name}-err`} className={input} />
              <p id={`co-${f.name}-err`} role="alert" className="eyebrow mt-1.5 h-4 text-bronze">{errors[f.name] ?? ""}</p>
            </div>
          ))}
        </div>
        <h2 className="eyebrow mt-10 border-t hairline pt-6">Payment</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">Payment is not connected in this preview. Placing the order shows a confirmation only.</p>
        <button type="submit" className="btn btn-solid mt-10 w-full sm:w-auto" data-cursor="open">Place order — {formatPrice(subtotal + shipping)}</button>
      </form>

      <aside aria-label="Order summary" className="lg:col-span-4 lg:col-start-9 lg:self-start lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
        <h2 className="eyebrow border-t hairline pt-6">Order summary</h2>
        <ul className="mt-6 space-y-5">
          {lines.map((l) => (
            <li key={l.key} className="flex gap-4">
              <div className="relative aspect-[4/5] w-16 shrink-0 bg-cream"><Media src={l.image} alt={l.name} sizes="64px" /></div>
              <div className="flex flex-1 justify-between gap-3 text-sm">
                <div>
                  <p>{l.name}</p>
                  <p className="eyebrow mt-1 text-stone">Size {l.size} · Qty {l.quantity}</p>
                </div>
                <p className="num">{formatPrice(l.price * l.quantity)}</p>
              </div>
            </li>
          ))}
        </ul>
        <dl className="mt-8 space-y-3 border-t hairline pt-6 text-sm">
          <div className="flex justify-between"><dt className="text-stone">Subtotal</dt><dd className="num">{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-stone">Shipping</dt><dd className="num">{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd></div>
          <div className="flex justify-between border-t hairline pt-4"><dt className="eyebrow">Total</dt><dd className="num font-serif text-3xl">{formatPrice(subtotal + shipping)}</dd></div>
        </dl>
      </aside>
    </div>
  );
}
