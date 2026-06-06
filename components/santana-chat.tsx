'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQ_SUGGESTIONS } from '@/lib/site-config'

function getText(msg: { parts?: { type: string; text?: string }[] }): string {
  if (!msg.parts) return ''
  return msg.parts
    .filter((p) => p.type === 'text')
    .map((p) => p.text)
    .join('')
}

export function SantanaChat({ className }: { className?: string }) {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const busy = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  const submit = (text: string) => {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value })
    setInput('')
  }

  return (
    <div className={cn('flex h-full flex-col', className)}>
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="rounded-xl border border-primary/30 bg-card/60 p-4 text-sm text-muted-foreground">
              Je suis <span className="font-semibold text-primary">SANTANA AI</span>. Posez-moi vos
              questions sur la famille, les grades, le règlement ou le recrutement.
            </div>
            <div className="flex flex-wrap gap-2">
              {FAQ_SUGGESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => submit(q)}
                  className="rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/15"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-primary/25 bg-card/80 text-card-foreground',
              )}
            >
              {getText(m) || (m.role === 'assistant' && busy ? '…' : '')}
            </div>
          </div>
        ))}

        {busy && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl border border-primary/25 bg-card/80 px-4 py-2.5 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" /> SANTANA AI réfléchit…
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(input)
        }}
        className="flex items-center gap-2 border-t border-primary/20 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez votre message…"
          className="flex-1 rounded-full border border-primary/30 bg-input px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40 box-glow"
          aria-label="Envoyer"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  )
}
