import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Candidate } from '@/lib/db'

const STATUS_LABEL: Record<string, string> = {
  pending: 'En attente',
  accepted: 'Accepté',
  rejected: 'Refusé',
}

export function exportCandidatesPDF(candidates: Candidate[]) {
  const doc = new jsPDF({ orientation: 'landscape' })
  doc.setFontSize(18)
  doc.setTextColor(200, 30, 30)
  doc.text('SANTANA FAMILY — Candidatures', 14, 18)
  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text(`Export du ${new Date().toLocaleString('fr-FR')} — ${candidates.length} candidat(s)`, 14, 25)

  autoTable(doc, {
    startY: 30,
    head: [['Nom', 'Pseudo', 'Âge', 'Pays', 'Niveau', 'Email', 'WhatsApp', 'Statut', 'Date']],
    body: candidates.map((c) => [
      c.full_name,
      c.pseudo,
      c.age ?? '—',
      c.country ?? '—',
      c.technical_level ?? '—',
      c.email,
      c.whatsapp ?? '—',
      STATUS_LABEL[c.status] ?? c.status,
      new Date(c.created_at).toLocaleDateString('fr-FR'),
    ]),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [180, 25, 25], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  })

  doc.save(`santana-candidatures-${Date.now()}.pdf`)
}

export function exportCandidatesCSV(candidates: Candidate[]) {
  const headers = [
    'ID', 'Nom complet', 'Pseudo', 'Age', 'Pays', 'Niveau technique', 'Anciens clans',
    'Experience', "Annees d'activite", 'Motivation', 'Disponibilite', 'Email', 'WhatsApp',
    'Competences', 'Statut', 'Date',
  ]

  const escape = (v: unknown) => {
    const s = v === null || v === undefined ? '' : String(v)
    return `"${s.replace(/"/g, '""')}"`
  }

  const rows = candidates.map((c) =>
    [
      c.id, c.full_name, c.pseudo, c.age ?? '', c.country ?? '', c.technical_level ?? '',
      c.previous_clans ?? '', c.experience ?? '', c.years_active ?? '', c.motivation ?? '',
      c.availability ?? '', c.email, c.whatsapp ?? '', c.skills ?? '',
      STATUS_LABEL[c.status] ?? c.status, new Date(c.created_at).toLocaleString('fr-FR'),
    ]
      .map(escape)
      .join(','),
  )

  // BOM for Excel UTF-8 compatibility
  const csv = '\uFEFF' + [headers.map(escape).join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `santana-candidatures-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}
