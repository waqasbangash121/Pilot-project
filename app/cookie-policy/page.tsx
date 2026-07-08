import Link from "next/link";
import { Cookie, Mail, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Learn how Hyper uses cookies, analytics, and similar technologies across our website and services.",
  path: "/cookie-policy",
});

const cookieTypes = [
  {
    title: "Essential Cookies",
    description:
      "These cookies are necessary for the website to function properly and cannot be disabled in our systems.",
  },
  {
    title: "Analytics Cookies",
    description:
      "These cookies help us understand page views, content engagement, and link clicks so we can improve performance and usability.",
  },
  {
    title: "Functional Cookies",
    description:
      "These cookies remember preferences and provide enhanced functionality and personalization.",
  },
  {
    title: "Marketing Cookies",
    description:
      "These cookies may be used to measure advertising performance and improve marketing campaigns.",
  },
];

const uses = [
  "Maintain website functionality and performance.",
  "Remember user preferences and settings.",
  "Analyze traffic and visitor behavior.",
  "Measure article, comparison, resource, case study, and tool engagement.",
  "Measure marketing and campaign effectiveness.",
  "Detect security threats and prevent abuse.",
  "Improve user experience and site performance.",
];

export default function CookiePolicyPage() {
  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Website policy
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Last updated: July 2026
                </p>
                <h1 className="mt-3 max-w-4xl type-display">Cookie Policy</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  This Cookie Policy explains how Hyper uses cookies and similar technologies when
                  you visit our website, use our Shopify applications, or interact with our services.
                </p>
              </div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <Cookie aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">4</p>
                <p className="mt-1 text-sm font-semibold text-foreground">cookie categories</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Essential, analytics, functional, and marketing technologies.
                </p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside className="h-fit rounded-3xl border border-border bg-surface p-5 shadow-sm lg:sticky lg:top-24">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                At a glance
              </p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
                <p>Cookies help operate, secure, analyze, and improve Hyper services.</p>
                <p>You can control cookies through your browser settings.</p>
              </div>
            </aside>

            <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="space-y-9 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    What Are Cookies?
                  </h2>
                  <p className="mt-3">
                    Cookies are small text files stored on your device when you visit a website.
                    They help websites remember information about your visit, improve functionality,
                    analyze usage, and provide a better user experience.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    How We Use Cookies
                  </h2>
                  <p className="mt-3">
                    We use cookies and similar technologies to operate, secure, improve, and analyze
                    our website and services.
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {uses.map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Types of Cookies We Use
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {cookieTypes.map((type) => (
                      <div key={type.title} className="rounded-2xl border border-border bg-background p-4">
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                          {type.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    First-Party Content Analytics
                  </h2>
                  <p className="mt-3">
                    We use first-party analytics cookies named <code>hyper_content_visitor_id</code>
                    and <code>hyper_content_session_id</code> to count anonymous views and link
                    clicks on articles, comparisons, resources, case studies, and tool pages. These
                    cookies help us understand which content is useful without storing names, email
                    addresses, or IP addresses in the content analytics events.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Third-Party Services
                  </h2>
                  <p className="mt-3">
                    We may use trusted third-party services for analytics, performance monitoring,
                    customer support, and marketing. These providers may set cookies or similar
                    technologies according to their own privacy policies.
                  </p>
                  <p className="mt-3">
                    Examples may include analytics platforms, hosting providers, customer support
                    tools, and advertising partners.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Managing Cookies
                  </h2>
                  <p className="mt-3">
                    Most web browsers allow you to control cookies through browser settings. You may
                    choose to block, delete, or limit cookies. Disabling certain cookies may affect
                    website functionality and user experience.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Do Not Track Signals
                  </h2>
                  <p className="mt-3">
                    Some browsers offer a &quot;Do Not Track&quot; feature. Because there is
                    currently no universal standard for responding to these signals, our website may
                    not respond to all Do Not Track requests.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Changes to This Policy
                  </h2>
                  <p className="mt-3">
                    We may update this Cookie Policy from time to time. Any changes will be posted
                    on this page with an updated revision date.
                  </p>
                </section>
              </div>
            </article>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <ShieldCheck aria-hidden="true" className="size-4 text-primary" />
                  Questions about cookies?
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Contact us if you have questions about this Cookie Policy.
                </p>
              </div>
              <Link href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground">
                <Mail aria-hidden="true" className="size-4" />
                {siteConfig.email}
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

