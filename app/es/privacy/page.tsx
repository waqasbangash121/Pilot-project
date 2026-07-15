import Link from "next/link";
import { Database, LockKeyhole, Mail, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";

export const metadata = createSpanishPageMetadata({
  title: "Politica de privacidad",
  description:
    "Conoce como Hyper Apps recopila, usa, almacena y protege informacion cuando usas nuestro sitio y aplicaciones Shopify.",
  path: "/es/privacy",
});

const collectedInfo = [
  "Informacion de contacto como nombre, email y datos de empresa.",
  "Informacion de tienda Shopify, URL de tienda, detalles de plan, apps instaladas y configuracion.",
  "Datos de uso como interacciones, eventos de analitica, metricas de rendimiento e informacion diagnostica.",
  "Informacion tecnica como navegador, dispositivo, direccion IP y sistema operativo.",
  "Datos orientados al cliente procesados por nuestras aplicaciones cuando son necesarios para la funcionalidad.",
];

const informationUses = [
  "Proporcionar, mantener y mejorar productos y servicios.",
  "Entregar funcionalidad de apps y funciones solicitadas por comerciantes.",
  "Prestar soporte al cliente y asistencia tecnica.",
  "Supervisar rendimiento y confiabilidad.",
  "Prevenir fraude, abuso, acceso no autorizado y uso indebido.",
  "Comunicar actualizaciones importantes y avisos de servicio.",
  "Cumplir obligaciones legales y requisitos de Shopify.",
];

const sharingRules = [
  "Proveedores confiables que ayudan a operar nuestro negocio.",
  "Proveedores de infraestructura, hosting, analitica y soporte.",
  "Autoridades legales cuando lo exige la ley.",
  "Sucesores en una fusion, adquisicion o transferencia de negocio.",
];

export default function SpanishPrivacyPage() {
  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Politica de datos
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Actualizado: junio de 2026</p>
                <h1 className="mt-3 max-w-4xl type-display">Politica de privacidad</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Hyper valora tu privacidad. Esta politica explica como recopilamos, usamos, divulgamos y protegemos informacion cuando visitas nuestro sitio, usas nuestras aplicaciones Shopify o interactuas con nuestros servicios.</p>
              </div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <ShieldCheck aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">0</p>
                <p className="mt-1 text-sm font-semibold text-foreground">datos vendidos</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">No vendemos datos de comerciantes ni informacion de clientes.</p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside className="h-fit rounded-3xl border border-border bg-surface p-5 shadow-sm lg:sticky lg:top-24">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Enfoque de privacidad</p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
                <p>Recopilamos informacion necesaria para proporcionar, proteger y mejorar los servicios Hyper.</p>
                <p>Nuestras aplicaciones acceden a datos Shopify solo cuando es necesario para la funcionalidad solicitada.</p>
              </div>
            </aside>
            <article className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              <div className="space-y-9 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">Informacion que recopilamos</h2>
                  <p className="mt-3">Podemos recopilar informacion de comerciantes, administradores, visitantes y clientes cuando sea necesaria para prestar nuestros servicios.</p>
                  <ul className="mt-4 grid gap-3">
                    {collectedInfo.map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6"><Database aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /><span>{item}</span></li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">Como usamos la informacion</h2>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {informationUses.map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" /><span>{item}</span></li>
                    ))}
                  </ul>
                </section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Datos de la plataforma Shopify</h2><p className="mt-3">Nuestras aplicaciones acceden a datos de tienda Shopify solo cuando es necesario para proporcionar la funcionalidad solicitada. La informacion especifica depende de los permisos otorgados durante la instalacion.</p><p className="mt-3">No vendemos datos de comerciantes ni informacion de clientes. Los datos se procesan solo para proporcionar y mejorar nuestros servicios.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Analitica y cookies</h2><p className="mt-3">Podemos usar cookies, herramientas de analitica y tecnologias similares para entender el uso del sitio, mejorar la experiencia, medir rendimiento y mantener seguridad. Puedes controlar cookies desde tu navegador.</p></section>
                <section>
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">Comparticion de datos</h2>
                  <p className="mt-3">No vendemos informacion personal. Podemos compartir informacion solo con:</p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {sharingRules.map((item) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-border bg-background p-4 text-sm leading-6"><UserCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /><span>{item}</span></li>
                    ))}
                  </ul>
                </section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Retencion de datos</h2><p className="mt-3">Conservamos informacion solo durante el tiempo necesario para prestar servicios, cumplir obligaciones legales, resolver disputas y hacer cumplir acuerdos. Tras desinstalar una app o cerrar una cuenta, los datos pueden eliminarse o anonimizarse segun requisitos operativos y legales.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Seguridad</h2><p className="mt-3">Implementamos salvaguardas administrativas, tecnicas y organizativas razonables para proteger informacion contra acceso no autorizado, divulgacion, alteracion o destruccion. Ningun metodo de transmision o almacenamiento electronico puede garantizar seguridad absoluta.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Tus derechos de privacidad</h2><p className="mt-3">Segun tu ubicacion, puedes tener derechos de acceso, correccion, eliminacion, restriccion o exportacion de informacion personal. Para ejercerlos, contactanos.</p></section>
                <section><h2 className="text-2xl font-semibold tracking-tight text-foreground">Cambios en esta politica</h2><p className="mt-3">Podemos actualizar esta Politica de privacidad ocasionalmente. Las actualizaciones se publicaran en esta pagina con una fecha revisada.</p></section>
              </div>
            </article>
          </div>
          <div className="mt-6 rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div><div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"><LockKeyhole aria-hidden="true" className="size-4 text-primary" />Preguntas sobre privacidad?</div><p className="mt-2 text-sm leading-6 text-muted-foreground">Contactanos sobre esta politica o nuestras practicas de datos.</p></div>
              <Link href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground"><Mail aria-hidden="true" className="size-4" />{siteConfig.email}</Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
