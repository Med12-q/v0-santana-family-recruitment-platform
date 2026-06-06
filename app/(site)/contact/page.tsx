import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SITE } from '@/lib/site-config'
import { Mail, MessageCircle, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact — SANTANA FAMILY',
  description: 'Contactez la SANTANA FAMILY. Le recrutement se fait exclusivement via la plateforme officielle.',
}

export default function ContactPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="ENTRER EN CONTACT"
        title="Contact"
        subtitle="Le recrutement ne se fait plus par messages privés. Toute demande passe exclusivement par les canaux officiels ci-dessous."
      />

      <div className="mx-auto max-w-4xl px-4">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Email */}
          <div className="group rounded-xl border border-primary/20 bg-card/55 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:bg-card/70">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 group-hover:border-primary/60 group-hover:bg-primary/20 transition-all">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 font-heading text-base font-bold tracking-wide text-foreground">E-mail officiel</h3>
            <p className="mt-2 text-sm text-muted-foreground">Pour toute demande administrative et officielle.</p>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              {SITE.contactEmail}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* WhatsApp group */}
          <div className="group rounded-xl border border-primary/20 bg-card/55 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:bg-card/70">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 group-hover:border-primary/60 group-hover:bg-primary/20 transition-all">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 font-heading text-base font-bold tracking-wide text-foreground">Groupe d&apos;évaluation</h3>
            <p className="mt-2 text-sm text-muted-foreground">Accessible uniquement après soumission du formulaire officiel.</p>
            <a
              href={SITE.testGroupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              Rejoindre le groupe de test
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* CTA block */}
          <div className="sm:col-span-2 relative overflow-hidden rounded-2xl border border-primary/35 bg-gradient-to-br from-card/90 to-background p-8 text-center box-glow">
            <div className="cyber-grid absolute inset-0 -z-10 opacity-20" />
            <div className="absolute left-4 top-4 h-5 w-5 border-l border-t border-primary/30" />
            <div className="absolute right-4 top-4 h-5 w-5 border-r border-t border-primary/30" />

            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 box-glow mx-auto">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-heading text-xl font-bold tracking-wide text-foreground">
              La seule voie d&apos;entrée officielle
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
              Pour rejoindre la SANTANA FAMILY, une seule porte existe : la plateforme officielle.
              Soumettez votre candidature et prouvez que vous méritez votre place parmi les élites.
            </p>
            <Link
              href="/recrutement"
              className="group mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-heading text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/85 hover:scale-105 box-glow"
            >
              POSTULER MAINTENANT
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
