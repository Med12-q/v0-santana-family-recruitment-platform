import { neon } from '@neondatabase/serverless'

// Single SQL client for the SANTANA FAMILY recruitment database.
export const sql = neon(process.env.DATABASE_URL!)

export type CandidateStatus = 'pending' | 'accepted' | 'rejected'

export interface Candidate {
  id: number
  full_name: string
  pseudo: string
  age: number | null
  country: string | null
  technical_level: string | null
  previous_clans: string | null
  experience: string | null
  years_active: string | null
  motivation: string | null
  availability: string | null
  email: string
  whatsapp: string | null
  skills: string | null
  status: CandidateStatus
  created_at: string
}
