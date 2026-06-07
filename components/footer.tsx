import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/site-config'

const GITHUB_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const WHATSAPP_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#05050a]">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative h-8 w-8 overflow-hidden border border-primary/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={SITE.logo} alt="SANTANA FAMILY" className="h-full w-full object-cover" />
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
                <Link key={link.href} href={link.href} className="text-sm text-gray-500 transition-colors hover:text-gray-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-600">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${SITE.contactEmail}`} className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-300">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                {SITE.contactEmail}
              </a>
              <a href={SITE.testGroupUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-300">
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                Groupe WhatsApp officiel
              </a>
            </div>
            <Link href="/recrutement" className="mt-5 inline-block rounded-sm bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-primary/85">
              Postuler
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            © {year} SANTANA FAMILY — Tous droits réservés.
          </p>

          {/* Developer signature */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-widest text-gray-700 font-mono select-none">
              𝐒𝚫𝐍𝐓𝚫𝐍𝚫 𝐋𝚵𝚫𝐃 𝚻𝚵𝐂𝚮 𝚸𝚪𝚰𝚳𝚵𝚵𝚵𝚵𝚵𝚵
            </span>
            <a href="https://github.com/Med12-q" target="_blank" rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-white" aria-label="GitHub">
              {GITHUB_ICON}
            </a>
            <a href="https://whatsapp.com/channel/0029Vb83R524SpkBdSM6Ob2F" target="_blank" rel="noopener noreferrer"
              className="text-gray-600 transition-colors hover:text-[#25D366]" aria-label="WhatsApp Channel">
              {WHATSAPP_ICON}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
