"use client";

import { COMPLETION_COOKIE_MAX_AGE, CONTACT_THANKS_COOKIE, WHITEPAPER_DOWNLOADED_COOKIE } from "./completion-access";

type CookieName = typeof CONTACT_THANKS_COOKIE | typeof WHITEPAPER_DOWNLOADED_COOKIE;

export function setCompletionAccessCookie(name: CookieName) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=1; Path=/; Max-Age=${COMPLETION_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

