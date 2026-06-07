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
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/[0.06] bg-[#05050a]/95 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-primary/40 shadow-[0_0_12px_rgba(220,38,38,0.2)]">
            <Image src={SITE.logo} alt="SANTANA FAMILY" fill className="object-cover" sizes="32px" />
          </div>
          <span className="font-heading text-sm font-black tracking-[0.15em] text-white">
            SANTANA<span className="text-primary"> FAMILY</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300',
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/recrutement"
            className="rounded-sm bg-primary px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-primary/85"
          >
            Postuler
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-white md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/[0.06] bg-[#05050a] px-4 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-sm px-3 py-2.5 text-sm font-medium transition-colors',
                  pathname === link.href ? 'text-white' : 'text-gray-500',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/recrutement"
            onClick={() => setOpen(false)}
            className="mt-4 block w-full rounded-sm bg-primary py-3 text-center text-xs font-semibold uppercase tracking-widest text-white"
          >
            Postuler
          </Link>
        </div>
      )}
    </header>
  )
}
