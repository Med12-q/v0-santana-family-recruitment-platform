'use client'

import { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { submitCandidature, type CandidateInput } from '@/app/actions/candidatures'
import { SITE } from '@/lib/site-config'

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
  { name: 'yearsActive', label: "Nombre d'années d'activité", half: true, placeholder: 'Ex: 3 ans' },
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
      className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-card/70 p-6 backdrop-blur-md box-glow sm:p-10"
    >
      {/* Honeypot field — hidden from humans */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => update('website', e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className={field.half && !field.textarea ? '' : 'sm:col-span-2'}>
            <label className="mb-1.5 block font-heading text-xs tracking-wider text-foreground">
              {field.label}
              {field.required && <span className="text-primary"> *</span>}
            </label>
            {field.textarea ? (
              <textarea
                value={form[field.name]}
                onChange={(e) => update(field.name, e.target.value)}
                required={field.required}
                placeholder={field.placeholder}
                rows={3}
                className="w-full resize-none rounded-md border border-primary/30 bg-input px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
              />
            ) : (
              <input
                type={field.type || 'text'}
                value={form[field.name]}
                onChange={(e) => update(field.name, e.target.value)}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full rounded-md border border-primary/30 bg-input px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary"
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-6 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 font-heading text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/80 disabled:opacity-60 box-glow"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> ENVOI EN COURS…
          </>
        ) : (
          <>
            SOUMETTRE MA CANDIDATURE
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-muted-foreground/60">
        Vos données sont traitées de manière confidentielle et sécurisée.
      </p>
    </form>
  )
}

function Confirmation() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-primary/40 bg-card/80 p-8 text-center backdrop-blur-md box-glow-strong sm:p-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/10 box-glow"
        >
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </motion.div>

        <h2 className="mt-6 font-heading text-2xl font-bold tracking-wider text-foreground sm:text-3xl">
          Candidature enregistrée
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Votre candidature a été enregistrée avec succès. Vous devez maintenant rejoindre le groupe
          d&apos;évaluation afin de démontrer votre niveau actuel.
        </p>

        <div className="mt-6 rounded-xl border border-primary/20 bg-background/40 p-5 text-left text-sm text-muted-foreground">
          <p className="font-heading text-xs tracking-wider text-primary">PROCHAINE ÉTAPE</p>
          <p className="mt-2">
            Rejoignez le groupe de test. Après évaluation, les chefs analyseront votre niveau. Si vous
            convainquez un chef, celui-ci vous transmettra le lien du QG principal.
          </p>
        </div>

        <a
          href={SITE.testGroupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-heading text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/80 box-glow"
        >
          REJOINDRE LE GROUPE DE TEST
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>

        <div className="mt-6">
          <Link href="/" className="text-sm text-muted-foreground/70 transition-colors hover:text-primary">
            Retour à l&apos;accueil
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
