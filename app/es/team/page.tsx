import { BadgeCheck, Bot, SearchCheck, Sparkles, UsersRound } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";
import { publicImageSrc } from "@/lib/public-image-src";
import { toJsonLd } from "@/lib/schema";
import { listTeamMembers } from "@/lib/team";
import { getInitials } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = createSpanishPageMetadata({
  title: "Nuestro equipo",
  description: "Conoce a las personas que construyen las apps de comercio con IA de Hyper para comerciantes Shopify.",
  path: "/es/team",
});

const teamPrinciples = [
  ["Experiencia en descubrimiento de productos", "El equipo se enfoca en ayudar a compradores a encontrar productos mas rapido con busqueda IA, filtros y flujos de merchandising.", SearchCheck],
  ["Soporte IA para comercio", "Hyper aplica IA a preguntas de clientes, dudas de compra y soporte con casos de uso practicos para Shopify.", Bot],
  ["Ejecucion orientada a conversion", "Cada app se disena alrededor de resultados medibles: mejor interaccion, recorridos claros y compras con confianza.", BadgeCheck],
] as const;

export default async function SpanishTeamPage() {
  const members = await listTeamMembers();
  const teamUrl = new URL("/es/team", siteConfig.url).toString();
  const personSchemas = members.map((member) => ({
    "@type": "Person",
    "@id": `${teamUrl}#${member.id}`,
    name: member.name,
    jobTitle: member.designation,
    description: member.quote || `Miembro del equipo ${siteConfig.name} que construye herramientas de comercio con IA para Shopify.`,
    image: member.photoUrl ? new URL(member.photoUrl, siteConfig.url).toString() : undefined,
    sameAs: member.linkedinUrl ? [member.linkedinUrl] : undefined,
    worksFor: { "@id": `${siteConfig.url}#organization` },
  }));
  const teamSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${teamUrl}#webpage`,
        name: "Nuestro equipo",
        url: teamUrl,
        inLanguage: "es",
        description: "Conoce a las personas que construyen las apps de comercio con IA de Hyper para Shopify.",
        isPartOf: { "@id": `${siteConfig.url}#website` },
        about: { "@id": `${siteConfig.url}#organization` },
        mainEntity: personSchemas.map((person) => ({ "@id": person["@id"] })),
      },
      ...personSchemas,
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(teamSchema) }} />
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"><Sparkles aria-hidden="true" className="size-3.5 text-primary" />Nuestro equipo</div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Personas detras de Hyper</p>
                <h1 className="mt-3 max-w-4xl type-display">Conoce al equipo que construye herramientas practicas de comercio con IA.</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Hyper esta formado por builders enfocados en ayudar a equipos Shopify a mejorar descubrimiento, soporte y conversion con productos de IA utiles.</p>
              </div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6"><UsersRound aria-hidden="true" className="size-5 text-primary" /><p className="mt-4 text-4xl font-semibold tracking-tight">{members.length}</p><p className="mt-1 text-sm font-semibold text-foreground">{members.length === 1 ? "miembro" : "miembros"} del equipo</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Personas trabajando en mejores experiencias de compra para equipos ecommerce modernos.</p></aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-8 sm:pb-10">
        <Container className="max-w-6xl"><div className="grid gap-4 md:grid-cols-3">{teamPrinciples.map(([title, description, Icon]) => (<article key={title} className="rounded-2xl border border-border bg-surface p-5 shadow-sm"><span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-primary"><Icon aria-hidden="true" className="size-5" /></span><h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p></article>))}</div></Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Perfiles del equipo</p><h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Las personas que impulsan Hyper.</h2></div><p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">Un equipo pequeno con enfoque practico: construir productos de comercio con IA que encajen con flujos reales de comerciantes.</p></div>
          {members.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {members.map((member, index) => (
                <article key={member.id} tabIndex={0} className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm outline-none ring-ring transition-all sm:hover:-translate-y-1 sm:hover:border-primary/45 sm:hover:shadow-[0_24px_54px_-38px_hsl(var(--shadow)/0.78)] focus-visible:ring-2">
                  {member.photoUrl ? <img src={publicImageSrc(member.photoUrl)} alt={member.name} width={640} height={800} decoding="async" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} sizes="(min-width: 1280px) 352px, (min-width: 640px) calc((100vw - 5rem) / 2), calc(100vw - 2rem)" className="h-full w-full object-cover transition duration-300 sm:group-hover:scale-[1.03] group-focus-visible:scale-[1.03]" /> : <div className="grid h-full w-full place-items-center bg-muted"><span className="inline-flex size-24 items-center justify-center rounded-full border border-border bg-surface text-2xl font-semibold text-primary">{getInitials(member.name) || "H"}</span></div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-transparent opacity-100 transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100"><div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6"><div className="min-w-0 pr-2"><h3 className="text-2xl font-semibold tracking-tight text-white">{member.name}</h3><p className="mt-2 text-sm font-semibold text-orange-100">{member.designation}</p>{member.quote ? <p className="mt-4 text-sm leading-7 text-white/86">{member.quote}</p> : null}</div>{member.linkedinUrl ? <a href={member.linkedinUrl} target="_blank" rel="noreferrer" aria-label={member.name + " en LinkedIn"} className="mb-1 inline-flex size-12 shrink-0 items-center justify-center rounded-lg border-4 border-sky-400 bg-slate-950/25 text-base font-bold leading-none text-sky-200 shadow-[0_10px_30px_-18px_rgba(14,165,233,0.95)] backdrop-blur-sm transition duration-300 hover:bg-sky-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200">in</a> : null}</div></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center"><span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-background text-primary"><UsersRound aria-hidden="true" className="size-6" /></span><h3 className="mt-4 text-2xl font-semibold tracking-tight">Los perfiles del equipo se estan preparando.</h3><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">La pagina del equipo Hyper se actualizara aqui cuando se agreguen perfiles desde Content Studio.</p></div>
          )}
        </Container>
      </Section>
    </>
  );
}
