'use client'

import { motion } from 'framer-motion'
import { Crown, Shield, Star, Swords, UserCheck, Users } from 'lucide-react'
import { RANKS } from '@/lib/site-config'

const ICONS = [Crown, Shield, Star, Swords, UserCheck, Users]
const LEVEL_COLORS = [
  'from-yellow-500/20 to-primary/10 border-yellow-500/40',
  'from-primary/20 to-primary/5 border-primary/50',
  'from-orange-500/15 to-primary/5 border-orange-500/30',
  'from-primary/15 to-primary/5 border-primary/35',
  'from-slate-500/15 to-primary/5 border-slate-500/25',
  'from-slate-700/15 to-transparent border-border',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export function RankCards() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl space-y-4 px-4"
    >
      {RANKS.map((rank, i) => {
        const Icon = ICONS[i] ?? Shield
        const isTop = i < 2

        return (
          <motion.div
            key={rank.name}
            variants={cardVariants}
            className={`group relative overflow-hidden rounded-xl border bg-gradient-to-r p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${LEVEL_COLORS[i]} ${isTop ? 'box-glow' : ''}`}
          >
            {/* Left accent bar */}
            <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${isTop ? 'from-yellow-500/80 via-primary to-transparent' : 'from-primary/60 to-transparent'}`} />

            <div className="flex items-start gap-5 pl-2">
              {/* Level badge */}
              <div className="flex flex-col items-center gap-1.5">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${isTop ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-primary/30 bg-primary/8'}`}>
                  <Icon className={`h-5 w-5 ${isTop ? 'text-yellow-500' : 'text-primary'}`} />
                </div>
                <span className={`font-heading text-[10px] font-bold tracking-widest ${isTop ? 'text-yellow-500/80' : 'text-primary/60'}`}>
                  N{String(rank.level).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <h3 className="font-heading text-base font-black tracking-wide text-foreground sm:text-lg">
                    {rank.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-heading text-[10px] tracking-wider text-primary/75">
                    {rank.holder}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {rank.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-px w-4 bg-primary/40" />
                  <p className="text-xs italic text-muted-foreground/60">{rank.access}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
