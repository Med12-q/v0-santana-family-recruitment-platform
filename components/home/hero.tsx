'use client'

import Image from 'next/image'
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
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      {/* Clan Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-10"
      >
        <span className="absolute -inset-6 rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]" />
        <span className="absolute -inset-3 rounded-full border border-primary/20" />
        <div className="relative h-56 w-56 overflow-hidden rounded-full border-2 border-primary/50 shadow-[0_0_80px_rgba(220,38,38,0.25),0_0_200px_rgba(220,38,38,0.08)]">
          <Image
            src={SITE.logo}
            alt="SANTANA FAMILY"
            fill
            className="object-cover"
            priority
            sizes="224px"
          />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        <h1 className="font-heading text-5xl font-black tracking-[0.12em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          SANTANA<span className="text-primary"> FAMILY</span>
        </h1>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary/70">
          {SITE.nickname}
        </p>
        <p className="mx-auto mt-4 max-w-md text-base italic text-gray-500">
          &ldquo;{SITE.slogan}&rdquo;
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/recrutement"
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary/85 hover:shadow-[0_0_28px_rgba(220,38,38,0.45)]"
        >
          Postuler <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/a-propos"
          className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-gray-400 transition-all duration-300 hover:border-white/30 hover:text-white"
        >
          Découvrir
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-white/5 pt-10"
      >
        {STATS.map((s, i) => (
          <div key={i} className="text-center">
            <p className="font-heading text-2xl font-black text-white">{s.value}</p>
            <p className="mt-0.5 text-[11px] uppercase tracking-wider text-gray-600">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="h-5 w-5 animate-bounce text-white/20" />
      </motion.div>
    </section>
  )
}
