import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { edits } from "@/data/collections";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { ImageReveal } from "./ImageReveal";

const LAYOUT = [
  { wrap: "lg:col-span-7", aspect: "aspect-[4/5] lg:aspect-[3/4.2]", title: "display-lg", offset: "" },
  { wrap: "lg:col-span-5 lg:mt-40", aspect: "aspect-[4/5]", title: "display-md", offset: "" },
  { wrap: "lg:col-span-4 lg:col-start-6 lg:-mt-24", aspect: "aspect-square", title: "display-sm", offset: "" },
];

/** Explore by edit: three asymmetric image compositions with overlapping typography. */
export function ExploreEdits() {
  return (
    <section aria-labelledby="edits-title" className="gutter section bg-paper">
      <div className="flex items-center gap-4">
        <span className="eyebrow num text-stone">04</span>
        <span className="h-px w-10 bg-ink/30" />
        <p className="eyebrow text-stone">Collections</p>
      </div>
      <Heading as="h2" className="display display-lg mt-8">
        <span id="edits-title">Explore<br />by edit</span>
      </Heading>

      <div className="mt-16 grid gap-x-8 gap-y-16 lg:mt-24 lg:grid-cols-12">
        {edits.map((e, i) => {
          const l = LAYOUT[i];
          return (
            <Link key={e.title} href={e.href} data-cursor="explore" className={cn("group relative block", l.wrap)} aria-label={`${e.title} — ${e.note}`}>
              <ImageReveal
                src={e.image}
                alt={`${e.title} edit`}
                sizes={i === 0 ? "(min-width:1024px) 58vw, 100vw" : "(min-width:1024px) 40vw, 100vw"}
                position={e.position}
                className={l.aspect}
                imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-paper md:p-8">
                <div className="transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-3">
                  <p className="eyebrow mb-2 opacity-80">{e.note}</p>
                  <h3 className={cn("display", l.title)}>{e.title}</h3>
                </div>
                <ArrowUpRight className="mb-2 h-8 w-8 -translate-x-3 translate-y-3 opacity-0 transition-all duration-700 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" strokeWidth={1.2} aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
