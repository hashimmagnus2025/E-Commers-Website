import Link from "next/link";
import { getProduct } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";
import { ImageReveal } from "./ImageReveal";
import { ProductCard } from "./ProductCard";
import { ButtonLink } from "./Button";

/** Editorial product layout: one large lead piece with supporting pieces on an asymmetric rhythm. */
export function FeaturedCollection() {
  const lead = getProduct("aurelia-tailored-blazer")!;
  const support = ["siena-silk-dress", "milano-relaxed-blazer", "elara-knit-top"].map((s) => getProduct(s)!);

  return (
    <section aria-labelledby="featured-title" className="gutter section">
      <div className="flex items-center gap-4">
        <span className="eyebrow num text-stone">03</span>
        <span className="h-px w-10 bg-ink/30" />
        <p className="eyebrow text-stone">The new standard</p>
      </div>

      <div className="relative z-10 mt-8 lg:-mb-[0.32em]">
        <Heading as="h2" className="display display-lg lg:mix-blend-difference lg:text-ivory">
          <span id="featured-title">Essential<br />silhouettes.</span>
        </Heading>
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Link href={`/product/${lead.slug}`} data-cursor="view" className="group relative block lg:col-span-7" aria-label={`${lead.name}, ${formatPrice(lead.price)}`}>
          <ImageReveal
            src={lead.images[0]}
            alt={`${lead.name} — ${lead.category}`}
            sizes="(min-width:1024px) 58vw, 100vw"
            position="50% 30%"
            className="aspect-[4/5]"
            imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
          />
        </Link>

        <div className="flex flex-col justify-between gap-12 lg:col-span-4 lg:col-start-9 lg:pt-[18vw]">
          <Reveal stagger={0.1}>
            <p className="eyebrow text-stone">{lead.category} · {lead.collection}</p>
            <h3 className="font-serif mt-4 text-5xl leading-[0.95] tracking-[-0.01em] md:text-6xl">{lead.name}</h3>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-stone">{lead.description}</p>
            <p className="num mt-6 text-lg">
              {formatPrice(lead.price)}
              {lead.compareAtPrice && <span className="ml-3 text-sm text-stone line-through">{formatPrice(lead.compareAtPrice)}</span>}
            </p>
            <div className="mt-8">
              <ButtonLink href={`/product/${lead.slug}`} variant="solid">Shop the blazer</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-14 md:mt-32 lg:grid-cols-12 lg:gap-x-8">
        <ProductCard product={support[0]} variant="tall" className="lg:col-span-4" sizes="(min-width:1024px) 30vw, 48vw" />
        <ProductCard product={support[1]} variant="default" className="lg:col-span-3 lg:col-start-6 lg:mt-32" sizes="(min-width:1024px) 24vw, 48vw" />
        <ProductCard product={support[2]} variant="square" className="col-span-2 sm:col-span-1 lg:col-span-3 lg:col-start-10 lg:mt-12" sizes="(min-width:1024px) 24vw, 48vw" />
      </div>

      <div className="mt-16 flex justify-end">
        <ButtonLink href="/shop">Shop all pieces</ButtonLink>
      </div>
    </section>
  );
}
