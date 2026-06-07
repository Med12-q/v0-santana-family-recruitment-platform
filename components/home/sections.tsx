'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Eye, Users, Zap, Target, Flame, ArrowRight, CheckCircle2 } from 'lucide-react'

const VALUES = [
  { icon: Shield, title: 'Discipline', desc: "La discipline forge les grands. Chaque membre s'engage pleinement envers les règles et la hiérarchie." },
  { icon: Eye, title: 'Discrétion', desc: "Ce qui se passe dans la famille reste dans la famille. La confidentialité est absolue et non négociable." },
  { icon: Users, title: 'Cohésion', desc: "Nous avançons ensemble. La solidarité entre membres est notre plus grande force collective." },
  { icon: Target, title: 'Excellence', desc: "L'élite ne se rejoint pas, elle se mérite. Chaque membre vise l'excellence en permanence." },
  { icon: Zap, title: 'Loyauté', desc: "La loyauté envers la famille passe avant tout. Aucune trahison ne sera jamais tolérée." },
  { icon: Flame, title: 'Détermination', desc: "La persévérance distingue les vrais membres des autres. Nous n'abandonnons jamais." },
]

const STEPS = [
  { num: '01', title: 'Postulez en ligne', desc: "Remplissez le formulaire officiel sur la page Recrutement. Soyez honnête et précis dans vos réponses." },
  { num: '02', title: 'Candidature examinée', desc: "Votre candidature est analysée par nos chefs. Chaque profil est étudié avec soin et sérieux." },
  { num: '03', title: 'Tests d\'évaluation', desc: "Si votre profil convient, vous rejoignez le groupe de test pour démontrer votre niveau réel." },
  { num: '04', title: 'Intégration', desc: "Vous convainquez un chef ? Il vous transmet le lien du QG principal. Bienvenue dans la famille." },
]

export function ValuesSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Nos valeurs</p>
          <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">
            Ce qui nous définit
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            La SANTANA FAMILY repose sur des valeurs fondamentales qui guident chaque membre au quotidien.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
              className="group rounded-lg border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.04]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-base font-bold text-white">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProcessSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Processus</p>
          <h2 className="mt-3 font-heading text-3xl font-black text-white sm:text-4xl">
            Comment rejoindre la famille
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray-400">
            Quatre étapes claires pour intégrer la SANTANA FAMILY. Chaque étape compte.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-5 rounded-lg border border-white/5 bg-white/[0.02] p-6"
            >
              <span className="font-heading text-4xl font-black leading-none text-primary/20">{step.num}</span>
              <div>
                <h3 className="font-heading text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function RecruitCta() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl border border-primary/20 p-12 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          <div className="relative">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Recrutement ouvert</p>
            <h2 className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl">
              Prêt à rejoindre l&apos;élite ?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-gray-400">
              Remplissez le formulaire officiel. Chaque candidature est examinée avec soin par nos chefs.
              Le recrutement se fait exclusivement par cette plateforme.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/recrutement"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-primary/85 hover:shadow-[0_0_28px_rgba(220,38,38,0.4)]"
              >
                Postuler maintenant <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/hierarchie"
                className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-gray-400 transition-all hover:border-white/30 hover:text-white"
              >
                Voir les grades
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
