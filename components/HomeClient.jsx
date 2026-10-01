'use client';
import Link from 'next/link';
import { ArrowUpRight, Truck, RotateCcw, ShieldCheck, Leaf, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCommerce } from './SiteShell';

const reveal = { hidden: { opacity: 0, y: 35 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [.22, 1, .36, 1] } } };

const TRUST = [
  [Truck, 'Complimentary shipping', 'On every order over ₹5,000'],
  [RotateCcw, '14-day returns', 'Easy, no-questions exchanges'],
  [ShieldCheck, 'Secure checkout', '256-bit encrypted payments'],
  [Leaf, 'Considered materials', 'Responsibly sourced fabrics'],
];

const TESTIMONIALS = [
  ['“The fit is unlike anything else I own. Every piece feels considered.”', 'Ananya R. — Mumbai'],
  ['“Fast delivery, beautiful packaging, and the blazer is a work of art.”', 'Kabir S. — Bengaluru'],
  ['“I keep coming back. Veloce understands quiet luxury.”', 'Meera T. — Delhi'],
];

const GALLERY = [
  '1483985988355-763728e1935b','1515886657613-9f3515b0c78f','1594938298603-c8148c4dae35',
  '1529139574466-a303027c1d8b','1517841905240-472988babdf9','1551488831-00ddcb6c6bd3',
];

export function HomeClient() {
  const { addToBag, wishlist, toggleWishlist } = useCommerce();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return <>
    <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} className="page-pad section-pad">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><p className="eyebrow text-[#837c70]">The new standard</p><h2 className="serif mt-3 text-5xl tracking-[-.04em] md:text-7xl">Essential<br/><i>silhouettes.</i></h2></div>
        <p className="max-w-xs text-sm leading-6 text-[#837c70]">Elevated materials, considered proportions and the freedom to wear things your way.</p>
      </div>
      <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-4 md:gap-x-5">
        {featured.map((p, index) => <motion.div key={p.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * .08, duration: .55 }} viewport={{ once: true }}>
          <ProductCard product={p} onAdd={addToBag} onWish={toggleWishlist} isWishlisted={wishlist.some((w) => w.id === p.id)}/>
        </motion.div>)}
      </div>
      <div className="mt-12 text-right"><Link href="/shop" className="eyebrow link-underline">View all pieces <ArrowUpRight className="ml-2 inline" size={14}/></Link></div>
    </motion.section>

    <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} className="border-y hairline bg-[#0e0d0c] text-[#f7f4ee]">
      <div className="page-pad grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        {TRUST.map(([Icon, title, sub]) => <div key={title} className="flex flex-col items-start gap-3">
          <Icon size={22} strokeWidth={1.4} className="text-[var(--gold)]" />
          <div><p className="text-sm">{title}</p><p className="mt-1 text-xs text-[#aaa59c]">{sub}</p></div>
        </div>)}
      </div>
    </motion.section>

    <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} className="grid min-h-[680px] bg-[#e9e2d2] md:grid-cols-2">
      <div className="image-wrap min-h-[480px]"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=88" alt="Veloce tailored silhouette" className="h-full w-full object-cover"/></div>
      <div className="flex flex-col justify-between p-8 md:p-16">
        <p className="eyebrow text-[#837c70]">The Veloce point of view</p>
        <div><h2 className="serif text-6xl leading-[.9] tracking-[-.05em] md:text-8xl">Form<br/>meets<br/><i>movement.</i></h2>
          <p className="mt-8 max-w-sm text-sm leading-6 text-[#5f5b54]">We make pieces that find their place in your life. Not for a season, but for the space between plans — when you need to feel exactly like yourself.</p>
          <Link href="/about" className="eyebrow link-underline mt-10 inline-block">Our philosophy <ArrowUpRight className="ml-2 inline" size={14}/></Link>
        </div>
        <span className="eyebrow text-[#837c70]">02 / 05</span>
      </div>
    </motion.section>

    <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} className="page-pad section-pad">
      <div className="flex items-end justify-between"><div><p className="eyebrow text-[#837c70]">Explore by edit</p><h2 className="serif mt-3 text-5xl md:text-7xl">Find your<br/><i>form.</i></h2></div></div>
      <div className="mt-14 grid gap-3 md:grid-cols-3">
        {[['WOMEN','https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=88','/shop?gender=Women'],['MEN','https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=88','/shop?gender=Men'],['ACCESSORIES','https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=88','/shop?gender=Accessories']].map(([title,image,href]) =>
          <Link key={title} href={href} className="image-wrap group relative aspect-[3/4] bg-[#dedbd5]">
            <img src={image} alt={title} className="h-full w-full object-cover grayscale-[.15]"/>
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/40"/>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <span className="text-lg tracking-[.08em] transition-transform duration-500 group-hover:translate-x-2">{title}</span>
              <ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/>
            </div>
          </Link>)}
      </div>
    </motion.section>

    <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} className="relative min-h-[620px] overflow-hidden bg-[#171512] text-white">
      <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=2200&q=88" alt="The Veloce campaign" className="h-full w-full object-cover opacity-60 transition-transform duration-[1600ms] hover:scale-105"/>
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent"/>
      <div className="page-pad absolute inset-0 flex min-h-[620px] flex-col justify-between py-12">
        <p className="eyebrow">Campaign 01 / 2026</p>
        <div><h2 className="serif max-w-xl text-6xl leading-[.9] md:text-8xl">The Veloce<br/><i>campaign.</i></h2>
          <p className="mt-6 text-sm text-white/75">Made for movement. Built for everyday.</p>
          <Link href="/collections" className="btn-ghost mt-8 inline-block border-white/60 px-5 py-3 text-[10px] tracking-[.14em] hover:bg-white hover:text-[#0e0d0c]">Explore campaign <ArrowUpRight className="ml-3 inline" size={14}/></Link>
        </div>
      </div>
    </motion.section>

    <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .15 }} className="page-pad section-pad">
      <div className="text-center"><p className="eyebrow text-[#837c70]">Loved by the community</p><h2 className="serif mt-3 text-4xl md:text-6xl">Words from our world.</h2></div>
      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {TESTIMONIALS.map(([quote, name], i) => <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * .1, duration: .6 }} viewport={{ once: true }} className="flex flex-col items-center gap-4 border hairline p-8 text-center">
          <div className="flex gap-1 text-[var(--gold)]">{Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} fill="currentColor" />)}</div>
          <p className="serif text-xl italic leading-snug">{quote}</p>
          <p className="eyebrow text-[#837c70]">{name}</p>
        </motion.div>)}
      </div>
    </motion.section>

    <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} className="pb-2">
      <div className="page-pad flex items-end justify-between pb-8"><div><p className="eyebrow text-[#837c70]">@veloce.studio</p><h2 className="serif mt-3 text-4xl md:text-6xl">Styled by you.</h2></div></div>
      <div className="grid grid-cols-3 gap-1 md:grid-cols-6">{GALLERY.map((id) => <div key={id} className="image-wrap aspect-square bg-[#dedbd5]"><img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=500&q=80`} alt="Styled by the community" className="h-full w-full object-cover"/></div>)}</div>
    </motion.section>

    <section className="page-pad section-pad text-center">
      <p className="eyebrow text-[#837c70]">A note from the studio</p>
      <h2 className="serif mx-auto mt-5 max-w-4xl text-4xl leading-tight md:text-6xl">"The best pieces are the ones that let you forget what you are wearing."</h2>
      <p className="mt-7 text-xs tracking-[.12em] text-[#837c70]">— VELOCE STUDIO, NEW DELHI</p>
    </section>

    <motion.section variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }} className="page-pad pb-24">
      <div className="flex flex-col items-center gap-6 border hairline bg-[#e9e2d2] px-8 py-16 text-center">
        <p className="eyebrow text-[#837c70]">Stay in the loop</p>
        <h2 className="serif max-w-lg text-4xl md:text-5xl">Be first to know what's next.</h2>
        <form className="mt-4 flex w-full max-w-md border-b border-[#0e0d0c] pb-3" onSubmit={(e) => e.preventDefault()}>
          <input aria-label="Email address" className="w-full bg-transparent text-sm outline-none placeholder:text-[#837c70]" placeholder="Your email address" type="email"/>
          <button className="eyebrow link-underline shrink-0">Subscribe</button>
        </form>
      </div>
    </motion.section>
  </>;
}
