import type { Metadata } from "next";
import { DeniedAccess } from "@/components/access/DeniedAccess";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "不正なアクセス — Ascent GEO",
  description: "Ascent GEO サービス紹介資料へのアクセスに失敗しました。",
  path: "/whitepaper/denied",
  noIndex: true,
});

export default function WhitepaperDeniedPage() {
  return <DeniedAccess backHref="/whitepaper" backLabel="白書ページへ戻る" />;
}
