"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { photo } from "@/lib/utils";
import { ParallaxImage } from "./ParallaxImage";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const input = useRef<HTMLInputElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setState("error");
      input.current?.focus();
      return;
    }
    setState("done");
  };

  return (
    <section aria-labelledby="newsletter-title" className="relative isolate overflow-hidden bg-ink text-ivory">
      <ParallaxImage
        src={photo("1485968579580-b6d095142e6e", 2000)}
        alt=""
        sizes="100vw"
        position="50% 40%"
        amount={8}
        className="absolute inset-0 -z-10 !bg-ink opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/40 to-ink" aria-hidden="true" />
      <div className="gutter section">
        <p className="eyebrow text-ivory/60">The Veloce newsletter</p>
        <Heading as="h2" className="display display-lg mt-8" >
          <span id="newsletter-title">Enter the<br />Veloce world.</span>
        </Heading>

        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-end">
          <Reveal as="p" className="max-w-sm text-[0.9375rem] leading-relaxed text-ivory/70">
            Be first to discover new collections, campaigns and stories.
          </Reveal>

          <Reveal>
            {state === "done" ? (
              <p role="status" className="flex items-center gap-4 border-b border-ivory/30 pb-4 font-serif text-3xl">
                <Check className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" /> Welcome to Veloce.
              </p>
            ) : (
              <form onSubmit={submit} noValidate>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <div className="flex items-center gap-4 border-b border-ivory/40 pb-3 transition-colors focus-within:border-ivory">
                  <input
                    ref={input}
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    placeholder="YOUR EMAIL ADDRESS"
                    autoComplete="email"
                    aria-invalid={state === "error"}
                    aria-describedby={state === "error" ? "newsletter-error" : undefined}
                    className="eyebrow min-w-0 flex-1 bg-transparent py-2 text-ivory placeholder:text-ivory/45 focus:outline-none"
                  />
                  <button type="submit" className="arrow-link eyebrow group flex items-center gap-3" data-cursor="open">
                    <span className="u-link">Join</span>
                    <ArrowRight className="arrow h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
                  </button>
                </div>
                <p id="newsletter-error" role="alert" className="eyebrow mt-3 h-4 text-bronze">
                  {state === "error" ? "Please enter a valid email address." : ""}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
