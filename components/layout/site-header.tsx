"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getAppsMegaMenu, getPrimaryNavigation } from "@/lib/i18n/navigation";

import { Container } from "../ui/container";
import { BrandMark } from "./brand-mark";
import { MegaMenu } from "./mega-menu";
import { SearchBar } from "./search-bar";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";

const MobileMenu = dynamic(() => import("./mobile-menu").then((m) => m.MobileMenu));

const navLinkClass =
  "inline-flex h-10 items-center rounded-[6px] px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const demoLinkClass =
  "inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-bold text-primary-foreground shadow-[0_14px_28px_-18px_hsl(var(--primary)/0.75)] transition hover:bg-primary/90 hover:shadow-[0_16px_30px_-18px_hsl(var(--primary)/0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const locale = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
  const primaryNavigation = getPrimaryNavigation(locale);
  const appsMegaMenu = getAppsMegaMenu(locale);
  const appsNavigationItem = primaryNavigation.find((item) => item.label === "Apps");
  const demoNavigationItem = primaryNavigation[primaryNavigation.length - 1];
  const regularNavigationItems = primaryNavigation.filter(
    (item) => item !== appsNavigationItem && item !== demoNavigationItem,
  );

  return (
    <header
      role="banner"
      className="sticky top-0 z-[100] border-b border-border/70 bg-background/92 shadow-[0_10px_30px_-28px_hsl(var(--shadow)/0.8)] backdrop-blur-xl"
    >
      <Container className="flex items-center gap-4 py-3">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 text-foreground"
          aria-label={locale === "es" ? "Pagina principal de Hyper Apps by NiagaraT" : "Hyper Apps by NiagaraT homepage"}
        >
          <BrandMark className="h-9 w-9 shrink-0" />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-black tracking-normal">Hyper Apps</span>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              by NiagaraT
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="ml-4 hidden items-center gap-1 xl:flex">
          {appsNavigationItem ? (
            <div className="group/mega relative">
              <Link href={appsNavigationItem.href} className={navLinkClass}>
                {appsNavigationItem.label}
              </Link>
              <MegaMenu columns={appsMegaMenu} />
            </div>
          ) : null}

          {regularNavigationItems.map((item) => (
            <Link key={item.href + item.label} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden w-full max-w-[14rem] lg:block xl:max-w-[12rem]">
          <SearchBar compact />
        </div>

        <div className="hidden md:block">
          <ThemeSwitcher />
        </div>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {demoNavigationItem ? (
          <Link
            href={demoNavigationItem.href}
            className="hidden lg:inline-flex"
            data-analytics-event="demo_booking_click"
            data-analytics-label="Header Book a Demo"
          >
            <span className={demoLinkClass}>{demoNavigationItem.label}</span>
          </Link>
        ) : null}

        <MobileMenu navigation={primaryNavigation} megaMenuColumns={appsMegaMenu} locale={locale} />
      </Container>
    </header>
  );
}



