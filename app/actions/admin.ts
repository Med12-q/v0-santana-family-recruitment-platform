'use server'

import { sql, type Candidate, type CandidateStatus } from '@/lib/db'
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
  verifyAdminPassword,
} from '@/lib/admin-auth'
import { rateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function adminLogin(password: string): Promise<{ ok: boolean; error?: string }> {
  const hdrs = await headers()
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const limited = rateLimit(`login:${ip}`, 5, 60_000)
  if (!limited.success) {
    return { ok: false, error: 'Trop de tentatives. Réessayez dans une minute.' }
  }

  if (!verifyAdminPassword(password)) {
    return { ok: false, error: 'Mot de passe incorrect.' }
  }

  await createAdminSession()
  return { ok: true }
}

export async function adminLogout() {
  await destroyAdminSession()
  redirect('/administration')
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error('Unauthorized')
  }
}

export async function getCandidates(): Promise<Candidate[]> {
  await requireAdmin()
  const rows = (await sql`SELECT * FROM candidates ORDER BY created_at DESC`) as Candidate[]
  return rows
}

export async function updateCandidateStatus(id: number, status: CandidateStatus) {
  await requireAdmin()
  await sql`UPDATE candidates SET status = ${status} WHERE id = ${id}`
  revalidatePath('/administration/dashboard')
}

export async function deleteCandidate(id: number) {
  await requireAdmin()
  await sql`DELETE FROM candidates WHERE id = ${id}`
  revalidatePath('/administration/dashboard')
}
