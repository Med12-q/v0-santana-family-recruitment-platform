'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site-config'

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      {/* Logo with cinematic entrance + halo + float */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <div className="animate-halo absolute inset-0 -z-10 rounded-full bg-primary/40 blur-[60px]" />
        <div className="animate-float relative h-44 w-44 overflow-hidden rounded-full border-2 border-primary/60 box-glow-strong sm:h-56 sm:w-56">
          <Image
            src={SITE.logo}
            alt="Logo officiel de la SANTANA FAMILY"
            fill
            priority
            className="object-cover"
          />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-heading text-4xl font-black tracking-[0.15em] text-foreground sm:text-6xl md:text-7xl"
      >
        SANTANA <span className="text-primary text-glow-strong">FAMILY</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-4 font-heading text-lg tracking-[0.3em] text-primary/90 sm:text-2xl"
      >
        LES DÉMONS DE LA TERREUR
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 1 }}
        className="mt-6 max-w-xl text-balance text-base italic text-muted-foreground sm:text-lg"
      >
        &ldquo;{SITE.slogan}&rdquo;
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-10"
      >
        <Link
          href="/recrutement"
          className="group inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-8 py-4 font-heading text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/80 box-glow-strong"
        >
          POSTULER MAINTENANT
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground/50"
      >
        Recrutement officiel · Sécurisé · Structuré
      </motion.div>
    </section>
  )
}
