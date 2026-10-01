'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Heart, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck, X } from 'lucide-react';
import { getProduct, products, formatPrice } from '../../../data/products';
import { useCommerce } from '../../../components/SiteShell';
import { ProductCard } from '../../../components/ProductCard';

const swatchMap = { Black: '#141414', Bone: '#e6dfd2', Ink: '#1c1c1c', White: '#fff', Stone: '#a79f8f', Sand: '#cdb896', Ecru: '#e9e2d0', Espresso: '#3c2a1e', Olive: '#5c5a3d', Navy: '#1c2540', Chalk: '#f1ede4', Oat: '#d8cdb8', Blue: '#4a6fa5', Cognac: '#8a4a2b', Cloud: '#e8e6e0', 'Pale Blue': '#c6d5e3', Charcoal: '#333333', Graphite: '#3a3a3a', Slate: '#5b6067', Tortoise: '#7a5230', Tan: '#c19a6b', Burgundy: '#5c1a2b' };

const REVIEWS = [
  ['Ananya R.', 5, 'Fit is exactly as pictured. The fabric feels expensive and holds its shape beautifully.'],
  ['Kabir S.', 5, 'Ordered a size up per the guide and it was spot on. Packaging felt premium too.'],
  ['Meera T.', 4, 'Lovely piece, slightly longer than expected but tailors well. Would buy again.'],
];

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const product = getProduct(slug);
  if (!product) return <div className="page-pad section-pad text-center"><p className="serif text-6xl">Piece not found.</p><Link href="/shop" className="eyebrow link-underline mt-8 inline-block">Back to the collection</Link></div>;

  const { addToBag, wishlist, toggleWishlist } = useCommerce();
  const [imageIndex, setImageIndex] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [guide, setGuide] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [touchX, setTouchX] = useState(null);
  const [added, setAdded] = useState(false);
  const image = product.images[imageIndex];

  useEffect(() => { try { const previous = JSON.parse(localStorage.getItem('veloce-recent') || '[]').filter((item) => item !== product.id); localStorage.setItem('veloce-recent', JSON.stringify([product.id, ...previous].slice(0, 6))); } catch {} }, [product.id]);

  const changeImage = (direction) => setImageIndex((current) => (current + direction + product.images.length) % product.images.length);
  const handleAdd = () => { Array.from({ length: qty }).forEach(() => addToBag({ ...product, color }, size)); setAdded(true); setTimeout(() => setAdded(false), 1800); };

  return <>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-pad flex items-center gap-2 py-8 text-[10px] tracking-[.12em] text-[#837c70]">
      <Link href="/shop" className="link-underline">SHOP</Link><span>/</span><Link href={`/shop?gender=${product.gender}`} className="link-underline">{product.gender.toUpperCase()}</Link><span>/</span><span className="text-[#0e0d0c]">{product.name.toUpperCase()}</span>
    </motion.div>

    <section className="page-pad grid gap-10 pb-28 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [.22,1,.36,1] }} className="grid grid-cols-2 gap-2">
        <div className="image-wrap group relative col-span-2 aspect-[4/5] touch-pan-y bg-[#dedbd5]">
          <button onClick={() => setFullscreen(true)} onTouchStart={(event) => setTouchX(event.touches[0].clientX)} onTouchEnd={(event) => { if (touchX !== null && Math.abs(event.changedTouches[0].clientX - touchX) > 45) changeImage(event.changedTouches[0].clientX < touchX ? 1 : -1); setTouchX(null); }} aria-label="Open fullscreen image" className="block h-full w-full">
            <AnimatePresence mode="wait"><motion.img key={image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }} src={image} alt={product.name} className="h-full w-full object-cover"/></AnimatePresence>
          </button>
          <button onClick={() => changeImage(-1)} className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#f7f4ee]/80 opacity-0 transition-opacity group-hover:opacity-100" aria-label="Previous image"><ChevronLeft size={16}/></button>
          <button onClick={() => changeImage(1)} className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#f7f4ee]/80 opacity-0 transition-opacity group-hover:opacity-100" aria-label="Next image"><ChevronRight size={16}/></button>
          {product.newArrival && <span className="eyebrow absolute left-3 top-3 bg-[#f7f4ee] px-2 py-1">New arrival</span>}
        </div>
        {product.images.map((src, i) => <button key={src} onClick={() => setImageIndex(i)} className={`image-wrap aspect-square bg-[#dedbd5] transition-all ${imageIndex === i ? 'ring-2 ring-[var(--gold)]' : 'opacity-70 hover:opacity-100'}`}><img src={src} alt={`${product.name} detail`} className="h-full w-full object-cover"/></button>)}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .1, ease: [.22,1,.36,1] }} className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex justify-between gap-4">
          <div><p className="eyebrow text-[#837c70]">{product.gender} / {product.category}</p><h1 className="serif mt-4 text-5xl leading-[.95] md:text-6xl">{product.name}</h1></div>
          <button onClick={() => toggleWishlist(product)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border hairline transition-transform hover:scale-110" aria-label="Toggle wishlist">
            <motion.span animate={wishlist.some((p) => p.id === product.id) ? { scale: [1, 1.4, 1] } : {}}><Heart fill={wishlist.some((p) => p.id === product.id) ? 'var(--gold)' : 'none'} color={wishlist.some((p) => p.id === product.id) ? 'var(--gold)' : 'currentColor'} size={18}/></motion.span>
          </button>
        </div>

        <div className="mt-6 flex items-center gap-5">
          <span className="text-2xl">{formatPrice(product.price)}</span>
          {product.originalPrice && <span className="text-sm text-[#837c70] line-through">{formatPrice(product.originalPrice)}</span>}
          <span className="flex items-center gap-1 text-xs text-[#837c70]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className="star-fill" fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}/>)}<span className="ml-1">{product.rating} ({product.reviews})</span></span>
        </div>

        <p className="mt-7 max-w-md text-sm leading-6 text-[#5f5b54]">{product.description}</p>

        <div className="mt-10 border-t hairline pt-6">
          <div className="flex items-center justify-between"><span className="eyebrow">Colour / {color}</span></div>
          <div className="mt-3 flex gap-2">{product.colors.map((c) => <button key={c} onClick={() => setColor(c)} className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-[var(--gold)]' : 'border-transparent'}`} style={{ boxShadow: '0 0 0 1px rgba(0,0,0,.15) inset' }} aria-label={c}><span className="block h-full w-full rounded-full" style={{ background: swatchMap[c] || '#ccc' }}/></button>)}</div>

          <div className="mt-8 flex items-center justify-between"><span className="eyebrow">Select size / {size}</span><button onClick={() => setGuide(true)} className="link-underline text-xs">Size guide</button></div>
          <div className="mt-4 grid grid-cols-5 gap-2">{product.sizes.map((item) => <button key={item} onClick={() => setSize(item)} className={`border py-3 text-xs transition-colors ${size === item ? 'border-[#0e0d0c] bg-[#0e0d0c] text-white' : 'hairline hover:border-[#0e0d0c]'}`}>{item}</button>)}</div>

          <div className="mt-8 flex gap-2">
            <div className="flex items-center border hairline"><button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-4" aria-label="Decrease quantity"><Minus size={13}/></button><span className="w-7 text-center text-sm">{qty}</span><button onClick={() => setQty(qty + 1)} className="px-4 py-4" aria-label="Increase quantity"><Plus size={13}/></button></div>
            <button onClick={handleAdd} className="btn-primary relative flex-1 overflow-hidden text-xs tracking-[.14em]">
              <AnimatePresence mode="wait">{added ? <motion.span key="added" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="block">ADDED TO BAG</motion.span> : <motion.span key="add" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="block">ADD TO BAG</motion.span>}</AnimatePresence>
            </button>
          </div>
          <button onClick={handleAdd} className="btn-ghost mt-3 w-full border-[#0e0d0c] py-4 text-xs tracking-[.14em]">BUY NOW</button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 border-t hairline pt-6 text-center text-[11px] text-[#837c70]">
          <div className="flex flex-col items-center gap-2"><Truck size={17} strokeWidth={1.4} className="text-[var(--gold)]"/>Free shipping</div>
          <div className="flex flex-col items-center gap-2"><RotateCcw size={17} strokeWidth={1.4} className="text-[var(--gold)]"/>14-day returns</div>
          <div className="flex flex-col items-center gap-2"><ShieldCheck size={17} strokeWidth={1.4} className="text-[var(--gold)]"/>Secure checkout</div>
        </div>

        <div className="mt-10 border-t hairline">
          <Accordion title="Details">A considered silhouette with a soft hand and a clean finish. Designed in New Delhi and made in small, considered runs.</Accordion>
          <Accordion title="Materials & care">Please refer to the composition label. Dry clean or hand wash according to the garment care instructions.</Accordion>
          <Accordion title="Shipping & returns">Complimentary shipping over ₹5,000. Returns are accepted within 14 days of delivery.</Accordion>
        </div>
      </motion.div>
    </section>

    <section className="page-pad border-t hairline py-24">
      <div className="flex flex-col gap-8 md:flex-row md:justify-between">
        <div><p className="eyebrow text-[#837c70]">Customer reviews</p><h2 className="serif mt-3 text-4xl">What people say.</h2></div>
        <div className="flex items-center gap-3"><span className="serif text-5xl">{product.rating}</span><div><div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="star-fill" fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}/>)}</div><p className="mt-1 text-xs text-[#837c70]">Based on {product.reviews} reviews</p></div></div>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">{REVIEWS.map(([name, stars, text], i) => <motion.div key={name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * .1, duration: .5 }} viewport={{ once: true }} className="border hairline p-6"><div className="flex gap-0.5 text-[var(--gold)]">{Array.from({ length: 5 }).map((_, s) => <Star key={s} size={13} fill={s < stars ? 'currentColor' : 'none'}/>)}</div><p className="mt-4 text-sm leading-6 text-[#5f5b54]">"{text}"</p><p className="eyebrow mt-4 text-[#837c70]">{name}</p></motion.div>)}</div>
    </section>

    <section className="page-pad border-t hairline py-24">
      <p className="eyebrow text-[#837c70]">Complete the look</p><h2 className="serif mt-3 text-5xl">You may also like.</h2>
      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">{products.filter((p) => p.id !== product.id).slice(0,4).map((p) => <ProductCard key={p.id} product={p} onAdd={addToBag} onWish={toggleWishlist} isWishlisted={wishlist.some((w) => w.id === p.id)}/>)}</div>
      <div className="mt-10 text-right"><Link href="/shop" className="eyebrow link-underline">View all pieces <ArrowUpRight className="ml-2 inline" size={14}/></Link></div>
    </section>

    <AnimatePresence>{guide && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5" onClick={() => setGuide(false)}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg bg-[#f7f4ee] p-8 md:p-12">
        <button onClick={() => setGuide(false)} className="absolute right-5 top-5" aria-label="Close size guide"><X size={18}/></button>
        <p className="eyebrow">Veloce size guide</p><h2 className="serif mt-4 text-4xl">Find your fit.</h2>
        <div className="mt-8 grid grid-cols-3 border-l border-t hairline text-sm">
          <div className="border-b border-r hairline p-3 font-medium">Size</div><div className="border-b border-r hairline p-3 font-medium">Chest</div><div className="border-b hairline p-3 font-medium">Waist</div>
          {['XS','S','M','L','XL'].map((s,i) => <div key={s} className="contents"><div className="border-b border-r hairline p-3">{s}</div><div className="border-b border-r hairline p-3">{84+i*4} cm</div><div className="border-b hairline p-3">{68+i*4} cm</div></div>)}
        </div>
      </motion.div>
    </motion.div>}</AnimatePresence>

    <AnimatePresence>{fullscreen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-[#0e0d0c]/95 p-5" onClick={() => setFullscreen(false)}>
      <button className="absolute right-6 top-6 text-white" aria-label="Close fullscreen"><X/></button>
      <button onClick={(e) => { e.stopPropagation(); changeImage(-1); }} className="absolute left-6 top-1/2 -translate-y-1/2 text-white" aria-label="Previous"><ChevronLeft size={28}/></button>
      <motion.img key={image} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} src={image} alt={product.name} className="max-h-[90vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()}/>
      <button onClick={(e) => { e.stopPropagation(); changeImage(1); }} className="absolute right-6 top-1/2 -translate-y-1/2 text-white" aria-label="Next"><ChevronRight size={28}/></button>
    </motion.div>}</AnimatePresence>

    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: product.name, image: product.images, description: product.description, sku: product.id, brand: { '@type': 'Brand', name: 'Veloce' }, offers: { '@type': 'Offer', priceCurrency: 'INR', price: product.price, availability: 'https://schema.org/InStock' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviews } }) }} />
  </>;
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return <div className="border-b hairline">
    <button onClick={() => setOpen(!open)} className="flex w-full justify-between py-5 text-left text-sm">{title}<motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: .25 }}><Plus size={15}/></motion.span></button>
    <AnimatePresence>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} className="overflow-hidden"><p className="max-w-lg pb-5 text-sm leading-6 text-[#837c70]">{children}</p></motion.div>}</AnimatePresence>
  </div>;
}
