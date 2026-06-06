'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE } from '@/lib/site-config'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-primary/20 bg-background/90 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'border-primary/10 bg-background/70 backdrop-blur-md',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-primary/50 box-glow transition-all duration-300 group-hover:border-primary/80 group-hover:box-glow-strong">
            <Image src={SITE.logo} alt="Logo SANTANA FAMILY" fill className="object-cover" />
          </span>
          <span className="font-heading text-sm font-black tracking-widest text-foreground sm:text-base">
            SANTANA<span className="text-primary text-glow"> FAMILY</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative rounded-md px-3 py-2 font-heading text-xs tracking-widest font-medium transition-all duration-200 uppercase',
                    active
                      ? 'text-primary text-glow'
                      : 'text-muted-foreground hover:text-foreground hover:bg-primary/5',
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-2 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center lg:flex">
          <Link
            href="/recrutement"
            className="rounded-md border border-primary/50 bg-primary/10 px-5 py-2 font-heading text-xs font-bold tracking-widest text-primary transition-all hover:bg-primary/20 hover:border-primary/80 hover:text-glow"
          >
            POSTULER
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/30 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-primary/20 bg-background/95 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col px-4 py-4 gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-4 py-3 font-heading text-sm tracking-widest font-medium uppercase transition-all',
                      active
                        ? 'bg-primary/15 text-primary text-glow border border-primary/30'
                        : 'text-muted-foreground hover:bg-primary/8 hover:text-foreground',
                    )}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="mt-2 border-t border-primary/10 pt-3">
              <Link
                href="/recrutement"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-heading text-sm font-bold tracking-widest text-primary-foreground box-glow"
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
