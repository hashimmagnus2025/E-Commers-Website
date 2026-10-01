"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/data/products";
import { Media } from "./Media";
import { QuickAdd } from "./QuickAdd";
import { WishlistButton } from "./WishlistButton";

interface Props {
  product: Product;
  /** Visual treatment: feature fills its grid area; others use an aspect ratio. */
  variant?: "default" | "feature" | "tall" | "square";
  sizes?: string;
  preload?: boolean;
  className?: string;
  /** Hide rating row for compact usage. */
  compact?: boolean;
}

const ASPECT = {
  default: "aspect-[4/5]",
  tall: "aspect-[3/4.6]",
  square: "aspect-square",
  feature: "aspect-[5/6] lg:aspect-auto lg:min-h-[26rem] lg:flex-1",
} as const;

export function ProductCard({ product, variant = "default", sizes = "(min-width:1024px) 30vw, 48vw", preload, className, compact }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const badge = product.isSale ? "Sale" : product.isNew ? "New" : null;

  return (
    <article data-card data-id={product.id} className={cn("group flex flex-col", className)}>
      <div ref={box} className={cn("relative overflow-hidden bg-cream", ASPECT[variant])}>
        <Link href={`/product/${product.slug}`} data-cursor="view" aria-label={`${product.name}, ${formatPrice(product.price)}`} className="absolute inset-0 z-10">
          <Media
            src={product.images[0]}
            alt={`${product.name} — ${product.category}`}
            sizes={sizes}
            preload={preload}
            className="transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-[1.04]"
          />
          <Media
            src={product.images[1] ?? product.images[0]}
            alt=""
            sizes={sizes}
            className="opacity-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-expo)] group-hover:scale-[1.04] group-hover:opacity-100 [@media(hover:none)]:hidden"
          />
        </Link>

        {badge && (
          <span className={cn("eyebrow absolute left-3 top-3 z-20 px-2.5 py-1.5 text-[0.625rem]", badge === "Sale" ? "bg-ink text-ivory" : "bg-paper text-ink")}>
            {badge}
          </span>
        )}
        <WishlistButton productId={product.id} name={product.name} className="absolute right-1.5 top-1.5 z-20 h-10 w-10 justify-center text-ink mix-blend-normal" />
        <QuickAdd product={product} imageBox={box} />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[0.9375rem] leading-snug transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-1.5">
            <Link href={`/product/${product.slug}`} className="inline-flex items-center gap-2">
              {product.name}
              <ArrowUpRight className="h-3.5 w-3.5 -translate-x-2 opacity-0 transition-all duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.4} aria-hidden="true" />
            </Link>
          </h3>
          <p className="eyebrow mt-1.5 text-stone">{product.category}</p>
          {!compact && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-stone">
              <Star className="h-3 w-3 fill-current" strokeWidth={0} aria-hidden="true" />
              <span className="num">{product.rating.toFixed(1)}</span>
              <span className="num">({product.reviews})</span>
              <span className="sr-only">rating from {product.reviews} reviews</span>
            </p>
          )}
        </div>
        <p className="num shrink-0 text-right text-[0.9375rem]">
          {formatPrice(product.price)}
          {product.compareAtPrice && (
            <span className="block text-xs text-stone line-through">
              <span className="sr-only">Was </span>
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
