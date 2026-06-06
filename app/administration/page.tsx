import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/admin-auth'
import { AdminLoginForm } from '@/components/admin/login-form'
import { CyberBackground } from '@/components/background-fx'

export const metadata = { title: 'Administration — SANTANA FAMILY' }

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect('/administration/dashboard')
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4">
      <CyberBackground />
      <AdminLoginForm />
    </main>
  )
}
