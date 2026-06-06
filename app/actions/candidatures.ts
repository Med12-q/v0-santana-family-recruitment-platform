'use server'

import { sql, type Candidate } from '@/lib/db'
import { sendCandidateNotification } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

export interface CandidateInput {
  fullName: string
  pseudo: string
  age: string
  country: string
  technicalLevel: string
  previousClans: string
  experience: string
  yearsActive: string
  motivation: string
  availability: string
  email: string
  whatsapp: string
  skills: string
  // Honeypot anti-bot field (must be empty)
  website?: string
}

export type SubmitResult = { ok: true } | { ok: false; error: string }

export async function submitCandidature(data: CandidateInput): Promise<SubmitResult> {
  // Anti-bot honeypot
  if (data.website && data.website.trim() !== '') {
    return { ok: false, error: 'Requête invalide.' }
  }

  // Rate limit per IP
  const hdrs = await headers()
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const limited = rateLimit(`submit:${ip}`, 3, 60_000)
  if (!limited.success) {
    return { ok: false, error: 'Trop de tentatives. Réessayez dans une minute.' }
  }

  // Validation
  const fullName = data.fullName?.trim()
  const pseudo = data.pseudo?.trim()
  const email = data.email?.trim()
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')

  if (!fullName || fullName.length < 2) return { ok: false, error: 'Nom complet requis.' }
  if (!pseudo || pseudo.length < 2) return { ok: false, error: 'Pseudo requis.' }
  if (!emailValid) return { ok: false, error: 'Adresse e-mail invalide.' }
  if (!data.motivation?.trim()) return { ok: false, error: 'La motivation est requise.' }

  const ageNum = data.age ? parseInt(data.age, 10) : null
  const ageVal = ageNum && !Number.isNaN(ageNum) ? ageNum : null

  try {
    const rows = (await sql`
      INSERT INTO candidates (
        full_name, pseudo, age, country, technical_level, previous_clans,
        experience, years_active, motivation, availability, email, whatsapp, skills
      ) VALUES (
        ${fullName}, ${pseudo}, ${ageVal}, ${data.country?.trim() || null},
        ${data.technicalLevel?.trim() || null}, ${data.previousClans?.trim() || null},
        ${data.experience?.trim() || null}, ${data.yearsActive?.trim() || null},
        ${data.motivation?.trim() || null}, ${data.availability?.trim() || null},
        ${email}, ${data.whatsapp?.trim() || null}, ${data.skills?.trim() || null}
      )
      RETURNING *
    `) as Candidate[]

    const candidate = rows[0]
    if (candidate) {
      await sendCandidateNotification(candidate)
    }

    return { ok: true }
  } catch {
    return { ok: false, error: "Une erreur est survenue. Réessayez plus tard." }
  }
}
