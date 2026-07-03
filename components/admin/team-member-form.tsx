"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImageIcon, Loader2, Save, Send, Upload, UserRound, X } from "lucide-react";

import type { TeamMemberInput, TeamMemberRecord } from "@/types/team";
import { getInitials } from "@/lib/utils";

type TeamMemberFormProps = {
  initialMember?: TeamMemberRecord;
};

const emptyMember: TeamMemberInput = {
  name: "",
  designation: "",
  quote: "",
  photoUrl: "",
  displayOrder: 0,
};

const fieldLabelClass = "grid gap-2 text-sm font-semibold";
const inputClass = "h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const textareaClass = "rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";
const sectionClass = "rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6";
const secondaryButtonClass = "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60";
const primaryButtonClass = "inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60";

function isPreviewableImage(value: string): boolean {
  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:image/");
}

export function TeamMemberForm({ initialMember }: TeamMemberFormProps) {
  const router = useRouter();
  const [member, setMember] = useState<TeamMemberInput>(initialMember ?? emptyMember);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageFailed, setImageFailed] = useState(false);
  const previewUrl = member.photoUrl.trim();
  const canPreview = previewUrl && isPreviewableImage(previewUrl) && !imageFailed;

  function update<K extends keyof TeamMemberInput>(key: K, value: TeamMemberInput[K]) {
    setMember((current) => ({ ...current, [key]: value }));
    if (key === "photoUrl") setImageFailed(false);
  }

  async function uploadPhoto(file: File | undefined) {
    if (!file || uploading) return;

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch("/api/admin/team/photo", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { error?: string; photoUrl?: string };

      if (!response.ok || !result.photoUrl) throw new Error(result.error || "The photo could not be uploaded.");

      update("photoUrl", result.photoUrl);
      setSuccess("Photo uploaded. Save the member to publish this image.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "The photo could not be uploaded.");
    } finally {
      setUploading(false);
    }
  }
  async function save() {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        initialMember ? `/api/admin/team/${encodeURIComponent(initialMember.id)}` : "/api/admin/team",
        {
          method: initialMember ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(member),
        },
      );
      const result = (await response.json()) as { error?: string; id?: string };

      if (!response.ok || !result.id) throw new Error(result.error || "The team member could not be saved.");

      setSuccess(initialMember ? "Team member updated." : "Team member created.");
      router.push(`/admin/team/${result.id}`);
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "The team member could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="space-y-6">
        <section className={sectionClass}>
          <Link href="/admin/team" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Team
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Team editor</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{initialMember ? "Edit team member" : "Create team member"}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Add the person, role, quote, ordering, and a photo path or URL that can be shown on the public team page.
          </p>
        </section>

        <section className={sectionClass}>
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <UserRound aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Profile details</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">Member information</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className={fieldLabelClass}>
              Full name
              <input value={member.name} onChange={(event) => update("name", event.target.value)} className={inputClass} maxLength={120} placeholder="Jane Cooper" />
            </label>
            <label className={fieldLabelClass}>
              Designation
              <input value={member.designation} onChange={(event) => update("designation", event.target.value)} className={inputClass} maxLength={140} placeholder="Head of Product" />
            </label>
            <label className={`${fieldLabelClass} sm:col-span-2`}>
              Quote
              <textarea value={member.quote} onChange={(event) => update("quote", event.target.value)} className={`${textareaClass} min-h-28`} maxLength={220} placeholder="A short line that captures this person's point of view." />
              <span className="text-xs font-normal text-muted-foreground">{member.quote.length}/220 characters</span>
            </label>
            <label className={fieldLabelClass}>
              Display order
              <input type="number" min="0" max="9999" value={member.displayOrder} onChange={(event) => update("displayOrder", Number(event.target.value))} className={inputClass} />
              <span className="text-xs font-normal text-muted-foreground">Lower numbers appear first.</span>
            </label>
          </div>
        </section>

        <section className={sectionClass}>
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
              <ImageIcon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Photo</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">Profile image</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Paste a root-relative path or http(s) URL, or upload a PNG, JPG, WebP, or AVIF image up to 1 MB.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5">
            <label className={fieldLabelClass}>
              Photo path or URL
              <input value={member.photoUrl.startsWith("data:image/") ? "Uploaded photo" : member.photoUrl} onChange={(event) => update("photoUrl", event.target.value)} disabled={member.photoUrl.startsWith("data:image/")} className={inputClass} placeholder="/images/team/jane.jpg or https://..." />
            </label>

            <div className="grid gap-3 rounded-md border border-border bg-background p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div>
                <p className="text-sm font-semibold">Upload photo</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">PNG, JPG, WebP, or AVIF. Maximum 1 MB.</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <label className={`${secondaryButtonClass} cursor-pointer`}>
                  {uploading ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : <Upload aria-hidden="true" className="size-4" />}
                  {uploading ? "Uploading..." : "Choose file"}
                  <input type="file" accept="image/png,image/jpeg,image/webp,image/avif" className="sr-only" disabled={uploading} onChange={(event) => uploadPhoto(event.target.files?.[0])} />
                </label>
                {member.photoUrl ? (
                  <button type="button" onClick={() => update("photoUrl", "")} disabled={uploading} className={secondaryButtonClass}>
                    <X aria-hidden="true" className="size-4" />
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside className="h-fit space-y-4 xl:sticky xl:top-24">
        <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-semibold">Preview</h2>
          <div tabIndex={0} className="group relative mt-4 aspect-[4/5] overflow-hidden rounded-lg border border-border bg-muted outline-none ring-ring transition focus-visible:ring-2">
            {canPreview ? (
              <img src={previewUrl} alt={member.name || "Team member preview"} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]" onError={() => setImageFailed(true)} />
            ) : (
              <div className="grid h-full w-full place-items-center bg-muted">
                <span className="inline-flex size-20 items-center justify-center rounded-full border border-border bg-surface text-xl font-semibold text-primary">
                  {getInitials(member.name) || "H"}
                </span>
              </div>
            )}

            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950/88 via-slate-950/42 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <div className="translate-y-4 transition duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                <p className="text-lg font-semibold tracking-tight text-white">{member.name || "Full name"}</p>
                <p className="mt-1 text-sm font-semibold text-orange-100">{member.designation || "Designation"}</p>
                <p className="mt-3 text-sm leading-6 text-white/82">{member.quote || "Short quote appears here."}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5 shadow-sm">
          <h2 className="font-semibold">Save changes</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">Saving updates Neon and refreshes the public team page.</p>
          <div className="mt-5 grid gap-3">
            <button type="button" onClick={() => router.push("/admin/team")} disabled={saving} className={secondaryButtonClass}>
              Cancel
            </button>
            <button type="button" onClick={save} disabled={saving} className={primaryButtonClass}>
              {saving ? <Loader2 aria-hidden="true" className="size-4 animate-spin" /> : initialMember ? <Save aria-hidden="true" className="size-4" /> : <Send aria-hidden="true" className="size-4" />}
              {saving ? "Saving..." : initialMember ? "Save member" : "Create member"}
            </button>
          </div>
        </div>

        {error ? <p className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-950 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-50">{error}</p> : null}
        {success ? <p className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-50">{success}</p> : null}
      </aside>
    </div>
  );
}



