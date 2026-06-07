'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Loader2, AlertCircle, ExternalLink } from 'lucide-react'
import { submitCandidature, type CandidateInput } from '@/app/actions/candidatures'
import { SITE } from '@/lib/site-config'

const WA_GROUP = 'https://chat.whatsapp.com/DRVPRL8tyU71T4sndCdVQ3'

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const FIELDS: {
  name: keyof CandidateInput
  label: string
  type?: string
  textarea?: boolean
  required?: boolean
  placeholder?: string
  half?: boolean
}[] = [
  { name: 'fullName', label: 'Nom complet', required: true, half: true, placeholder: 'Votre nom complet' },
  { name: 'pseudo', label: 'Pseudo principal', required: true, half: true, placeholder: 'Votre pseudo' },
  { name: 'age', label: 'Âge', type: 'number', half: true, placeholder: '18' },
  { name: 'country', label: 'Pays', half: true, placeholder: 'Votre pays' },
  { name: 'technicalLevel', label: 'Niveau technique', half: true, placeholder: 'Débutant / Intermédiaire / Expert' },
  { name: 'yearsActive', label: "Années d'activité", half: true, placeholder: 'Ex: 3 ans' },
  { name: 'previousClans', label: 'Anciennes familles ou clans', placeholder: 'Listez vos anciens clans' },
  { name: 'experience', label: 'Expérience', textarea: true, placeholder: 'Décrivez votre expérience' },
  { name: 'motivation', label: 'Motivation', textarea: true, required: true, placeholder: 'Pourquoi rejoindre la SANTANA FAMILY ?' },
  { name: 'availability', label: 'Disponibilité', half: true, placeholder: 'Ex: Soirs & week-ends' },
  { name: 'email', label: 'Adresse e-mail', type: 'email', required: true, half: true, placeholder: 'vous@exemple.com' },
  { name: 'whatsapp', label: 'WhatsApp', half: true, placeholder: '+33 6 12 34 56 78' },
  { name: 'skills', label: 'Compétences particulières', textarea: true, placeholder: 'Vos atouts, talents et spécialités' },
]

const EMPTY: CandidateInput = {
  fullName: '', pseudo: '', age: '', country: '', technicalLevel: '', previousClans: '',
  experience: '', yearsActive: '', motivation: '', availability: '', email: '', whatsapp: '', skills: '', website: '',
}

function Confirmation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg py-20 text-center"
    >
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
        <CheckCircle2 className="h-7 w-7 text-primary" />
      </div>
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">Candidature reçue</p>
      <h2 className="font-heading text-2xl font-black text-white mb-4">
        Candidature soumise avec succès
      </h2>
      <p className="text-sm text-gray-400 mb-8 leading-relaxed">
        Votre candidature a été transmise. Elle sera examinée par nos chefs dans les plus brefs délais.
        Préparez-vous — les tests sont exigeants.
      </p>

      {/* WhatsApp Group CTA */}
      <div className="rounded-lg border border-[#25D366]/30 bg-[#25D366]/5 p-6 mb-8">
        <div className="flex items-center justify-center gap-2 mb-3 text-[#25D366]">
          {WHATSAPP_ICON}
          <span className="text-sm font-bold uppercase tracking-widest">Groupe d&apos;évaluation</span>
        </div>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed">
          Rejoignez dès maintenant le groupe WhatsApp officiel pour suivre votre candidature et participer aux tests d&apos;évaluation.
        </p>
        <a
          href={WA_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#22c55e] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
        >
          Rejoindre le groupe <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3">
        Retour à l&apos;accueil <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}

export function RecruitmentForm() {
  const [form, setForm] = useState<CandidateInput>(EMPTY)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [pending, startTransition] = useTransition()

  const update = (name: keyof CandidateInput, value: string) =>
    setForm((f) => ({ ...f, [name]: value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const res = await submitCandidature(form)
      if (res.ok) {
        setDone(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setError(res.error)
      }
    })
  }

  if (done) return <Confirmation />

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-card/70 p-6 backdrop-blur-md"
    >
      {/* Honeypot */}
      <input name="website" type="text" value={form.website} onChange={e => update('website', e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className={field.half === false || (!field.half && !field.textarea) ? 'sm:col-span-2' : field.textarea ? 'sm:col-span-2' : ''}>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              {field.label} {field.required && <span className="text-primary">*</span>}
            </label>
            {field.textarea ? (
              <textarea
                required={field.required}
                value={form[field.name]}
                onChange={e => update(field.name, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="w-full rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/20 resize-none"
              />
            ) : (
              <input
                type={field.type || 'text'}
                required={field.required}
                value={form[field.name]}
                onChange={e => update(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition focus:border-primary/40 focus:ring-1 focus:ring-primary/20"
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3">
          <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-sm bg-primary py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/85 hover:shadow-[0_0_24px_rgba(220,38,38,0.4)] disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Soumettre ma candidature'}
      </button>
    </form>
  )
}
