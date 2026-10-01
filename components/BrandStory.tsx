import { photo } from "@/lib/utils";
import { Heading } from "./Heading";
import { ParallaxImage } from "./ParallaxImage";
import { TextLink } from "./Button";

/** "Form meets movement." — oversized serif statement with an image sandwiched between the lines. */
export function BrandStory() {
  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden bg-cream">
      <div className="gutter section relative">
        <div className="flex items-center gap-4">
          <span className="eyebrow num text-stone">05</span>
          <span className="h-px w-10 bg-ink/30" />
          <p className="eyebrow text-stone">The Veloce point of view</p>
        </div>

        <div className="relative mt-10 md:mt-16">
          <ParallaxImage
            src={photo("1516826957135-700dedea698c", 1400)}
            alt="Portrait in a Veloce jacket"
            sizes="(min-width:768px) 28vw, 60vw"
            position="50% 25%"
            amount={8}
            className="absolute left-1/2 top-[12%] z-0 aspect-[3/4] w-[58vw] -translate-x-1/2 md:left-auto md:right-[8%] md:top-[2%] md:w-[28vw] md:translate-x-0"
          />
          <h2 id="story-title" className="relative z-10 text-ink md:mix-blend-difference md:text-ivory">
            <Heading as="span" className="display display-xl block">Form</Heading>
            <Heading as="span" className="display display-xl block text-right">Meets</Heading>
            <Heading as="span" className="display display-xl block">Movement.</Heading>
          </h2>
        </div>

        <div className="mt-20 grid gap-10 md:mt-32 md:grid-cols-12">
          <Heading mode="scrub" as="p" className="serif-quote text-[clamp(1.75rem,3.4vw,3.25rem)] md:col-span-9 md:col-start-4">
            “We make pieces that find their place in your life. Not for a season, but for the space between plans — when you need to feel exactly like yourself.”
          </Heading>
          <div className="md:col-span-9 md:col-start-4">
            <TextLink href="/about">Our philosophy</TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
