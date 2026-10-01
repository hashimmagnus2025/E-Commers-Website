"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-stone">{label}</label>
      {children}
      <p id={`${id}-err`} role="alert" className="eyebrow mt-1.5 h-4 text-bronze">{error ?? ""}</p>
    </div>
  );
}

const input = "mt-2 w-full border-0 border-b border-ink/25 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-ink/30 focus:border-ink";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(d.get("name") ?? "").trim()) next.name = "Please tell us your name";
    if (!EMAIL.test(String(d.get("email") ?? "").trim())) next.email = "Please enter a valid email";
    if (String(d.get("message") ?? "").trim().length < 10) next.message = "A little more detail, please";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
    else (e.currentTarget.querySelector(`[name="${Object.keys(next)[0]}"]`) as HTMLElement | null)?.focus();
  };

  if (sent)
    return (
      <div role="status" className="flex flex-col items-start gap-5 border-t hairline pt-10">
        <Check className="h-8 w-8" strokeWidth={1.2} aria-hidden="true" />
        <p className="font-serif text-4xl leading-tight md:text-5xl">Thank you. We will reply within two working days.</p>
        <p className="text-sm text-stone">This is a design preview — no message was actually sent.</p>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="grid gap-x-8 gap-y-2 md:grid-cols-2">
      <Field id="name" label="Name" error={errors.name}>
        <input id="name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="name-err" className={input} />
      </Field>
      <Field id="email" label="Email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby="email-err" className={input} />
      </Field>
      <div className="md:col-span-2">
        <Field id="topic" label="Topic">
          <select id="topic" name="topic" className={cn(input, "cursor-pointer")}>
            <option>An order</option>
            <option>Sizing and fit</option>
            <option>Press and collaborations</option>
            <option>Something else</option>
          </select>
        </Field>
      </div>
      <div className="md:col-span-2">
        <Field id="message" label="Message" error={errors.message}>
          <textarea id="message" name="message" rows={5} aria-invalid={!!errors.message} aria-describedby="message-err" className={cn(input, "resize-none")} />
        </Field>
      </div>
      <div className="mt-4 md:col-span-2">
        <button type="submit" className="btn btn-solid" data-cursor="open">
          Send message <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
