import { MATERIALS } from "@/data/site";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";
import { ImageReveal } from "./ImageReveal";
import { Reveal } from "./Reveal";

/** Craft: macro crops of fabric and construction, one detail at a time. */
export function Materials() {
  return (
    <section aria-labelledby="materials-title" className="gutter section">
      <div className="flex items-center gap-4">
        <span className="eyebrow num text-stone">07</span>
        <span className="h-px w-10 bg-ink/30" />
        <p className="eyebrow text-stone">Craft</p>
      </div>
      <Heading as="h2" className="display display-lg mt-8">
        <span id="materials-title">Considered<br />in every detail.</span>
      </Heading>

      <ol className="mt-20 space-y-16 md:mt-32 md:space-y-28">
        {MATERIALS.map((m, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={m.label} className="grid items-end gap-6 md:grid-cols-12 md:gap-8">
              <div className={cn("md:col-span-5", flip ? "md:col-start-7 md:order-2" : "md:col-start-1")}>
                <ImageReveal
                  src={m.image}
                  alt={`Close-up: ${m.title}`}
                  sizes="(min-width:768px) 40vw, 100vw"
                  position={m.position}
                  zoom={m.zoom}
                  className={cn(i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[5/6]")}
                />
              </div>
              <Reveal className={cn("flex flex-col gap-4 md:col-span-5 md:pb-6", flip ? "md:col-start-1 md:order-1 md:items-end md:text-right" : "md:col-start-7")}>
                <p className="eyebrow num text-stone">{String(i + 1).padStart(2, "0")} — {m.label}</p>
                <h3 className="font-serif text-4xl leading-none tracking-[-0.01em] md:text-6xl">{m.title}</h3>
                <p className="max-w-xs text-[0.9375rem] leading-relaxed text-stone">{m.copy}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
