'use client';
import { useSearchParams } from 'next/navigation';
import { products } from '../../data/products';
import { ProductGrid } from '../../components/ProductGrid';
import { useCommerce } from '../../components/SiteShell';
import { RecentlyViewed } from '../../components/RecentlyViewed';
import { motion } from 'framer-motion';

const HEADINGS = {
  new: { eyebrow: 'Just landed', title: 'New in.', sub: 'The latest arrivals, fresh off the rail this season.' },
  Women: { eyebrow: 'Womenswear', title: 'Women.', sub: 'Refined essentials and modern tailoring, cut for her.' },
  Men: { eyebrow: 'Menswear', title: 'Men.', sub: 'Considered layers and sharp basics, built for everyday.' },
  Accessories: { eyebrow: 'Finishing touches', title: 'Accessories.', sub: 'Bags, leather goods and the details that complete a look.' },
  default: { eyebrow: 'The collection / 18 pieces', title: 'The edit.', sub: 'Refined essentials, modern tailoring and objects for the days that ask more of you.' },
};

export default function ShopPage() {
  const { addToBag, wishlist, toggleWishlist } = useCommerce();
  const params = useSearchParams();
  const gender = params.get('gender');
  const isNew = params.get('new') === 'true';
  const heading = isNew ? HEADINGS.new : HEADINGS[gender] || HEADINGS.default;

  return <>
    <motion.div key={heading.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [.22,1,.36,1] }} className="page-pad py-20 md:py-28">
      <p className="eyebrow text-[#837c70]">{heading.eyebrow}</p>
      <h1 className="serif mt-4 text-6xl tracking-[-.05em] md:text-9xl">{heading.title}</h1>
      <p className="mt-7 max-w-md text-sm leading-6 text-[#837c70]">{heading.sub}</p>
    </motion.div>
    <ProductGrid products={products} onAdd={addToBag} wishlist={wishlist} onWish={toggleWishlist}/>
    <RecentlyViewed />
  </>;
}
