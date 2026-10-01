"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/animations";
import type { Product } from "@/data/products";
import { products } from "@/data/products";

export interface CartLine {
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
}

interface AddOptions {
  size: string;
  color?: string;
  quantity?: number;
  /** Element to fly toward the bag icon, e.g. the product image. */
  source?: HTMLElement | null;
}

interface ShopState {
  lines: CartLine[];
  count: number;
  subtotal: number;
  wishlist: string[];
  hydrated: boolean;
  bagOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  setBagOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setMenuOpen: (v: boolean) => void;
  addToBag: (product: Product, opts: AddOptions) => Promise<void>;
  updateQuantity: (key: string, delta: number) => void;
  removeLine: (key: string) => void;
  clearBag: () => void;
  toggleWishlist: (id: string) => void;
}

const ShopContext = createContext<ShopState | null>(null);

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

const CART_KEY = "veloce-bag";
const WISH_KEY = "veloce-wishlist";

function visibleBagTarget() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-bag-target]"));
  return nodes.find((n) => n.getBoundingClientRect().width > 0) ?? null;
}

function fly(source: HTMLElement): Promise<void> {
  const target = visibleBagTarget();
  const img = source.tagName === "IMG" ? (source as HTMLImageElement) : source.querySelector("img");
  if (!target || !img || prefersReducedMotion()) return Promise.resolve();
  const from = img.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  if (!from.width) return Promise.resolve();

  const ghost = document.createElement("div");
  Object.assign(ghost.style, {
    position: "fixed",
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    backgroundImage: `url("${img.currentSrc || img.src}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: "400",
    pointerEvents: "none",
    willChange: "transform",
  });
  document.body.appendChild(ghost);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const scale = Math.max(0.04, 28 / from.width);

  return new Promise((resolve) => {
    const tl = gsap.timeline({
      onComplete: () => {
        ghost.remove();
        resolve();
      },
    });
    tl.to(ghost, { scale: 0.55, duration: 0.25, ease: "power2.out" })
      .to(ghost, { x: dx, duration: 0.8, ease: "power2.inOut" }, 0.1)
      .to(ghost, { y: dy, duration: 0.8, ease: "power3.in" }, 0.1)
      .to(ghost, { scale, opacity: 0.4, duration: 0.8, ease: "power2.in" }, 0.1);
  });
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      const valid = Array.isArray(saved)
        ? saved.filter((l: CartLine) => products.some((p) => p.id === l.productId))
        : [];
      const wish = JSON.parse(localStorage.getItem(WISH_KEY) || "[]");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLines(valid);
      setWishlist(Array.isArray(wish) ? wish : []);
    } catch {
      /* storage unavailable */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
      localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
    } catch {
      /* storage unavailable */
    }
  }, [lines, wishlist, hydrated]);

  const commit = useCallback((product: Product, opts: AddOptions) => {
    const color = opts.color ?? product.colors[0]?.name ?? "";
    const key = `${product.id}:${opts.size}:${color}`;
    const qty = opts.quantity ?? 1;
    setLines((current) => {
      const found = current.find((l) => l.key === key);
      if (found) return current.map((l) => (l.key === key ? { ...l, quantity: l.quantity + qty } : l));
      return [
        ...current,
        {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.images[0],
          size: opts.size,
          color,
          price: product.price,
          quantity: qty,
        },
      ];
    });
  }, []);

  const addToBag = useCallback(
    async (product: Product, opts: AddOptions) => {
      if (opts.source) await fly(opts.source);
      commit(product, opts);
      setMenuOpen(false);
      setBagOpen(true);
    },
    [commit],
  );

  const updateQuantity = useCallback((key: string, delta: number) => {
    setLines((c) => c.map((l) => (l.key === key ? { ...l, quantity: l.quantity + delta } : l)).filter((l) => l.quantity > 0));
  }, []);
  const removeLine = useCallback((key: string) => setLines((c) => c.filter((l) => l.key !== key)), []);
  const clearBag = useCallback(() => setLines([]), []);
  const toggleWishlist = useCallback(
    (id: string) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    [],
  );

  const value = useMemo<ShopState>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.price * l.quantity, 0),
      wishlist,
      hydrated,
      bagOpen,
      searchOpen,
      menuOpen,
      setBagOpen,
      setSearchOpen,
      setMenuOpen,
      addToBag,
      updateQuantity,
      removeLine,
      clearBag,
      toggleWishlist,
    }),
    [lines, wishlist, hydrated, bagOpen, searchOpen, menuOpen, addToBag, updateQuantity, removeLine, clearBag, toggleWishlist],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
