"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  ChevronDown,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Scale,
  SearchCheck,
  Settings2,
  UserCircle,
  UsersRound,
} from "lucide-react";

import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { cn } from "@/lib/utils";

const modules = [
  { href: "/admin", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Articles", Icon: BookOpenText },
  { href: "/admin/comparisons", label: "Comparisons", Icon: Scale },
  { href: "/admin/resources", label: "Resources", Icon: FileText },
  { href: "/admin/case-studies", label: "Case Studies", Icon: FileText },
  { href: "/admin/tools", label: "Tools", Icon: SearchCheck },
  { href: "/admin/team", label: "Team", Icon: UsersRound },
  { href: "/admin/settings", label: "Settings", Icon: Settings2 },
];

function SignOutButton({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <form action="/api/admin/auth/logout" method="post">
      <button
        type="submit"
        title={collapsed ? "Sign out" : undefined}
        aria-label={collapsed ? "Sign out" : undefined}
        className={cn(
          "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-background text-sm font-semibold text-muted-foreground transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:border-rose-400/20 dark:hover:bg-rose-400/10 dark:hover:text-rose-200",
          collapsed ? "w-10 px-0" : "w-full px-3",
        )}
      >
        <LogOut aria-hidden="true" className="size-4" />
        {!collapsed && <span>Sign out</span>}
      </button>
    </form>
  );
}

function isActiveModule(pathname: string, href: string) {
  if (href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({ editorLogin }: { editorLogin: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem("admin-sidebar-collapsed") === "true");
  }, []);

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current;
      localStorage.setItem("admin-sidebar-collapsed", String(next));
      return next;
    });
  }

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 overflow-hidden border-r border-border bg-surface/90 py-3 backdrop-blur transition-[width] duration-200 lg:flex lg:flex-col",
        collapsed ? "w-16 px-2" : "w-56 px-3",
      )}
    >
      <div className="flex items-center gap-2">
        <Link
          href="/admin"
          title={collapsed ? "Content Studio" : undefined}
          className={cn(
            "flex min-w-0 flex-1 items-center rounded-md transition-colors hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            collapsed ? "justify-center px-0 py-1.5" : "gap-2 px-2 py-1.5",
          )}
        >
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
            H
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Hyper
              </span>
              <span className="block truncate text-sm font-semibold tracking-tight">
                Content Studio
              </span>
            </span>
          )}
        </Link>
        {!collapsed && (
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <PanelLeftClose aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label="Expand sidebar"
          title="Expand sidebar"
          className="mt-2 inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <PanelLeftOpen aria-hidden="true" className="size-4" />
        </button>
      )}

      <nav
        aria-label="Content modules"
        className="mt-4 grid min-h-0 flex-1 content-start gap-1 overflow-y-auto"
      >
        {modules.map(({ href, label, Icon }) => {
          const active = isActiveModule(pathname, href);

          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              aria-label={collapsed ? label : undefined}
              className={cn(
                "group flex h-10 items-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                collapsed ? "justify-center px-0" : "gap-2 px-2",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "inline-flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors",
                  active
                    ? "border-primary/30 bg-background text-primary"
                    : "border-border bg-background text-muted-foreground group-hover:border-primary/40 group-hover:text-primary",
                )}
              >
                <Icon aria-hidden="true" className="size-4" />
              </span>
              {!collapsed && <span className="min-w-0 truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-3 shrink-0 border-t border-border pt-3">
        {profileOpen && (
          <div
            className={cn(
              "mb-2 grid gap-2 rounded-md border border-border bg-background p-2 shadow-sm",
              collapsed && "justify-items-center border-0 bg-transparent p-0 shadow-none",
            )}
          >
            {!collapsed && (
              <div className="flex items-center justify-between rounded-md border border-border bg-surface px-2 py-1">
                <span className="text-xs font-semibold text-muted-foreground">Theme</span>
                <ThemeSwitcher />
              </div>
            )}
            {collapsed && (
              <div
                title="Theme"
                className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background"
              >
                <ThemeSwitcher />
              </div>
            )}
            <Link
              href="/"
              title={collapsed ? "View website" : undefined}
              aria-label={collapsed ? "View website" : undefined}
              className={cn(
                "inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                collapsed ? "w-10 px-0" : "px-3",
              )}
            >
              <ExternalLink aria-hidden="true" className="size-4" />
              {!collapsed && <span>View website</span>}
            </Link>
            <SignOutButton collapsed={collapsed} />
          </div>
        )}

        <button
          type="button"
          onClick={() => setProfileOpen((current) => !current)}
          aria-expanded={profileOpen}
          aria-label={collapsed ? "Open profile menu" : undefined}
          title={collapsed ? editorLogin : undefined}
          className={cn(
            "flex h-10 w-full items-center rounded-md border border-border bg-background text-left text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            collapsed ? "justify-center px-0" : "gap-2 px-2",
          )}
        >
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <UserCircle aria-hidden="true" className="size-4" />
          </span>
          {!collapsed && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Signed in
                </span>
                <span className="block truncate">{editorLogin}</span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  "size-4 shrink-0 text-muted-foreground transition-transform",
                  profileOpen && "rotate-180",
                )}
              />
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
