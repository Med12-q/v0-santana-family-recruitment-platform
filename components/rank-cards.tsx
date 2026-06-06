'use client'

import { motion } from 'framer-motion'
import { Crown, Users, Swords, Flame, Sparkles, UserPlus } from 'lucide-react'
import { RANKS } from '@/lib/site-config'

const ICONS = [Crown, Users, Swords, Flame, Sparkles, UserPlus]

export function RankCards() {
  return (
    <div className="mx-auto grid max-w-5xl gap-5 px-4 sm:grid-cols-2">
      {RANKS.map((rank, i) => {
        const Icon = ICONS[i] ?? Crown
        const featured = i === 0
        return (
          <motion.div
            key={rank.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`group relative overflow-hidden rounded-2xl border bg-card/60 p-6 backdrop-blur-md transition-all hover:box-glow ${
              featured ? 'border-primary/60 sm:col-span-2 box-glow' : 'border-primary/25 hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-heading text-xl font-bold tracking-wide text-foreground">{rank.name}</h3>
                  <p className="text-sm text-primary/80">{rank.holder}</p>
                </div>
              </div>
              <span className="font-heading text-3xl font-black text-primary/20">
                {String(rank.level).padStart(2, '0')}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{rank.description}</p>

            <div className="mt-4 border-t border-primary/15 pt-3">
              <span className="font-heading text-[10px] tracking-wider text-muted-foreground/60">
                CONDITIONS D&apos;ACCÈS
              </span>
              <p className="mt-1 text-sm text-foreground/90">{rank.access}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
