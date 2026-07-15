import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ImageIcon,
  ListOrdered,
  Quote,
  UserRound,
  UsersRound,
} from "lucide-react";

import { AdminEmptyState } from "@/components/admin/admin-ui";
import { DeleteTeamMemberButton } from "@/components/admin/delete-team-member-button";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { listTeamMembers } from "@/lib/team";
import { cn, getInitials } from "@/lib/utils";

export const dynamic = "force-dynamic";

function pct(value: number, total: number): number {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}

function StatCard({
  label,
  value,
  detail,
  Icon,
  tone = "blue",
}: {
  label: string;
  value: string;
  detail: string;
  Icon: LucideIcon;
  tone?: "blue" | "green" | "violet" | "amber";
}) {
  const toneClasses = {
    blue: "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-50",
    green:
      "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50",
    violet:
      "border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50",
    amber:
      "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-50",
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className={cn("inline-flex size-10 items-center justify-center rounded-md border", toneClasses[tone])}>
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <span className="rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Team
        </span>
      </div>
      <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-2 text-sm leading-5 text-muted-foreground">{detail}</p>
    </div>
  );
}

export default async function TeamDashboardPage() {
  const members = await listTeamMembers();
  const withPhotos = members.filter((member) => member.photoUrl).length;
  const withLinkedIn = members.filter((member) => member.linkedinUrl).length;
  const withQuotes = members.filter((member) => member.quote).length;
  const orderedMembers = [...members].sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name));
  const firstMember = orderedMembers[0];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="flex flex-col gap-5 border-b border-border p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <UsersRound aria-hidden="true" className="size-4 text-primary" />
                Team library
              </span>
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">
                {withPhotos} with photos
              </span>
              <span className="rounded-md border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-900 dark:border-violet-400/30 dark:bg-violet-400/15 dark:text-violet-50">
                {withLinkedIn} with LinkedIn
              </span>
            </div>
            <div className="mt-5 max-w-3xl">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Team</h1>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Manage the people shown on the public team page, including profile photos, LinkedIn profiles, roles, quotes, and display order.
              </p>
            </div>
          </div>
          <Link
            href="/admin/team/new"
            className="inline-flex h-10 w-fit shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Add member
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Team members" value={String(members.length)} detail={`${pct(withPhotos, members.length)}% have profile photos.`} Icon={UsersRound} tone="blue" />
          <StatCard label="With photos" value={String(withPhotos)} detail="Profiles with a public image attached." Icon={ImageIcon} tone="green" />
          <StatCard label="LinkedIn coverage" value={`${pct(withLinkedIn, members.length)}%`} detail={`${withLinkedIn} profiles include LinkedIn links.`} Icon={UsersRound} tone="violet" />
          <StatCard label="With quotes" value={String(withQuotes)} detail="Profiles with a public quote or note." Icon={Quote} tone="amber" />
        </div>
      </section>

      <section className="grid gap-4">
        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <UsersRound aria-hidden="true" className="size-4 text-primary" />
                People
              </div>
              <h2 className="mt-2 font-semibold tracking-tight">Public team roster</h2>
              <p className="mt-1 text-sm text-muted-foreground">Lowest display order appears first on the public page.</p>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
              <ListOrdered aria-hidden="true" className="size-4" />
              Ordered profiles
            </span>
          </div>

          {orderedMembers.length ? (
            <div className="grid gap-3 p-4 lg:grid-cols-2">
              {orderedMembers.map((member) => (
                <article key={member.id} className="rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-muted/40">
                  <div className="flex min-w-0 gap-3">
                    <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-muted text-sm font-semibold text-primary">
                      {member.photoUrl ? <img src={member.photoUrl} alt="" className="h-full w-full object-cover" /> : getInitials(member.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-semibold tracking-tight text-foreground">{member.name}</h3>
                        <span className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">Order {member.displayOrder}</span>
                      </div>
                      <p className="mt-1 truncate text-sm text-muted-foreground">{member.designation}</p>
                      {member.quote ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{member.quote}</p> : null}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">
                      <ImageIcon aria-hidden="true" className="size-3.5" />
                      {member.photoUrl ? "Photo" : "No photo"}
                    </span>
                    {member.linkedinUrl ? (
                      <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border border-sky-200 bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-900 hover:underline dark:border-sky-400/30 dark:bg-sky-400/15 dark:text-sky-50">
                        <LinkedInIcon className="size-3.5" />
                        LinkedIn
                      </a>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3">
                    <span className="truncate text-sm text-muted-foreground">Display order {member.displayOrder}</span>
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/team/${member.id}`} className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        Edit
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                      <DeleteTeamMemberButton compact id={member.id} name={member.name} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <AdminEmptyState title="No team members yet" description="Add the first person to start building the public team page." href="/admin/team/new" action="Add member" Icon={UsersRound} />
          )}
        </div>

        <aside className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">First profile</p>
                <h2 className="mt-1 text-base font-semibold tracking-tight">Public ordering</h2>
              </div>
              <UserRound aria-hidden="true" className="size-5 text-primary" />
            </div>
            {firstMember ? (
              <div className="mt-4 rounded-lg border border-border bg-background p-4">
                <p className="text-sm font-semibold">{firstMember.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{firstMember.designation}</p>
                <Link href={`/admin/team/${firstMember.id}`} className="mt-4 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Open profile
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            ) : (
              <p className="mt-4 rounded-md border border-border bg-background p-3 text-sm leading-6 text-muted-foreground">Add a team member to populate the public roster.</p>
            )}
          </div>

          <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Profile coverage</p>
            <h2 className="mt-1 text-base font-semibold tracking-tight">Readiness</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">{withPhotos} photos</span>
              <span className="rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">{withLinkedIn} LinkedIn</span>
              <span className="rounded-md border border-border bg-background px-2 py-1 text-xs font-semibold text-muted-foreground">{withQuotes} quotes</span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
