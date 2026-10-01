import { photo } from "@/lib/utils";
import { Heading } from "./Heading";
import { ParallaxImage } from "./ParallaxImage";
import { Reveal } from "./Reveal";

const FACTS = [
  { k: "Designed", v: "New Delhi" },
  { k: "Made", v: "In India" },
  { k: "Cut for", v: "Warm climates" },
];

export function MadeInIndia() {
  return (
    <section aria-labelledby="india-title" className="relative overflow-hidden bg-ink text-ivory">
      <div className="gutter section">
        <div className="flex items-center gap-4">
          <span className="eyebrow num text-ivory/50">08</span>
          <span className="h-px w-10 bg-ivory/30" />
          <p className="eyebrow text-ivory/60">Origin</p>
        </div>

        <div className="relative mt-10 grid gap-10 md:mt-16 md:grid-cols-12">
          <div className="relative z-10 md:col-span-8">
            <Heading as="h2" className="display display-xl">
              <span id="india-title">Made<br />in India.</span>
            </Heading>
          </div>
          <div className="relative md:col-span-4 md:col-start-9 md:-mt-4">
            <ParallaxImage
              src={photo("1525507119028-ed4c629a60a3", 1200)}
              alt="Veloce garment detail"
              sizes="(min-width:768px) 28vw, 100vw"
              position="50% 40%"
              amount={7}
              className="aspect-[3/4] !bg-charcoal"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:col-start-2">
            <p className="font-serif text-3xl leading-[1.12] md:text-4xl">
              Designed with a contemporary Indian perspective and crafted with attention to material, proportion and detail.
            </p>
          </Reveal>
          <Reveal as="dl" stagger={0.1} className="grid grid-cols-3 gap-6 border-t border-ivory/20 pt-6 md:col-span-4 md:col-start-9">
            {FACTS.map((f) => (
              <div key={f.k}>
                <dt className="eyebrow text-ivory/50">{f.k}</dt>
                <dd className="mt-2 text-sm">{f.v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
