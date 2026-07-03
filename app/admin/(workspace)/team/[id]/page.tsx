import { notFound } from "next/navigation";

import { DeleteTeamMemberButton } from "@/components/admin/delete-team-member-button";
import { TeamMemberForm } from "@/components/admin/team-member-form";
import { getTeamMemberById } from "@/lib/team";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = await getTeamMemberById(id);

  if (!member) notFound();

  return (
    <div className="space-y-6">
      <TeamMemberForm initialMember={member} />
      <section className="rounded-lg border border-rose-200 bg-rose-50/70 p-5 dark:border-rose-400/25 dark:bg-rose-400/10">
        <h2 className="text-lg font-semibold text-rose-950 dark:text-rose-50">Danger zone</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-rose-900/90 dark:text-rose-100/85">Remove this person from the database and the public team page. Restore it only from a database backup.</p>
        <div className="mt-4 max-w-xs">
          <DeleteTeamMemberButton id={id} name={member.name} />
        </div>
      </section>
    </div>
  );
}
