import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { hyperAppsUpdatedAt } from "@/data/hyper-apps";
import { hyperAppsEs as hyperApps } from "@/data/hyper-apps.es";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";
import { toJsonLd } from "@/lib/schema";

const title = "Comparar apps Hyper para Shopify | NiagaraT";
const description =
  "Compara las apps Hyper para busqueda, chat con IA y videos comprables en Shopify. Revisa casos de uso, planes y enlaces de instalacion.";

export const metadata = createSpanishPageMetadata({ title, description, path: "/es/apps" });

const sourceNote =
  "Los precios y limites de plan pueden cambiar. Las fichas de Shopify App Store son la fuente final para informacion de facturacion actual.";

const problems = [
  {
    id: "search",
    heading: "Los compradores no encuentran los productos correctos",
    copy: "Elige Hyper Search cuando los clientes tienen problemas con catalogos grandes, errores de escritura, sinonimos, atributos de producto, filtros de coleccion o busquedas sin resultados.",
    appName: "Hyper Search & Product Filters",
    cta: "Ver app de busqueda Shopify",
    href: "/es/apps/hyper-search-filter",
  },
  {
    id: "chat",
    heading: "Los compradores se van con preguntas sin respuesta",
    copy: "Elige Hyper AI Chat cuando los clientes preguntan repetidamente por productos, tallas, disponibilidad, envios, devoluciones, politicas o informacion de pedidos.",
    appName: "Hyper AI Chat & FAQs",
    cta: "Ver app de chat IA para Shopify",
    href: "/es/apps/hyper-ai-chat-faq",
  },
  {
    id: "video",
    heading: "Tus videos de producto son dificiles de comprar",
    copy: "Elige Hyper Shoppable Videos cuando tienes demostraciones, tutoriales, TikToks, Reels o UGC que los compradores no pueden comprar directamente.",
    appName: "Hyper Shoppable Videos",
    cta: "Ver app de videos comprables",
    href: "/es/apps/hyper-shoppable-videos",
  },
] as const;

const comparisonRows = [
  ["Proposito principal", "primaryPurpose"],
  ["Mejor para", "bestFit"],
  ["Problema principal del cliente", "mainProblem"],
  ["Funciones principales", "coreFeatures"],
  ["Plan gratis", "freePlan"],
  ["Prueba gratis", "freeTrial"],
  ["Primer plan pago", "entryPaidPlan"],
  ["Limite de uso", "usageLimit"],
  ["Metodo de configuracion", "setupMethod"],
  ["Codigo requerido", "codingRequired"],
  ["Analitica incluida", "analyticsIncluded"],
  ["Tienda demo", "demoHref"],
  ["Pagina interna de producto", "internalHref"],
  ["Instalar en Shopify", "installHref"],
] as const;

const diagnostics = [
  {
    title: "Diagnostico de busqueda",
    items: [
      "Que porcentaje de busquedas devuelve cero resultados?",
      "Que terminos no producen productos relevantes?",
      "Los compradores usan palabras distintas a las del catalogo?",
      "Los clientes abandonan colecciones sin refinar productos?",
    ],
  },
  {
    title: "Diagnostico de soporte",
    items: [
      "Cuales son las diez preguntas previas a compra mas repetidas?",
      "Cuantas conversaciones tratan envios, tallas, devoluciones o disponibilidad?",
      "Cuanto esperan los compradores por una respuesta?",
    ],
  },
  {
    title: "Diagnostico de video",
    items: [
      "Cuantos visitantes ven videos de producto?",
      "Cuantos espectadores hacen clic en un producto?",
      "Pueden los compradores avanzar al carrito desde la experiencia de video?",
      "Que videos generan mas interes de producto?",
    ],
  },
] as const;

const faqs = [
  {
    q: "Que apps Shopify ofrece NiagaraT?",
    a: "NiagaraT ofrece tres Hyper Apps para comerciantes Shopify: Hyper Search & Product Filters para busqueda y filtros, Hyper AI Chat & FAQs para preguntas de clientes y contenido de preguntas frecuentes, y Hyper Shoppable Videos para componentes de video con productos etiquetados.",
  },
  {
    q: "Que app Hyper deberia instalar primero?",
    a: "Empieza con la app vinculada al mayor problema medible de experiencia de cliente: busquedas sin resultados, preguntas repetidas antes de comprar o videos de producto que se ven pero no generan clics.",
  },
  {
    q: "Puedo usar las apps Hyper de forma independiente?",
    a: "Si. Cada app Hyper puede instalarse de forma independiente desde Shopify App Store. No necesitas las tres apps para usar una de ellas.",
  },
  {
    q: "Puedo usar las tres apps juntas?",
    a: "Si. Pueden usarse en la misma tienda Shopify cuando necesitas ayuda en busqueda, soporte y video comprable. Esta pagina no promete un precio de paquete ni integracion de datos compartida si no esta verificada.",
  },
  {
    q: "Las apps tienen planes gratis?",
    a: `Si. Las fichas verificadas el ${hyperAppsUpdatedAt} muestran planes gratis para Hyper Search & Filter, Hyper AI Chat and FAQs y Hyper - Shoppable Videos.`,
  },
  {
    q: "Los planes pagos incluyen pruebas gratis?",
    a: "Si. Las fichas actuales de Shopify App Store muestran pruebas gratis de 14 dias en planes pagos para las tres apps.",
  },
  {
    q: "La instalacion requiere codigo?",
    a: "La configuracion estandar se maneja con instalacion desde Shopify y ajustes dentro de la app. Hyper Search admite CSS personalizado, mientras chat y video se enfocan en componentes, preguntas frecuentes, contenido y configuracion de video.",
  },
] as const;

const appHrefById = {
  search: "/es/apps/hyper-search-filter",
  chat: "/es/apps/hyper-ai-chat-faq",
  video: "/es/apps/hyper-shoppable-videos",
} as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://niagarat.com/es/apps#webpage",
  url: "https://niagarat.com/es/apps",
  name: title,
  description,
  inLanguage: "es",
  isPartOf: { "@id": "https://niagarat.com/#website" },
};

function Diagnostic({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="rounded-[8px] border border-border bg-background p-6">
      <h3 className="font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-muted-foreground">
            <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-[6px] bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SpanishAppsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(schema) }} />

      <Section spacing="lg" className="border-b border-border bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))]">
        <Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Hyper Apps by NiagaraT</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.08] tracking-normal text-foreground sm:text-5xl lg:text-6xl">Elige la app Hyper correcta para tu tienda Shopify</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Compara apps Shopify para busqueda de productos, soporte de clientes y video comprable. Empieza con la mayor friccion de tu tienda y agrega otras Hyper Apps cuando tus necesidades crezcan.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="#compare" className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90">Comparar apps</Link>
              <Link href="#selector" className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border bg-background px-6 py-3 text-sm font-bold text-foreground transition hover:border-primary/60">Encontrar mi app</Link>
              <Link href="/es/contact" className="inline-flex min-h-11 items-center justify-center px-2 py-3 text-sm font-bold text-primary underline-offset-4 hover:underline">Hablar con el equipo</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {hyperApps.map((app) => (
              <Link key={app.id} href={appHrefById[app.id]} className="group flex min-h-28 items-start gap-4 rounded-[8px] border border-border bg-surface p-5 shadow-[0_18px_48px_-42px_hsl(var(--shadow)/0.75)] transition hover:-translate-y-0.5 hover:border-primary/40 sm:block lg:flex">
                <Image src={app.icon} alt="" width={40} height={40} aria-hidden="true" className="shrink-0 rounded-[8px]" />
                <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{app.shortName}</p><p className="mt-2 text-sm font-bold leading-6 text-foreground">{app.primaryPurpose}</p></div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="selector" spacing="lg">
        <Container>
          <div className="max-w-3xl"><h2 className="text-3xl font-black tracking-normal">Que esta impidiendo mas compras?</h2><p className="mt-4 text-muted-foreground">Elige la friccion que ves en reportes de busqueda, mensajes de soporte o interaccion con videos. Cada recomendacion es un enlace rastreable normal.</p></div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {problems.map((problem) => <Link key={problem.id} href={problem.href} className="group flex min-h-[320px] flex-col rounded-[8px] border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"><h3 className="text-xl font-black tracking-normal">{problem.heading}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{problem.copy}</p><div className="mt-auto pt-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">App recomendada</p><p className="mt-2 font-bold text-foreground">{problem.appName}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">{problem.cta}<ArrowRight aria-hidden="true" className="size-4" /></span></div></Link>)}
          </div>
        </Container>
      </Section>

      <Section id="product-cards" spacing="lg" className="bg-surface">
        <Container>
          <div className="max-w-3xl"><h2 className="text-3xl font-black tracking-normal">Revisa cada app Hyper</h2><p className="mt-4 text-muted-foreground">Nombres de producto, planes gratis, pruebas, precios de entrada, limites, demos e instalacion se controlan desde datos de producto localizados y verificados contra Shopify App Store.</p></div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {hyperApps.map((app) => <article key={app.id} className="flex flex-col rounded-[8px] border border-border bg-background p-6 shadow-sm"><div className="grid min-h-[4.75rem] grid-cols-[44px_minmax(0,1fr)] items-start gap-3"><Image src={app.icon} alt={`${app.marketingName} icono`} width={44} height={44} className="rounded-md" /><div><h3 className="flex min-h-14 items-start text-xl font-black leading-7 tracking-normal">{app.marketingName}</h3><p className="text-xs text-muted-foreground">{app.listedAs}</p></div></div><div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[8px] border border-border bg-muted"><Image src={app.screenshot} alt={app.screenshotAlt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" loading="lazy" /></div><p className="mt-5 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">{app.outcome}</p><p className="mt-3 text-sm leading-6 text-foreground"><strong>Mejor para:</strong> {app.bestFit}</p><ul className="mt-5 space-y-2">{app.capabilities.slice(0, 6).map((feature) => <li key={feature} className="flex gap-2 text-sm leading-6 text-muted-foreground"><CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /><span>{feature}</span></li>)}</ul><dl className="mt-6 grid gap-3 rounded-[8px] bg-surface p-4 text-sm"><div><dt className="font-semibold">Plan gratis</dt><dd className="text-muted-foreground">{app.freePlan}</dd></div><div><dt className="font-semibold">Prueba gratis</dt><dd className="text-muted-foreground">{app.freeTrial}</dd></div><div><dt className="font-semibold">Primer plan pago</dt><dd className="text-muted-foreground">{app.entryPaidPlan}</dd></div></dl><div className="mt-auto grid gap-3 pt-6"><Link href={app.installHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90">Instalar gratis en Shopify<ExternalLink aria-hidden="true" className="size-4" /></Link><Link href={appHrefById[app.id]} className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary/60">Ver pagina de producto</Link></div></article>)}
          </div>
        </Container>
      </Section>

      <Section id="compare" spacing="lg">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-3xl font-black tracking-normal">Comparar Hyper Apps</h2><p className="mt-4 max-w-3xl text-muted-foreground">Usa la tabla para comparar proposito, limites, configuracion, demos y caminos de instalacion.</p></div><Link href="/es/pricing" className="text-sm font-bold text-primary underline-offset-4 hover:underline">Comparar precios actuales</Link></div>
          <div className="mt-8 overflow-x-auto rounded-[8px] border border-border" tabIndex={0} aria-label="Tabla desplazable de comparacion de Hyper Apps"><table className="w-full min-w-[980px] border-collapse bg-background text-left text-sm"><caption className="sr-only">Comparacion lado a lado de apps Hyper para Shopify</caption><thead className="sticky top-0 bg-surface"><tr><th scope="col" className="w-48 border-b border-border p-4 font-semibold">Criterio</th>{hyperApps.map((app) => <th key={app.id} scope="col" className="border-b border-border p-4 font-semibold">{app.marketingName}</th>)}</tr></thead><tbody>{comparisonRows.map(([label, key]) => <tr key={label} className="border-b border-border last:border-b-0"><th scope="row" className="bg-surface/70 p-4 align-top font-bold text-foreground">{label}</th>{hyperApps.map((app) => { const value = app[key]; if (key === "demoHref") return <td key={app.id} className="p-4 align-top"><Link href={app.demoHref} className="font-semibold text-primary underline-offset-4 hover:underline">Tienda demo</Link></td>; if (key === "internalHref") return <td key={app.id} className="p-4 align-top"><Link href={appHrefById[app.id]} className="font-semibold text-primary underline-offset-4 hover:underline">Pagina de producto</Link></td>; if (key === "installHref") return <td key={app.id} className="p-4 align-top"><Link href={app.installHref} className="font-semibold text-primary underline-offset-4 hover:underline">Instalar en Shopify</Link></td>; return <td key={app.id} className="p-4 align-top text-muted-foreground">{value}</td>; })}</tr>)}</tbody></table></div>
          <p className="mt-4 text-sm text-muted-foreground">{sourceNote}</p>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-surface">
        <Container>
          <h2 className="text-3xl font-black tracking-normal">Que app Hyper deberias instalar primero?</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-4">{problems.map((problem) => <div key={problem.id} className="rounded-[8px] border border-border bg-background p-6"><h3 className="font-semibold">{problem.heading}</h3><p className="mt-3 text-sm text-muted-foreground">Empieza con <Link href={problem.href} className="text-primary underline-offset-4 hover:underline">{problem.appName}</Link>.</p></div>)}<div className="rounded-[8px] border border-border bg-background p-6"><h3 className="font-semibold">Aplican dos o mas problemas</h3><p className="mt-3 text-sm text-muted-foreground">Empieza con la mayor fuga medible y agrega la segunda app despues de configurar la primera.</p></div></div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">{diagnostics.map((item) => <Diagnostic key={item.title} title={item.title} items={item.items} />)}</div>
          <p className="mt-6 text-lg font-semibold">Empieza con la app vinculada a la mayor caida medible.</p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><h2 className="text-3xl font-black tracking-normal">Usa una app o conecta el recorrido completo</h2><p className="mt-4 text-muted-foreground">Cada app puede instalarse de forma independiente. Si hay varios problemas visibles, las apps pueden apoyar distintos momentos del recorrido: Hyper Search ayuda a descubrir productos relevantes, Hyper AI Chat responde preguntas que bloquean decisiones y Hyper Shoppable Videos ayuda a explorar productos mediante video.</p></div><ol className="grid gap-4 sm:grid-cols-2">{hyperApps.map((app, index) => <li key={app.id} className="rounded-[8px] border border-border bg-surface p-5"><span className="text-sm font-bold text-primary">{index + 1}</span><h3 className="mt-2 font-semibold">{app.shortName}</h3><p className="mt-2 text-sm text-muted-foreground">{app.primaryPurpose}</p></li>)}<li className="rounded-[8px] border border-border bg-surface p-5"><span className="text-sm font-bold text-primary">4</span><h3 className="mt-2 font-semibold">Carrito y pago</h3><p className="mt-2 text-sm text-muted-foreground">El comprador avanza despues de descubrir, obtener respuestas y explorar productos.</p></li></ol></Container>
      </Section>

      <Section spacing="lg" className="bg-surface">
        <Container><h2 className="text-3xl font-black tracking-normal">Que pasa despues de elegir una app?</h2><div className="mt-8 grid gap-6 lg:grid-cols-3">{hyperApps.map((app) => <article key={app.id} className="rounded-[8px] border border-border bg-background p-6"><h3 className="text-xl font-semibold">{app.marketingName}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{app.setupNote}</p><p className="mt-4 text-sm"><strong>Integraciones:</strong> <span className="text-muted-foreground">{app.integrations}</span></p><Link href={app.demoHref} className="mt-4 inline-flex text-sm font-bold text-primary underline-offset-4 hover:underline">Abrir tienda demo</Link></article>)}</div></Container>
      </Section>

      <Section spacing="lg">
        <Container><div className="max-w-3xl"><h2 className="text-3xl font-black tracking-normal">Ve las apps antes de instalar</h2><p className="mt-4 text-muted-foreground">Usa evidencia de producto: fichas actuales de Shopify, informacion de planes, capturas de panel, vistas previas de tienda, requisitos de configuracion y tiendas demo publicas.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-3">{hyperApps.map((app) => <Link key={app.id} href={app.demoHref} className="rounded-[8px] border border-border bg-surface p-5 font-semibold text-primary underline-offset-4 transition hover:border-primary/40 hover:underline">Ver tienda demo de {app.shortName}</Link>)}</div></Container>
      </Section>

      <Section spacing="lg" className="border-b border-border bg-background">
        <Container size="md"><header className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Preguntas frecuentes</p><h2 className="mt-3 text-2xl font-black tracking-normal text-foreground sm:text-3xl">Preguntas que hacen comerciantes Shopify antes de elegir</h2><p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">Usa estas respuestas para elegir la primera app y confirma detalles actuales del plan en Shopify.</p></header><div className="mt-9 divide-y divide-border rounded-[8px] border border-border bg-surface">{faqs.map((faq) => <details key={faq.q} className="group p-5"><summary className="cursor-pointer list-none text-base font-black text-foreground [&::-webkit-details-marker]:hidden"><span className="flex items-center justify-between gap-4">{faq.q}<span aria-hidden="true" className="text-primary">+</span></span></summary><p className="mt-4 text-sm leading-7 text-muted-foreground">{faq.a}</p></details>)}</div></Container>
      </Section>

      <Section spacing="lg">
        <Container><div className="rounded-[8px] border border-border bg-primary/10 p-8 text-center sm:p-10"><h2 className="text-3xl font-black tracking-normal">Empieza con el mayor problema de tu tienda</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Elige la app Hyper que responde a tu caida de cliente mas clara. Revisa los detalles, prueba la demo o instala un plan gratis desde Shopify.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Link href="#compare" className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">Comparar Hyper Apps</Link><Link href="/es/contact" className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-primary/30 bg-background px-6 py-3 text-sm font-bold text-primary">Hablar con el equipo</Link></div><div className="mt-6 flex flex-col justify-center gap-3 text-sm sm:flex-row">{hyperApps.map((app) => <Link key={app.id} href={app.installHref} className="font-semibold text-primary underline-offset-4 hover:underline">Instalar {app.shortName}</Link>)}</div></div></Container>
      </Section>
    </>
  );
}