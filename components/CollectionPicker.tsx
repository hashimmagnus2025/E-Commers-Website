"use client";

import { collections } from "@/data/collections";
import { cn } from "@/lib/utils";
import { Media } from "./Media";

/** Collection hero: a description block that follows the selected edit. */
export function CollectionPicker({ active, onChange }: { active: string; onChange: (c: string) => void }) {
  const current = collections.find((c) => c.title === active);
  return (
    <section aria-label="Collection" className="mb-14 grid gap-8 md:grid-cols-12 md:gap-10">
      <div className="relative aspect-[16/10] overflow-hidden bg-cream md:col-span-7 md:aspect-[16/9]">
        {collections.map((c) => (
          <div key={c.title} className={cn("absolute inset-0 transition-opacity duration-[900ms]", (current ? current.title === c.title : c === collections[0]) ? "opacity-100" : "opacity-0")} aria-hidden={current?.title !== c.title}>
            <Media src={c.image} alt={`${c.title} collection`} sizes="(min-width:768px) 58vw, 100vw" position="50% 30%" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
        <p className="display display-md absolute bottom-5 left-5 text-paper md:bottom-7 md:left-7">{current?.title ?? "All edits"}</p>
      </div>
      <div className="flex flex-col justify-between gap-8 md:col-span-5">
        <div>
          <p className="eyebrow text-stone">{current?.season ?? "Spring / Summer 2026"}</p>
          <p className="font-serif mt-4 text-3xl leading-[1.1] md:text-4xl" aria-live="polite">
            {current?.description ?? "Every edit in one place: the permanent pieces, the season, and the evening."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Choose collection">
          {[{ title: "" , label: "All" }, ...collections.map((c) => ({ title: c.title, label: c.title }))].map((c) => (
            <button
              key={c.label}
              type="button"
              aria-pressed={active === c.title}
              onClick={() => onChange(c.title)}
              className={cn("eyebrow h-10 border px-4 transition-colors duration-300", active === c.title ? "border-ink bg-ink text-ivory" : "border-ink/20 hover:border-ink")}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
