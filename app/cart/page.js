'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { formatPrice } from '../../data/products';
import { useCommerce } from '../../components/SiteShell';

export default function CartPage() {
  const { cart, subtotal, updateQuantity } = useCommerce();
  return <div className="page-pad section-pad">
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow text-[#837c70]">Your selection</motion.p>
    <h1 className="serif mt-4 overflow-hidden text-6xl md:text-8xl"><span className="mask-reveal"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, ease: [.22,1,.36,1] }} className="block">The bag.</motion.span></span></h1>

    {!cart.length ? <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }} className="border-t hairline py-24 text-center">
      <p className="serif text-4xl">Your bag is quiet.</p>
      <Link href="/shop" className="eyebrow link-underline mt-8 inline-block">Explore the collection</Link>
    </motion.div> : <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_360px]">
      <div>
        <AnimatePresence initial={false}>
          {cart.map((item, i) => <motion.div key={`${item.id}-${item.size}`} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -40, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 }} transition={{ duration: .4, delay: i * .05, ease: [.22,1,.36,1] }} className="flex gap-5 overflow-hidden border-t hairline py-6">
            <img src={item.images[0]} alt={item.name} className="h-40 w-32 object-cover md:h-52 md:w-40"/>
            <div className="flex flex-1 flex-col">
              <div className="flex justify-between gap-3">
                <div><Link href={`/product/${item.slug}`} className="link-underline text-lg">{item.name}</Link><p className="mt-2 text-xs text-[#837c70]">{item.colors[0]} / {item.size}</p></div>
                <span>{formatPrice(item.price)}</span>
              </div>
              <div className="mt-auto flex items-center gap-5 text-sm">
                <button onClick={() => updateQuantity(item.id, item.size, -1)} className="transition-transform hover:scale-125">-</button>
                <motion.span key={item.quantity} initial={{ scale: 1.4 }} animate={{ scale: 1 }}>{item.quantity}</motion.span>
                <button onClick={() => updateQuantity(item.id, item.size, 1)} className="transition-transform hover:scale-125">+</button>
                <button onClick={() => updateQuantity(item.id, item.size, -item.quantity)} className="ml-auto text-[#837c70] transition-colors hover:text-[var(--gold)]"><Trash2 size={15}/></button>
              </div>
            </div>
          </motion.div>)}
        </AnimatePresence>
      </div>
      <motion.aside initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }} className="h-fit border-t hairline pt-6">
        <div className="flex justify-between"><span className="eyebrow">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <p className="mt-4 text-xs leading-5 text-[#837c70]">Shipping and taxes are calculated at checkout. Complimentary delivery on orders over ₹5,000.</p>
        <Link href="/checkout" className="btn-primary mt-8 block py-4 text-center text-xs tracking-[.14em]">CHECKOUT</Link>
      </motion.aside>
    </div>}
  </div>;
}
