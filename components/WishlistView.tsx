"use client";

import { products } from "@/data/products";
import { useShop } from "./ShopProvider";
import { ProductGrid } from "./ProductGrid";
import { ButtonLink } from "./Button";

export function WishlistView() {
  const { wishlist, hydrated } = useShop();
  const saved = products.filter((p) => wishlist.includes(p.id));
  if (!hydrated) return <div className="min-h-[40svh]" aria-busy="true" />;
  if (saved.length === 0)
    return (
      <div className="flex flex-col items-start gap-6 border-t hairline py-20">
        <p className="font-serif text-5xl leading-none md:text-7xl">Nothing saved yet.</p>
        <p className="max-w-sm text-stone">Tap the heart on any piece to keep it here.</p>
        <ButtonLink href="/shop" variant="solid">Shop all</ButtonLink>
      </div>
    );
  return <ProductGrid products={saved} rhythm={false} resetKey={saved.length.toString()} />;
}
