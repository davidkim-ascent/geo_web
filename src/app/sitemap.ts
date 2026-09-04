import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { LAB_ARTICLES } from "@/lib/lab-articles";

type StaticPage = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: string;
};

const STATIC_PAGES: StaticPage[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/watcher", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/shindan", changeFrequency: "monthly", priority: 0.7 },
  { path: "/framework", changeFrequency: "monthly", priority: 0.7 },
  { path: "/why-ascent", changeFrequency: "monthly", priority: 0.7 },
  { path: "/whitepaper", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-05-22" },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/lab", changeFrequency: "weekly", priority: 0.9 },
];

function toDate(dateStr: string | undefined, fallback: Date): Date {
  if (!dateStr) return fallback;
  // LAB_ARTICLES uses "YYYY.MM.DD"; STATIC_PAGES override uses "YYYY-MM-DD"
  const normalized = dateStr.includes(".") ? dateStr.replace(/\./g, "-") : dateStr;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: `${siteUrl}${page.path}`,
    lastModified: toDate(page.lastModified, now),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const articleEntries: MetadataRoute.Sitemap = LAB_ARTICLES.map((article) => ({
    url: `${siteUrl}${article.href}`,
    lastModified: toDate(article.date, now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries];
}
