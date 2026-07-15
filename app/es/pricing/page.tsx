import Link from "next/link";
import { CheckCircle2, ExternalLink } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { hyperAppsEs as hyperApps } from "@/data/hyper-apps.es";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";

const title = "Precios de apps Shopify | Hyper Apps";
const description =
  "Compara precios de Hyper Search, Hyper AI Chat y Hyper Shoppable Videos para tiendas Shopify.";

export const metadata = createSpanishPageMetadata({ title, description, path: "/es/pricing" });

const appHrefById = {
  search: "/es/apps/hyper-search-filter",
  chat: "/es/apps/hyper-ai-chat-faq",
  video: "/es/apps/hyper-shoppable-videos",
} as const;

export default function SpanishPricingPage() {
  return (
    <>
      <Section className="relative overflow-hidden border-b border-border py-14 sm:py-16">
        <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,hsl(var(--primary)/0.08),transparent)]" />
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Precios de Hyper Apps</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight tracking-normal text-foreground sm:text-5xl">
                Elige el plan de Shopify que coincide con tu siguiente mejora de conversion
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                Compara busqueda, chat con IA y video comprable en una vista clara. Los detalles finales de facturacion siempre deben confirmarse en Shopify App Store antes de instalar.
              </p>
            </div>
            <div className="rounded-[8px] border border-border bg-surface/85 p-5 shadow-[0_18px_54px_-48px_hsl(var(--shadow)/0.8)] backdrop-blur">
              <p className="text-sm font-black text-foreground">Necesitas ayuda para elegir?</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Escribenos si quieres ayuda para elegir la primera app que deberias instalar.</p>
              <Link href="/es/contact" className="mt-4 inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-primary/90">
                Hablar con nosotros
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Comparar por app</p>
              <h2 className="mt-2 text-2xl font-black text-foreground">Empieza con el problema que quieres resolver primero</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">Los planes usan datos publicos del sitio y de Shopify. Revisa Shopify App Store antes de instalar.</p>
          </div>

          <div className="grid gap-8">
            {hyperApps.map((app) => (
              <section key={app.id} id={app.id} className="rounded-[10px] border border-border bg-surface/80 p-4 shadow-[0_28px_80px_-62px_hsl(var(--shadow)/0.95)] sm:p-6">
                <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{app.shortName}</p>
                    <h2 className="mt-2 text-3xl font-black tracking-normal text-foreground">{app.marketingName}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{app.outcome}</p>
                    <div className="mt-5 rounded-[8px] border border-border bg-background p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Mejor para</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-foreground">{app.bestFit}</p>
                    </div>
                    <Link href={appHrefById[app.id]} className="mt-5 inline-flex h-10 items-center justify-center rounded-[6px] border border-border bg-background px-4 text-sm font-black text-foreground transition hover:border-primary/35 hover:bg-primary/10">
                      Ver detalles
                    </Link>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {app.plans.map((plan) => (
                      <article key={plan.name} className="flex min-h-full flex-col rounded-[8px] border border-border bg-background p-5">
                        <h3 className="text-base font-black text-foreground">{plan.name}</h3>
                        <p className="mt-2 text-3xl font-black text-foreground">{plan.price}</p>
                        {plan.annual ? <p className="mt-1 text-xs text-muted-foreground">o {plan.annual}</p> : null}
                        {plan.trial ? <p className="mt-3 text-sm font-semibold text-primary">{plan.trial}</p> : null}
                        <p className="mt-4 min-h-12 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                        <ul className="mt-5 flex-1 space-y-2 border-t border-border pt-5">
                          {plan.limits.slice(0, 5).map((feature) => (
                            <li key={feature} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Link href={app.installHref} className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-[6px] bg-primary px-4 text-sm font-black text-primary-foreground transition hover:bg-primary/90">
                          Instalar <ExternalLink aria-hidden="true" className="size-4" />
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
