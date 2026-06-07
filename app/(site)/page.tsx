import { Hero } from '@/components/home/hero'
import { LeaderSection } from '@/components/home/leader-section'
import { ValuesSection, ProcessSection, RecruitCta } from '@/components/home/sections'

export const runtime = 'edge'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuesSection />
      <ProcessSection />
      <LeaderSection />
      <RecruitCta />
    </>
  )
}
