import Link from "next/link";
import { ArrowRight, BookOpenText, FileText, Layers3, Scale, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAllBlogPosts } from "@/lib/blog";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";
import { publicImageSrc } from "@/lib/public-image-src";

export const dynamic = "force-dynamic";

export const metadata = createSpanishPageMetadata({
  title: "Blog de Hyper para descubrimiento y conversion en Shopify",
  description:
    "Lee articulos de NiagaraT Hyper Apps para comerciantes Shopify sobre busqueda, filtros, chat con IA, preguntas frecuentes, videos comprables y conversion ecommerce.",
  path: "/es/blog",
});

const categories = ["Comercio IA", "Crecimiento Shopify", "Descubrimiento de productos", "Soporte con IA", "Video commerce", "Optimizacion de conversion"];
const libraryLinks = [
  ["/es/comparisons", "Comparaciones", "Evalua opciones Shopify con criterios claros y ventajas y desventajas practicos.", Scale],
  ["/es/resources", "Recursos", "Usa playbooks, guias y plantillas accionables para equipos ecommerce.", FileText],
] as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T12:00:00.000Z`));
}

export default async function SpanishBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div><div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"><Sparkles aria-hidden="true" className="size-3.5 text-primary" />Ideas de NiagaraT Hyper</div><p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">Contenido Shopify de Hyper Apps</p><h1 className="mt-3 max-w-4xl type-display">Ideas practicas de Shopify para descubrimiento, soporte, interaccion y conversion.</h1><p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Explora perspectivas claras de NiagaraT sobre descubrimiento de productos, automatizacion de soporte, comercio con video y sistemas que ayudan a compradores a encontrar productos, obtener respuestas y comprar con confianza.</p></div>
              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6"><BookOpenText aria-hidden="true" className="size-5 text-primary" /><p className="mt-4 text-4xl font-semibold tracking-tight">{posts.length}</p><p className="mt-1 text-sm font-semibold text-foreground">{posts.length === 1 ? "articulo publicado" : "articulos publicados"}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Para comerciantes Shopify y equipos ecommerce que planean su siguiente mejora.</p></aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-6 sm:pb-8"><Container className="max-w-6xl"><div className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground"><Layers3 aria-hidden="true" className="size-4 text-primary" />Explorar por tema</div><p className="mt-1 text-sm leading-6 text-muted-foreground">Empieza por el area ecommerce que estas mejorando ahora.</p></div><span className="text-sm font-medium text-muted-foreground">{categories.length} areas</span></div><div className="mt-4 flex flex-wrap gap-2.5">{categories.map((category) => (<span key={category} className="rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground">{category}</span>))}</div></div></Container></Section>

      <Section spacing="none" className="pb-8 sm:pb-10"><Container className="max-w-6xl"><div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Lectura reciente</p><h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Ideas Shopify que puedes poner en practica.</h2></div><p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">Explora articulos seleccionados para planear mejoras de busqueda, soporte, video y conversion en Shopify.</p></div>{posts.length ? <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{posts.map((post) => (<Link key={post.slug} href={`/blog/${post.slug}`} className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/45">{post.coverImage ? <div className="-mx-6 -mt-6 mb-6 overflow-hidden border-b border-border bg-muted"><img src={publicImageSrc(post.coverImage)} alt={post.title} className="aspect-[16/9] w-full object-cover transition duration-300 group-hover:scale-[1.03]" loading="lazy" /></div> : null}<p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{post.category || "Articulo"}</p><h3 className="mt-3 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">{post.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p><div className="mt-auto flex flex-col gap-3 border-t border-border pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>{post.readingTime} min de lectura</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">Leer articulo<ArrowRight aria-hidden="true" className="size-4" /></span></Link>))}</div> : <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center"><BookOpenText aria-hidden="true" className="size-8 text-primary" /><h3 className="mt-4 text-2xl font-semibold tracking-tight">Los articulos estan en camino.</h3><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Nuevas perspectivas sobre Shopify, Hyper Apps y conversion apareceran aqui.</p></div>}</Container></Section>

      <Section spacing="none" className="pb-12 sm:pb-16"><Container className="max-w-6xl"><div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Seguir explorando</p><h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Mas formas de planear tu proxima mejora Shopify.</h2></div></div><div className="mt-5 grid gap-4 md:grid-cols-2">{libraryLinks.map(([href, label, description, Icon]) => (<Link key={href} href={href} className="group rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"><span className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-surface text-primary"><Icon aria-hidden="true" className="size-5" /></span><h3 className="mt-4 text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">{label}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">Explorar {label.toLowerCase()}<ArrowRight aria-hidden="true" className="size-4" /></span></Link>))}</div></div></Container></Section>
    </>
  );
}
