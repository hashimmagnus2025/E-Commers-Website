'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function EditorialPage({ eyebrow, title, intro, image, sections = [] }) {
  return <div>
    <section className="page-pad section-pad grid gap-12 md:grid-cols-[1fr_.8fr] md:items-end">
      <div>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="eyebrow text-[#837c70]">{eyebrow}</motion.p>
        <h1 className="serif mt-5 max-w-3xl text-6xl leading-[.92] tracking-[-.05em] md:text-9xl">
          <span className="mask-reveal"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: .1, ease: [.22,1,.36,1] }} className="block">{title}</motion.span></span>
        </h1>
      </div>
      <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .5 }} className="max-w-sm text-sm leading-6 text-[#837c70]">{intro}</motion.p>
    </section>

    <motion.div initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [.22,1,.36,1] }} viewport={{ once: true, amount: .2 }} className="page-pad">
      <div className="image-wrap aspect-[16/8] bg-[#dedbd5]"><img src={image} alt="Veloce editorial" className="h-full w-full object-cover"/></div>
    </motion.div>

    <section className="page-pad section-pad grid gap-14 md:grid-cols-3">
      {sections.map((section, i) => <motion.div key={section.title} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: i * .12, ease: [.22,1,.36,1] }} viewport={{ once: true, amount: .4 }} className="border-t hairline pt-5">
        <p className="eyebrow text-[var(--gold)]">{section.number}</p>
        <h2 className="serif mt-4 text-4xl">{section.title}</h2>
        <p className="mt-5 text-sm leading-6 text-[#837c70]">{section.body}</p>
      </motion.div>)}
    </section>
  </div>;
}
