import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { SITE } from '@/lib/site-config'
import { Crown, Eye, Swords } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos — SANTANA FAMILY',
  description: "Découvrez l'histoire et la philosophie de la SANTANA FAMILY, les Démons de la Terreur.",
}

export default function AboutPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="NOTRE HISTOIRE"
        title="À propos de la famille"
        subtitle="Une famille d'élite de l'ombre, forgée dans la discipline et la loyauté."
      />

      <div className="mx-auto max-w-4xl space-y-12 px-4">
        <div className="grid items-center gap-8 rounded-2xl border border-primary/30 bg-card/60 p-8 backdrop-blur-md md:grid-cols-[1fr_280px]">
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-wider text-foreground">
              Les Démons de la Terreur
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              La SANTANA FAMILY est une famille d&apos;élite de l&apos;ombre fondée par Lord Santana,
              purgeur de la deuxième génération. Surnommés les Démons de la Terreur, ses membres
              imposent le respect par leur discipline, leur détermination et leur cohésion.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Ici, rien n&apos;est donné. Tout se mérite. Notre devise guide chacune de nos actions :
              <span className="italic text-primary"> &ldquo;{SITE.slogan}&rdquo;</span>
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-full border-2 border-primary/50 box-glow md:w-full md:rounded-2xl">
            <Image src={SITE.logo} alt="Emblème de la SANTANA FAMILY" fill className="object-cover" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: Crown, title: 'Héritage', text: "Issus de la 2ème génération, nous portons un héritage de bravoure." },
            { icon: Eye, title: 'Discrétion', text: 'Nous opérons dans l\'ombre. La discrétion est notre force.' },
            { icon: Swords, title: 'Puissance', text: 'Discipline, détermination et cohésion forgent notre puissance.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-primary/25 bg-card/50 p-6 text-center backdrop-blur-sm">
              <item.icon className="mx-auto h-8 w-8 text-primary" />
              <h3 className="mt-3 font-heading text-lg font-bold tracking-wide text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
