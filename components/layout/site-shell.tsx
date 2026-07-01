"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { CookieBanner } from "./cookie-banner";
import { SiteHeader } from "./site-header";

type SiteShellProps = {
  children: ReactNode;
  footer: ReactNode;
};

export function SiteShell({ children, footer }: SiteShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      {footer}
      <CookieBanner />
    </div>
  );
}
