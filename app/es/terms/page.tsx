import Link from "next/link";
import { FileText, Mail, Scale, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";

export const metadata = createSpanishPageMetadata({
  title: "Terminos de servicio",
  description:
    "Lee los terminos de servicio de Hyper Apps que regulan el uso de nuestro sitio, aplicaciones Shopify y servicios relacionados.",
  path: "/es/terms",
});

const responsibilities = [
  "Mantener informacion exacta de cuenta y tienda.",
  "Proteger credenciales y permisos de acceso a la tienda.",
  "Asegurar que toda actividad de la cuenta cumpla leyes aplicables y politicas de Shopify.",
  "Notificarnos rapidamente sobre acceso no autorizado o problemas de seguridad.",
];

const acceptableUse = [
  "Usar servicios con fines ilegales, fraudulentos o abusivos.",
  "Intentar interferir con la operacion o seguridad del servicio.",
  "Aplicar ingenieria inversa, copiar o explotar nuestro software fuera del uso permitido.",
  "Violar derechos de propiedad intelectual o derechos de terceros.",
  "Subir codigo malicioso, malware o contenido danino.",
];

export default function SpanishTermsPage() {
  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"><Sparkles aria-hidden="true" className="size-3.5 text-primary" />Terminos del servicio</div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Actualizado: junio de 2026</p>
                <h1 className="mt-3 max-w-4xl type-display">Terminos de servicio</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Estos Terminos de servicio regulan tu acceso y uso del sitio de Hyper, aplicaciones Shopify, productos y servicios relacionados. Al acceder o usar nuestros servicios, aceptas estos terminos.</p>
              </div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6"><Scale aria-hidden="true" className="size-5 text-primary" /><p className="mt-4 text-4xl font-semibold tracking-tight">12</p><p className="mt-1 text-sm font-semibold text-foreground">meses como base de responsabilidad</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Los terminos cubren uso, facturacion, propiedad, datos, disponibilidad y terminacion.</p></aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside className="h-fit rounded-3xl border border-border bg-surface p-5 shadow-sm lg:sticky lg:top-24"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Alcance del acuerdo</p><div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground"><p>Estos terminos aplican a sitios Hyper, aplicaciones Shopify, productos y servicios relacionados.</p><p>El uso de servicios tambien se rige por nuestra Politica de privacidad.</p></div></aside>
            <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="space-y-9 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Aceptacion de terminos</h2><p className="mt-3">Al instalar, acceder o usar cualquier servicio Hyper, aceptas cumplir estos Terminos de servicio y todas las leyes y regulaciones aplicables.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Servicios</h2><p className="mt-3">Hyper proporciona aplicaciones de software, herramientas, integraciones, analitica, automatizacion y servicios relacionados para comerciantes Shopify y negocios ecommerce. Podemos modificar, actualizar, suspender o discontinuar funciones en cualquier momento.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Responsabilidades de cuenta</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{responsibilities.map((item) => (<li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6"><ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /><span>{item}</span></li>))}</ul></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Uso aceptable</h2><p className="mt-3">Aceptas no:</p><ul className="mt-4 grid gap-3">{acceptableUse.map((item) => (<li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" /><span>{item}</span></li>))}</ul></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Facturacion y pagos</h2><p className="mt-3">Las suscripciones pagas se facturan mediante Shopify u otros proveedores aprobados segun el plan seleccionado. Las tarifas generalmente no son reembolsables salvo que la ley exija lo contrario o se indique expresamente.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Propiedad intelectual</h2><p className="mt-3">Todo software, marcas, contenido, documentacion y tecnologia proporcionados por Hyper siguen siendo propiedad exclusiva nuestra salvo indicacion contraria. Estos terminos no otorgan propiedad sobre propiedad intelectual de Hyper.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Datos y privacidad</h2><p className="mt-3">El uso de nuestros servicios tambien se rige por nuestra Politica de privacidad, que explica como se recopila, usa y protege informacion.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Disponibilidad del servicio</h2><p className="mt-3">Buscamos ofrecer servicios confiables, pero no garantizamos disponibilidad ininterrumpida, operacion sin errores o compatibilidad con todos los sistemas de terceros.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Limitacion de responsabilidad</h2><p className="mt-3">En la maxima medida permitida por ley, Hyper no sera responsable por danos indirectos, incidentales, consecuentes, especiales o punitivos derivados del uso de nuestros servicios. Nuestra responsabilidad total no excedera el importe pagado por ti por el servicio durante los doce meses anteriores al reclamo.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Terminacion</h2><p className="mt-3">Podemos suspender o terminar el acceso si se violan estos terminos o si es necesario por razones operativas, legales o de seguridad. Puedes dejar de usar los servicios desinstalando nuestras aplicaciones o cerrando tu cuenta.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Cambios en estos terminos</h2><p className="mt-3">Podemos actualizar estos Terminos de servicio periodicamente. Continuar usando los servicios tras las actualizaciones constituye aceptacion de los terminos revisados.</p></section>
              </div>
            </article>
          </div>
          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"><FileText aria-hidden="true" className="size-4 text-primary" />Preguntas sobre estos terminos?</div><p className="mt-2 text-sm leading-6 text-muted-foreground">Contactanos si tienes preguntas sobre estos Terminos de servicio.</p></div><Link href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground"><Mail aria-hidden="true" className="size-4" />{siteConfig.email}</Link></div></div>
        </Container>
      </Section>
    </>
  );
}
