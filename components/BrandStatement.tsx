import { Heading } from "./Heading";
import { Reveal } from "./Reveal";
import { TextLink } from "./Button";

export function BrandStatement() {
  return (
    <section aria-labelledby="statement" className="gutter section">
      <div className="flex items-center gap-4">
        <span className="eyebrow num text-stone">01</span>
        <span className="h-px w-10 bg-ink/30" />
        <p className="eyebrow text-stone">The house</p>
      </div>
      <Heading as="h2" className="display display-md mt-10 max-w-[18ch] text-balance md:mt-14 md:max-w-[16ch]">
        <span id="statement">We design for the space between plans.</span>
      </Heading>
      <div className="mt-14 flex justify-end md:mt-24">
        <Reveal className="max-w-md">
          <p className="text-[0.9375rem] leading-relaxed text-stone">
            Veloce creates contemporary essentials that balance structure, movement and everyday life. Made in India, cut for the way you actually move through a day.
          </p>
          <div className="mt-8">
            <TextLink href="/about">Our story</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
