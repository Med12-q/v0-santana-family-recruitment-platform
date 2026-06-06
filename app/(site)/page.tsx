import { Hero } from '@/components/home/hero'
import { LeaderSection } from '@/components/home/leader-section'
import { ValuesSection, RecruitCta } from '@/components/home/sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuesSection />
      <LeaderSection />
      <RecruitCta />
    </>
  )
}
