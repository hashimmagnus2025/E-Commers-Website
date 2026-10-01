import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMMUNITY } from "@/data/site";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { ImageReveal } from "./ImageReveal";

/** Masonry of community imagery. Handles and images are sample content. */
export function Community() {
  return (
    <section aria-labelledby="community-title" className="gutter section">
      <div className="flex items-center gap-4">
        <span className="eyebrow num text-stone">10</span>
        <span className="h-px w-10 bg-ink/30" />
        <p className="eyebrow text-stone">Community</p>
      </div>
      <Heading as="h2" className="display display-lg mt-8">
        <span id="community-title">Style your<br />Veloce</span>
      </Heading>

      <ul className="mt-16 columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
        {COMMUNITY.map((c, i) => (
          <li key={c.handle} className={cn("mb-3 break-inside-avoid md:mb-5", i === 1 && "lg:mt-20", i === 4 && "lg:mt-10")}>
            <Link href="/shop" data-cursor="view" className="group relative block" aria-label={`Shop the look from ${c.handle}`}>
              <ImageReveal src={c.image} alt={`Styled look from ${c.handle}`} sizes="(min-width:1024px) 24vw, 48vw" className={c.ratio} imgClassName="transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]" />
              <div className="absolute inset-0 flex flex-col justify-end gap-1 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent p-4 text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
                <span className="eyebrow">{c.handle}</span>
                <span className="eyebrow flex items-center gap-2 text-[0.625rem]">Shop the look <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden="true" /></span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-xs text-stone">Demo content. Handles shown are placeholders for community photography.</p>
    </section>
  );
}
