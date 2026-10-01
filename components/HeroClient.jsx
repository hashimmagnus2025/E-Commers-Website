'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';

export function HeroClient() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, 130]);
  const imageScale = useTransform(scrollY, [0, 700], [1.04, 1.14]);
  const fade = useTransform(scrollY, [0, 500], [1, 0]);

  return <section className="relative min-h-[calc(100vh-106px)] overflow-hidden bg-[#171512] text-[#f7f4ee]">
    <motion.img style={{ y: imageY, scale: imageScale }} src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=2200&q=90" alt="Veloce Spring Summer 2026 campaign" className="absolute inset-0 h-[115%] w-full object-cover opacity-80"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25"/>
    <motion.div style={{ opacity: fade }} className="page-pad relative flex min-h-[calc(100vh-106px)] flex-col justify-between py-10 md:py-16">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex justify-between eyebrow">
        <span>Spring / Summer 2026</span>
        <span className="hidden md:inline">Scroll to explore</span>
        <span>01 — 04</span>
      </motion.div>
      <div className="max-w-2xl pb-5">
        <h1 className="serif text-6xl leading-[.88] tracking-[-.04em] md:text-[8.5rem]">
          <span className="mask-reveal"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: .15, ease: [.22,1,.36,1] }} className="block">Designed</motion.span></span>
          <span className="mask-reveal"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: .3, ease: [.22,1,.36,1] }} className="block"><i>to move.</i></motion.span></span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .7 }} className="mt-7 max-w-xs text-sm leading-6 text-white/75">A study in shape, texture and the everyday. The new Veloce collection has arrived.</motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .85 }} className="mt-8 flex gap-3">
          <Link href="/shop?gender=Women" className="btn-primary group px-6 py-3.5 text-[10px] tracking-[.14em]">Shop women <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">↗</span></Link>
          <Link href="/shop?gender=Men" className="btn-ghost group border-white/60 px-6 py-3.5 text-[10px] tracking-[.14em] hover:bg-white hover:text-[#0e0d0c]">Shop men <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">↗</span></Link>
        </motion.div>
      </div>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} className="flex items-end justify-between">
        <span className="eyebrow">Veloce / India</span>
        <ArrowDownRight size={20} strokeWidth={1}/>
      </motion.div>
    </motion.div>
  </section>;
}
