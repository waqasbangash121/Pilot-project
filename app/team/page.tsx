import { Sparkles, UsersRound } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { createPageMetadata } from "@/config/metadata";
import { listTeamMembers } from "@/lib/team";
import { getInitials } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Our Team",
  description: "Meet the people building Hyper's AI commerce apps for Shopify merchants.",
  path: "/team",
});

export default async function TeamPage() {
  const members = await listTeamMembers();

  return (
    <>
      <Section spacing="none" className="pb-6 pt-10 sm:pb-8 sm:pt-14 lg:pt-16">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-7 shadow-[0_28px_70px_-46px_hsl(var(--shadow)/0.72)] sm:px-10 sm:py-9">
            <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/4 size-72 rounded-full bg-[hsl(var(--brand-end)/0.1)] blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Sparkles aria-hidden="true" className="size-3.5 text-primary" />
                  Our Team
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-primary">People behind Hyper</p>
                <h1 className="mt-3 max-w-4xl type-display">Meet the team building practical AI commerce tools.</h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  Hyper is shaped by builders focused on helping Shopify teams improve discovery, support, and conversion with useful AI products.
                </p>
              </div>

              <aside className="rounded-2xl border border-border bg-background/75 p-5 backdrop-blur sm:p-6">
                <UsersRound aria-hidden="true" className="size-5 text-primary" />
                <p className="mt-4 text-4xl font-semibold tracking-tight">{members.length}</p>
                <p className="mt-1 text-sm font-semibold text-foreground">team {members.length === 1 ? "member" : "members"}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">The people working on better shopping experiences for modern ecommerce teams.</p>
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="none" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Team profiles</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">The people moving Hyper forward.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-right">A small team with a practical focus: build AI commerce products that fit real merchant workflows.</p>
          </div>

          {members.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {members.map((member) => (
                <article key={member.id} tabIndex={0} className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted shadow-sm outline-none ring-ring transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_24px_54px_-38px_hsl(var(--shadow)/0.78)] focus-visible:ring-2">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt={member.name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]" loading="lazy" />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-muted">
                      <span className="inline-flex size-24 items-center justify-center rounded-full border border-border bg-surface text-2xl font-semibold text-primary">{getInitials(member.name) || "H"}</span>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/88 via-slate-950/42 to-transparent p-5 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-6">
                    <div className="translate-y-4 transition duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                      <h3 className="text-2xl font-semibold tracking-tight text-white">{member.name}</h3>
                      <p className="mt-2 text-sm font-semibold text-orange-100">{member.designation}</p>
                      {member.quote ? <p className="mt-4 text-sm leading-7 text-white/82">{member.quote}</p> : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-12 text-center">
              <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-background text-primary">
                <UsersRound aria-hidden="true" className="size-6" />
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">Team profiles are being prepared.</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">The Hyper team page will update here as profiles are added from the Content Studio.</p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

