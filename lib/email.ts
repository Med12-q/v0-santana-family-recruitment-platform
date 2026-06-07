import 'server-only'
import { Resend } from 'resend'
import type { Candidate } from './db'

const resend = new Resend(process.env.RESEND_API_KEY)

const ADMIN_EMAIL = process.env.ADMIN_NOTIFY_EMAIL || 'santanafamille50@gmail.com'

export async function sendCandidateNotification(candidate: Candidate) {
  if (!process.env.RESEND_API_KEY) {
    console.error('[EMAIL] RESEND_API_KEY manquant — email non envoyé. Ajoutez-le dans les variables Vercel.')
    return
  }

  const rows: [string, string | number | null][] = [
    ['Nom complet', candidate.full_name],
    ['Pseudo', candidate.pseudo],
    ['Âge', candidate.age],
    ['Pays', candidate.country],
    ['Niveau technique', candidate.technical_level],
    ['Anciennes familles', candidate.previous_clans],
    ['Expérience', candidate.experience],
    ["Années d'activité", candidate.years_active],
    ['Motivation', candidate.motivation],
    ['Disponibilité', candidate.availability],
    ['Email', candidate.email],
    ['WhatsApp', candidate.whatsapp],
    ['Compétences', candidate.skills],
  ]

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#dc2626;font-weight:600;font-size:13px;width:35%;vertical-align:top;">${label}</td>
        <td style="padding:10px 16px;border-bottom:1px solid #1a1a1a;color:#d1d5db;font-size:13px;">${value ?? '—'}</td>
      </tr>`,
    )
    .join('')

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:620px;margin:32px auto;background:#111118;border-radius:12px;overflow:hidden;border:1px solid #1f1f2e;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a0000,#0d0d15);padding:32px 24px;text-align:center;border-bottom:1px solid #dc262622;">
      <p style="margin:0 0 6px;color:#dc2626;font-size:10px;letter-spacing:3px;font-weight:700;text-transform:uppercase;">Nouvelle candidature</p>
      <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:2px;font-weight:900;">SANTANA FAMILY</h1>
      <p style="margin:6px 0 0;color:#6b7280;font-size:12px;">Les Démons de la Terreur</p>
    </div>

    <!-- Badge -->
    <div style="padding:16px 24px;background:#16161e;border-bottom:1px solid #1a1a1a;text-align:center;">
      <p style="margin:0;color:#f5f5f7;font-size:14px;">
        <strong style="color:#fff;">${candidate.full_name}</strong>
        <span style="color:#6b7280;"> · </span>
        <strong style="color:#dc2626;">${candidate.pseudo}</strong>
      </p>
    </div>

    <!-- Table -->
    <table style="width:100%;border-collapse:collapse;">${tableRows}</table>

    <!-- Footer -->
    <div style="padding:20px 24px;background:#0d0d15;text-align:center;border-top:1px solid #1a1a1a;">
      <p style="margin:0;color:#4b5563;font-size:11px;">
        Reçu le ${new Date(candidate.created_at).toLocaleString('fr-FR')} · SANTANA FAMILY Platform
      </p>
    </div>
  </div>
</body>
</html>`

  try {
    const result = await resend.emails.send({
      from: 'SANTANA FAMILY <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `🔴 Nouvelle candidature — ${candidate.full_name} (${candidate.pseudo})`,
      html,
    })

    if (result.error) {
      console.error('[EMAIL] Erreur Resend:', JSON.stringify(result.error))
      console.error('[EMAIL] IMPORTANT: Vérifiez que votre email est vérifié dans Resend, ou utilisez un domaine custom.')
    } else {
      console.log('[EMAIL] ✓ Email envoyé avec succès — ID:', result.data?.id)
    }
  } catch (err) {
    console.error('[EMAIL] Exception lors de l\'envoi:', err)
  }
}
