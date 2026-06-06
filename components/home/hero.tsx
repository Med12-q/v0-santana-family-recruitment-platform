'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { SITE } from '@/lib/site-config'

const STATS = [
  { label: 'Membres actifs', value: '50+' },
  { label: 'Années de discipline', value: '3+' },
  { label: 'Taux de sélection', value: '12%' },
]

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-primary/4 blur-[80px]" />
        <div className="absolute right-1/4 top-1/4 h-[200px] w-[200px] rounded-full bg-primary/3 blur-[60px]" />
      </div>

      {/* Logo with cinematic entrance + halo + float */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, filter: 'blur(30px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-10"
      >
        {/* Outer rotating ring */}
        <div className="animate-spin-slow absolute -inset-6 rounded-full border border-primary/20" />
        <div className="animate-spin-slow absolute -inset-10 rounded-full border border-primary/10" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

        {/* Halo glow */}
        <div className="animate-halo absolute inset-0 -z-10 rounded-full bg-primary/30 blur-[70px]" />

        {/* Logo image */}
        <div className="animate-float relative h-44 w-44 overflow-hidden rounded-full border-2 border-primary/70 box-glow-strong sm:h-56 sm:w-56">
          <Image
            src={SITE.logo}
            alt="Logo officiel de la SANTANA FAMILY"
            fill
            priority
            className="object-cover"
          />
          {/* Inner scanline overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <h1 className="font-heading text-5xl font-black tracking-[0.15em] text-foreground sm:text-7xl md:text-8xl">
          SANTANA{' '}
          <span className="relative text-primary text-glow-strong">
            FAMILY
            {/* Shimmer effect on title */}
            <span className="shimmer-line absolute inset-0 overflow-hidden" />
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-4 font-heading text-base tracking-[0.45em] text-primary/85 sm:text-xl md:text-2xl animate-flicker"
      >
        LES DÉMONS DE LA TERREUR
      </motion.p>

      {/* Divider line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="mt-6 h-px w-48 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />

      {/* Slogan */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="mt-6 max-w-lg text-balance text-base italic text-muted-foreground sm:text-lg"
      >
        &ldquo;{SITE.slogan}&rdquo;
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Link
          href="/recrutement"
          className="group inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-9 py-4 font-heading text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/85 hover:scale-105 box-glow-strong"
        >
          POSTULER MAINTENANT
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/hierarchie"
          className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-transparent px-7 py-4 font-heading text-sm font-bold tracking-widest text-foreground/80 transition-all hover:border-primary/60 hover:text-foreground hover:bg-primary/10"
        >
          VOIR LES GRADES
        </Link>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="mt-16 grid grid-cols-3 gap-8 sm:gap-16"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-heading text-2xl font-black text-primary text-glow sm:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 text-xs tracking-wider text-muted-foreground uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground/40">
          Recrutement · Sécurisé · Structuré
        </span>
        <ChevronDown className="mt-1 h-4 w-4 text-muted-foreground/30 animate-bounce" />
      </motion.div>
    </section>
  )
}
