import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteShell } from "@/components/layout/site-shell";
import { defaultMetadata, defaultViewport } from "@/config/metadata";
import { createOrganizationSchema, createWebsiteSchema } from "@/schemas";
import GoogleAnalytics from "@/app/GoogleAnalytics";

import "./globals.css";

const themeInitScript = `
try {
  var savedTheme = window.localStorage.getItem("hyper-theme");
  var theme = savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
} catch (error) {}
`;

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-hyper-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-hyper-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = defaultViewport;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* ✅ Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZC5XNC1VDY"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
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

      <body className="bg-background font-sans text-foreground">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />

        <GoogleAnalytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createOrganizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createWebsiteSchema()),
          }}
        />

        <SiteShell>{children}</SiteShell>

        {/* Vercel Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
