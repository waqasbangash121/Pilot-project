import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const helpfulLinks = [
  {
    title: "Explore Apps",
    description: "Compare Hyper AI Search, AI Chat, and Shoppable Videos.",
    href: "/apps",
  },
  {
    title: "Read Resources",
    description: "Browse guides for Shopify growth, conversion, and AI commerce.",
    href: "/resources",
  },
  {
    title: "Contact Support",
    description: "Tell us what you were looking for and we will help you find it.",
    href: "/contact",
  },
];

const digitStyle = {
  display: "inline-block",
  animation: "hyper-not-found-jump 1.05s cubic-bezier(0.34, 1.56, 0.64, 1) infinite",
  transformOrigin: "center bottom",
  willChange: "transform",
} satisfies CSSProperties;

export default function NotFound() {
  return (
    <Section className="pb-20 pt-20 sm:pt-28 lg:pt-32">
      <Container className="max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <style>{`
            @keyframes hyper-not-found-jump {
              0%,
              100% {
                transform: translateY(0) scaleX(1);
              }

              18% {
                transform: translateY(-1.35rem) scaleX(0.98);
              }

              32% {
                transform: translateY(0) scaleX(1.06);
              }

              44% {
                transform: translateY(-0.5rem) scaleX(0.99);
              }

              58% {
                transform: translateY(0) scaleX(1);
              }
            }
          `}</style>

          <div
            aria-label="404"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(0.35rem, 1vw, 0.75rem)",
              color: "hsl(var(--primary))",
              fontSize: "clamp(5rem, 13vw, 10rem)",
              fontWeight: 750,
              lineHeight: 0.9,
              letterSpacing: 0,
            }}
          >
            <span style={digitStyle}>4</span>
            <span style={{ ...digitStyle, animationDelay: "120ms" }}>0</span>
            <span style={{ ...digitStyle, animationDelay: "240ms" }}>4</span>
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            This page is outside the Hyper index.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            The page may have moved, the URL may be mistyped, or the content is no longer
            available. Use search or jump back into the main Shopify AI commerce pages.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/search">
                <Search className="h-4 w-4" />
                Search the Site
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {helpfulLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg border border-border bg-surface p-5 transition-colors hover:border-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
