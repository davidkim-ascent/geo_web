import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { defaultSiteMetadata, metadataBase } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase,
  title: defaultSiteMetadata.title,
  description: defaultSiteMetadata.description,
  openGraph: {
    title: defaultSiteMetadata.title,
    description: defaultSiteMetadata.description,
    type: "website",
    siteName: defaultSiteMetadata.siteName,
    locale: "ja_JP",
    images: [
      {
        url: defaultSiteMetadata.ogImage,
        width: defaultSiteMetadata.ogImageWidth,
        height: defaultSiteMetadata.ogImageHeight,
        alt: defaultSiteMetadata.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSiteMetadata.title,
    description: defaultSiteMetadata.description,
    images: [defaultSiteMetadata.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/pretendard-jp/1.3.9/variable/pretendardvariable-jp.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        <Header />
        <main className="flex-1 pt-14">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
