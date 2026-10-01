'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, UserRound, X, ArrowUpRight, Instagram, Minus, Plus, Trash2, Truck, PartyPopper } from 'lucide-react';
import { products, formatPrice } from '../data/products';
import { CustomCursor } from './CustomCursor';

import { createContext, useContext } from 'react';
const CommerceContext = createContext(null);
export const useCommerce = () => useContext(CommerceContext);

const NAV_LINKS = [['Women', '/shop?gender=Women'], ['Men', '/shop?gender=Men'], ['New in', '/shop?new=true'], ['Collections', '/collections']];

export function SiteShell({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try { setCart(JSON.parse(localStorage.getItem('veloce-cart') || '[]')); setWishlist(JSON.parse(localStorage.getItem('veloce-wishlist') || '[]')); } catch {}
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => window.removeEventListener('scroll', onScroll); }, []);
  useEffect(() => { localStorage.setItem('veloce-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('veloce-wishlist', JSON.stringify(wishlist)); }, [wishlist]);

  const addToBag = (product, size = product.sizes[0]) => {
    setCart((items) => { const found = items.find((item) => item.id === product.id && item.size === size); return found ? items.map((item) => item.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, size, quantity: 1 }]; });
    setBagOpen(true);
  };
  const updateQuantity = (id, size, change) => setCart((items) => items.map((item) => item.id === id && item.size === size ? { ...item, quantity: Math.max(0, item.quantity + change) } : item).filter((item) => item.quantity));
  const toggleWishlist = (product) => setWishlist((items) => items.some((item) => item.id === product.id) ? items.filter((item) => item.id !== product.id) : [...items, product]);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return <>
    <CustomCursor />
    <AnimatePresence>{!loaded && <Loader />}</AnimatePresence>
    <div className="overflow-hidden bg-[#0e0d0c] px-4 py-2 text-center text-[10px] tracking-[.16em] text-[#f7f4ee]">
      <div className="marquee-track flex gap-10">{Array.from({ length: 4 }).map((_, i) => <span key={i}>COMPLIMENTARY SHIPPING OVER ₹5,000 &nbsp;·&nbsp; 14-DAY RETURNS &nbsp;·&nbsp; MADE IN INDIA</span>)}</div>
    </div>
    <motion.header animate={{ boxShadow: scrolled ? '0 8px 30px rgba(14,13,12,.08)' : '0 0 0 rgba(0,0,0,0)' }} className="sticky top-0 z-40 border-b hairline bg-[#f7f4ee]/90 backdrop-blur-md">
      <nav className="page-pad flex h-[74px] items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="focus-ring group text-[22px] font-semibold tracking-[-.07em]">VELOCE<span className="text-[var(--gold)] transition-colors">.</span></Link>
        <div className="hidden items-center gap-9 eyebrow lg:flex">{NAV_LINKS.map(([label, href]) => <Link key={label} href={href} className="link-underline relative py-2">{label}</Link>)}</div>
        <div className="flex items-center gap-4">
          <button onClick={() => setSearchOpen(true)} className="focus-ring hidden lg:block" aria-label="Search"><Search size={18} strokeWidth={1.5}/></button>
          <Link href="/login" className="focus-ring hidden lg:block" aria-label="Account"><UserRound size={18} strokeWidth={1.5}/></Link>
          <Link href="/wishlist" className="focus-ring hidden lg:block" aria-label="Wishlist"><Heart size={18} strokeWidth={1.5}/></Link>
          <button onClick={() => setBagOpen(true)} className="focus-ring relative" aria-label={`Bag with ${cartCount} items`}>
            <motion.span key={cartCount} initial={{ scale: 1 }} animate={{ scale: [1, 1.25, 1] }} transition={{ duration: .35 }} className="block"><ShoppingBag size={18} strokeWidth={1.5}/></motion.span>
            <AnimatePresence>{cartCount > 0 && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--gold)] text-[9px] text-white">{cartCount}</motion.span>}</AnimatePresence>
          </button>
          <button onClick={() => setMenuOpen(true)} className="focus-ring lg:hidden" aria-label="Open menu"><Menu size={21} strokeWidth={1.5}/></button>
        </div>
      </nav>
    </motion.header>
    <CommerceContext.Provider value={{ cart, wishlist, addToBag, toggleWishlist, updateQuantity, clearCart: () => setCart([]), cartCount, subtotal, openBag: () => setBagOpen(true) }}><main className="site-main">{children}</main></CommerceContext.Provider>
    <Footer />
    <AnimatePresence>{searchOpen && <SearchOverlay products={products} close={() => setSearchOpen(false)} />}</AnimatePresence>
    <AnimatePresence>{menuOpen && <MobileMenu close={() => setMenuOpen(false)} />}</AnimatePresence>
    <AnimatePresence>{bagOpen && <BagDrawer cart={cart} subtotal={subtotal} updateQuantity={updateQuantity} close={() => setBagOpen(false)} />}</AnimatePresence>
  </>;
}

function Loader() {
  return <motion.div exit={{ y: '-100%', transition: { duration: .8, ease: [.76,0,.24,1] } }} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0e0d0c]">
    <motion.p initial={{ opacity: 0, letterSpacing: '.4em' }} animate={{ opacity: 1, letterSpacing: '.08em' }} transition={{ duration: 1 }} className="text-3xl font-semibold text-[#f7f4ee]">VELOCE<span className="text-[var(--gold)]">.</span></motion.p>
  </motion.div>;
}

function Footer() {
  return <footer className="relative overflow-hidden bg-[#0e0d0c] text-[#f7f4ee]">
    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--gold)]/10 blur-3xl float-slow" />
    <div className="page-pad section-pad relative"><div className="grid gap-16 md:grid-cols-[1.2fr_.8fr]">
      <div><p className="serif text-5xl md:text-7xl">Move<br/><i>well.</i></p><p className="mt-8 max-w-xs text-sm leading-6 text-[#aaa59c]">Contemporary essentials for a life in motion. Thoughtfully designed in India.</p>
        <div className="mt-10 flex gap-4 text-[#aaa59c]"><Instagram size={18}/></div>
      </div>
      <div>
        <p className="eyebrow mb-6 text-[#aaa59c]">Join the Veloce world</p>
        <form className="flex border-b border-[#4a473f] pb-3" onSubmit={(e) => e.preventDefault()}><input aria-label="Email address" className="w-full bg-transparent text-sm outline-none placeholder:text-[#837c70]" placeholder="Your email address" type="email"/><button className="eyebrow link-underline">Subscribe</button></form>
        <div className="mt-16 grid grid-cols-2 gap-y-3 text-sm text-[#aaa59c]"><Link className="link-underline w-fit" href="/shop">Shop</Link><Link className="link-underline w-fit" href="/about">About</Link><Link className="link-underline w-fit" href="/collections">Collections</Link><Link className="link-underline w-fit" href="/journal">Journal</Link><Link className="link-underline w-fit" href="/contact">Contact</Link><Link className="link-underline w-fit" href="/sustainability">Sustainability</Link></div>
      </div>
    </div>
    <div className="mt-24 flex flex-col justify-between gap-4 border-t border-[#2a2822] pt-5 text-[10px] tracking-[.14em] text-[#837c70] md:flex-row"><span>© 2026 VELOCE STUDIO</span><span>INSTAGRAM &nbsp; PINTEREST &nbsp; FACEBOOK</span><span>INDIA / ENGLISH</span></div>
    </div>
  </footer>;
}

function SearchOverlay({ products, close }) {
  const [query, setQuery] = useState('');
  const results = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 overflow-y-auto bg-[#f7f4ee] p-6 md:p-14">
    <button onClick={close} className="absolute right-6 top-6" aria-label="Close search"><X/></button>
    <div className="mx-auto mt-20 max-w-4xl">
      <p className="eyebrow text-[#837c70]">Search Veloce</p>
      <div className="mt-4 flex items-center border-b border-[#0e0d0c] pb-4"><Search size={24}/><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" className="ml-4 w-full bg-transparent text-3xl outline-none placeholder:text-[#b3aea5] md:text-5xl" /></div>
      <div className="mt-10 flex flex-wrap gap-4 text-xs"><span className="eyebrow text-[#837c70]">Popular:</span>{['New Arrivals','Blazers','Dresses','Accessories'].map((item) => <button key={item} onClick={() => setQuery(item)} className="border-b border-[#aaa59c]">{item}</button>)}</div>
      <div className="mt-14 grid gap-4">{query && results.map((p) => <Link onClick={close} href={`/product/${p.slug}`} key={p.id} className="group flex items-center justify-between border-b hairline py-5"><span className="text-xl transition-transform group-hover:translate-x-2">{p.name}</span><span className="eyebrow text-[#837c70]">{formatPrice(p.price)} <ArrowUpRight className="ml-3 inline" size={15}/></span></Link>)}</div>
    </div>
  </motion.div>;
}

function MobileMenu({ close }) {
  return <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28 }} className="fixed inset-0 z-50 bg-[#0e0d0c] p-6 text-[#f7f4ee]">
    <button onClick={close} className="absolute right-6 top-6" aria-label="Close menu"><X/></button>
    <p className="text-[22px] font-semibold tracking-[-.07em]">VELOCE<span className="text-[var(--gold)]">.</span></p>
    <div className="mt-28 flex flex-col gap-5 text-4xl">{NAV_LINKS.map(([label, href]) => <Link key={label} onClick={close} href={href} className="serif italic">{label}</Link>)}</div>
    <div className="absolute bottom-10 left-6 flex gap-6 text-sm text-[#aaa59c]"><Link onClick={close} href="/login">Account</Link><Link onClick={close} href="/wishlist">Wishlist</Link><Link onClick={close} href="/contact">Contact</Link></div>
  </motion.div>;
}

const FREE_SHIPPING_THRESHOLD = 5000;

function BagDrawer({ cart, subtotal, updateQuantity, close }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return <motion.div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .5, ease: [.65, 0, .35, 1] } }} onClick={close}>
    <motion.aside
      onClick={(e) => e.stopPropagation()}
      variants={{
        hidden: { x: '100%', opacity: 0, filter: 'blur(6px)' },
        visible: { x: 0, opacity: 1, filter: 'blur(0px)', transition: { type: 'spring', damping: 26, stiffness: 240, mass: .8 } },
        exit: { x: '100%', opacity: 0, filter: 'blur(6px)', transition: { duration: .45, ease: [.65, 0, .35, 1] } },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="ml-auto flex h-full w-full max-w-[460px] flex-col rounded-l-3xl bg-[#f7f4ee] shadow-[-20px_0_60px_rgba(14,13,12,.18)]"
    >
      <div className="flex items-center justify-between border-b hairline px-6 pb-5 pt-6">
        <div>
          <p className="eyebrow">Your bag</p>
          <motion.p key={cart.length} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="serif mt-1 text-2xl">{cart.length} {cart.length === 1 ? 'piece' : 'pieces'}</motion.p>
        </div>
        <motion.button onClick={close} whileHover={{ rotate: 90 }} transition={{ duration: .25 }} className="flex h-9 w-9 items-center justify-center rounded-full border hairline" aria-label="Close bag"><X size={16}/></motion.button>
      </div>

      {cart.length > 0 && <div className="border-b hairline px-6 py-4">
        <div className="flex items-center gap-2 text-xs text-[#5f5b54]">
          {remaining > 0 ? <><Truck size={14} className="text-[var(--gold)]"/> Add <strong className="text-[#0e0d0c]">{formatPrice(remaining)}</strong> more for free shipping</> : <><PartyPopper size={14} className="text-[var(--gold)]"/> You've unlocked free shipping</>}
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#e2ddd2]">
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: .6, ease: [.22,1,.36,1] }} className="h-full rounded-full bg-[var(--gold)]" />
        </div>
      </div>}

      <div className="flex-1 overflow-y-auto px-6">
        {cart.length ? <AnimatePresence initial={false}>
          {cart.map((item, i) => <motion.div
            key={`${item.id}-${item.size}`}
            layout
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50, height: 0, marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
            transition={{ duration: .4, delay: i * .05, ease: [.22,1,.36,1] }}
            className="flex gap-4 overflow-hidden border-b hairline py-5"
          >
            <div className="image-wrap h-28 w-24 shrink-0 bg-[#dedbd5]"><img src={item.images[0]} alt={item.name} className="h-full w-full object-cover"/></div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <div><Link onClick={close} href={`/product/${item.slug}`} className="link-underline text-sm">{item.name}</Link><p className="mt-1 text-xs text-[#837c70]">{item.color || item.colors[0]} / {item.size}</p></div>
                <button onClick={() => updateQuantity(item.id, item.size, -item.quantity)} className="text-[#837c70] transition-colors hover:text-[var(--gold)]" aria-label="Remove item"><Trash2 size={14}/></button>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3 rounded-full border hairline px-2 py-1">
                  <button onClick={() => updateQuantity(item.id, item.size, -1)} className="flex h-5 w-5 items-center justify-center transition-transform hover:scale-125" aria-label="Decrease quantity"><Minus size={11}/></button>
                  <motion.span key={item.quantity} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-4 text-center text-xs">{item.quantity}</motion.span>
                  <button onClick={() => updateQuantity(item.id, item.size, 1)} className="flex h-5 w-5 items-center justify-center transition-transform hover:scale-125" aria-label="Increase quantity"><Plus size={11}/></button>
                </div>
                <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          </motion.div>)}
        </AnimatePresence> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex h-full flex-col items-center justify-center text-center">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e9e2d2]"><ShoppingBag size={24} className="text-[#837c70]"/></motion.div>
          <p className="serif mt-6 text-3xl">Your bag is quiet.</p>
          <Link onClick={close} href="/shop" className="eyebrow link-underline mt-8 inline-block">Continue shopping</Link>
        </motion.div>}
      </div>

      {cart.length > 0 && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-t hairline px-6 py-6">
        <div className="mb-5 flex justify-between text-sm"><span className="eyebrow">Subtotal</span><motion.span key={subtotal}>{formatPrice(subtotal)}</motion.span></div>
        <Link onClick={close} href="/checkout" className="btn-primary group flex items-center justify-center gap-2 py-4 text-center text-xs tracking-[.14em]">CHECKOUT <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></Link>
        <button onClick={close} className="mt-4 w-full text-center text-xs underline">Continue shopping</button>
      </motion.div>}
    </motion.aside>
  </motion.div>;
}
