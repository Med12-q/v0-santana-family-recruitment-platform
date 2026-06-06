import 'server-only'
import { Resend } from 'resend'
import type { Candidate } from './db'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = 'santanafamille50@gmail.com'

export async function sendCandidateNotification(candidate: Candidate) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[v0] RESEND_API_KEY missing, skipping email')
    return
  }

  const rows: [string, string | number | null][] = [
    ['Nom complet', candidate.full_name],
    ['Pseudo', candidate.pseudo],
    ['Âge', candidate.age],
    ['Pays', candidate.country],
    ['Niveau technique', candidate.technical_level],
    ['Anciennes familles / clans', candidate.previous_clans],
    ['Expérience', candidate.experience],
    ["Années d'activité", candidate.years_active],
    ['Motivation', candidate.motivation],
    ['Disponibilité', candidate.availability],
    ['Email', candidate.email],
    ['WhatsApp', candidate.whatsapp],
    ['Compétences particulières', candidate.skills],
  ]

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:10px 14px;border-bottom:1px solid #2a2a2a;color:#ff3b3b;font-weight:600;width:38%;vertical-align:top;">${label}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #2a2a2a;color:#f5f5f5;">${value ?? '—'}</td>
        </tr>`,
    )
    .join('')

  const html = `
  <div style="background:#0a0a0a;padding:32px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:640px;margin:0 auto;background:#111;border:1px solid #ff3b3b33;border-radius:14px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#1a0000,#0a0a0a);padding:28px 24px;text-align:center;border-bottom:1px solid #ff3b3b44;">
        <h1 style="margin:0;color:#ff3b3b;font-size:24px;letter-spacing:2px;">SANTANA FAMILY</h1>
        <p style="margin:6px 0 0;color:#888;font-size:13px;letter-spacing:1px;">Les Démons de la Terreur — Nouvelle candidature</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
      <div style="padding:20px 24px;background:#0d0d0d;text-align:center;color:#666;font-size:12px;">
        Candidature reçue le ${new Date(candidate.created_at).toLocaleString('fr-FR')}
      </div>
    </div>
  </div>`

  try {
    await resend.emails.send({
      from: 'SANTANA FAMILY <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `Nouvelle candidature — ${candidate.full_name} (${candidate.pseudo})`,
      html,
    })
  } catch (err) {
    console.log('[v0] Email send failed:', err)
  }
}
