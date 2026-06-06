import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { RankCards } from '@/components/rank-cards'

export const metadata: Metadata = {
  title: 'Hiérarchie — SANTANA FAMILY',
  description: 'Découvrez les grades et la structure hiérarchique de la SANTANA FAMILY.',
}

export default function HierarchiePage() {
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="STRUCTURE & GRADES"
        title="La Hiérarchie"
        subtitle="Chaque grade se mérite. L'ordre fait la force. Voici le chemin de l'ascension au sein de la famille."
      />
      <RankCards />
    </div>
  )
}
