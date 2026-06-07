import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { SANTANA_KNOWLEDGE } from '@/lib/santana-knowledge'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'edge'

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    console.error('[CHAT] OPENAI_API_KEY manquant. Ajoutez-le dans les variables Vercel.')
    return new Response(
      JSON.stringify({ error: 'Service IA temporairement indisponible. Réessayez plus tard.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    )
  }

  const ip = getClientIp(req.headers)
  const limited = rateLimit(`ai:${ip}`, 30, 60_000)
  if (!limited.success) {
    return new Response('Trop de requêtes. Patiente un instant.', { status: 429 })
  }

  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: SANTANA_KNOWLEDGE,
      messages: await convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (err) {
    console.error('[CHAT] Erreur:', err)
    return new Response('Une erreur est survenue.', { status: 500 })
  }
}
