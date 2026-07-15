import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { BarChart3, CheckCircle2, ExternalLink, Filter, Search, Settings2, Sparkles, Zap } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ProductVisualGallery } from "@/components/product-visual-gallery";
import { hyperAppsUpdatedAt } from "@/data/hyper-apps";
import { getHyperAppEs as getHyperApp } from "@/data/hyper-apps.es";
import { canonicalUrl } from "@/config/metadata";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";
import { toJsonLd } from "@/lib/schema";

const searchApp = getHyperApp("search");
const title = "App de busqueda y filtros para Shopify | Hyper Search";
const description =
  "Agrega busqueda instantanea, tolerancia a errores, sinonimos, filtros de coleccion y analitica a Shopify con Hyper Search & Filter.";
const pagePath = "/es/apps/hyper-search-filter";
const pageUrl = canonicalUrl(pagePath);
const installUrl = searchApp.installHref;
const demoUrl = searchApp.demoHref;

export const metadata = createSpanishPageMetadata({ title, description, path: pagePath });

const features = [
  {
    icon: Sparkles,
    title: "Busqueda instantanea con IA",
    body: "Muestra productos, colecciones y sugerencias mientras el comprador escribe.",
  },
  {
    icon: Zap,
    title: "Resultados tolerantes a errores",
    body: "Ayuda cuando el cliente escribe una palabra con errores o usa una variante cercana.",
  },
  {
    icon: Settings2,
    title: "Sinonimos y reglas",
    body: "Conecta el lenguaje del cliente con los terminos del catalogo, como sneakers, trainers o running shoes.",
  },
  {
    icon: Filter,
    title: "Filtros avanzados",
    body: "Permite filtrar por coleccion, proveedor, variantes, talla, color, precio, etiquetas y metafields.",
  },
  {
    icon: BarChart3,
    title: "Analitica de busqueda",
    body: "Revisa consultas, uso de filtros y busquedas sin resultados para mejorar el descubrimiento.",
  },
  {
    icon: Search,
    title: "Sincronizacion de catalogo",
    body: "Mantiene busqueda y filtros actualizados con productos y colecciones de Shopify.",
  },
];

const problems = [
  "Busquedas sin resultados utiles",
  "Errores de escritura y palabras alternativas",
  "Terminos del catalogo distintos al lenguaje del cliente",
  "Colecciones grandes dificiles de explorar",
  "Falta de visibilidad sobre lo que buscan los compradores",
  "Opciones de filtro demasiado limitadas",
];

const productVisuals = [
  { src: "/search-banner.png", alt: "Experiencia de busqueda y filtros de Hyper Search en tienda Shopify", title: "Busqueda y filtros en la tienda", body: "Muestra resultados, filtros, swatches, ordenamiento y tarjetas de producto relevantes en un flujo de descubrimiento." },
  { src: "/search-benefit-1.png", alt: "Interfaz de sugerencias instantaneas de Hyper Search", title: "Sugerencias instantaneas", body: "Ayuda a compradores a pasar de una consulta a productos relevantes sin esperar una recarga completa." },
  { src: "/search-benefit-2.png", alt: "Controles de filtros de Hyper Search para colecciones Shopify", title: "Filtros de coleccion y producto", body: "Organiza la navegacion del catalogo con filtros que coinciden con atributos de producto e intencion del comprador." },
  { src: "/search-benefit-3.png", alt: "Panel de analitica de Hyper Search para comportamiento de busqueda", title: "Analitica de busqueda", body: "Revisa actividad de busqueda y filtros para encontrar lenguaje faltante, consultas sin resultados y oportunidades de merchandising." },
  { src: "/search-benefit-4.png", alt: "Vista adicional de configuracion de Hyper Search", title: "Configuracion de descubrimiento", body: "Ajusta reglas, filtros y experiencia visual para que el descubrimiento se adapte al catalogo de la tienda." },
];
const faq = [
  ["Que mejora Hyper Search & Filter?", "Mejora la busqueda de productos, sugerencias instantaneas, filtros, sinonimos, tolerancia a errores y analitica de busqueda en Shopify."],
  ["Requiere codigo?", "La instalacion empieza desde Shopify. Para temas muy personalizados, conviene revisar el comportamiento antes de publicar cambios."],
  ["Hay plan gratis?", "Si. La informacion verificada muestra un plan gratis para catalogos pequenos, con limites de productos y filtros."],
  ["Puedo ver una demo?", "Si. Puedes abrir la tienda demo desde esta pagina y revisar el comportamiento antes de instalar."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      name: title,
      description,
      url: pageUrl,
      inLanguage: "es",
      isPartOf: { "@id": `${canonicalUrl("/")}#website` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#software`,
      name: "Hyper Search & Filter",
      applicationCategory: "Shopify application",
      operatingSystem: "Shopify",
      url: pageUrl,
      sameAs: installUrl,
      installUrl,
      image: canonicalUrl(searchApp.screenshot),
      description,
      offers: searchApp.plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price === "$0" ? "0" : plan.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        url: installUrl,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faq.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

function ExternalCta({ href, children, event }: { href: string; children: ReactNode; event: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      data-analytics-event={event}
      data-analytics-label="Spanish Hyper Search page"
    >
      {children}
    </Link>
  );
}

export default function SpanishHyperSearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(schema) }} />

      <Section className="border-b border-border bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))] pb-14 pt-16 sm:pt-20 lg:pt-24">
        <Container>
          <div>
            <div className="inline-flex items-center gap-3 rounded-[8px] border border-border bg-background px-4 py-2 shadow-sm">
              <Image src={searchApp.icon} alt="" width={28} height={28} aria-hidden="true" className="rounded-[6px]" />
              <span className="text-sm font-bold text-muted-foreground">Hyper Search & Filter para Shopify</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
              Busqueda con IA y filtros de producto para tiendas Shopify
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Ayuda a los compradores a encontrar productos con sugerencias instantaneas, tolerancia a errores, sinonimos, filtros flexibles, controles de merchandising y analitica de busqueda.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ExternalCta href={installUrl} event="search_app_install_click">
                Instalar gratis en Shopify <ExternalLink aria-hidden="true" className="size-4" />
              </ExternalCta>
              <Link href={demoUrl} className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border bg-background px-6 py-3 text-sm font-bold text-foreground transition hover:border-primary/60">
                Ver tienda demo
              </Link>
              <Link href="#pricing" className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-bold text-primary underline-offset-4 hover:underline">
                Comparar planes
              </Link>
            </div>
            <p className="mt-5 text-sm font-semibold text-foreground">Plan gratis disponible. Los planes pagos incluyen prueba de 14 dias.</p>
          </div>        </Container>
      </Section>
      <ProductVisualGallery eyebrow="Visuales del producto" title="Ver la experiencia de busqueda y filtros" body="Revisa los resultados de busqueda, controles de filtros y pantallas de analitica que apoyan busqueda con tolerancia a errores, refinamiento e inspeccion de consultas." visuals={productVisuals} />


      <Section spacing="lg">
        <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 className="text-3xl font-black tracking-normal">Cuando los compradores no encuentran productos, no pueden comprarlos</h2>
            <p className="mt-4 text-muted-foreground">El descubrimiento falla cuando la estructura del catalogo, los terminos del producto y la intencion del comprador no coinciden.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {problems.map((problem) => (
              <div key={problem} className="rounded-[8px] border border-border bg-surface p-4 text-sm text-muted-foreground">{problem}</div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-surface">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-normal">Funciones principales</h2>
            <p className="mt-4 text-muted-foreground">Estas capacidades ayudan a que la busqueda y los filtros reflejen mejor la forma en que compran tus clientes.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="rounded-[8px] border border-border bg-background p-6">
                  <Icon aria-hidden="true" className="size-6 text-primary" />
                  <h3 className="mt-4 text-xl font-black tracking-normal">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.body}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="pricing" spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black tracking-normal">Planes segun tamano de catalogo y necesidades de busqueda</h2>
            <p className="mt-4 text-muted-foreground">La informacion de planes fue verificada contra Shopify App Store el {hyperAppsUpdatedAt}. Shopify es la fuente final de facturacion.</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-4">
            {searchApp.plans.map((plan) => (
              <article key={plan.name} className="flex min-h-[30rem] flex-col rounded-[8px] border border-border bg-surface p-5">
                <h3 className="text-xl font-black tracking-normal">{plan.name}</h3>
                <p className="mt-3 text-3xl font-black tracking-normal">{plan.price}</p>
                {plan.annual ? <p className="mt-1 text-sm text-muted-foreground">o {plan.annual}</p> : <p className="mt-1 text-sm text-muted-foreground">Sin cargo mensual listado</p>}
                {plan.trial ? <p className="mt-3 text-sm font-semibold text-primary">{plan.trial}</p> : null}
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                <ul className="mt-5 space-y-2">
                  {plan.limits.slice(0, 5).map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-5 text-muted-foreground">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <ExternalCta href={installUrl} event="search_app_plan_select">{plan.cta ?? "Instalar en Shopify"}</ExternalCta>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-surface">
        <Container size="md">
          <header className="text-center">
            <h2 className="text-3xl font-black tracking-normal">Preguntas frecuentes</h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">Estas respuestas resumen los puntos principales antes de instalar.</p>
          </header>
          <div className="mt-8 divide-y divide-border rounded-[8px] border border-border bg-background">
            {faq.map(([question, answer]) => (
              <details key={question} className="group p-5">
                <summary className="cursor-pointer list-none text-base font-black text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">{question}<span aria-hidden="true" className="text-primary">+</span></span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
