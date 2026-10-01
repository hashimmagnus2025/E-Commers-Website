"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const input = "mt-2 w-full border-0 border-b border-ink/25 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink";

/** Account preview. There is no authentication in this frontend, so the form is illustrative. */
export function AccountView() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [sent, setSent] = useState(false);
  return (
    <div className="grid gap-16 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div role="tablist" aria-label="Account" className="flex gap-8 border-b hairline">
          {([["in", "Sign in"], ["up", "Create account"]] as const).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={mode === k} onClick={() => { setMode(k); setSent(false); }} className={cn("eyebrow relative h-12", mode === k ? "text-ink" : "text-stone")}>
              {l}
              <span className={cn("absolute inset-x-0 bottom-0 h-px bg-ink transition-transform duration-500", mode === k ? "scale-x-100" : "scale-x-0")} />
            </button>
          ))}
        </div>
        {sent ? (
          <p role="status" className="mt-10 font-serif text-3xl leading-tight">Accounts are not enabled in this preview. Your details were not stored.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="mt-8">
            {mode === "up" && (
              <div className="mb-4">
                <label htmlFor="acc-name" className="eyebrow text-stone">Name</label>
                <input id="acc-name" required autoComplete="name" className={input} />
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="acc-email" className="eyebrow text-stone">Email</label>
              <input id="acc-email" type="email" required autoComplete="email" className={input} />
            </div>
            <div className="mb-8">
              <label htmlFor="acc-pass" className="eyebrow text-stone">Password</label>
              <input id="acc-pass" type="password" required autoComplete={mode === "in" ? "current-password" : "new-password"} className={input} />
            </div>
            <button type="submit" className="btn btn-solid w-full" data-cursor="open">{mode === "in" ? "Sign in" : "Create account"}</button>
          </form>
        )}
      </div>

      <nav aria-label="Account shortcuts" className="lg:col-span-5 lg:col-start-8">
        <ul className="border-t hairline">
          {[
            ["Wishlist", "/wishlist", "Pieces you have saved"],
            ["Bag", "/cart", "Review what is waiting"],
            ["Size guide", "/help/size-guide", "Measurements and fit"],
            ["Contact", "/contact", "Talk to the studio"],
          ].map(([t, h, c]) => (
            <li key={t} className="border-b hairline">
              <Link href={h} className="group flex items-center justify-between py-6">
                <span>
                  <span className="font-serif block text-3xl leading-none"><span className="u-link">{t}</span></span>
                  <span className="eyebrow mt-2 block text-stone">{c}</span>
                </span>
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
