import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { hyperAppsEs as hyperApps } from "@/data/hyper-apps.es";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";
import { toJsonLd } from "@/lib/schema";

const title = "Apps de IA para Shopify: busqueda, soporte y video | Hyper Apps";
const description =
  "Mejora la busqueda de productos, responde preguntas de clientes y convierte videos en experiencias de compra con Hyper Apps para Shopify.";

const links = {
  search: "/es/apps/hyper-search-filter",
  chat: "/es/apps/hyper-ai-chat-faq",
  video: "/es/apps/hyper-shoppable-videos",
};

export const metadata = createSpanishPageMetadata({ title, description, path: "/es" });

const useCases = [
  {
    title: "Los clientes no encuentran productos",
    body: "Hyper Search ayuda con busqueda instantanea, tolerancia a errores, sinonimos, filtros, reglas de merchandising y analitica de busqueda.",
    href: links.search,
    cta: "Ver app de busqueda",
  },
  {
    title: "Los compradores tienen preguntas sin respuesta",
    body: "Hyper AI Chat responde preguntas comunes sobre productos, tallas, envios, devoluciones, disponibilidad y politicas de tienda.",
    href: links.chat,
    cta: "Ver app de chat IA",
  },
  {
    title: "Los videos no llevan a la compra",
    body: "Hyper Shoppable Videos convierte demostraciones, UGC y contenido social en experiencias con productos etiquetados y caminos de compra.",
    href: links.video,
    cta: "Ver app de video comprable",
  },
];

const proof = [
  "Ayuda a clientes a descubrir productos relevantes",
  "Responde preguntas repetitivas de compra al instante",
  "Convierte contenido de producto en experiencias de compra interactivas",
  "Da a comerciantes mas claridad sobre el comportamiento del comprador",
];

const comparisonRows = [
  [
    "Caso de uso principal",
    "Busqueda en tienda, filtros de coleccion, merchandising y descubrimiento de productos.",
    "Respuestas de chatbot IA y preguntas frecuentes buscables para preguntas de clientes.",
    "Videos con productos etiquetados y componentes de video comprable para la tienda.",
  ],
  [
    "Comerciante ideal",
    "Tiendas con catalogos en crecimiento, muchos atributos o productos dificiles de encontrar.",
    "Tiendas que responden preguntas repetidas sobre productos, envios, devoluciones, tallas o politicas.",
    "Tiendas con demos, clips sociales, tutoriales, contenido de estilo o UGC de producto.",
  ],
  [
    "Problema principal del cliente",
    "El comprador no encuentra el articulo correcto o recibe resultados debiles.",
    "El comprador tiene una pregunta antes de comprar y no recibe respuesta rapido.",
    "El comprador mira contenido pero no tiene un siguiente paso claro hacia el producto.",
  ],
  [
    "Capacidades clave",
    "Sugerencias de busqueda, filtros, sinonimos, tolerancia a errores, reglas de merchandising y analitica.",
    "Chat IA, preguntas frecuentes buscables, contenido aprobado, historial de chat, marca y analitica.",
    "Etiquetas de producto, componentes comprables, contenido social, rutas al carrito donde aplique y analitica.",
  ],
  [
    "Requisitos de configuracion",
    "Instalar la app Shopify, activar el app embed y configurar busqueda y filtros.",
    "Instalar la app Shopify, agregar contenido aprobado y configurar chat y preguntas frecuentes.",
    "Instalar la app Shopify, subir o importar videos, etiquetar productos y colocar componentes.",
  ],
  [
    "Metrica principal",
    "Uso de busqueda, busquedas sin resultados, uso de filtros y clics de producto desde busqueda.",
    "Preguntas respondidas, uso de preguntas frecuentes, temas repetidos y conversaciones de soporte evitadas.",
    "Interaccion con video, clics de producto, rutas al carrito donde aplique y clics de producto.",
  ],
] as const;

const compatibility = [
  ["Compatibilidad de tema", "Hyper Search indica soporte para temas Shopify Online Store 2.0. Para chat y video, confirma ubicaciones especificas del tema en la pagina de producto o con soporte."],
  ["Requisitos de instalacion", "Cada app se instala desde Shopify. La configuracion estandar usa incrustaciones de app o componentes de tienda y ajustes controlados por el comerciante dentro de la app."],
  ["Codigo requerido", "La configuracion estandar no deberia requerir cambios Liquid. Para temas personalizados o ubicaciones inusuales, consulta soporte antes de lanzar."],
  ["Tamano de catalogo", "Hyper Search muestra limites por plan hasta 200,000 productos en Enterprise. Para chat y video, revisa los limites actuales de cada pagina de producto."],
  ["Soporte", "El soporte esta disponible a traves de Hyper Apps by NiagaraT en support@niagarat.com y desde la pagina de contacto."],
  ["Tiempo de configuracion", "El tiempo depende del tamano del catalogo, el contenido disponible, el tema y la cantidad de reglas, componentes o videos que configures."],
] as const;

const journey = [
  "Un comprador busca un producto",
  "Hyper Search le ayuda a encontrar el articulo correcto",
  "Hyper AI Chat responde preguntas de compra",
  "Hyper Shoppable Videos aporta descubrimiento y prueba visual",
  "El comprador avanza hacia la compra",
];

const faqs = [
  ["Que app Hyper debo instalar primero?", "Empieza con la app que coincide con tu mayor fuga: Hyper Search si los compradores no encuentran productos, Hyper AI Chat si las preguntas bloquean compras, o Hyper Shoppable Videos si el contenido recibe atencion pero no lleva a productos."],
  ["Puedo usar las tres apps juntas?", "Si. Las apps resuelven momentos distintos del recorrido de compra. Puedes usar una sola app o combinar busqueda, chat y video comprable cuando tu tienda lo necesite."],
  ["Funcionan con temas Shopify Online Store 2.0?", "Hyper Search indica soporte para temas Shopify Online Store 2.0. Para ubicaciones de chat y video, revisa las paginas de producto o contacta soporte para confirmar detalles de tu tema."],
  ["Se necesita codigo?", "La configuracion estandar usa instalacion y ajustes dentro de Shopify. Temas personalizados o ubicaciones especiales pueden requerir revision adicional."],
  ["Hay plan gratis?", "Las paginas de producto muestran planes gratis para las apps Hyper. Revisa Shopify App Store antes de instalar para confirmar precios actuales."],
  ["Cuanto tarda la configuracion?", "Depende de tu tienda: busqueda depende del catalogo y reglas; chat depende del contenido aprobado; video depende de cuantos videos subas, etiquetes y publiques."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://niagarat.com/es#webpage",
  name: title,
  description,
  url: "https://niagarat.com/es",
  inLanguage: "es",
  isPartOf: { "@id": "https://niagarat.com/#website" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://niagarat.com/es#homepage-faq",
  inLanguage: "es",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

function Header({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-black tracking-normal text-foreground sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">{text}</p>
    </header>
  );
}

export default function SpanishHomePage() {
  return (
    <>
      {[schema, faqSchema].map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(item) }} />
      ))}

      <Section className="border-b border-border bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))] py-14 sm:py-18 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">Hyper Apps by NiagaraT</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.08] tracking-normal text-foreground sm:text-5xl lg:text-6xl">Apps de IA que ayudan a tiendas Shopify a convertir mas compradores</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Ayuda a tus clientes a encontrar productos, obtener respuestas rapidas y comprar desde videos de producto. Hyper Apps combina busqueda, soporte y video comprable para comerciantes Shopify.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#choose-hyper-app" className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90">Explorar apps</Link>
              <Link href="/es/contact" className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border bg-surface px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary/40">Hablar con nosotros</Link>
            </div>
            <p className="mt-6 max-w-2xl text-sm font-medium leading-6 text-foreground">Construido para comerciantes Shopify que quieren mejor descubrimiento de productos, soporte mas rapido y experiencias de compra mas atractivas.</p>
          </div>
          <div className="rounded-[10px] border border-border bg-surface p-3 shadow-[0_24px_70px_-44px_hsl(var(--shadow)/0.9)]">
            <div className="grid gap-3 sm:grid-cols-2">
              <Image src="/search-banner.png" alt="Interfaz de Hyper Search para busqueda y filtros en Shopify" width={1200} height={820} priority sizes="(min-width: 1024px) 520px, 100vw" className="aspect-[16/9] w-full rounded-[8px] object-cover object-top sm:col-span-2" />
              <Image src="/aichat-banner.png" alt="Interfaz de Hyper AI Chat para soporte en Shopify" width={900} height={700} loading="lazy" sizes="(min-width: 1024px) 250px, 50vw" className="aspect-[4/3] w-full rounded-[8px] object-cover object-top" />
              <Image src="/shoppable-banner.png" alt="Interfaz de Hyper Shoppable Videos para videos comprables" width={900} height={700} loading="lazy" sizes="(min-width: 1024px) 250px, 50vw" className="aspect-[4/3] w-full rounded-[8px] object-cover object-top" />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="choose-hyper-app" spacing="lg">
        <Container>
          <Header eyebrow="Elige el problema que quieres resolver" title="Empieza por la friccion de compra que puedes ver" text="Cada app Hyper resuelve un problema distinto de experiencia de cliente en Shopify. Elige una app primero o combinalas cuando tu tienda necesite un recorrido mas completo." />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {useCases.map((item) => (
              <Link key={item.title} href={item.href} className="group flex min-h-64 flex-col rounded-[8px] border border-border bg-surface p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                <h3 className="text-xl font-black tracking-normal">{item.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">{item.body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">{item.cta}<ArrowRight aria-hidden="true" className="size-4" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-surface">
        <Container>
          <Header eyebrow="Casos de uso Shopify" title="Relaciona cada problema con la app de IA adecuada" text="Compara como Hyper Apps by NiagaraT mejora descubrimiento, responde preguntas antes de comprar y convierte videos de producto en caminos de compra." />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {hyperApps.map((app) => (
              <article key={app.id} className="rounded-[8px] border border-border bg-background p-6">
                <Image src={app.icon} alt="" width={44} height={44} aria-hidden="true" className="rounded-[8px]" />
                <h3 className="mt-4 text-xl font-black tracking-normal">{app.marketingName}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{app.outcome}</p>
                <ul className="mt-5 space-y-2">
                  {app.capabilities.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm leading-6 text-muted-foreground">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Header eyebrow="Valor de producto" title="Construido para quitar friccion del recorrido de compra Shopify" text="Hyper Apps by NiagaraT se enfoca en momentos practicos donde los compradores necesitan ayuda antes de comprar." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((item) => <div key={item} className="rounded-[8px] border border-border bg-surface p-5"><p className="text-sm font-bold leading-6 text-foreground">{item}</p></div>)}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-surface">
        <Container>
          <Header eyebrow="Compara las apps" title="Decide que app Hyper instalar primero" text="Usa esta tabla para relacionar tu primera instalacion con el problema de cliente que quieres resolver ahora." />
          <div className="mt-8 overflow-x-auto rounded-[8px] border border-border bg-background">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <caption className="sr-only">Comparacion de Hyper Apps para busqueda, chat IA y video comprable en Shopify.</caption>
              <thead><tr className="border-b border-border bg-surface"><th className="w-48 p-4 font-black">Criterio</th><th className="p-4 font-black">Hyper Search</th><th className="p-4 font-black">Hyper AI Chat</th><th className="p-4 font-black">Hyper Shoppable Videos</th></tr></thead>
              <tbody>{comparisonRows.map(([label, search, chat, video]) => <tr key={label} className="border-b border-border last:border-b-0"><th scope="row" className="p-4 align-top font-bold text-foreground">{label}</th><td className="p-4 align-top leading-6 text-muted-foreground">{search}</td><td className="p-4 align-top leading-6 text-muted-foreground">{chat}</td><td className="p-4 align-top leading-6 text-muted-foreground">{video}</td></tr>)}</tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Header eyebrow="Compatibilidad Shopify" title="Construido para tiendas Shopify reales" text="Estas notas usan informacion visible en las paginas de producto actuales y evitan promesas que requieren confirmacion del propietario." />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {compatibility.map(([heading, text]) => <article key={heading} className="rounded-[8px] border border-border bg-surface p-5"><h3 className="text-base font-black text-foreground">{heading}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></article>)}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-surface">
        <Container>
          <Header eyebrow="Como trabajan juntas" title="Convierte mas visitas en recorridos de compra" text="Puedes usar una app Hyper de forma independiente o combinar las apps cuando descubrimiento, soporte y contenido de producto necesitan atencion." />
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {journey.map((step, index) => <li key={step} className="rounded-[8px] border border-border bg-background p-5"><span className="inline-flex size-9 items-center justify-center rounded-full bg-primary text-sm font-black text-primary-foreground">{index + 1}</span><p className="mt-4 text-sm font-bold leading-6 text-foreground">{step}</p></li>)}
          </ol>
        </Container>
      </Section>

      <Section id="faqs" spacing="lg">
        <Container size="md">
          <Header eyebrow="Preguntas frecuentes" title="Preguntas que hacen comerciantes Shopify antes de instalar" text="Las respuestas son cuidadosas cuando planes, temas o detalles de configuracion pueden cambiar." />
          <div className="mt-8 divide-y divide-border rounded-[8px] border border-border bg-surface">
            {faqs.map(([question, answer]) => <details key={question} className="group p-5"><summary className="cursor-pointer list-none text-base font-black text-foreground [&::-webkit-details-marker]:hidden"><span className="flex items-center justify-between gap-4">{question}<span aria-hidden="true" className="text-primary">+</span></span></summary><p className="mt-4 text-sm leading-7 text-muted-foreground">{answer}</p></details>)}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-[linear-gradient(180deg,hsl(var(--surface)),hsl(var(--background)))]">
        <Container className="text-center" size="md">
          <h2 className="text-3xl font-black tracking-normal text-foreground sm:text-4xl">Empieza por la mayor fuga de conversion de tu tienda</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">Elige la app Hyper que resuelve tu problema mas urgente de experiencia de cliente o habla con nosotros para encontrar el mejor punto de partida.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#choose-hyper-app" className="inline-flex min-h-11 items-center justify-center rounded-[6px] bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90">Explorar apps</Link>
            <Link href="/es/contact" className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border bg-surface px-5 py-3 text-sm font-bold text-foreground transition hover:border-primary/40">Hablar con nosotros</Link>
          </div>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">Conoce mas sobre <Link href="/es/about" className="font-bold text-primary underline underline-offset-4">Hyper Apps by NiagaraT</Link>, explora <Link href="/es/resources" className="font-bold text-primary underline underline-offset-4">recursos ecommerce para Shopify</Link> o compara opciones en <Link href="/es/comparisons" className="font-bold text-primary underline underline-offset-4">comparaciones de apps Shopify</Link>.</p>
        </Container>
      </Section>
    </>
  );
}