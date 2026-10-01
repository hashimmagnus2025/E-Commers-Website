import Link from "next/link";
import { articles } from "@/data/journal";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { ImageReveal } from "./ImageReveal";
import { TextLink } from "./Button";

const LAYOUT = [
  "lg:col-span-7 aspect-[4/3]",
  "lg:col-span-4 lg:col-start-9 aspect-[4/5] lg:mt-24",
  "lg:col-span-4 lg:col-start-2 aspect-[4/5] lg:-mt-10",
  "lg:col-span-5 lg:col-start-7 aspect-[5/4] lg:mt-20",
];

export function JournalPreview() {
  return (
    <section aria-labelledby="journal-title" className="gutter section">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4">
            <span className="eyebrow num text-stone">12</span>
            <span className="h-px w-10 bg-ink/30" />
            <p className="eyebrow text-stone">Journal</p>
          </div>
          <Heading as="h2" className="display display-lg mt-8">
            <span id="journal-title">Stories<br />from the studio</span>
          </Heading>
        </div>
        <div className="hidden pb-3 md:block">
          <TextLink href="/journal">All stories</TextLink>
        </div>
      </div>

      <div className="mt-16 grid gap-x-8 gap-y-14 lg:grid-cols-12">
        {articles.map((a, i) => (
          <Link key={a.slug} href={`/journal/${a.slug}`} data-cursor="view" className={cn("group block", LAYOUT[i].split(" ").filter((c) => c.startsWith("lg:")).join(" "))}>
            <ImageReveal
              src={a.image}
              alt={a.title}
              sizes="(min-width:1024px) 45vw, 100vw"
              position={a.position}
              className={LAYOUT[i].split(" ").filter((c) => c.startsWith("aspect")).join(" ")}
              imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
            />
            <p className="eyebrow mt-5 text-stone">{a.category} · {a.date}</p>
            <h3 className="font-serif mt-2 text-3xl leading-[1.05] md:text-4xl"><span className="u-link">{a.title}</span></h3>
          </Link>
        ))}
      </div>
      <div className="mt-12 md:hidden">
        <TextLink href="/journal">All stories</TextLink>
      </div>
    </section>
  );
}
