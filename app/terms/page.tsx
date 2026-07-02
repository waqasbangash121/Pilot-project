import Link from "next/link";
import { FileText, Mail, Scale, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Read Hyper apps terms of service governing the use of our website, Shopify applications, and related services.",
  path: "/terms",
});

const responsibilities = [
  "Maintain accurate account and store information.",
  "Protect account credentials and store access permissions.",
  "Ensure all activities conducted through your account comply with applicable laws and Shopify policies.",
  "Promptly notify us of unauthorized access or security concerns.",
];

const acceptableUse = [
  "Use our services for unlawful, fraudulent, or abusive purposes.",
  "Attempt to interfere with service operation or security.",
  "Reverse engineer, copy, or exploit our software beyond permitted use.",
  "Violate intellectual property rights or third-party rights.",
  "Upload malicious code, malware, or harmful content.",
];

export default function TermsPage() {
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
                  Service terms
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                  Last updated: June 2026
                </p>
                <h1 className="mt-3 max-w-4xl type-display">Terms of Service</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  These Terms of Service govern your access to and use of Hyper&apos;s website,
                  Shopify applications, products, and related services. By accessing or using our
                  services, you agree to these terms.
                </p>
              </div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <Scale aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">12</p>
                <p className="mt-1 text-sm font-semibold text-foreground">months liability basis</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Terms include use, billing, ownership, data, availability, and termination.
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
                Agreement scope
              </p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
                <p>These terms apply to Hyper websites, Shopify applications, products, and related services.</p>
                <p>Use of our services is also governed by our Privacy Policy.</p>
              </div>
            </aside>

            <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="space-y-9 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Acceptance of Terms
                  </h2>
                  <p className="mt-3">
                    By installing, accessing, or using any Hyper service, you agree to comply with
                    these Terms of Service and all applicable laws and regulations.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">Services</h2>
                  <p className="mt-3">
                    Hyper provides software applications, tools, integrations, analytics, automation
                    features, and related services for Shopify merchants and ecommerce businesses.
                    We may modify, update, suspend, or discontinue features at any time without
                    prior notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Account Responsibilities
                  </h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {responsibilities.map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6">
                        <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Acceptable Use
                  </h2>
                  <p className="mt-3">You agree not to:</p>
                  <ul className="mt-4 grid gap-3">
                    {acceptableUse.map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Billing and Payments
                  </h2>
                  <p className="mt-3">
                    Paid subscriptions are billed through Shopify or other approved payment
                    providers according to your selected plan. Fees are generally non-refundable
                    except where required by law or expressly stated otherwise.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Intellectual Property
                  </h2>
                  <p className="mt-3">
                    All software, trademarks, branding, content, documentation, and technology
                    provided by Hyper remain our exclusive property unless otherwise stated. These
                    Terms do not grant ownership rights to any Hyper intellectual property.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Data and Privacy
                  </h2>
                  <p className="mt-3">
                    Your use of our services is also governed by our Privacy Policy, which explains
                    how information is collected, used, and protected.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Service Availability
                  </h2>
                  <p className="mt-3">
                    We strive to provide reliable services but do not guarantee uninterrupted
                    availability, error-free operation, or compatibility with all third-party
                    systems.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Limitation of Liability
                  </h2>
                  <p className="mt-3">
                    To the maximum extent permitted by law, Hyper shall not be liable for indirect,
                    incidental, consequential, special, or punitive damages arising from the use of
                    our services. Our total liability shall not exceed the amount paid by you for the
                    service during the twelve months preceding the claim.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">Termination</h2>
                  <p className="mt-3">
                    We may suspend or terminate access to our services if these terms are violated or
                    if required for operational, legal, or security reasons. You may discontinue use
                    of our services at any time by uninstalling our applications or closing your
                    account.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                    Changes to These Terms
                  </h2>
                  <p className="mt-3">
                    We may update these Terms of Service periodically. Continued use of our services
                    after updates constitutes acceptance of the revised terms.
                  </p>
                </section>
              </div>
            </article>
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                  <FileText aria-hidden="true" className="size-4 text-primary" />
                  Questions about these terms?
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Contact us if you have questions regarding these Terms of Service.
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