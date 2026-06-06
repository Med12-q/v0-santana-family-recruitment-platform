import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { SITE } from '@/lib/site-config'
import { Crown, Eye, Swords, Flame, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos — SANTANA FAMILY',
  description: "Découvrez l'histoire et la philosophie de la SANTANA FAMILY, les Démons de la Terreur.",
}

const PILLARS = [
  { icon: Crown, title: 'Héritage', text: "Issus de la 2ème génération, nous portons un héritage forgé dans la bravoure et le sacrifice." },
  { icon: Eye, title: 'Discrétion', text: "Nous opérons dans l'ombre. La discrétion est notre force la plus redoutable." },
  { icon: Swords, title: 'Puissance', text: 'Discipline, détermination et cohésion forgent notre puissance collective.' },
  { icon: Flame, title: 'Passion', text: "Chaque membre porte en lui une flamme qui ne s'éteint jamais — celle de l'excellence." },
  { icon: Shield, title: 'Protection', text: "La famille se protège mutuellement. Aucun membre n'est laissé derrière." },
  { icon: Users, title: 'Famille', text: "Nous ne sommes pas un groupe. Nous sommes une famille. La différence est totale." },
]

export default function AboutPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="NOTRE HISTOIRE"
        title="À propos de la famille"
        subtitle="Une famille d'élite de l'ombre, forgée dans la discipline et la loyauté absolue."
      />

      <div className="mx-auto max-w-5xl space-y-12 px-4">
        {/* Main block */}
        <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-primary/30 bg-card/60 p-8 backdrop-blur-md box-glow md:grid-cols-[1fr_260px]">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-wider text-foreground">
              Les <span className="text-primary text-glow">Démons</span> de la Terreur
            </h2>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-primary/60 to-transparent" />
            <p className="mt-5 leading-relaxed text-muted-foreground">
              La SANTANA FAMILY est une famille d&apos;élite de l&apos;ombre fondée par Lord Santana,
              purgeur de la deuxième génération. Surnommés les Démons de la Terreur, ses membres
              imposent le respect par leur discipline, leur détermination et leur cohésion inébranlable.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Ici, rien n&apos;est donné. Tout se mérite. Notre devise guide chacune de nos actions :
            </p>
            <blockquote className="mt-4 border-l-2 border-primary/60 pl-4 italic text-primary/85">
              &ldquo;{SITE.slogan}&rdquo;
            </blockquote>
          </div>
          <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-2xl border-2 border-primary/50 box-glow md:w-full">
            <Image src={SITE.logo} alt="Emblème de la SANTANA FAMILY" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>

        {/* Pillars grid */}
        <div>
          <div className="mb-8 text-center">
            <p className="font-heading text-xs tracking-[0.4em] text-primary/70 uppercase">Ce qui nous définit</p>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-wider text-foreground sm:text-3xl">
              Nos Valeurs Fondamentales
            </h2>
            <div className="mx-auto mt-3 h-px w-20 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((item) => (
              <div
                key={item.title}
                className="group rounded-xl border border-primary/20 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:bg-card/70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/30 bg-primary/8 transition-colors group-hover:border-primary/60 group-hover:bg-primary/15">
                    <item.icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <h3 className="font-heading text-sm font-bold tracking-wide text-foreground">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
