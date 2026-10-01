'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const stagger = { hidden: {}, show: { transition: { staggerChildren: .08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: .5, ease: [.22,1,.36,1] } } };

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return <div className="page-pad section-pad grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
    <motion.div initial="hidden" animate="show" variants={stagger}>
      <motion.p variants={item} className="eyebrow text-[#837c70]">Get in touch</motion.p>
      <motion.h1 variants={item} className="serif mt-5 text-7xl leading-[.9]">We'd love<br/><i>to hear from you.</i></motion.h1>
      <motion.div variants={item} className="mt-12 text-sm leading-7 text-[#837c70]">hello@veloce.studio<br/>Customer care: +91 11 4000 2026<br/>Business: studio@veloce.studio</motion.div>
    </motion.div>
    <motion.form initial="hidden" animate="show" variants={stagger} onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="border-t hairline pt-5">
      <AnimatePresence mode="wait">
        {sent ? <motion.p key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="serif text-4xl">Message received.<br/><i>Thank you.</i></motion.p> : <motion.div key="form" initial="hidden" animate="show" variants={stagger} exit={{ opacity: 0 }}>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div variants={item}><Field label="Name"/></motion.div>
            <motion.div variants={item}><Field label="Email" type="email"/></motion.div>
            <motion.div variants={item}><Field label="Phone"/></motion.div>
            <motion.div variants={item}><Field label="Subject"/></motion.div>
          </div>
          <motion.label variants={item} className="mt-10 block"><span className="eyebrow text-[#837c70]">Message</span><textarea required className="mt-3 h-32 w-full resize-none border-b hairline bg-transparent py-3 outline-none transition-colors focus:border-[#0e0d0c]"/></motion.label>
          <motion.button variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: .98 }} className="btn-primary mt-10 px-7 py-4 text-xs tracking-[.14em]">SEND MESSAGE</motion.button>
        </motion.div>}
      </AnimatePresence>
    </motion.form>
  </div>;
}

function Field({ label, type = 'text' }) {
  return <label><span className="eyebrow text-[#837c70]">{label}</span><input required={label !== 'Phone'} type={type} className="mt-3 w-full border-b hairline bg-transparent py-3 outline-none transition-colors focus:border-[#0e0d0c]"/></label>;
}
