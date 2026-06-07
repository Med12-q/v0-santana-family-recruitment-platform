'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { SITE } from '@/lib/site-config'

const STATS = [
  { value: '50+', label: 'Membres actifs' },
  { value: '5+', label: "Années d'expérience" },
  { value: '6', label: 'Niveaux de grade' },
  { value: '24/7', label: 'Support IA' },
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
      {/* Real clan photo background */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SITE.logo}
          alt=""
          className="h-full w-full object-cover object-center"
          style={{ filter: 'brightness(0.22) saturate(0.7)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05050a]/60 via-transparent to-[#05050a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05050a]/40 via-transparent to-[#05050a]/40" />
      </div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mb-8"
      >
        <span className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Recrutement ouvert
        </span>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 space-y-3"
      >
        <h1 className="font-heading text-4xl font-black tracking-[0.1em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
          SANTANA<span className="text-primary"> FAMILY</span>
        </h1>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/70">
          {SITE.nickname}
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm italic text-gray-400">
          &ldquo;{SITE.slogan}&rdquo;
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/recrutement"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary/85 hover:shadow-[0_0_28px_rgba(220,38,38,0.45)]"
        >
          Postuler <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/a-propos"
          className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-7 py-3 text-xs font-medium uppercase tracking-widest text-gray-400 transition-all duration-300 hover:border-white/30 hover:text-white"
        >
          Découvrir
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-white/5 pt-10"
      >
        {STATS.map((s, i) => (
          <div key={i} className="text-center">
            <p className="font-heading text-xl font-black text-white">{s.value}</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-gray-600">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-white/20" />
      </motion.div>
    </section>
  )
}
