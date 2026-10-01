'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const edits = [
  ['THE NEW STANDARD', 'Everyday pieces, re-cut for now.', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=88', '/shop'],
  ['SS26', 'A study in light, line and movement.', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=88', '/shop?new=true'],
  ['AFTER DARK', 'Tailoring with a little less ceremony.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=88', '/shop?gender=Men'],
];

export default function CollectionsPage() {
  return <div className="pb-10">
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [.22,1,.36,1] }} className="page-pad section-pad pb-10">
      <p className="eyebrow text-[#837c70]">Collections / 2026</p>
      <h1 className="serif mt-4 text-6xl md:text-9xl">Curated<br/><i>capsules.</i></h1>
      <p className="mt-7 max-w-md text-sm leading-6 text-[#837c70]">Three ways into the Veloce world — each a distinct point of view, built around a season, a mood or a moment.</p>
    </motion.div>

    <div className="page-pad mt-4 grid gap-16 pb-24">
      {edits.map(([title, desc, img, href], i) => <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: i * .05, ease: [.22,1,.36,1] }} viewport={{ once: true, amount: .2 }}>
        <Link href={href} className="group grid gap-6 md:grid-cols-[1.5fr_1fr] md:items-end">
          <div className="image-wrap aspect-[16/9] bg-[#dedbd5]"><img src={img} alt={title} className="h-full w-full object-cover"/></div>
          <div className="border-t hairline py-4">
            <p className="eyebrow text-[#837c70]">0{i + 1} / 0{edits.length}</p>
            <h2 className="serif mt-3 text-4xl transition-colors md:text-6xl group-hover:text-[var(--gold)]">{title}</h2>
            <p className="mt-4 text-sm text-[#837c70]">{desc}</p>
            <span className="eyebrow link-underline mt-8 inline-block">Explore edit <ArrowUpRight className="ml-2 inline" size={13}/></span>
          </div>
        </Link>
      </motion.div>)}
    </div>

    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="page-pad flex flex-col items-center gap-6 border-t hairline py-20 text-center">
      <p className="eyebrow text-[#837c70]">Can't decide?</p>
      <h2 className="serif text-4xl md:text-5xl">See everything, all at once.</h2>
      <Link href="/shop" className="btn-primary px-6 py-3.5 text-[10px] tracking-[.14em]">Shop the full collection <ArrowUpRight className="ml-2 inline" size={14}/></Link>
    </motion.div>
  </div>;
}
