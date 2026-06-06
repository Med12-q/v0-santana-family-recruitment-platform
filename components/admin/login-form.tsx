'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2, AlertCircle, ShieldCheck } from 'lucide-react'
import { adminLogin } from '@/app/actions/admin'

export function AdminLoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    startTransition(async () => {
      const res = await adminLogin(password)
      if (res.ok) {
        router.push('/administration/dashboard')
        router.refresh()
      } else {
        setError(res.error || 'Erreur.')
      }
    })
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative z-10 w-full max-w-md rounded-2xl border border-primary/40 bg-card/80 p-8 backdrop-blur-xl box-glow-strong"
    >
      <div className="mb-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/50 bg-primary/10 box-glow">
          <ShieldCheck className="h-7 w-7 text-primary" />
        </span>
        <h1 className="mt-4 font-heading text-2xl font-bold tracking-widest text-foreground">
          ADMINISTRATION
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Accès réservé au commandement</p>
      </div>

      <label className="mb-1.5 block font-heading text-xs tracking-wider text-foreground">
        Mot de passe
      </label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          placeholder="••••••••"
          className="w-full rounded-md border border-primary/30 bg-input py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-colors focus:border-primary"
        />
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-heading text-sm font-bold tracking-widest text-primary-foreground transition-all hover:bg-primary/80 disabled:opacity-60 box-glow"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
        {pending ? 'CONNEXION…' : 'SE CONNECTER'}
      </button>
    </form>
  )
}
