'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ErrorPage({ error, reset }) {
  useEffect(() => { console.error(error); }, [error]);
  return <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, ease: [.22,1,.36,1] }} className="page-pad flex min-h-[70vh] flex-col justify-center">
    <p className="eyebrow text-[#837c70]">Something shifted</p>
    <h1 className="serif mt-5 text-7xl">Please try<br/><i>again.</i></h1>
    <p className="mt-6 max-w-sm text-sm leading-6 text-[#837c70]">We could not load this part of Veloce. Your bag and wishlist are still saved on this device.</p>
    <div className="mt-8 flex gap-5"><button onClick={() => reset()} className="eyebrow link-underline">Retry</button><Link href="/" className="eyebrow link-underline">Back home</Link></div>
  </motion.div>;
}
