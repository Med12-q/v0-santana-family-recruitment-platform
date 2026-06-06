import Link from 'next/link'
import { NAV_LINKS, SITE } from '@/lib/site-config'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-primary/20 bg-background/60 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-lg font-bold tracking-widest text-foreground">
            SANTANA<span className="text-primary text-glow"> FAMILY</span>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">{SITE.nickname}</p>
          <p className="mt-4 max-w-xs text-sm italic text-primary/80">&ldquo;{SITE.slogan}&rdquo;</p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold tracking-wider text-foreground">NAVIGATION</h4>
          <ul className="mt-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold tracking-wider text-foreground">CONTACT</h4>
          <p className="mt-4 text-sm text-muted-foreground">
            Recrutement officiel uniquement via la plateforme.
          </p>
          <p className="mt-2 text-sm text-primary">{SITE.contactEmail}</p>
          <Link
            href="/administration"
            className="mt-4 inline-block text-xs text-muted-foreground/60 transition-colors hover:text-primary"
          >
            Administration
          </Link>
        </div>
      </div>

      <div className="border-t border-primary/10 py-6 text-center text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} SANTANA FAMILY — Les Démons de la Terreur. Tous droits réservés.
      </div>
    </footer>
  )
}
