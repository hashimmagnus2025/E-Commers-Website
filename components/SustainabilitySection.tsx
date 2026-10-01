import { SUSTAINABILITY } from "@/data/site";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { ImageReveal } from "./ImageReveal";
import { Reveal } from "./Reveal";
import { TextLink } from "./Button";

export function SustainabilitySection({ link = true }: { link?: boolean }) {
  return (
    <section aria-labelledby="sustain-title" className="gutter section bg-paper">
      <div className="flex items-center gap-4">
        <span className="eyebrow num text-stone">09</span>
        <span className="h-px w-10 bg-ink/30" />
        <p className="eyebrow text-stone">Responsibility</p>
      </div>
      <Heading as="h2" className="display display-lg mt-8">
        <span id="sustain-title">Considered<br />materials.</span>
      </Heading>

      <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-3 md:gap-0">
        {SUSTAINABILITY.map((s, i) => (
          <div key={s.title} className={cn("md:px-8 md:first:pl-0 md:last:pr-0", i > 0 && "md:border-l hairline", i === 1 && "md:mt-24", i === 2 && "md:mt-48")}>
            <ImageReveal src={s.image} alt={s.title} sizes="(min-width:768px) 30vw, 100vw" position={s.position} className="aspect-[4/5]" imgClassName="grayscale-[35%]" />
            <Reveal className="mt-6">
              <p className="eyebrow num text-stone">0{i + 1}</p>
              <h3 className="eyebrow mt-3 text-ink">{s.title}</h3>
              <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-stone">{s.copy}</p>
            </Reveal>
          </div>
        ))}
      </div>

      <p className="mt-16 max-w-xl text-xs leading-relaxed text-stone">
        These are brand intentions, not certifications. Detailed sourcing and production information will be published as it is verified.
      </p>
      {link && (
        <div className="mt-6">
          <TextLink href="/sustainability">Our approach</TextLink>
        </div>
      )}
    </section>
  );
}
