// Simple in-memory rate limiter (per-process). Good enough for anti-spam / bot protection
// on a single deployment. For multi-region scale, swap for Upstash Redis.
type Bucket = { count: number; reset: number }
const buckets = new Map<string, Bucket>()

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || now > bucket.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }

  if (bucket.count >= limit) {
    return { success: false, remaining: 0, retryAfter: bucket.reset - now }
  }

  bucket.count += 1
  return { success: true, remaining: limit - bucket.count }
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  )
}
