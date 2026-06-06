'use client'

import { useMemo, useState, useTransition } from 'react'
import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  Search,
  FileText,
  Download,
  Trash2,
  Eye,
  X,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { Candidate, CandidateStatus } from '@/lib/db'
import { updateCandidateStatus, deleteCandidate } from '@/app/actions/admin'
import { exportCandidatesPDF, exportCandidatesCSV } from '@/lib/export'
import { cn } from '@/lib/utils'

const STATUS_META: Record<CandidateStatus, { label: string; cls: string }> = {
  pending: { label: 'En attente', cls: 'border-amber-500/50 bg-amber-500/10 text-amber-400' },
  accepted: { label: 'Accepté', cls: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400' },
  rejected: { label: 'Refusé', cls: 'border-destructive/50 bg-destructive/10 text-destructive' },
}

export function DashboardClient({ candidates }: { candidates: Candidate[] }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | CandidateStatus>('all')
  const [selected, setSelected] = useState<Candidate | null>(null)

  const stats = useMemo(() => {
    const total = candidates.length
    const accepted = candidates.filter((c) => c.status === 'accepted').length
    const rejected = candidates.filter((c) => c.status === 'rejected').length
    const today = candidates.filter(
      (c) => new Date(c.created_at).toDateString() === new Date().toDateString(),
    ).length
    const rate = total > 0 ? Math.round((accepted / total) * 100) : 0
    return { total, accepted, rejected, today, rate }
  }, [candidates])

  // Monthly evolution (last 6 months)
  const monthly = useMemo(() => {
    const months: { key: string; label: string; count: number }[] = []
    const now = new Date()
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleDateString('fr-FR', { month: 'short' }),
        count: 0,
      })
    }
    for (const c of candidates) {
      const d = new Date(c.created_at)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      const m = months.find((x) => x.key === key)
      if (m) m.count++
    }
    return months
  }, [candidates])

  const statusData = useMemo(
    () => [
      { name: 'En attente', value: candidates.filter((c) => c.status === 'pending').length, color: '#f59e0b' },
      { name: 'Acceptés', value: stats.accepted, color: '#10b981' },
      { name: 'Refusés', value: stats.rejected, color: '#ef4444' },
    ],
    [candidates, stats],
  )

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      if (filter !== 'all' && c.status !== filter) return false
      if (!query) return true
      const q = query.toLowerCase()
      return (
        c.full_name.toLowerCase().includes(q) ||
        c.pseudo.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.country ?? '').toLowerCase().includes(q)
      )
    })
  }, [candidates, query, filter])

  return (
    <div className="mt-8 space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard icon={Users} label="Total candidats" value={stats.total} />
        <StatCard icon={CheckCircle2} label="Acceptés" value={stats.accepted} tone="emerald" />
        <StatCard icon={XCircle} label="Refusés" value={stats.rejected} tone="red" />
        <StatCard icon={Clock} label="Aujourd'hui" value={stats.today} tone="amber" />
        <StatCard icon={TrendingUp} label="Taux d'acceptation" value={`${stats.rate}%`} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Évolution mensuelle des candidatures">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="redFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="label" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} allowDecimals={false} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#redFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Répartition par statut">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} allowDecimals={false} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {statusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un candidat…"
              className="w-full rounded-md border border-primary/30 bg-input py-2.5 pl-10 pr-4 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>
          <div className="flex gap-1 rounded-md border border-primary/20 bg-card/60 p-1">
            {(['all', 'pending', 'accepted', 'rejected'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded px-3 py-1.5 text-xs font-medium transition-colors',
                  filter === f ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {f === 'all' ? 'Tous' : STATUS_META[f].label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => exportCandidatesPDF(filtered)}
            className="flex items-center gap-2 rounded-md border border-primary/40 bg-card/60 px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <FileText className="h-4 w-4" /> PDF
          </button>
          <button
            onClick={() => exportCandidatesCSV(filtered)}
            className="flex items-center gap-2 rounded-md border border-primary/40 bg-card/60 px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Download className="h-4 w-4" /> Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-primary/20 bg-card/40 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/20 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-heading">Candidat</th>
                <th className="px-4 py-3 font-heading">Pays</th>
                <th className="px-4 py-3 font-heading">Niveau</th>
                <th className="px-4 py-3 font-heading">Date</th>
                <th className="px-4 py-3 font-heading">Statut</th>
                <th className="px-4 py-3 text-right font-heading">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                    Aucune candidature trouvée.
                  </td>
                </tr>
              )}
              {filtered.map((c) => (
                <CandidateRow key={c.id} candidate={c} onView={() => setSelected(c)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <CandidateModal candidate={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone = 'primary',
}: {
  icon: React.ElementType
  label: string
  value: string | number
  tone?: 'primary' | 'emerald' | 'red' | 'amber'
}) {
  const toneCls = {
    primary: 'text-primary',
    emerald: 'text-emerald-400',
    red: 'text-destructive',
    amber: 'text-amber-400',
  }[tone]
  return (
    <div className="rounded-xl border border-primary/20 bg-card/60 p-5 backdrop-blur-sm">
      <Icon className={cn('h-6 w-6', toneCls)} />
      <p className="mt-3 font-heading text-3xl font-black text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/20 bg-card/60 p-5 backdrop-blur-sm">
      <h3 className="mb-4 font-heading text-sm font-semibold tracking-wide text-foreground">{title}</h3>
      {children}
    </div>
  )
}

function CandidateRow({ candidate, onView }: { candidate: Candidate; onView: () => void }) {
  const [pending, startTransition] = useTransition()
  const meta = STATUS_META[candidate.status]

  const setStatus = (status: CandidateStatus) =>
    startTransition(() => updateCandidateStatus(candidate.id, status))

  const remove = () => {
    if (confirm(`Supprimer la candidature de ${candidate.full_name} ?`)) {
      startTransition(() => deleteCandidate(candidate.id))
    }
  }

  return (
    <tr className={cn('border-b border-primary/10 transition-colors hover:bg-primary/5', pending && 'opacity-50')}>
      <td className="px-4 py-3">
        <p className="font-medium text-foreground">{candidate.full_name}</p>
        <p className="text-xs text-muted-foreground">@{candidate.pseudo}</p>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{candidate.country ?? '—'}</td>
      <td className="px-4 py-3 text-muted-foreground">{candidate.technical_level ?? '—'}</td>
      <td className="px-4 py-3 text-muted-foreground">
        {new Date(candidate.created_at).toLocaleDateString('fr-FR')}
      </td>
      <td className="px-4 py-3">
        <span className={cn('rounded-full border px-2.5 py-1 text-xs font-medium', meta.cls)}>
          {meta.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center justify-end gap-1">
          <button onClick={onView} title="Voir" className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
            <Eye className="h-4 w-4" />
          </button>
          {candidate.status !== 'accepted' && (
            <button onClick={() => setStatus('accepted')} title="Accepter" className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-emerald-500/10 hover:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </button>
          )}
          {candidate.status !== 'rejected' && (
            <button onClick={() => setStatus('rejected')} title="Refuser" className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
              <XCircle className="h-4 w-4" />
            </button>
          )}
          <button onClick={remove} title="Supprimer" className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

function CandidateModal({ candidate, onClose }: { candidate: Candidate; onClose: () => void }) {
  const rows: [string, string | number | null][] = [
    ['Nom complet', candidate.full_name],
    ['Pseudo', candidate.pseudo],
    ['Âge', candidate.age],
    ['Pays', candidate.country],
    ['Niveau technique', candidate.technical_level],
    ['Anciens clans', candidate.previous_clans],
    ['Expérience', candidate.experience],
    ["Années d'activité", candidate.years_active],
    ['Motivation', candidate.motivation],
    ['Disponibilité', candidate.availability],
    ['Email', candidate.email],
    ['WhatsApp', candidate.whatsapp],
    ['Compétences', candidate.skills],
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-primary/40 bg-card p-6 box-glow-strong"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold tracking-wide text-foreground">
            {candidate.full_name}
          </h3>
          <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <dl className="space-y-3">
          {rows.map(([label, value]) => (
            <div key={label} className="border-b border-primary/10 pb-3">
              <dt className="font-heading text-[10px] tracking-wider text-primary/70">{label.toUpperCase()}</dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm text-foreground">{value || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
