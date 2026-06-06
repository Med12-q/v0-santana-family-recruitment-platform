'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE } from '@/lib/site-config'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-primary/50 box-glow">
            <Image src={SITE.logo} alt="Logo SANTANA FAMILY" fill className="object-cover" />
          </span>
          <span className="font-heading text-sm font-bold tracking-widest text-foreground sm:text-base">
            SANTANA<span className="text-primary text-glow"> FAMILY</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative rounded-md px-3 py-2 text-sm font-medium tracking-wide transition-colors',
                    active
                      ? 'text-primary text-glow'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/recrutement"
            className="rounded-md border border-primary bg-primary/10 px-4 py-2 text-sm font-semibold tracking-wide text-primary transition-all hover:bg-primary hover:text-primary-foreground box-glow"
          >
            POSTULER
          </Link>
        </div>

        <button
          className="text-foreground lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-primary/20 bg-background/95 px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-3 text-base font-medium tracking-wide transition-colors',
                      active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="mt-2">
              <Link
                href="/recrutement"
                onClick={() => setOpen(false)}
                className="block rounded-md border border-primary bg-primary/10 px-3 py-3 text-center text-base font-semibold text-primary"
              >
                POSTULER MAINTENANT
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
