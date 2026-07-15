"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { MegaMenuColumn, RouteItem } from "@/types";

import { Button } from "../ui/button";
import { SearchBar } from "./search-bar";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";

type MobileMenuProps = {
  navigation: RouteItem[];
  megaMenuColumns: MegaMenuColumn[];
  locale?: "en" | "es";
};

export function MobileMenu({ navigation, megaMenuColumns, locale = "en" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const productLinks = megaMenuColumns.flatMap((column) => column.links);
  const regularLinks = navigation.filter(
    (item) => item.label !== "Apps" && item.label !== "Book a Demo",
  );
  const demoLink = navigation.find((item) => item.label === "Book a Demo");

  const menu = isOpen ? (
    <div
      className="fixed inset-0 z-[9999] flex justify-end bg-black/40 backdrop-blur"
      role="dialog"
      aria-modal="true"
      onClick={() => setIsOpen(false)}
    >
      <div
        id="mobile-nav-panel"
        className="relative z-[9999] flex h-full w-full max-w-[23rem] flex-col border-l border-border bg-surface shadow-[0_0_32px_hsl(var(--shadow)/0.35)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 border-b border-border px-5 pb-4 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-foreground">Hyper Apps</p>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                by NiagaraT
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              {locale === "es" ? "Cerrar" : "Close"}
            </Button>
          </div>
          <SearchBar compact />
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {locale === "es" ? "Apps" : "Apps"}
          </p>
          <ul className="space-y-1">
            {productLinks.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-[6px] px-3 py-3 text-sm font-bold text-foreground transition hover:bg-primary/10"
                >
                  {item.label}
                  <span className="mt-1 block text-xs font-medium leading-5 text-muted-foreground">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {locale === "es" ? "Empresa" : "Company"}
          </p>
          <ul className="space-y-1">
            {regularLinks.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-[6px] px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 space-y-3 border-t border-border bg-surface px-5 py-4">
          {demoLink ? (
            <Link
              href={demoLink.href}
              onClick={() => setIsOpen(false)}
              className="flex h-11 items-center justify-center rounded-[6px] bg-primary px-4 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
              data-analytics-event="demo_booking_click"
              data-analytics-label="Mobile Book a Demo"
            >
              {demoLink.label}
            </Link>
          ) : null}
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {locale === "es" ? "Modo" : "Mode"}
            </p>
            <ThemeSwitcher />
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto border-primary/30 text-primary hover:border-primary/45 hover:bg-primary/10 md:hidden"
        aria-label={locale === "es" ? "Abrir menu movil" : "Open mobile menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setIsOpen(true)}
      >
        {locale === "es" ? "Menu" : "Menu"}
      </Button>

      {mounted ? createPortal(menu, document.body) : null}
    </>
  );
}



