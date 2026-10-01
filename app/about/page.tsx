import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ImageReveal } from "@/components/ImageReveal";
import { Reveal } from "@/components/Reveal";
import { Heading } from "@/components/Heading";
import { MadeInIndia } from "@/components/MadeInIndia";
import { TrustStrip } from "@/components/TrustStrip";
import { Newsletter } from "@/components/Newsletter";
import { ButtonLink } from "@/components/Button";
import { photo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About — Our Story",
  description: "Veloce is a contemporary Indian fashion house. We believe less can move more: refined pieces for modern movement.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  { n: "01", t: "The everyday, considered.", c: "Our collections begin with the pieces people return to: the jacket, the shirt, the trouser. We refine their proportions, materials and feeling until they are ready for a life well lived." },
  { n: "02", t: "Clarity over excess.", c: "Fewer styles, better made. A restrained palette and a short list of fabrics let each piece say one thing, clearly." },
  { n: "03", t: "Made to move.", c: "Every pattern is tested in motion: walking, sitting, reaching, running late. If it restricts, it is redrawn." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="The house"
        title={<>We believe<br />less can<br />move more.</>}
        copy="Veloce is a contemporary fashion house from India, creating refined pieces for modern movement."
      />

      <div className="gutter">
        <ParallaxImage src={photo("1496747611176-843222e1e57c", 2200)} alt="A model in a Veloce blazer" sizes="100vw" position="50% 25%" amount={8} preload className="aspect-[4/5] md:aspect-[16/8]" />
      </div>

      <section className="gutter section grid gap-10 md:grid-cols-12">
        <Heading mode="scrub" as="p" className="serif-quote text-[clamp(1.75rem,3.4vw,3.25rem)] md:col-span-9 md:col-start-4">
          Clothes should make room for your day, not take over it. We design for clarity over excess, and for pieces that become part of a life.
        </Heading>
      </section>

      <section aria-label="Principles" className="gutter pb-24 md:pb-40">
        <ul className="border-t hairline">
          {PRINCIPLES.map((p) => (
            <Reveal as="li" key={p.n} y={24} className="grid gap-4 border-b hairline py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <span className="eyebrow num text-stone md:col-span-1">{p.n}</span>
              <h2 className="font-serif text-4xl leading-none tracking-[-0.01em] md:col-span-6 md:text-6xl">{p.t}</h2>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-stone md:col-span-4 md:col-start-9">{p.c}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="gutter grid items-end gap-8 pb-24 md:grid-cols-12 md:pb-40">
        <ImageReveal src={photo("1485968579580-b6d095142e6e", 1400)} alt="Inside the Veloce studio" sizes="(min-width:768px) 40vw, 100vw" position="50% 40%" className="aspect-[4/5] md:col-span-5" />
        <div className="md:col-span-5 md:col-start-8 md:pb-10">
          <p className="eyebrow text-stone">The studio</p>
          <Heading as="h2" className="display display-md mt-5">New Delhi,<br />slowly.</Heading>
          <Reveal as="p" className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-stone">
            We are a small team of designers, pattern cutters and fit specialists. The person who draws the line is usually in the room when it is first worn.
          </Reveal>
          <div className="mt-8"><ButtonLink href="/journal/inside-the-veloce-studio">Inside the studio</ButtonLink></div>
        </div>
      </section>

      <MadeInIndia />
      <TrustStrip />
      <Newsletter />
    </>
  );
}
