import Link from "next/link";
import { ArrowRight, Bot, Search, ShoppingBag, Sparkles, Video } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";

export const metadata = createSpanishPageMetadata({
  title: "Sobre NiagaraT y Hyper Apps",
  description:
    "NiagaraT desarrolla Hyper Apps para comerciantes de Shopify, incluyendo busqueda, filtros, chat con IA, preguntas frecuentes y videos comprables.",
  path: "/es/about",
});

const productAreas = [
  {
    title: "Descubrimiento de productos con IA",
    description:
      "Hyper Search & Product Filters ayuda a las tiendas Shopify a ofrecer busqueda mas rapida, filtros mas claros y exploracion de catalogo mas facil.",
    Icon: Search,
  },
  {
    title: "Soporte al cliente con IA",
    description:
      "Hyper AI Chat & FAQs ayuda a responder preguntas frecuentes, reducir presion de soporte y guiar decisiones de compra con mas confianza.",
    Icon: Bot,
  },
  {
    title: "Compra desde video",
    description:
      "Hyper Shoppable Videos convierte videos de producto en momentos interactivos que conectan descubrimiento con accion.",
    Icon: Video,
  },
];

const principles = [
  "IA practica que encaja con flujos reales de comerciantes.",
  "Experiencias de cliente que reducen friccion antes de la compra.",
  "Herramientas que ayudan a equipos Shopify mientras cambia el descubrimiento comercial.",
];

export default function SpanishAboutPage() {
  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Sobre NiagaraT
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Hyper Apps para comerciantes Shopify</p>
                <h1 className="mt-3 max-w-4xl type-display">NiagaraT crea Hyper Apps para comerciantes de Shopify.</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  NiagaraT desarrolla herramientas ecommerce bajo la marca Hyper para ayudar a comerciantes Shopify a mejorar descubrimiento de productos, soporte al cliente, interaccion y conversion.
                </p>
              </div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <ShoppingBag aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">3</p>
                <p className="mt-1 text-sm font-semibold text-foreground">areas comerciales principales</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Descubrimiento, soporte y comercio con video para recorridos de compra mas fluidos.</p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl">
          <div className="grid gap-4 md:grid-cols-3">
            {productAreas.map(({ title, description, Icon }) => (
              <article key={title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
                <span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Por que los comerciantes eligen Hyper Apps</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Construido para el trabajo detras del crecimiento ecommerce moderno.</h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <p>Hyper Apps combina flujos practicos de Shopify con herramientas de IA donde ayudan a resolver problemas reales de tienda. Hyper Search & Product Filters apoya el descubrimiento, Hyper AI Chat & FAQs apoya preguntas de clientes y Hyper Shoppable Videos apoya interaccion comprable.</p>
                <p>Mientras evoluciona ecommerce en Shopify, NiagaraT se enfoca en herramientas que hacen los catalogos mas navegables, las preguntas mas claras y el contenido de producto mas conectado con la intencion de compra.</p>
              </div>
              <Link href="/es/apps" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary">
                Explorar Hyper Apps
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
            <aside className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Nuestro enfoque</p>
              <ul className="mt-5 space-y-3">
                {principles.map((principle) => (
                  <li key={principle} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{principle}</span>
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
