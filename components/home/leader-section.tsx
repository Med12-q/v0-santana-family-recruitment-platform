'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Crown, ShieldCheck } from 'lucide-react'
import { SITE } from '@/lib/site-config'

const LEADER_TEXT =
  "Lord Santana, purgeur de la deuxième génération, s'est distingué par sa bravoure et son parcours remarquable. Il a mis en place une famille d'élite de l'ombre appelée la SANTANA FAMILY. Surnommés les Démons de la Terreur, ils imposent le respect par leur discipline, leur détermination et leur cohésion."

function useTypewriter(text: string, start: boolean, speed = 28) {
  const [out, setOut] = useState('')
  useEffect(() => {
    if (!start) return
    let i = 0
    const id = setInterval(() => {
      i++
      setOut(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, start, speed])
  return out
}

export function LeaderSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const typed = useTypewriter(LEADER_TEXT, inView)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-4 py-20">
      <div className="mb-12 text-center">
        <p className="font-heading text-xs tracking-[0.4em] text-primary/70">LE CHEF SUPRÊME</p>
        <h2 className="mt-2 font-heading text-3xl font-bold tracking-wider text-foreground sm:text-4xl">
          Une vision. Une discipline. Une famille.
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid gap-8 overflow-hidden rounded-2xl border border-primary/30 bg-card/70 p-6 backdrop-blur-md box-glow md:grid-cols-[320px_1fr] md:p-10"
      >
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden rounded-xl border border-primary/40 box-glow">
          <Image
            src={SITE.leaderPhoto}
            alt="Lord Santana, Fondateur et Chef Suprême"
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> Leader de la 2ème Génération
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-primary">
            <Crown className="h-5 w-5" />
            <span className="font-heading text-xs tracking-[0.3em]">FONDATEUR &amp; CHEF SUPRÊME</span>
          </div>
          <h3 className="mt-2 font-heading text-3xl font-black tracking-wider text-foreground sm:text-4xl">
            LORD <span className="text-primary text-glow">SANTANA</span>
          </h3>

          <p className="mt-6 min-h-[8rem] text-pretty text-base leading-relaxed text-muted-foreground">
            {typed}
            {typed.length < LEADER_TEXT.length && (
              <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-primary align-middle" />
            )}
          </p>
        </div>
      </motion.div>
    </section>
  )
}
