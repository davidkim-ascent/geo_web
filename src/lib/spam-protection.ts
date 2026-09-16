export const MIN_SUBMISSION_SECONDS = 4

type SubmissionInput = {
  honeypot: string
  formRenderedAt: number
}

export function isSpamSubmission(input: SubmissionInput, now: number = Date.now()): boolean {
  if (input.honeypot) return true

  if (!Number.isFinite(input.formRenderedAt)) return true

  const elapsedSeconds = (now - input.formRenderedAt) / 1000
  if (elapsedSeconds < MIN_SUBMISSION_SECONDS) return true

  return false
}
