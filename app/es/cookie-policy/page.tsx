import Link from "next/link";
import { Cookie, Mail, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";

export const metadata = createSpanishPageMetadata({
  title: "Politica de cookies",
  description:
    "Conoce como Hyper usa cookies, analitica y tecnologias similares en nuestro sitio y servicios.",
  path: "/es/cookie-policy",
});

const cookieTypes = [
  ["Cookies esenciales", "Son necesarias para que el sitio funcione correctamente y no pueden desactivarse en nuestros sistemas."],
  ["Cookies de analitica", "Nos ayudan a entender vistas, interaccion y clics para mejorar rendimiento y usabilidad."],
  ["Cookies funcionales", "Recuerdan preferencias y proporcionan funcionalidad mejorada y personalizacion."],
  ["Cookies de marketing", "Pueden usarse para medir rendimiento publicitario y mejorar campanas."],
] as const;

const uses = [
  "Mantener funcionalidad y rendimiento del sitio.",
  "Recordar preferencias y configuracion.",
  "Analizar trafico y comportamiento de visitantes.",
  "Medir interaccion con articulos, comparaciones, recursos, casos de estudio y herramientas.",
  "Medir efectividad de marketing y campanas.",
  "Detectar amenazas de seguridad y prevenir abuso.",
  "Mejorar experiencia de usuario y rendimiento del sitio.",
];

export default function SpanishCookiePolicyPage() {
  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"><Sparkles aria-hidden="true" className="size-3.5 text-primary" />Politica del sitio</div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Actualizado: julio de 2026</p>
                <h1 className="mt-3 max-w-4xl type-display">Politica de cookies</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Esta Politica de cookies explica como Hyper usa cookies y tecnologias similares cuando visitas nuestro sitio, usas nuestras aplicaciones Shopify o interactuas con servicios.</p>
              </div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6"><Cookie aria-hidden="true" className="size-5 text-primary" /><p className="mt-4 text-4xl font-semibold tracking-tight">4</p><p className="mt-1 text-sm font-semibold text-foreground">categorias de cookies</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Tecnologias esenciales, de analitica, funcionales y de marketing.</p></aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside className="h-fit rounded-3xl border border-border bg-surface p-5 shadow-sm lg:sticky lg:top-24"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Resumen</p><div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground"><p>Las cookies ayudan a operar, proteger, analizar y mejorar servicios Hyper.</p><p>Puedes controlar cookies desde la configuracion de tu navegador.</p></div></aside>
            <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="space-y-9 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Que son las cookies?</h2><p className="mt-3">Las cookies son pequenos archivos de texto almacenados en tu dispositivo cuando visitas un sitio web. Ayudan a recordar informacion, mejorar funcionalidad, analizar uso y ofrecer mejor experiencia.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Como usamos cookies</h2><p className="mt-3">Usamos cookies y tecnologias similares para operar, proteger, mejorar y analizar nuestro sitio y servicios.</p><ul className="mt-4 grid gap-3 sm:grid-cols-2">{uses.map((item) => (<li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" /><span>{item}</span></li>))}</ul></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Tipos de cookies que usamos</h2><div className="mt-4 grid gap-4 sm:grid-cols-2">{cookieTypes.map(([title, description]) => (<div key={title} className="rounded-2xl border border-border bg-background p-4"><h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3><p className="mt-2 text-sm leading-6">{description}</p></div>))}</div></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Analitica propia de contenido</h2><p className="mt-3">Usamos cookies propias llamadas <code>hyper_content_visitor_id</code> y <code>hyper_content_session_id</code> para contar vistas anonimas y clics en articulos, comparaciones, recursos, casos de estudio y herramientas. No almacenan nombres, emails ni direcciones IP en eventos de analitica de contenido.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Servicios de terceros</h2><p className="mt-3">Podemos usar servicios confiables de terceros para analitica, monitoreo de rendimiento, soporte y marketing. Estos proveedores pueden establecer cookies segun sus propias politicas.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Gestionar cookies</h2><p className="mt-3">La mayoria de navegadores permiten controlar cookies. Puedes bloquear, eliminar o limitar cookies. Desactivar ciertas cookies puede afectar funcionalidad y experiencia.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Senales Do Not Track</h2><p className="mt-3">Algunos navegadores ofrecen Do Not Track. Como no existe un estandar universal, nuestro sitio puede no responder a todas estas solicitudes.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Cambios en esta politica</h2><p className="mt-3">Podemos actualizar esta Politica de cookies ocasionalmente. Los cambios se publicaran en esta pagina con una fecha actualizada.</p></section>
              </div>
            </article>
          </div>
          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"><ShieldCheck aria-hidden="true" className="size-4 text-primary" />Preguntas sobre cookies?</div><p className="mt-2 text-sm leading-6 text-muted-foreground">Contactanos si tienes preguntas sobre esta Politica de cookies.</p></div><Link href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground"><Mail aria-hidden="true" className="size-4" />{siteConfig.email}</Link></div></div>
        </Container>
      </Section>
    </>
  );
}
