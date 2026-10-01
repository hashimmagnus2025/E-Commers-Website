import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/journal";
import { PageHeader } from "@/components/PageHeader";
import { ImageReveal } from "@/components/ImageReveal";
import { Newsletter } from "@/components/Newsletter";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal",
  description: "Stories from the Veloce studio: everyday dressing, proportion, materials and the people behind the pieces.",
  alternates: { canonical: "/journal" },
};

const LAYOUT = [
  { wrap: "lg:col-span-8", aspect: "aspect-[4/3]", title: "text-4xl md:text-6xl" },
  { wrap: "lg:col-span-4 lg:mt-40", aspect: "aspect-[4/5]", title: "text-3xl md:text-4xl" },
  { wrap: "lg:col-span-5 lg:col-start-2", aspect: "aspect-[4/5]", title: "text-3xl md:text-4xl" },
  { wrap: "lg:col-span-6 lg:col-start-7 lg:mt-24", aspect: "aspect-[5/4]", title: "text-3xl md:text-5xl" },
];

export default function JournalPage() {
  return (
    <>
      <PageHeader eyebrow="Journal" title={<>Stories from<br />the studio</>} copy="Field notes on dressing, proportion and material, written slowly." />
      <div className="gutter grid gap-x-8 gap-y-20 pb-28 lg:grid-cols-12">
        {articles.map((a, i) => (
          <Link key={a.slug} href={`/journal/${a.slug}`} data-cursor="view" className={cn("group block", LAYOUT[i].wrap)}>
            <ImageReveal
              src={a.image}
              alt={a.title}
              sizes="(min-width:1024px) 60vw, 100vw"
              position={a.position}
              className={LAYOUT[i].aspect}
              imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
            />
            <div className="mt-5 flex items-center gap-4">
              <span className="eyebrow">{a.category}</span>
              <span className="h-px w-6 bg-ink/30" />
              <span className="eyebrow text-stone">{a.date}</span>
            </div>
            <h2 className={cn("font-serif mt-3 leading-[1.02] tracking-[-0.01em]", LAYOUT[i].title)}>{a.title}</h2>
            <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-stone">{a.excerpt}</p>
            <p className="eyebrow mt-5"><span className="u-link">Read article</span> →</p>
          </Link>
        ))}
      </div>
      <Newsletter />
    </>
  );
}
