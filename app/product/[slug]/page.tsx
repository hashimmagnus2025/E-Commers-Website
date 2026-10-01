import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getRelated, products } from "@/data/products";
import { ProductView } from "@/components/ProductView";
import { Recommendations } from "@/components/Recommendations";
import { Newsletter } from "@/components/Newsletter";
import { SITE_URL } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Not found" };
  return {
    title: `${p.name} — ${p.category}`,
    description: p.description,
    alternates: { canonical: `/product/${p.slug}` },
    openGraph: {
      type: "website",
      title: `${p.name} — Veloce`,
      description: p.description,
      url: `/product/${p.slug}`,
      images: [{ url: p.images[0], alt: p.name }],
    },
    twitter: { card: "summary_large_image", title: `${p.name} — Veloce`, description: p.description, images: [p.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    category: product.category,
    brand: { "@type": "Brand", name: "Veloce" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/product/${product.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ProductView key={product.id} product={product} />
      <Recommendations items={getRelated(product, 4)} />
      <Newsletter />
    </>
  );
}
