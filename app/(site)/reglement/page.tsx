import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { RULES } from '@/lib/site-config'
import { ShieldAlert, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Règlement — SANTANA FAMILY',
  description: 'Le code de conduite et les règles de la SANTANA FAMILY.',
}

export default function ReglementPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="CODE DE CONDUITE"
        title="Le Règlement"
        subtitle="Rejoindre la famille, c'est adhérer à un code strict et inviolable. Le non-respect entraîne l'exclusion immédiate et définitive."
      />

      <div className="mx-auto max-w-4xl px-4">
        <div className="grid gap-4 sm:grid-cols-2">
          {RULES.map((rule, i) => (
            <div
              key={rule.title}
              className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card/55 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:bg-card/70"
            >
              {/* Number accent */}
              <div className="absolute right-4 top-4 font-heading text-5xl font-black text-primary/5 select-none group-hover:text-primary/8 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </div>

              <div className="flex items-center gap-3 relative">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 font-heading text-xs font-black text-primary group-hover:border-primary/70 group-hover:bg-primary/20 transition-all">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-sm font-bold tracking-wide text-foreground">
                  {rule.title}
                </h3>
              </div>
              <div className="mt-2 ml-12 h-px w-8 bg-primary/30" />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{rule.text}</p>
            </div>
          ))}
        </div>

        {/* Warning banner */}
        <div className="mt-8 flex items-start gap-4 rounded-xl border border-destructive/40 bg-gradient-to-r from-destructive/10 to-transparent p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-destructive/40 bg-destructive/10">
            <ShieldAlert className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-foreground tracking-wide">Tolérance zéro</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground/90">
              La trahison, la délation et le manque de respect envers la hiérarchie sont sanctionnés
              par l&apos;exclusion définitive. La SANTANA FAMILY ne pardonne pas et n&apos;oublie pas.
            </p>
          </div>
        </div>

        {/* Confidentiality note */}
        <div className="mt-4 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-foreground tracking-wide">Confidentialité absolue</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground/90">
              Tout ce qui se passe au sein de la SANTANA FAMILY reste strictement confidentiel.
              Divulguer des informations internes est un acte de trahison sanctionné immédiatement.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
