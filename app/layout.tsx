import type { ReactNode } from "react";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteShell } from "@/components/layout/site-shell";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZC5XNC1VDY"
          strategy="lazyOnload"
        />

        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());
            gtag('config', 'G-ZC5XNC1VDY', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>

      <body>
        <SiteShell footer={<SiteFooter />}>{children}</SiteShell>

        <GoogleAnalytics />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
