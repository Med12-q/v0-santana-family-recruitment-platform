'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Flame, Users, Target, ArrowRight, Eye, Zap } from 'lucide-react'

const VALUES = [
  {
    icon: Shield,
    title: 'Discipline',
    text: 'Une rigueur absolue qui forge des membres redoutables. Chaque action, chaque décision reflète notre code.',
    accent: 'Fondement',
  },
  {
    icon: Flame,
    title: 'Détermination',
    text: 'Aucun obstacle ne résiste à notre volonté collective. Nous brûlons plus fort face à l\'adversité.',
    accent: 'Moteur',
  },
  {
    icon: Users,
    title: 'Cohésion',
    text: 'Une famille soudée, plus forte que la somme de ses membres. L\'union fait notre invincibilité.',
    accent: 'Force',
  },
  {
    icon: Target,
    title: 'Excellence',
    text: "L'élite ne se rejoint pas, elle se mérite chaque jour. Nous visons toujours plus haut, sans compromis.",
    accent: 'Objectif',
  },
  {
    icon: Eye,
    title: 'Discrétion',
    text: "Nous opérons dans l'ombre. La confidentialité est sacrée — ce qui se passe dans la famille y reste.",
    accent: 'Tactique',
  },
  {
    icon: Zap,
    title: 'Réactivité',
    text: "Nos membres répondent présent. L'inaction n'a pas sa place au sein des Démons de la Terreur.",
    accent: 'Vitesse',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function ValuesSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20">
      {/* Section header */}
      <div className="mb-14 text-center">
        <p className="font-heading text-xs tracking-[0.45em] text-primary/70 uppercase">Notre ADN</p>
        <h2 className="mt-3 font-heading text-3xl font-black tracking-wider text-foreground sm:text-4xl">
          Les Piliers de la <span className="text-primary text-glow">Famille</span>
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {VALUES.map((v) => (
          <motion.div
            key={v.title}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card/50 p-6 backdrop-blur-sm card-hover"
          >
            {/* Corner accent */}
            <div className="absolute right-0 top-0 h-12 w-12 overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-full translate-x-1/2 -translate-y-1/2 rotate-45 border border-primary/30 bg-primary/5" />
            </div>

            {/* Accent tag */}
            <span className="mb-4 inline-block rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 font-heading text-[10px] tracking-widest text-primary/80">
              {v.accent}
            </span>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 transition-colors group-hover:border-primary/60 group-hover:bg-primary/20">
                <v.icon className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold tracking-wide text-foreground">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export function RecruitCta() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-primary/35 bg-gradient-to-br from-card/90 via-card/70 to-background p-10 text-center box-glow-strong sm:p-16"
      >
        {/* Animated grid background */}
        <div className="cyber-grid absolute inset-0 -z-10 opacity-30" />

        {/* Corner decorations */}
        <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-primary/40" />
        <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-primary/40" />
        <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-primary/40" />
        <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-primary/40" />

        {/* Ambient glow */}
        <div className="absolute inset-x-1/4 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        <p className="font-heading text-xs tracking-[0.45em] text-primary/70 uppercase">
          Le moment est venu
        </p>
        <h2 className="mt-4 font-heading text-3xl font-black tracking-wider text-foreground sm:text-5xl md:text-6xl">
          PRÊT À{' '}
          <span className="relative text-primary text-glow-strong">
            MÉRITER
          </span>{' '}
          TA PLACE ?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-muted-foreground sm:text-lg">
          Le recrutement ne se fait plus par messages privés. Passe par la plateforme officielle pour
          un processus structuré, professionnel et sécurisé. Chaque candidature est étudiée avec soin.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/recrutement"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-10 py-4 font-heading text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/85 hover:scale-105 box-glow"
          >
            POSTULER MAINTENANT
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/a-propos"
            className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-8 py-4 font-heading text-sm font-bold tracking-widest text-muted-foreground transition-all hover:border-primary/60 hover:text-foreground"
          >
            EN SAVOIR PLUS
          </Link>
        </div>

        {/* Bottom trust indicators */}
        <div className="mt-10 flex items-center justify-center gap-8 text-xs text-muted-foreground/50">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            Processus officiel
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            Données sécurisées
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
            Réponse garantie
          </span>
        </div>
      </motion.div>
    </section>
  )
}
