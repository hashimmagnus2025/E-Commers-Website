'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const stagger = { hidden: {}, show: { transition: { staggerChildren: .09 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: .5, ease: [.22,1,.36,1] } } };

export default function LoginPage() {
  const [mode, setMode] = useState('sign-in');
  const [submitted, setSubmitted] = useState(false);

  return <div className="grid min-h-[calc(100vh-106px)] lg:grid-cols-2">
    <div className="relative hidden overflow-hidden bg-[#292824] lg:block">
      <motion.img initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: .75 }} transition={{ duration: 1.4, ease: [.22,1,.36,1] }} src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1400&q=88" alt="Veloce campaign" className="h-full w-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .4 }} className="absolute bottom-12 left-12 text-white">
        <p className="eyebrow">The Veloce world</p>
        <p className="serif mt-4 max-w-md text-5xl leading-none">A wardrobe<br/><i>in motion.</i></p>
      </motion.div>
    </div>
    <div className="flex items-center justify-center px-6 py-20 md:px-16">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {submitted ? <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .5 }} className="text-center">
            <p className="eyebrow text-[#837c70]">Welcome to Veloce</p>
            <h1 className="serif mt-5 text-6xl">Check your<br/><i>inbox.</i></h1>
            <p className="mt-6 text-sm leading-6 text-[#837c70]">We have sent a demo sign-in link to your email address.</p>
            <button onClick={() => setSubmitted(false)} className="eyebrow link-underline mt-10">Back to sign in</button>
          </motion.div> : <motion.div key={mode} initial="hidden" animate="show" exit={{ opacity: 0 }} variants={stagger}>
            <motion.p variants={item} className="eyebrow text-[#837c70]">{mode === 'sign-in' ? 'Your Veloce account' : 'Join Veloce'}</motion.p>
            <motion.h1 variants={item} className="serif mt-5 text-6xl leading-[.9]">{mode === 'sign-in' ? <>Welcome<br/><i>back.</i></> : <>Make room<br/><i>for more.</i></>}</motion.h1>
            <motion.p variants={item} className="mt-7 text-sm leading-6 text-[#837c70]">{mode === 'sign-in' ? 'Sign in to access saved pieces, orders and personal details.' : 'Create an account for a more considered way to shop Veloce.'}</motion.p>
            <motion.form variants={item} onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} className="mt-10 space-y-7">
              <label className="block"><span className="eyebrow text-[#837c70]">Email address</span><input required type="email" className="mt-3 w-full border-b hairline bg-transparent py-3 outline-none transition-colors focus:border-[#0e0d0c]" /></label>
              <label className="block"><span className="eyebrow text-[#837c70]">Password</span><input required minLength={6} type="password" className="mt-3 w-full border-b hairline bg-transparent py-3 outline-none transition-colors focus:border-[#0e0d0c]" /></label>
              <div className="flex items-center justify-between text-xs"><label className="flex items-center gap-2"><input type="checkbox"/> Remember me</label><button type="button" className="link-underline">Forgot password?</button></div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: .98 }} className="btn-primary w-full py-4 text-xs tracking-[.14em]">{mode === 'sign-in' ? 'SIGN IN' : 'CREATE ACCOUNT'}</motion.button>
            </motion.form>
            <motion.div variants={item} className="mt-10 border-t hairline pt-6 text-center text-sm text-[#837c70]">{mode === 'sign-in' ? 'New to Veloce?' : 'Already have an account?'} <button onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')} className="link-underline text-[#0e0d0c]">{mode === 'sign-in' ? 'Create account' : 'Sign in'}</button></motion.div>
            <motion.div variants={item}><Link href="/shop" className="eyebrow link-underline mt-8 block text-center">Continue as guest</Link></motion.div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </div>
  </div>;
}
