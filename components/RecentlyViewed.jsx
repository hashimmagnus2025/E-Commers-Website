'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCommerce } from './SiteShell';

export function RecentlyViewed() {
  const [items, setItems] = useState([]);
  const { addToBag, wishlist, toggleWishlist } = useCommerce();
  useEffect(() => { try { const ids = JSON.parse(localStorage.getItem('veloce-recent') || '[]'); setItems(ids.map((id) => products.find((product) => product.id === id)).filter(Boolean).slice(0, 4)); } catch {} }, []);
  if (!items.length) return null;
  return <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [.22,1,.36,1] }} viewport={{ once: true, amount: .2 }} className="page-pad border-t hairline py-24">
    <p className="eyebrow text-[#837c70]">Picked up recently</p>
    <h2 className="serif mt-3 text-5xl">Keep exploring.</h2>
    <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
      {items.map((product, i) => <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * .08, duration: .5 }} viewport={{ once: true }}>
        <ProductCard product={product} onAdd={addToBag} onWish={toggleWishlist} isWishlisted={wishlist.some((item) => item.id === product.id)} />
      </motion.div>)}
    </div>
  </motion.section>;
}
