import Link from 'next/link'
import Image from 'next/image'
import { Mail, ExternalLink } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/site-config'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#05050a]">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/40">
                <Image src={SITE.logo} alt="SANTANA FAMILY" fill className="object-cover" sizes="36px" />
              </div>
              <span className="font-heading text-sm font-black tracking-[0.15em] text-white">
                SANTANA<span className="text-primary"> FAMILY</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">{SITE.nickname}</p>
            <p className="mt-3 max-w-xs text-sm italic text-gray-600 leading-relaxed">
              &ldquo;{SITE.slogan}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-xs font-medium text-green-400">Recrutement ouvert</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Navigation</p>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 transition-colors hover:text-gray-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Contact</p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-300"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {SITE.contactEmail}
              </a>
              <a
                href={SITE.testGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-300"
              >
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                Groupe d&apos;évaluation
              </a>
            </div>
            <Link
              href="/recrutement"
              className="mt-5 inline-block rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-primary/85"
            >
              Postuler
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            © {year} SANTANA FAMILY — Tous droits réservés.
          </p>
          <p className="text-xs text-gray-700">
            Plateforme officielle de recrutement
          </p>
        </div>
      </div>
    </footer>
  )
}
