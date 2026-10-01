import type { Metadata } from "next";
import { campaign } from "@/data/campaign";
import { getProduct } from "@/data/products";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ImageReveal } from "@/components/ImageReveal";
import { Heading } from "@/components/Heading";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ButtonLink } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Veloce Campaign — Spring / Summer 2026",
  description: "Made for movement. Built for everyday. The Veloce Spring / Summer 2026 campaign, in four chapters.",
  alternates: { canonical: "/campaign" },
  openGraph: { images: [{ url: campaign.hero, alt: "Veloce SS26 campaign" }] },
};

function Chapter({ n, title, dark }: { n: string; title: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className={cn("eyebrow num", dark ? "text-ivory/60" : "text-stone")}>{n}</span>
      <span className={cn("h-px w-10", dark ? "bg-ivory/40" : "bg-ink/30")} />
      <p className={cn("eyebrow", dark ? "text-ivory/60" : "text-stone")}>{title}</p>
    </div>
  );
}

export default function CampaignPage() {
  const [form, movement, texture, everyday] = campaign.chapters as [
    (typeof campaign.chapters)[0] & { image: string; position: string },
    (typeof campaign.chapters)[1] & { image: string; position: string },
    (typeof campaign.chapters)[2] & { images: { src: string; position: string; zoom: number }[] },
    (typeof campaign.chapters)[3] & { image: string; position: string },
  ];
  const shop = campaign.shopSlugs.map((slug) => getProduct(slug)!);

  return (
    <>
      {/* hero */}
      <section aria-label="Campaign" className="relative isolate flex h-[100svh] min-h-[620px] flex-col justify-end overflow-hidden bg-ink text-paper">
        <ParallaxImage src={campaign.hero} alt="Veloce Spring / Summer 2026 campaign" sizes="100vw" position="50% 25%" amount={8} preload className="absolute inset-0 -z-10 !bg-ink" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/75 via-ink/5 to-ink/40" aria-hidden="true" />
        <div className="gutter pb-10 md:pb-14">
          <p className="eyebrow">{campaign.season}</p>
          <Heading as="h1" className="display display-xl mt-6" delay={0.5}>
            The Veloce<br />Campaign
          </Heading>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <p className="font-serif max-w-xs text-3xl leading-[1.05]">{campaign.lines[0]} {campaign.lines[1]}</p>
            <p className="eyebrow text-paper/70">Four chapters ↓</p>
          </div>
        </div>
      </section>

      <Marquee items={["Form", "Movement", "Texture", "Everyday"]} />

      {/* 01 form */}
      <section aria-labelledby="ch-form" className="gutter section">
        <Chapter n="01" title="Chapter" />
        <div className="mt-10 grid items-end gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <ImageReveal src={form.image} alt="Form: tailoring in a Veloce campaign frame" sizes="(min-width:768px) 58vw, 100vw" position={form.position} className="aspect-[4/5]" />
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pb-10">
            <Heading as="h2" className="display display-lg"><span id="ch-form">{form.title}</span></Heading>
            <Reveal as="p" className="mt-8 text-[0.9375rem] leading-relaxed text-stone">{form.copy}</Reveal>
          </div>
        </div>
      </section>

      {/* 02 movement */}
      <section aria-labelledby="ch-movement" className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink py-10 text-paper md:py-14">
        <ParallaxImage src={movement.image} alt="Movement: a model in motion" sizes="100vw" position={movement.position} amount={10} className="absolute inset-0 -z-10 !bg-ink" />
        <div className="absolute inset-0 -z-10 bg-ink/25" aria-hidden="true" />
        <div className="gutter"><Chapter n="02" title="Chapter" dark /></div>
        <div className="gutter grid items-end gap-8 md:grid-cols-12">
          <Heading as="h2" className="display display-xl md:col-span-8"><span id="ch-movement">{movement.title}</span></Heading>
          <Reveal as="p" className="max-w-sm text-[0.9375rem] leading-relaxed text-paper/85 md:col-span-4 md:pb-4">{movement.copy}</Reveal>
        </div>
      </section>

      {/* 03 texture */}
      <section aria-labelledby="ch-texture" className="gutter section bg-cream">
        <Chapter n="03" title="Chapter" />
        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12">
          <Heading as="h2" className="display display-lg md:col-span-6"><span id="ch-texture">{texture.title}</span></Heading>
          <Reveal as="p" className="max-w-sm text-[0.9375rem] leading-relaxed text-stone md:col-span-4 md:col-start-9 md:self-end">{texture.copy}</Reveal>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
          {texture.images.map((im, i) => (
            <ImageReveal
              key={i}
              src={im.src}
              alt={`Texture detail ${i + 1}`}
              sizes="(min-width:768px) 30vw, 48vw"
              position={im.position}
              zoom={im.zoom}
              className={cn(
                i === 0 && "aspect-[3/4] md:col-span-5",
                i === 1 && "aspect-square md:col-span-3 md:mt-24",
                i === 2 && "aspect-[4/5] md:col-span-4 md:-mt-10",
                i === 3 && "col-span-2 aspect-[16/9] md:col-span-7 md:col-start-3",
              )}
            />
          ))}
        </div>
      </section>

      {/* 04 everyday */}
      <section aria-labelledby="ch-everyday" className="gutter section">
        <Chapter n="04" title="Chapter" />
        <div className="mt-10 grid items-start gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="order-2 md:order-1 md:col-span-4 md:pt-32">
            <Heading as="h2" className="display display-lg"><span id="ch-everyday">{everyday.title}</span></Heading>
            <Reveal as="p" className="mt-8 text-[0.9375rem] leading-relaxed text-stone">{everyday.copy}</Reveal>
          </div>
          <div className="order-1 md:order-2 md:col-span-7 md:col-start-6">
            <ImageReveal src={everyday.image} alt="Everyday: a model in Veloce" sizes="(min-width:768px) 58vw, 100vw" position={everyday.position} className="aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* shop the campaign */}
      <section aria-labelledby="shop-campaign" className="gutter pb-24 md:pb-36">
        <div className="flex items-end justify-between gap-6 border-t hairline pt-16 md:pt-24">
          <Heading as="h2" className="display display-lg"><span id="shop-campaign">Shop the<br />campaign</span></Heading>
          <div className="hidden pb-3 md:block"><ButtonLink href="/shop" variant="solid">Shop all</ButtonLink></div>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {shop.map((p, i) => (
            <ProductCard key={p.id} product={p} sizes="(min-width:768px) 22vw, 48vw" className={i % 2 === 1 ? "md:mt-20" : ""} />
          ))}
        </div>
        <div className="mt-12 md:hidden"><ButtonLink href="/shop" variant="solid">Shop all</ButtonLink></div>
      </section>
    </>
  );
}
