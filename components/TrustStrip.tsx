import { TRUST } from "@/data/site";
import { Reveal } from "./Reveal";

/** Service information as typography and hairlines, not cards. */
export function TrustStrip() {
  return (
    <section aria-label="Shipping, returns and service" className="gutter border-t hairline py-12 md:py-16">
      <Reveal as="ul" stagger={0.08} className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {TRUST.map((t, i) => (
          <li key={t.title} className={`flex flex-col gap-1.5 px-0 md:px-8 md:first:pl-0 md:last:pr-0 ${i > 0 ? "md:border-l hairline" : ""} ${i % 2 === 1 ? "pl-6 border-l hairline md:pl-8" : ""}`}>
            <span className="eyebrow">{t.title}</span>
            <span className="text-sm text-stone">{t.sub}</span>
          </li>
        ))}
      </Reveal>
    </section>
  );
}
