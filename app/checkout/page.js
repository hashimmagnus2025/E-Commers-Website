'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Home, Mail, Package, Truck } from 'lucide-react';
import { formatPrice } from '../../data/products';
import { useCommerce } from '../../components/SiteShell';

const stagger = { hidden: {}, show: { transition: { staggerChildren: .07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: .5, ease: [.22,1,.36,1] } } };
const STEPS = ['Bag', 'Details', 'Confirmation'];
const PAYMENTS = ['Card', 'UPI', 'Cash on Delivery'];
const TIMELINE = [['Order placed', Check], ['Processing', Package], ['Shipped', Truck], ['Delivered', Home]];

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCommerce();
  const [placed, setPlaced] = useState(false);
  const [order, setOrder] = useState(null);
  const [payment, setPayment] = useState('Card');
  const [error, setError] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) { setError('Please complete the required fields.'); return; }
    const email = e.currentTarget.querySelector('input[type="email"]').value;
    setOrder({ number: 'VLC-' + Math.random().toString(36).slice(2, 8).toUpperCase(), items: cart, total: subtotal, email, eta: new Date(Date.now() + 5 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' }) });
    clearCart();
    setPlaced(true);
  };

  if (placed && order) return <div className="relative overflow-hidden page-pad section-pad flex flex-col items-center text-center">
    <div className="pointer-events-none absolute -right-32 -top-10 h-96 w-96 rounded-full bg-[var(--gold)]/[.08] blur-3xl float-slow" />

    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: .1, type: 'spring', stiffness: 200, damping: 15 }} className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#0e0d0c]">
      <motion.div initial={{ scale: .8, opacity: .6 }} animate={{ scale: 1.6, opacity: 0 }} transition={{ delay: .3, duration: 1.1, ease: 'easeOut' }} className="absolute inset-0 rounded-full border border-[var(--gold)]" />
      <motion.svg width="30" height="30" viewBox="0 0 24 24" fill="none"><motion.path d="M4 12l6 6L20 6" stroke="#f7f4ee" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: .45, duration: .5, ease: 'easeOut' }} /></motion.svg>
    </motion.div>

    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }} className="eyebrow relative z-10 mt-8 text-[#837c70]">Order {order.number}</motion.p>
    <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65 }} className="serif relative z-10 mt-4 text-6xl">Thank you<br/><i>for moving.</i></motion.h1>
    <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75 }} className="relative z-10 mx-auto mt-6 flex max-w-sm items-center justify-center gap-2 text-sm leading-6 text-[#837c70]"><Mail size={14}/> Confirmation sent to {order.email || 'your inbox'}</motion.p>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85, duration: .6, ease: [.22,1,.36,1] }} className="relative z-10 mt-14 w-full max-w-xl rounded-2xl bg-[#efe8db] p-7 text-left shadow-[0_24px_70px_rgba(14,13,12,.08)] md:p-9">
      <div className="flex items-center justify-between">
        {TIMELINE.map(([label, Icon], i) => <div key={label} className="flex flex-1 flex-col items-center gap-2 text-center">
          <div className="flex items-center w-full">
            {i > 0 && <span className={`h-px flex-1 ${i <= 1 ? 'bg-[var(--gold)]' : 'bg-[#d8d2c2]'}`} />}
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 + i * .1, type: 'spring', stiffness: 260 }} className={`mx-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${i === 0 ? 'bg-[var(--gold)] text-white' : 'border border-[#d8d2c2] text-[#837c70]'}`}><Icon size={14}/></motion.span>
            {i < TIMELINE.length - 1 && <span className="h-px flex-1 bg-[#d8d2c2]" />}
          </div>
          <span className={`text-[10px] uppercase tracking-[.08em] ${i === 0 ? 'text-[#0e0d0c]' : 'text-[#837c70]'}`}>{label}</span>
        </div>)}
      </div>
      <p className="mt-6 text-center text-xs text-[#5f5b54]">Estimated delivery by <strong className="text-[#0e0d0c]">{order.eta}</strong></p>

      <div className="mt-7 space-y-4 border-t border-[#d8d2c2] pt-6">
        {order.items.map((cartItem) => <div key={`${cartItem.id}-${cartItem.size}`} className="flex gap-3">
          <img src={cartItem.images[0]} alt="" className="h-16 w-13 rounded-lg object-cover shadow-sm"/>
          <div className="flex-1 text-sm"><p>{cartItem.name}</p><p className="mt-1 text-xs text-[#837c70]">Qty {cartItem.quantity} / {cartItem.size}</p></div>
          <span className="text-sm">{formatPrice(cartItem.price * cartItem.quantity)}</span>
        </div>)}
      </div>
      <div className="mt-5 flex items-baseline justify-between border-t border-[#d8d2c2] pt-5"><span className="eyebrow">Total paid</span><span className="serif text-2xl">{formatPrice(order.total)}</span></div>
    </motion.div>

    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="relative z-10 mt-10 flex gap-4">
      <Link href="/account" className="btn-ghost border-[#0e0d0c] px-6 py-3.5 text-[10px] tracking-[.14em]">View order</Link>
      <Link href="/shop" className="btn-primary px-6 py-3.5 text-[10px] tracking-[.14em]">Continue shopping</Link>
    </motion.div>
  </div>;

  return <div className="relative overflow-hidden page-pad py-16 md:py-20">
    <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--gold)]/[.07] blur-3xl float-slow" />

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative mb-16 flex items-center justify-center text-xs">
      {STEPS.map((label, i) => <div key={label} className="flex items-center">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full transition-colors ${i <= 1 ? 'bg-[var(--gold)]' : 'bg-[#d8d2c5]'}`} />
          <span className={i === 1 ? 'text-[#0e0d0c]' : 'text-[#837c70]'}>{label}</span>
        </div>
        {i < STEPS.length - 1 && <span className="mx-4 h-px w-10 bg-[#d8d2c5] md:w-16" />}
      </div>)}
    </motion.div>

    <div className="relative grid gap-16 lg:grid-cols-[1fr_380px]">
      <motion.form initial="hidden" animate="show" variants={stagger} onSubmit={submit} className="max-w-2xl">
        <motion.p variants={item} className="eyebrow text-[#837c70]">Secure checkout</motion.p>
        <motion.h1 variants={item} className="serif mt-4 text-6xl">Almost<br/><i>there.</i></motion.h1>

        <motion.div variants={item} className="mt-10"><FloatField label="Email address" type="email" required/></motion.div>

        <motion.div variants={item} className="mt-12">
          <p className="eyebrow border-b hairline pb-4">Shipping address</p>
          <div className="grid gap-x-5 pt-2 md:grid-cols-2"><FloatField label="First name" required/><FloatField label="Last name" required/><FloatField label="Address" required wide/><FloatField label="City" required/><FloatField label="Pincode" required/></div>
        </motion.div>

        <motion.div variants={item} className="mt-12">
          <p className="eyebrow border-b hairline pb-4">Delivery</p>
          <div className="mt-5 flex items-center justify-between text-sm"><span>Standard delivery</span><span className="text-[#837c70]">Free</span></div>
        </motion.div>

        <motion.div variants={item} className="mt-12">
          <p className="eyebrow border-b hairline pb-4">Payment method</p>
          <div className="relative mt-5 flex gap-1 rounded-full border hairline p-1">
            {PAYMENTS.map((option) => <button type="button" key={option} onClick={() => setPayment(option)} className="relative flex-1 rounded-full px-3 py-2.5 text-[11px] transition-colors sm:text-xs">
              {payment === option && <motion.span layoutId="payment-pill" className="absolute inset-0 rounded-full bg-[#0e0d0c]" transition={{ type: 'spring', stiffness: 320, damping: 28 }} />}
              <span className={`relative z-10 transition-colors ${payment === option ? 'text-white' : 'text-[#5f5b54]'}`}>{option}</span>
            </button>)}
          </div>
          <AnimatePresence>{payment !== 'Cash on Delivery' && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: .3 }} className="grid gap-x-5 overflow-hidden md:grid-cols-2"><FloatField label={payment === 'UPI' ? 'UPI ID' : 'Card number'} required/><FloatField label={payment === 'Card' ? 'Expiry / CVV' : 'Name on account'} required/></motion.div>}</AnimatePresence>
        </motion.div>

        {error && <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="mt-6 text-sm text-red-700">{error}</motion.p>}
        <motion.button variants={item} whileHover={{ scale: 1.015 }} whileTap={{ scale: .98 }} className="btn-primary mt-12 w-full py-4 text-xs tracking-[.14em]">PLACE DEMO ORDER</motion.button>
      </motion.form>

      <motion.aside initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2, duration: .6, ease: [.22,1,.36,1] }} className="h-fit rounded-2xl bg-[#efe8db] p-7 shadow-[0_24px_70px_rgba(14,13,12,.1)] lg:sticky lg:top-28">
        <p className="eyebrow text-[#5f5b54]">Your order</p>
        <div className="mt-5 space-y-5">
          {cart.map((cartItem) => <div key={`${cartItem.id}-${cartItem.size}`} className="flex gap-3">
            <img src={cartItem.images[0]} alt="" className="h-20 w-16 rounded-lg object-cover shadow-sm"/>
            <div className="flex-1 text-sm"><p>{cartItem.name}</p><p className="mt-1 text-xs text-[#837c70]">Qty {cartItem.quantity} / {cartItem.size}</p></div>
            <span className="text-sm">{formatPrice(cartItem.price * cartItem.quantity)}</span>
          </div>)}
        </div>
        <div className="mt-6 space-y-2 border-t border-[#d8d2c2] pt-5 text-sm">
          <div className="flex justify-between text-[#5f5b54]"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between text-[#5f5b54]"><span>Shipping</span><span>Free</span></div>
          <div className="mt-2 flex items-baseline justify-between border-t border-[#d8d2c2] pt-4"><span className="eyebrow">Total</span><span className="serif text-2xl"><AnimatedTotal value={subtotal} /></span></div>
        </div>
      </motion.aside>
    </div>
  </div>;
}

function AnimatedTotal({ value }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    let frame; const start = performance.now(); const from = display; const duration = 500;
    const tick = (now) => { const progress = Math.min((now - start) / duration, 1); setDisplay(Math.round(from + (value - from) * progress)); if (progress < 1) frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <>{formatPrice(display)}</>;
}

function FloatField({ label, type = 'text', required, wide }) {
  return <label className={`group relative block pt-5 ${wide ? 'md:col-span-2' : ''}`}>
    <input required={required} type={type} placeholder=" " className="peer w-full border-b hairline bg-transparent pb-2.5 text-sm outline-none transition-colors focus:border-[#0e0d0c]" />
    <span className="pointer-events-none absolute left-0 top-5 text-sm text-[#837c70] transition-all duration-200 peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[.12em] peer-focus:text-[var(--gold)] peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-[.12em]">{label}</span>
  </label>;
}
