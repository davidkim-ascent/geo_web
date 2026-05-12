const WEBSITE_UNAVAILABLE_TEXT = '準備中'

function hasValidHostname(hostname: string) {
  if (!hostname.includes('.')) return false

  return hostname
    .split('.')
    .every((segment) => /^[a-z0-9-]+$/i.test(segment) && !segment.startsWith('-') && !segment.endsWith('-'))
}

export function isValidWebsiteValue(value: string) {
  const trimmed = value.trim()

  if (!trimmed) return false
  if (trimmed.includes(WEBSITE_UNAVAILABLE_TEXT)) return true

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    const parsed = new URL(withProtocol)
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && hasValidHostname(parsed.hostname)
  } catch {
    return false
  }
}

export const WEBSITE_UNAVAILABLE_COPY = WEBSITE_UNAVAILABLE_TEXT
