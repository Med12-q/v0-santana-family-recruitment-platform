'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Flame, Users, Target, ArrowRight } from 'lucide-react'

const VALUES = [
  { icon: Shield, title: 'Discipline', text: 'Une rigueur absolue qui forge des membres redoutables.' },
  { icon: Flame, title: 'Détermination', text: 'Aucun obstacle ne résiste à notre volonté.' },
  { icon: Users, title: 'Cohésion', text: 'Une famille soudée, plus forte que la somme de ses membres.' },
  { icon: Target, title: 'Excellence', text: "L'élite ne se rejoint pas, elle se mérite chaque jour." },
]

export function ValuesSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group rounded-xl border border-primary/25 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/60 hover:box-glow"
          >
            <v.icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            <h3 className="mt-4 font-heading text-lg font-bold tracking-wide text-foreground">
              {v.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function RecruitCta() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-card/90 to-background p-10 text-center box-glow-strong sm:p-16"
      >
        <div className="cyber-grid absolute inset-0 -z-10 opacity-20" />
        <h2 className="font-heading text-3xl font-black tracking-wider text-foreground sm:text-5xl">
          PRÊT À <span className="text-primary text-glow">MÉRITER</span> TA PLACE ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
          Le recrutement ne se fait plus par messages privés. Passe par la plateforme officielle pour
          un processus structuré, professionnel et sécurisé.
        </p>
        <Link
          href="/recrutement"
          className="group mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-heading text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/80 box-glow"
        >
          POSTULER MAINTENANT
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  )
}
