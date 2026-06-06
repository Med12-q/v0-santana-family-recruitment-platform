import { streamText, convertToModelMessages, type UIMessage } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { SANTANA_KNOWLEDGE } from '@/lib/santana-knowledge'
import { rateLimit, getClientIp } from '@/lib/rate-limit'

export const runtime = 'edge'

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const ip = getClientIp(req.headers)
  const limited = rateLimit(`ai:${ip}`, 30, 60_000)
  if (!limited.success) {
    return new Response('Trop de requêtes. Patiente un instant.', { status: 429 })
  }

  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: SANTANA_KNOWLEDGE,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
