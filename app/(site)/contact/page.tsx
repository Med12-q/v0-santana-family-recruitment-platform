import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SITE } from '@/lib/site-config'
import { Mail, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react'
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
        subtitle="Le recrutement ne se fait plus par messages privés. Toute demande passe par les canaux officiels ci-dessous."
      />

      <div className="mx-auto grid max-w-4xl gap-5 px-4 sm:grid-cols-2">
        <div className="rounded-xl border border-primary/25 bg-card/60 p-6 backdrop-blur-sm">
          <Mail className="h-7 w-7 text-primary" />
          <h3 className="mt-3 font-heading text-lg font-bold tracking-wide text-foreground">E-mail officiel</h3>
          <p className="mt-2 text-sm text-muted-foreground">Pour toute demande administrative.</p>
          <a href={`mailto:${SITE.contactEmail}`} className="mt-2 inline-block text-sm text-primary hover:underline">
            {SITE.contactEmail}
          </a>
        </div>

        <div className="rounded-xl border border-primary/25 bg-card/60 p-6 backdrop-blur-sm">
          <MessageCircle className="h-7 w-7 text-primary" />
          <h3 className="mt-3 font-heading text-lg font-bold tracking-wide text-foreground">Groupe d&apos;évaluation</h3>
          <p className="mt-2 text-sm text-muted-foreground">Accessible après soumission du formulaire de recrutement.</p>
          <a href={SITE.testGroupUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-primary hover:underline">
            Rejoindre le groupe de test
          </a>
        </div>

        <div className="sm:col-span-2 rounded-2xl border border-primary/40 bg-gradient-to-br from-card/80 to-background p-8 text-center box-glow">
          <ShieldCheck className="mx-auto h-8 w-8 text-primary" />
          <h3 className="mt-3 font-heading text-xl font-bold tracking-wide text-foreground">
            La seule voie d&apos;entrée
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Pour rejoindre la SANTANA FAMILY, une seule porte : la plateforme officielle. Soumettez
            votre candidature et prouvez que vous méritez votre place.
          </p>
          <Link
            href="/recrutement"
            className="group mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-heading text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/80"
          >
            POSTULER MAINTENANT
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
