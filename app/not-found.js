'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return <div className="page-pad flex min-h-[70vh] flex-col justify-center">
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow text-[#837c70]">404 / Veloce</motion.p>
    <h1 className="serif mt-5 overflow-hidden text-8xl leading-[.85] md:text-[12rem]"><span className="mask-reveal"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, delay: .1, ease: [.22,1,.36,1] }} className="block">Not<br/><i>found.</i></motion.span></span></h1>
    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6 }} className="mt-8 text-sm text-[#837c70]">Looks like this piece has already moved.</motion.p>
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .75 }}><Link href="/shop" className="eyebrow link-underline mt-8 inline-block w-fit">Back to shop</Link></motion.div>
  </div>;
}
