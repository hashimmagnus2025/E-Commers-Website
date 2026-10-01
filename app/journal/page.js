'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stories = [
  ['The art of everyday dressing', 'Field notes / 06.02.26', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=88'],
  ['The return of tailoring', 'Perspective / 28.01.26', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=88'],
  ['Materials that move', 'Studio / 14.01.26', 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1200&q=88'],
];

export default function JournalPage() {
  return <div className="page-pad section-pad">
    <p className="eyebrow text-[#837c70]">The journal</p>
    <h1 className="serif mt-4 overflow-hidden text-7xl md:text-9xl"><span className="mask-reveal"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, ease: [.22,1,.36,1] }} className="block">Notes on<br/><i>moving.</i></motion.span></span></h1>
    <div className="mt-20 grid gap-14 md:grid-cols-3">
      {stories.map(([title, meta, img], i) => <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: i * .1, ease: [.22,1,.36,1] }} viewport={{ once: true, amount: .3 }}>
        <Link href={`/journal/${i + 1}`} className="group block">
          <div className="image-wrap aspect-[4/5] bg-[#dedbd5]"><img src={img} alt={title} className="h-full w-full object-cover"/></div>
          <p className="eyebrow mt-5 text-[#837c70]">{meta}</p>
          <h2 className="serif mt-3 text-3xl transition-colors group-hover:text-[var(--gold)]">{title}</h2>
          <span className="eyebrow link-underline mt-5 inline-block">Read story</span>
        </Link>
      </motion.div>)}
    </div>
  </div>;
}
