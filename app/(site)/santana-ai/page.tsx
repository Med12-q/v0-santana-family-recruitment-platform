import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { SantanaChat } from '@/components/santana-chat'

export const metadata: Metadata = {
  title: 'SANTANA AI — Assistant officiel',
  description: "Posez vos questions à SANTANA AI, l'assistant intelligent de la SANTANA FAMILY, disponible 24h/24.",
}

export default function SantanaAiPage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="INTELLIGENCE ARTIFICIELLE"
        title="SANTANA AI"
        subtitle="L'assistant officiel de la famille, disponible 24h/24. Interrogez-le sur le clan, les règles, les grades et le recrutement."
      />

      <div className="mx-auto max-w-3xl px-4">
        <div className="flex h-[min(600px,75vh)] flex-col overflow-hidden rounded-2xl border border-primary/40 bg-card/60 backdrop-blur-md box-glow">
          <div className="flex items-center gap-2 border-b border-primary/20 bg-card/60 px-5 py-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-heading text-sm font-bold tracking-widest text-foreground">
              SANTANA <span className="text-primary">AI</span>
            </span>
            <span className="ml-auto text-xs text-muted-foreground">En ligne 24h/24</span>
          </div>
          <SantanaChat className="flex-1" />
        </div>
      </div>
    </div>
  )
}
