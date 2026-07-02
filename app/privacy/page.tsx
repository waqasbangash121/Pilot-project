import Link from "next/link";
import { Database, LockKeyhole, Mail, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Hyper apps collects, uses, stores, and protects information when you use our website and Shopify applications.",
  path: "/privacy",
});

const collectedInfo = [
  "Contact information such as name, email address, and company information.",
  "Shopify store information including store URL, plan details, installed applications, and configuration settings.",
  "Usage data such as feature interactions, analytics events, performance metrics, and diagnostic information.",
  "Technical information including browser type, device information, IP address, and operating system.",
  "Customer-facing data processed through our applications when required to provide app functionality.",
];

const informationUses = [
  "Provide, maintain, and improve our products and services.",
  "Deliver app functionality and merchant-requested features.",
  "Provide customer support and technical assistance.",
  "Monitor application performance and reliability.",
  "Prevent fraud, abuse, unauthorized access, and misuse.",
  "Communicate important updates, service notices, and support information.",
  "Comply with legal obligations and Shopify platform requirements.",
];

const sharingRules = [
  "Trusted service providers that help operate our business.",
  "Infrastructure, hosting, analytics, and support providers.",
  "Legal authorities when required by law or regulation.",
  "Successors in connection with a merger, acquisition, or business transfer.",
];

export default function PrivacyPage() {
  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -left-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Data policy
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Last updated: June 2026
                </p>
                <h1 className="mt-3 max-w-4xl type-display">Privacy Policy</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Hyper values your privacy. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard information when you visit our website, use our Shopify
                  applications, or interact with our services.
                </p>
              </div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <ShieldCheck aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">0</p>
                <p className="mt-1 text-sm font-semibold text-foreground">data sold</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  We do not sell merchant data or customer information.
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
                Privacy focus
              </p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
                <p>We collect information needed to provide, secure, and improve Hyper services.</p>
                <p>Our applications access Shopify store data only as necessary for requested functionality.</p>
              </div>
            </aside>

            <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="space-y-9 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Information We Collect
                  </h2>
                  <p className="mt-3">
                    We may collect information from merchants, store administrators, website
                    visitors, and customers as necessary to provide our services.
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {collectedInfo.map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6">
                        <Database aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    How We Use Information
                  </h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {informationUses.map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Shopify Platform Data
                  </h2>
                  <p className="mt-3">
                    Our applications access Shopify store data only as necessary to provide requested
                    functionality. The specific information accessed depends on the permissions
                    granted during app installation.
                  </p>
                  <p className="mt-3">
                    We do not sell merchant data or customer information. Data is processed solely
                    for providing and improving our services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Analytics and Cookies
                  </h2>
                  <p className="mt-3">
                    We may use cookies, analytics tools, and similar technologies to understand
                    website usage, improve user experience, measure performance, and maintain
                    security. You may control cookie preferences through your browser settings.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Data Sharing
                  </h2>
                  <p className="mt-3">We do not sell personal information. We may share information only with:</p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {sharingRules.map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6">
                        <UserCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Data Retention
                  </h2>
                  <p className="mt-3">
                    We retain information only for as long as necessary to provide services, comply
                    with legal obligations, resolve disputes, and enforce agreements. Upon app
                    uninstallation or account closure, data may be deleted or anonymized according to
                    operational and legal requirements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">Security</h2>
                  <p className="mt-3">
                    We implement reasonable administrative, technical, and organizational safeguards
                    designed to protect information against unauthorized access, disclosure,
                    alteration, or destruction. No method of electronic transmission or storage can
                    be guaranteed to be completely secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Your Privacy Rights
                  </h2>
                  <p className="mt-3">
                    Depending on your location, you may have rights to access, correct, delete,
                    restrict, or export your personal information. To exercise these rights, please
                    contact us using the information below.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Changes to This Policy
                  </h2>
                  <p className="mt-3">
                    We may update this Privacy Policy from time to time. Updates will be posted on
                    this page with a revised effective date.
                  </p>
                </section>
              </div>
            </article>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <LockKeyhole aria-hidden="true" className="size-4 text-primary" />
                  Questions about privacy?
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Contact us regarding this Privacy Policy or our data practices.
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