import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { articles } from "@/data/journal";
import { SITE_URL } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/collections", "/campaign", "/about", "/journal", "/contact", "/sustainability", "/help/shipping", "/help/returns", "/help/size-guide", "/help/faqs"];
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${SITE_URL}/product/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    ...articles.map((a) => ({ url: `${SITE_URL}/journal/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
