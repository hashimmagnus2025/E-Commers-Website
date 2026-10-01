'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductCard } from '../../components/ProductCard';
import { useCommerce } from '../../components/SiteShell';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToBag } = useCommerce();
  return <div className="page-pad section-pad">
    <p className="eyebrow text-[#837c70]">Saved pieces</p>
    <h1 className="serif mt-4 overflow-hidden text-6xl md:text-8xl"><span className="mask-reveal"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .8, ease: [.22,1,.36,1] }} className="block">Your wishlist.</motion.span></span></h1>

    {wishlist.length ? <div className="mt-16 grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-4 md:gap-x-5">
      <AnimatePresence>{wishlist.map((p, i) => <motion.div key={p.id} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .9 }} transition={{ duration: .5, delay: i * .05, ease: [.22,1,.36,1] }}>
        <ProductCard product={p} onAdd={addToBag} onWish={toggleWishlist} isWishlisted/>
      </motion.div>)}</AnimatePresence>
    </div> : <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3 }} className="border-t hairline py-24 text-center">
      <p className="serif text-4xl">Your wishlist is waiting.</p>
      <Link href="/shop" className="eyebrow link-underline mt-8 inline-block">Explore collection</Link>
    </motion.div>}
  </div>;
}
