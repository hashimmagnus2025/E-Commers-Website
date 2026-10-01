"use client";

import { useRef } from "react";
import { Heart } from "lucide-react";
import { gsap } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useShop } from "./ShopProvider";

export function WishlistButton({ productId, name, className, label }: { productId: string; name: string; className?: string; label?: string }) {
  const { wishlist, toggleWishlist } = useShop();
  const active = wishlist.includes(productId);
  const icon = useRef<SVGSVGElement>(null);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${active ? "Remove" : "Save"} ${name} ${active ? "from" : "to"} wishlist`}
      onClick={() => {
        toggleWishlist(productId);
        if (!active && icon.current) {
          gsap.fromTo(icon.current, { scale: 0.6 }, { scale: 1, duration: 0.9, ease: "elastic.out(1.1, 0.4)" });
        }
      }}
      className={cn("flex items-center gap-3", className)}
    >
      <Heart ref={icon} className="h-[18px] w-[18px]" strokeWidth={1.4} fill={active ? "currentColor" : "none"} aria-hidden="true" />
      {label && <span className="eyebrow">{active ? "Saved" : label}</span>}
    </button>
  );
}
