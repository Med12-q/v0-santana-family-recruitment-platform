'use client'

import { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'
import { SantanaChat } from './santana-chat'
import { cn } from '@/lib/utils'

export function FloatingChat() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ouvrir SANTANA AI"
        className={cn(
          'fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 box-glow-strong animate-pulse-border',
        )}
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-primary/40 bg-background/95 backdrop-blur-xl box-glow-strong">
          <div className="flex items-center justify-between border-b border-primary/20 bg-card/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="font-heading text-sm font-bold tracking-widest text-foreground">
                SANTANA <span className="text-primary">AI</span>
              </span>
            </div>
            <span className="text-xs text-muted-foreground">En ligne 24h/24</span>
          </div>
          <SantanaChat className="flex-1" />
        </div>
      )}
    </>
  )
}
