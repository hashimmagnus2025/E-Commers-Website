'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Plus, Star } from 'lucide-react';
import { formatPrice } from '../data/products';

export function ProductCard({ product, onAdd, isWishlisted, onWish }) {
  return <motion.article whileHover={{ y: -6 }} transition={{ duration: .4, ease: [.16,1,.3,1] }} className="group relative">
    <Link href={`/product/${product.slug}`} className="block">
      <div className="image-wrap aspect-[3/4] bg-[#dedbd5]">
        <img loading="lazy" decoding="async" src={product.images[0]} alt={product.name} className="h-full w-full object-cover"/>
        <img loading="lazy" decoding="async" src={product.images[1]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {product.newArrival && <span className="eyebrow absolute left-3 top-3 bg-[#f7f4ee] px-2 py-1">New</span>}
        {product.originalPrice && <span className="eyebrow absolute left-3 top-3 bg-[var(--gold)] px-2 py-1 text-white" style={{ marginTop: product.newArrival ? '28px' : 0 }}>Sale</span>}
      </div>
    </Link>
    <button onClick={() => onWish(product)} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f7f4ee]/85 transition-transform hover:scale-110" aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
      <motion.span animate={isWishlisted ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: .35 }}><Heart size={15} fill={isWishlisted ? 'var(--gold)' : 'none'} color={isWishlisted ? 'var(--gold)' : 'currentColor'} /></motion.span>
    </button>
    <div className="flex items-start justify-between gap-2 pt-4">
      <div>
        <Link href={`/product/${product.slug}`} className="link-underline text-sm">{product.name}</Link>
        <p className="mt-1 flex items-center gap-2 text-xs text-[#837c70]"><span>{product.gender} / {product.category}</span>{product.rating && <span className="flex items-center gap-1"><Star size={10} className="star-fill" fill="currentColor"/>{product.rating}</span>}</p>
        {product.colors && <div className="mt-2 flex gap-1.5">{product.colors.map((c) => <span key={c} title={c} className="h-2.5 w-2.5 rounded-full border border-black/10" style={{ background: swatch(c) }} />)}</div>}
      </div>
      <div className="text-right text-sm">
        <span>{formatPrice(product.price)}</span>
        {product.originalPrice && <div className="text-xs text-[#837c70] line-through">{formatPrice(product.originalPrice)}</div>}
      </div>
    </div>
    <button onClick={() => onAdd(product)} className="mt-4 flex items-center gap-2 text-[10px] tracking-[.14em] opacity-0 transition-all duration-300 group-hover:opacity-100 hover:text-[var(--gold)]"><Plus size={13}/> QUICK ADD</button>
  </motion.article>;
}

function swatch(name) {
  const map = { Black: '#141414', Bone: '#e6dfd2', Ink: '#1c1c1c', White: '#fff', Stone: '#a79f8f', Sand: '#cdb896', Ecru: '#e9e2d0', Espresso: '#3c2a1e', Olive: '#5c5a3d', Navy: '#1c2540', Chalk: '#f1ede4', Oat: '#d8cdb8', Blue: '#4a6fa5', Cognac: '#8a4a2b', Cloud: '#e8e6e0', 'Pale Blue': '#c6d5e3', Charcoal: '#333333', Graphite: '#3a3a3a', Slate: '#5b6067', Tortoise: '#7a5230', Tan: '#c19a6b', Burgundy: '#5c1a2b' };
  return map[name] || '#ccc';
}
