import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createSpanishPageMetadata } from "@/lib/i18n/metadata";
import { getAllBlogPosts } from "@/lib/blog";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllComparisons } from "@/lib/comparisons";
import { getAllResources } from "@/lib/resources";
import { getAllTools } from "@/lib/tools";

export const dynamic = "force-dynamic";

export const metadata = createSpanishPageMetadata({
  title: "Buscar contenido Shopify de Hyper Apps",
  description:
    "Busca articulos, recursos, comparaciones, casos de estudio y herramientas de NiagaraT Hyper Apps para Shopify.",
  path: "/es/search",
});

type SearchPageProps = { searchParams: Promise<{ q?: string }> };
type SearchResult = { title: string; description: string; href: string; type: string; keywords: string[] };

function normalizeQuery(value: string | undefined): string { return (value || "").trim().replace(/\s+/g, " ").slice(0, 80); }
function compactStrings(values: Array<string | undefined>): string[] { return values.filter((value): value is string => Boolean(value)); }
function matchesQuery(result: SearchResult, query: string): boolean {
  const haystack = [result.title, result.description, result.type, ...result.keywords].join(" ").toLowerCase();
  return query.toLowerCase().split(" ").every((term) => haystack.includes(term));
}

export default async function SpanishSearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = normalizeQuery(q);
  const [posts, resources, comparisons, caseStudies, tools] = await Promise.all([getAllBlogPosts(), getAllResources(), getAllComparisons(), getAllCaseStudies(), getAllTools()]);
  const results: SearchResult[] = [
    ...posts.map((post) => ({ title: post.title, description: post.excerpt, href: `/blog/${post.slug}`, type: "Articulo", keywords: compactStrings([...(post.tags || []), post.category]) })),
    ...resources.map((resource) => ({ title: resource.title, description: resource.excerpt, href: `/resources/${resource.slug}`, type: "Recurso", keywords: compactStrings([...(resource.tags || []), resource.category, resource.resourceType, resource.audience]) })),
    ...comparisons.map((comparison) => ({ title: comparison.title, description: comparison.excerpt, href: `/comparisons/${comparison.slug}`, type: "Comparacion", keywords: compactStrings([...(comparison.tags || []), comparison.category, comparison.competitorName]) })),
    ...caseStudies.map((caseStudy) => ({ title: caseStudy.title, description: caseStudy.excerpt, href: `/case-studies/${caseStudy.slug}`, type: "Caso de estudio", keywords: compactStrings([...(caseStudy.tags || []), caseStudy.category, caseStudy.customerName, caseStudy.industry]) })),
    ...tools.map((tool) => ({ title: tool.title, description: tool.excerpt, href: `/tools/${tool.slug}`, type: "Herramienta", keywords: compactStrings([...(tool.tags || []), tool.category, tool.toolType, tool.useCase]) })),
  ];
  const filteredResults = query ? results.filter((result) => matchesQuery(result, query)).slice(0, 24) : [];

  return (
    <Section className="pb-20 pt-20 sm:pt-28 lg:pt-32">
      <Container className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">Buscar</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Buscar contenido Shopify de Hyper Apps</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">Encuentra contenido sobre Hyper Apps, descubrimiento de productos, soporte con IA, videos comprables, conversion ecommerce, comparaciones, casos de estudio y herramientas.</p>
        <form action="/es/search" className="mt-8 flex flex-col gap-3 rounded-[10px] border border-border bg-surface p-4 shadow-sm sm:flex-row">
          <input type="search" name="q" defaultValue={query} placeholder="Buscar busqueda Shopify, chat IA, preguntas frecuentes, videos..." className="h-12 min-w-0 flex-1 rounded-md border border-border bg-background px-4 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2" />
          <button type="submit" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Buscar</button>
        </form>
        {query ? <div className="mt-8"><p className="text-sm font-semibold text-muted-foreground">{filteredResults.length ? `${filteredResults.length} resultado${filteredResults.length === 1 ? "" : "s"} para "${query}"` : `Sin resultados para "${query}"`}</p>{filteredResults.length ? <div className="mt-4 grid gap-3">{filteredResults.map((result) => (<Link key={result.href} href={result.href} className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-primary/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{result.type}</span><h2 className="mt-2 text-xl font-semibold tracking-tight">{result.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{result.description}</p></Link>))}</div> : null}</div> : null}
      </Container>
    </Section>
  );
}
