import type { ReactNode } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CyberBackground, ParticleField } from '@/components/background-fx'
import { FloatingChat } from '@/components/floating-chat'

export const runtime = 'edge'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <CyberBackground />
      <ParticleField />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
      <FloatingChat />
    </div>
  )
}
