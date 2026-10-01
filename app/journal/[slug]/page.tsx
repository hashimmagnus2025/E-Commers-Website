import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/journal";
import { getProduct } from "@/data/products";
import { Heading } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ImageReveal } from "@/components/ImageReveal";
import { ProductCard } from "@/components/ProductCard";
import { Newsletter } from "@/components/Newsletter";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Not found" };
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: { type: "article", title: `${a.title} — Veloce Journal`, description: a.excerpt, images: [{ url: a.image, alt: a.title }] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const index = articles.indexOf(article);
  const next = articles[(index + 1) % articles.length];
  const picks = ["aurelia-tailored-blazer", "orion-cotton-shirt", "mira-wide-leg-trousers"].map((s) => getProduct(s)!);

  return (
    <>
      <article>
        <header className="gutter pt-[calc(var(--nav-h)+4rem)] md:pt-[calc(var(--nav-h)+6rem)]">
          <div className="flex items-center gap-4">
            <Link href="/journal" className="eyebrow u-link">Journal</Link>
            <span className="h-px w-6 bg-ink/30" />
            <span className="eyebrow">{article.category}</span>
            <span className="eyebrow text-stone">{article.date} · {article.readTime}</span>
          </div>
          <Heading as="h1" className="display display-lg mt-8 max-w-[14ch]">{article.title}</Heading>
          <Reveal as="p" className="font-serif mt-8 max-w-2xl text-3xl leading-[1.12] md:text-4xl" delay={0.3}>{article.excerpt}</Reveal>
        </header>

        <div className="gutter mt-14 md:mt-20">
          <ParallaxImage src={article.image} alt={article.title} sizes="100vw" position={article.position} amount={7} preload className="aspect-[4/3] md:aspect-[16/8]" />
        </div>

        <div className="gutter section grid gap-10 md:grid-cols-12">
          <div className="space-y-7 text-[1.0625rem] leading-[1.75] md:col-span-6 md:col-start-4">
            {article.body.slice(0, 2).map((p, i) => (
              <Reveal as="p" key={i} y={24}>{p}</Reveal>
            ))}
          </div>
          <Heading mode="words" as="blockquote" className="font-serif text-[clamp(2rem,4.6vw,4.5rem)] leading-[1.02] tracking-[-0.015em] md:col-span-10 md:col-start-2 md:my-10">
            “{article.pullQuote}”
          </Heading>
          <div className="space-y-7 text-[1.0625rem] leading-[1.75] md:col-span-6 md:col-start-4">
            {article.body.slice(2).map((p, i) => (
              <Reveal as="p" key={i} y={24}>{p}</Reveal>
            ))}
          </div>
        </div>
      </article>

      <section aria-label="Pieces mentioned" className="gutter pb-24">
        <p className="eyebrow border-t hairline pt-8 text-stone">Pieces in this story</p>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6">
          {picks.map((p) => (
            <ProductCard key={p.id} product={p} sizes="(min-width:768px) 30vw, 48vw" />
          ))}
        </div>
      </section>

      <section aria-label="Next story" className="gutter border-t hairline py-20 md:py-28">
        <p className="eyebrow text-stone">Next story</p>
        <Link href={`/journal/${next.slug}`} data-cursor="view" className="group mt-8 grid items-center gap-8 md:grid-cols-12">
          <h2 className="display display-md md:col-span-7">{next.title}</h2>
          <ImageReveal src={next.image} alt={next.title} sizes="(min-width:768px) 36vw, 100vw" position={next.position} className="aspect-[4/3] md:col-span-4 md:col-start-9" imgClassName="transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.05]" />
        </Link>
      </section>
      <Newsletter />
    </>
  );
}
