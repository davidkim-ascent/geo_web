import type { Metadata } from "next";

const SITE_NAME = "Ascent GEO";
const DEFAULT_TITLE = "GEO — Ascent";
const DEFAULT_DESCRIPTION =
  "推測ではなく、データと特許に基づくAI検索時代のブランド戦略。";
const DEFAULT_OG_IMAGE = "/ascent-geo-logo-split.png";
const DEFAULT_OG_IMAGE_WIDTH = 3317;
const DEFAULT_OG_IMAGE_HEIGHT = 552;

function getSiteUrl() {
  const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (publicSiteUrl) {
    return publicSiteUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export const siteUrl = getSiteUrl();
export const metadataBase = new URL(siteUrl);

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "ja_JP",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export const defaultSiteMetadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  siteName: SITE_NAME,
  ogImage: DEFAULT_OG_IMAGE,
  ogImageWidth: DEFAULT_OG_IMAGE_WIDTH,
  ogImageHeight: DEFAULT_OG_IMAGE_HEIGHT,
} as const;
