import Link from "next/link";
import { ArrowRight, Plus, UsersRound } from "lucide-react";

import { AdminEmptyState, AdminMetric } from "@/components/admin/admin-ui";
import { DeleteTeamMemberButton } from "@/components/admin/delete-team-member-button";
import { listTeamMembers } from "@/lib/team";
import { getInitials } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function TeamDashboardPage() {
  const members = await listTeamMembers();
  const withPhotos = members.filter((member) => member.photoUrl).length;

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Team library</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Team</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Manage the people shown on the public team page, including profile photos, roles, quotes, and display order.</p>
          </div>
          <Link href="/admin/team/new" className="inline-flex h-10 w-fit items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Plus aria-hidden="true" className="size-4" />
            Add member
          </Link>
        </div>
      </section>

      <section aria-label="Team stats" className="grid gap-3 sm:grid-cols-3">
        <AdminMetric label="Team members" value={members.length} tone="blue" />
        <AdminMetric label="With photos" value={withPhotos} tone="green" />
        <AdminMetric label="Ordered profiles" value={members.length} tone="violet" />
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4 sm:px-5">
          <div>
            <h2 className="font-semibold tracking-tight">People</h2>
            <p className="mt-1 text-sm text-muted-foreground">Lowest display order appears first on the public page.</p>
          </div>
          <span className="hidden items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground sm:inline-flex">
            <UsersRound aria-hidden="true" className="size-4" />
            Public team page
          </span>
        </div>

        {members.length ? (
          members.map((member) => (
            <article key={member.id} className="group grid gap-4 border-b border-border px-4 py-4 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5">
              <div className="flex min-w-0 gap-3">
                <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-muted text-sm font-semibold text-primary">
                  {member.photoUrl ? <img src={member.photoUrl} alt="" className="h-full w-full object-cover" /> : getInitials(member.name)}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="truncate text-base font-semibold tracking-tight text-foreground">{member.name}</h2>
                    <span className="rounded-md border border-border bg-muted/60 px-2 py-1 text-xs font-medium text-foreground/80">Order {member.displayOrder}</span>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted-foreground">{member.designation}</p>
                  {member.quote ? <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{member.quote}</p> : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Link href={`/admin/team/${member.id}`} className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-muted/60 px-3 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  Edit
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <DeleteTeamMemberButton compact id={member.id} name={member.name} />
              </div>
            </article>
          ))
        ) : (
          <AdminEmptyState title="No team members yet" description="Add the first person to start building the public team page." href="/admin/team/new" action="Add member" Icon={UsersRound} />
        )}
      </section>
    </div>
  );
}
