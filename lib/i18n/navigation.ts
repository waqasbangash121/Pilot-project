import type { FooterNavigationGroup, MegaMenuColumn, RouteItem } from "@/types";

import { appsMegaMenu, footerNavigation, primaryNavigation } from "@/config/navigation";
import { localizePath } from "@/lib/i18n/paths";

const spanishPrimaryNavigation: RouteItem[] = [
  { label: "Apps", href: "/es/apps", description: "Hyper Apps para comerciantes Shopify" },
  { label: "Recursos", href: "/es/resources", description: "Guias y playbooks para Shopify" },
  { label: "Precios", href: "/es/pricing", description: "Compara planes e instalacion" },
  { label: "Sobre", href: "/es/about", description: "Sobre Hyper Apps by NiagaraT" },
  { label: "Hablar", href: "/es/contact", description: "Contacta a Hyper Apps by NiagaraT" },
];

const spanishAppsMegaMenu: MegaMenuColumn[] = [
  {
    title: "Hyper Apps",
    links: [
      {
        label: "Busqueda Shopify",
        href: "/es/apps/hyper-search-filter",
        description: "Busqueda IA, filtros, sinonimos, merchandising y analitica",
      },
      {
        label: "Chat IA",
        href: "/es/apps/hyper-ai-chat-faq",
        description: "Chatbot IA y FAQs buscables para preguntas de clientes",
      },
      {
        label: "Video comprable",
        href: "/es/apps/hyper-shoppable-videos",
        description: "Videos con productos etiquetados y widgets storefront",
      },
    ],
  },
];

const spanishFooterNavigation: FooterNavigationGroup[] = [
  {
    title: "Productos",
    links: [
      { label: "Todas las apps", href: "/es/apps", description: "Suite Hyper Apps" },
      { label: "Busqueda Shopify", href: "/es/apps/hyper-search-filter", description: "Busqueda y filtros" },
      { label: "Chat IA", href: "/es/apps/hyper-ai-chat-faq", description: "Chatbot y FAQs" },
      { label: "Video comprable", href: "/es/apps/hyper-shoppable-videos", description: "Videos comprables" },
      { label: "Precios", href: "/es/pricing", description: "Planes e instalacion" },
    ],
  },
  {
    title: "Aprender",
    links: [
      { label: "Recursos", href: "/es/resources", description: "Guias y playbooks" },
      { label: "Blog", href: "/es/blog", description: "Articulos y novedades" },
      { label: "Comparaciones", href: "/es/comparisons", description: "Comparaciones de apps Shopify" },
      { label: "Herramientas", href: "/es/tools", description: "Herramientas ecommerce Shopify" },
      { label: "Buscar", href: "/es/search", description: "Buscar contenido Hyper Apps" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Inicio", href: "/es", description: "Pagina principal" },
      { label: "Sobre", href: "/es/about", description: "Sobre Hyper Apps by NiagaraT" },
      { label: "Equipo", href: "/es/team", description: "Conoce al equipo" },
      { label: "Contacto", href: "/es/contact", description: "Contacta a NiagaraT" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacidad", href: "/es/privacy", description: "Como manejamos datos" },
      { label: "Terminos", href: "/es/terms", description: "Terminos de servicio" },
      { label: "Cookies", href: "/es/cookie-policy", description: "Uso de cookies" },
    ],
  },
  { title: "Social", links: [] },
];

export function getPrimaryNavigation(locale: "en" | "es"): RouteItem[] {
  return locale === "es" ? spanishPrimaryNavigation : primaryNavigation;
}

export function getAppsMegaMenu(locale: "en" | "es"): MegaMenuColumn[] {
  return locale === "es" ? spanishAppsMegaMenu : appsMegaMenu;
}

export function getFooterNavigation(locale: "en" | "es"): FooterNavigationGroup[] {
  return locale === "es" ? spanishFooterNavigation : footerNavigation;
}

export function localizeRouteItem(item: RouteItem, locale: "en" | "es"): RouteItem {
  return locale === "es" ? { ...item, href: localizePath(item.href, "es") } : item;
}
