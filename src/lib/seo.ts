import type { Metadata } from "next";

const SITE_NAME = "Ascent GEO";
const DEFAULT_TITLE = "GEO・AIO・LLMOによるAI検索最適化 | Ascent GEO";
const DEFAULT_DESCRIPTION =
  "GEO・AIO・LLMOによるAI検索最適化を支援。特許分析と検索データに基づく戦略設計から、AI検索でのブランドプレゼンスを継続的に可視化・改善するモニタリングツール「GEO Watcher」まで、株式会社 Ascent Networksが提供します。";
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
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  keywords,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
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

type ArticleJsonLdOptions = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
};

export function buildArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
}: ArticleJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteUrl}${path}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: "株式会社 Ascent Networks",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${DEFAULT_OG_IMAGE}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${path}`,
    },
  };
}

type FaqJsonLdItem = { q: string; a: string };

export function buildFaqJsonLd(items: FaqJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

type BreadcrumbJsonLdItem = { name: string; path: string };

export function buildBreadcrumbJsonLd(items: BreadcrumbJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
