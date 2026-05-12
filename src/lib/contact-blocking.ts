function normalizeDomain(value: string) {
  return value.trim().toLowerCase().replace(/\.+$/g, '')
}

function extractEmailDomain(email: string) {
  const trimmed = email.trim().toLowerCase()
  const atIndex = trimmed.lastIndexOf('@')
  if (atIndex === -1) return ''
  return normalizeDomain(trimmed.slice(atIndex + 1))
}

export function isBlockedEmailDomain(email: string, blockedDomains: string[]) {
  const domain = extractEmailDomain(email)
  if (!domain) return false

  return blockedDomains
    .map(normalizeDomain)
    .filter(Boolean)
    .some((blockedDomain) => domain === blockedDomain || domain.endsWith(`.${blockedDomain}`))
}
