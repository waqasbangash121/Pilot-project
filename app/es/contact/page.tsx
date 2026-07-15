import Link from "next/link";
import { ArrowRight, Bot, Mail, MessageSquare, Search, Sparkles, Video } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";
import { toJsonLd } from "@/lib/schema";
import { createLocalBusinessSchema } from "@/schemas";

const title = "Contactar a NiagaraT";
const description =
  "Contacta a NiagaraT para hablar sobre Hyper Apps para Shopify: busqueda, chat con IA, preguntas frecuentes y videos comprables.";

export const metadata = createSpanishPageMetadata({ title, description, path: "/es/contact" });

const supportTopics = [
  ["Descubrimiento de productos", "Hablemos de busqueda, filtros, merchandising y objetivos de descubrimiento.", Search],
  ["Soporte con IA", "Explora chat, preguntas frecuentes y automatizacion para preguntas frecuentes de clientes.", Bot],
  ["Video commerce", "Planifica experiencias de video que acerquen al comprador al producto.", Video],
] as const;

const contactReasons = [
  "Encontrar la app Hyper adecuada para tu tienda Shopify.",
  "Preguntar sobre implementacion, flujos de trabajo o capacidades.",
  "Mejorar experiencia de cliente y conversiones.",
  "Compartir preguntas de soporte, alianza o negocio.",
];

const localBusinessSchema = {
  ...createLocalBusinessSchema(),
  inLanguage: "es",
};

export default function SpanishContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(localBusinessSchema) }} />

      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Contactar a NiagaraT
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Soporte para Hyper Apps Shopify</p>
                <h1 className="mt-3 max-w-4xl type-display">Mejoremos tu busqueda, soporte y comercio con video en Shopify.</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Escribenos para hablar sobre Hyper Apps de NiagaraT, incluyendo busqueda de productos, soporte con IA, automatizacion de preguntas frecuentes, videos comprables y formas practicas de mejorar tu tienda.
                </p>
              </div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <Mail aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-sm font-semibold text-foreground">Email directo</p>
                <Link href={`mailto:${siteConfig.email}`} className="mt-2 inline-flex break-all text-sm font-semibold text-primary underline decoration-border underline-offset-4 transition-colors hover:text-foreground">
                  {siteConfig.email}
                </Link>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">Cuentanos que quieres mejorar y que flujo de Shopify necesita ayuda.</p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {supportTopics.map(([topic, body, Icon]) => (
              <article key={topic} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold tracking-tight">{topic}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <MessageSquare aria-hidden="true" className="size-4 text-primary" />
                Como podemos ayudar
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Comparte el trabajo que tienes enfrente.</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                NiagaraT desarrolla Hyper Apps para descubrimiento de productos, soporte automatizado y comercio con video interactivo en Shopify. Podemos ayudarte a entender ajuste de producto, implementacion y prioridades.
              </p>
              <Link href={`mailto:${siteConfig.email}`} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[0_18px_36px_-20px_hsl(var(--primary)/0.8)] transition-transform hover:-translate-y-0.5">
                Contactar a NiagaraT
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
            <aside className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Buenas razones para escribir</p>
              <ul className="mt-5 space-y-3">
                {contactReasons.map((reason) => (
                  <li key={reason} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
