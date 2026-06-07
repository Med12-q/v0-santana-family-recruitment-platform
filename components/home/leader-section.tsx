'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Crown, ArrowRight } from 'lucide-react'
import { SITE } from '@/lib/site-config'

export function LeaderSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-2xl bg-primary/10 blur-3xl" />
              <div className="relative h-80 w-72 overflow-hidden rounded-2xl border border-white/8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <Image
                  src={SITE.leaderPhoto}
                  alt="Lord Santana"
                  fill
                  className="object-cover object-top"
                  sizes="288px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap rounded-full border border-primary/30 bg-[#05050a]/90 px-5 py-2 backdrop-blur-sm shadow-lg">
                <Crown className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-white">Chef Suprême</span>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Le fondateur</p>
            <h2 className="mt-3 font-heading text-4xl font-black text-white sm:text-5xl">Lord Santana</h2>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-px w-12 bg-primary/40" />
              <p className="text-sm text-gray-500">Leader de la 2ème Génération</p>
            </div>

            <p className="mt-6 text-gray-400 leading-relaxed">
              Purgeur de la deuxième génération, Lord Santana s&apos;est distingué par sa bravoure
              et son parcours remarquable. Il a fondé la SANTANA FAMILY avec une vision claire :
              créer une organisation d&apos;élite où discipline, loyauté et excellence sont les
              piliers fondamentaux.
            </p>
            <p className="mt-4 text-gray-400 leading-relaxed">
              Sous sa direction, la famille est devenue une organisation respectée, dont les
              membres imposent le respect par leur cohésion et leur détermination sans faille.
            </p>

            <div className="mt-8 flex gap-10 border-t border-white/5 pt-8">
              {[
                { v: '50+', l: 'Membres' },
                { v: '5+', l: 'Années' },
                { v: '6', l: 'Grades' },
              ].map(s => (
                <div key={s.l}>
                  <p className="font-heading text-2xl font-black text-white">{s.v}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-gray-600">{s.l}</p>
                </div>
              ))}
            </div>

            <Link
              href="/a-propos"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
            >
              En savoir plus <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
