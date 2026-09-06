import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { defaultSiteMetadata, metadataBase } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase,
  verification: {
    google: "Wm0sd3vJQWjXYU5zF0dvdo9Hp8QpfJoa8vGMEOYqglA",
  },
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
        <Script id="gtm-script" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P7QHGQVS');`}
        </Script>
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ydwlnvqg9h");`}
        </Script>
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P7QHGQVS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
