import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { RULES } from '@/lib/site-config'
import { ShieldAlert } from 'lucide-react'

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
        subtitle="Rejoindre la famille, c'est adhérer à un code strict. Le non-respect entraîne l'exclusion immédiate."
      />

      <div className="mx-auto grid max-w-4xl gap-5 px-4 sm:grid-cols-2">
        {RULES.map((rule, i) => (
          <div
            key={rule.title}
            className="rounded-xl border border-primary/25 bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:box-glow"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 font-heading text-sm font-bold text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-heading text-base font-bold tracking-wide text-foreground">
                {rule.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{rule.text}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-4xl px-4">
        <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-5">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <p className="text-sm leading-relaxed text-foreground/90">
            La trahison, la délation et le manque de respect envers la hiérarchie sont sanctionnés
            par l&apos;exclusion définitive. La SANTANA FAMILY ne pardonne pas.
          </p>
        </div>
      </div>
    </div>
  )
}
