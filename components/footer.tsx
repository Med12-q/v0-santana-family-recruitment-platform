import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS, SITE } from '@/lib/site-config'
import { Mail, ExternalLink, Shield } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-primary/20 bg-background/70 backdrop-blur-md">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand block */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/50 box-glow transition-all group-hover:border-primary/80">
                <Image src={SITE.logo} alt="Logo SANTANA FAMILY" fill className="object-cover" />
              </span>
              <span className="font-heading text-base font-black tracking-widest text-foreground">
                SANTANA<span className="text-primary text-glow"> FAMILY</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">{SITE.nickname}</p>
            <p className="mt-3 max-w-xs text-sm italic text-primary/75 leading-relaxed">
              &ldquo;{SITE.slogan}&rdquo;
            </p>

            {/* Trust badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs text-muted-foreground/70">
              <Shield className="h-3 w-3 text-primary/60" />
              Recrutement officiel &amp; sécurisé
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-xs font-semibold tracking-[0.3em] text-foreground uppercase">Navigation</h4>
            <ul className="mt-5 flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="h-px w-4 bg-primary/0 transition-all group-hover:w-6 group-hover:bg-primary/60" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xs font-semibold tracking-[0.3em] text-foreground uppercase">Contact</h4>
            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">E-mail officiel</p>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="mt-1.5 flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {SITE.contactEmail}
                </a>
              </div>
              <div>
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">Groupe de test</p>
                <a
                  href={SITE.testGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Après candidature
                </a>
              </div>
              <div className="pt-1">
                <Link
                  href="/administration"
                  className="text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground/70"
                >
                  Administration →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground/50 sm:flex-row">
          <span>© {year} SANTANA FAMILY — Les Démons de la Terreur. Tous droits réservés.</span>
          <div className="flex items-center gap-4">
            <Link href="/reglement" className="hover:text-muted-foreground/80 transition-colors">Règlement</Link>
            <Link href="/recrutement" className="hover:text-muted-foreground/80 transition-colors">Recrutement</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
