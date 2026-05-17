export const CONTACT_THANKS_COOKIE = "ascent_contact_thanks";
export const WHITEPAPER_DOWNLOADED_COOKIE = "ascent_whitepaper_downloaded";

export const COMPLETION_COOKIE_MAX_AGE = 10 * 60;

export function hasCompletionAccess(cookieValue: string | undefined): boolean {
  return cookieValue === "1";
}

