'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, MapPin, Package, Settings, ShoppingBag, User } from 'lucide-react';
import { useCommerce } from '../../components/SiteShell';
import { ProductCard } from '../../components/ProductCard';

const TABS = [
  ['overview', 'Overview', User],
  ['orders', 'Orders', Package],
  ['wishlist', 'Wishlist', Heart],
  ['addresses', 'Addresses', MapPin],
  ['settings', 'Settings', Settings],
];

export default function AccountPage() {
  const [tab, setTab] = useState('overview');
  const { wishlist, cartCount, addToBag, toggleWishlist } = useCommerce();

  return <div className="page-pad section-pad">
    <p className="eyebrow text-[#837c70]">Your space</p>
    <h1 className="serif mt-4 overflow-hidden text-6xl md:text-7xl"><span className="mask-reveal"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, ease: [.22,1,.36,1] }} className="block">Welcome<br/><i>back.</i></motion.span></span></h1>

    <div className="mt-14 grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-16">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="mb-8 flex items-center gap-4">
          <div className="serif flex h-14 w-14 items-center justify-center rounded-full bg-[#e9e2d2] text-xl">G</div>
          <div><p className="text-sm">Guest</p><Link href="/login" className="eyebrow link-underline text-[10px] text-[var(--gold)]">Sign in</Link></div>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
          {TABS.map(([key, label, Icon]) => <button key={key} onClick={() => setTab(key)} className="relative flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors">
            {tab === key && <motion.span layoutId="account-tab" className="absolute inset-0 rounded-xl bg-[#0e0d0c]" transition={{ type: 'spring', stiffness: 320, damping: 30 }} />}
            <Icon size={15} strokeWidth={1.6} className={`relative z-10 ${tab === key ? 'text-white' : 'text-[#837c70]'}`}/>
            <span className={`relative z-10 whitespace-nowrap ${tab === key ? 'text-white' : 'text-[#5f5b54]'}`}>{label}</span>
          </button>)}
        </nav>
      </aside>

      <div className="min-h-[420px] border-t hairline pt-10 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .35, ease: [.22,1,.36,1] }}>

            {tab === 'overview' && <div>
              <h2 className="serif text-3xl">Account overview.</h2>
              <p className="mt-2 text-sm text-[#837c70]">Here's what's happening in your Veloce world.</p>
              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                <StatTile icon={ShoppingBag} label="In your bag" value={cartCount} />
                <StatTile icon={Heart} label="Wishlist" value={wishlist.length} />
                <StatTile icon={Package} label="Orders" value={0} />
              </div>
              <div className="mt-10 border-t hairline pt-8">
                <p className="eyebrow text-[#837c70]">Quick links</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <QuickLink href="/wishlist" label="View wishlist" />
                  <QuickLink href="/cart" label="View bag" />
                  <QuickLink href="/shop?new=true" label="Shop new arrivals" />
                  <QuickLink href="/journal" label="Read the journal" />
                </div>
              </div>
            </div>}

            {tab === 'orders' && <EmptyState icon={Package} title="No orders yet." body="Sign in to see your order history and track deliveries." cta="Sign in" href="/login" />}

            {tab === 'wishlist' && (wishlist.length
              ? <div>
                  <h2 className="serif text-3xl">Saved pieces.</h2>
                  <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3">{wishlist.slice(0, 6).map((p) => <ProductCard key={p.id} product={p} onAdd={addToBag} onWish={toggleWishlist} isWishlisted/>)}</div>
                  {wishlist.length > 6 && <Link href="/wishlist" className="eyebrow link-underline mt-8 inline-block">View all {wishlist.length} saved pieces</Link>}
                </div>
              : <EmptyState icon={Heart} title="Your wishlist is empty." body="Save the pieces you love while you browse and find them here." cta="Explore the collection" href="/shop" />
            )}

            {tab === 'addresses' && <EmptyState icon={MapPin} title="No saved addresses." body="Add a delivery address at checkout for faster ordering next time." cta="Go to checkout" href="/checkout" />}

            {tab === 'settings' && <div className="max-w-md">
              <h2 className="serif text-3xl">Profile settings.</h2>
              <p className="mt-2 text-sm text-[#837c70]">Sign in to edit your name, email and preferences.</p>
              <div className="mt-8 space-y-7 opacity-50">
                <FloatField label="Full name" disabled />
                <FloatField label="Email address" type="email" disabled />
              </div>
              <Link href="/login" className="btn-primary mt-8 inline-block px-6 py-3.5 text-[10px] tracking-[.14em]">Sign in to edit</Link>
            </div>}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  </div>;
}

function StatTile({ icon: Icon, label, value }) {
  return <div className="rounded-2xl border hairline p-4 sm:p-5">
    <Icon size={18} strokeWidth={1.5} className="text-[var(--gold)]"/>
    <p className="serif mt-4 text-3xl">{value}</p>
    <p className="mt-1 text-xs text-[#837c70]">{label}</p>
  </div>;
}

function QuickLink({ href, label }) {
  return <Link href={href} className="link-underline flex items-center justify-between border hairline px-5 py-4 text-sm"><span>{label}</span><span className="text-[#837c70]">→</span></Link>;
}

function EmptyState({ icon: Icon, title, body, cta, href }) {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center rounded-2xl border hairline px-8 py-20 text-center">
    <Icon size={26} strokeWidth={1.4} className="text-[#837c70]"/>
    <p className="serif mt-5 text-2xl">{title}</p>
    <p className="mt-2 max-w-xs text-sm text-[#837c70]">{body}</p>
    <Link href={href} className="eyebrow link-underline mt-6">{cta}</Link>
  </motion.div>;
}

function FloatField({ label, type = 'text', disabled }) {
  return <label className="group relative block pt-5">
    <input disabled={disabled} type={type} placeholder=" " className="peer w-full border-b hairline bg-transparent pb-2.5 text-sm outline-none transition-colors focus:border-[#0e0d0c]" />
    <span className="pointer-events-none absolute left-0 top-5 text-sm text-[#837c70] transition-all duration-200 peer-focus:top-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[.12em] peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-[.12em]">{label}</span>
  </label>;
}
