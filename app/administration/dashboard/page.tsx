import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { getCandidates } from '@/app/actions/admin'
import { adminLogout } from '@/app/actions/admin'
import { CyberBackground } from '@/components/background-fx'
import { DashboardClient } from '@/components/admin/dashboard-client'
import { LogOut } from 'lucide-react'

export const metadata = { title: 'Tableau de bord — SANTANA FAMILY' }
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  if (!(await isAdminAuthenticated())) {
    redirect('/administration')
  }

  const candidates = await getCandidates()

  return (
    <main className="relative min-h-screen">
      <CyberBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/20 pb-6">
          <div>
            <h1 className="font-heading text-2xl font-bold tracking-widest text-foreground">
              TABLEAU DE <span className="text-primary text-glow">BORD</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Gestion des candidatures — SANTANA FAMILY
            </p>
          </div>
          <form action={adminLogout}>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md border border-primary/40 bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <LogOut className="h-4 w-4" /> Déconnexion
            </button>
          </form>
        </header>

        <DashboardClient candidates={candidates} />
      </div>
    </main>
  )
}
