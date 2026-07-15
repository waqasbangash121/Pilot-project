import Link from "next/link";
import type { Metadata } from "next";
import {
  BookOpenText,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Scale,
  SearchCheck,
  Settings2,
  UsersRound,
} from "lucide-react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { requireEditor } from "@/lib/editor-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    absolute: "Hyper Content Studio",
  },
  description: "Private content workspace for Hyper Apps.",
  alternates: {
    canonical: null,
  },
  openGraph: null,
  twitter: null,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

const mobileModules = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Articles", Icon: BookOpenText },
  { href: "/admin/comparisons", label: "Comparisons", Icon: Scale },
  { href: "/admin/resources", label: "Resources", Icon: FileText },
  { href: "/admin/case-studies", label: "Case Studies", Icon: FileText },
  { href: "/admin/tools", label: "Tools", Icon: SearchCheck },
  { href: "/admin/team", label: "Team", Icon: UsersRound },
  { href: "/admin/settings", label: "Settings", Icon: Settings2 },
];

function SignOutButton({ compact = false }: { compact?: boolean }) {
  return (
    <form action="/api/admin/auth/logout" method="post">
      <button
        type="submit"
        className={
          compact
            ? "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:hover:border-rose-400/20 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
            : "inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold text-muted-foreground transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:hover:border-rose-400/20 dark:hover:bg-rose-400/10 dark:hover:text-rose-200"
        }
      >
        <LogOut aria-hidden="true" className="size-4" />
        Sign out
      </button>
    </form>
  );
}

export default async function ContentStudioLayout({ children }: { children: React.ReactNode }) {
  const editor = await requireEditor();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <AdminSidebar editorLogin={editor.login} />

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-border bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/admin"
                className="flex min-w-0 items-center gap-2 font-semibold tracking-tight"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
                  H
                </span>
                <span className="truncate">Content Studio</span>
              </Link>
              <div className="flex shrink-0 items-center gap-2">
                <div className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-2">
                  <ThemeSwitcher />
                </div>
                <Link
                  href="/"
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  <ExternalLink aria-hidden="true" className="size-4" />
                  Site
                </Link>
                <SignOutButton compact />
              </div>
            </div>

            <nav
              aria-label="Mobile content modules"
              className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5"
            >
              {mobileModules.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </header>

          <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
        </div>
      </div>
    </main>
  );
}



