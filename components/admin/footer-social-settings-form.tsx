"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { CheckCircle2, ExternalLink, LoaderCircle, Save, Share2 } from "lucide-react";

import {
  footerSocialChannels,
  type FooterSocialLink,
  type FooterSocialSettingsSummary,
} from "@/config/footer-social";

type ApiResponse = {
  error?: string;
  settings?: FooterSocialSettingsSummary;
};

type FooterSocialSettingsFormProps = {
  initialSettings: FooterSocialSettingsSummary;
};

async function responseBody(response: Response): Promise<ApiResponse> {
  const value = (await response.json().catch(() => ({}))) as ApiResponse;

  if (!response.ok) {
    throw new Error(value.error || "The request could not be completed.");
  }

  return value;
}

function normalizeLinks(links: FooterSocialLink[]): FooterSocialLink[] {
  return footerSocialChannels.map((channel) => {
    const link = links.find((item) => item.channel === channel.id);

    return {
      channel: channel.id,
      label: channel.label,
      href: link?.href ?? "",
      enabled: Boolean(link?.enabled),
    };
  });
}

export function FooterSocialSettingsForm({ initialSettings }: FooterSocialSettingsFormProps) {
  const [links, setLinks] = useState(() => normalizeLinks(initialSettings.links));
  const [updatedAt, setUpdatedAt] = useState(initialSettings.updatedAt);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const enabledCount = links.filter((link) => link.enabled && link.href).length;

  function updateLink(channel: FooterSocialLink["channel"], nextValue: Partial<FooterSocialLink>) {
    setLinks((currentLinks) =>
      currentLinks.map((link) => (link.channel === channel ? { ...link, ...nextValue } : link)),
    );
    setError("");
    setNotice("");
  }

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/settings/footer-social", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ links }),
      });
      const result = await responseBody(response);

      if (!result.settings) throw new Error("Footer social settings could not be saved.");

      setLinks(normalizeLinks(result.settings.links));
      setUpdatedAt(result.settings.updatedAt);
      setNotice("Footer social links were saved.");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Footer social settings could not be saved.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={saveSettings} className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary">
            <Share2 aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Footer social channels</p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              Choose which social channels appear in the public footer and set their destination links.
            </p>
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground">
          <CheckCircle2 aria-hidden="true" className="size-4 text-primary" />
          {enabledCount} enabled
        </span>
      </div>

      <ul className="mt-5 grid gap-3">
        {footerSocialChannels.map((channel) => {
          const link = links.find((item) => item.channel === channel.id);
          if (!link) return null;

          return (
            <li
              key={channel.id}
              className="grid gap-3 rounded-md border border-border bg-background p-4 sm:grid-cols-[minmax(8rem,0.45fr)_minmax(0,1fr)] sm:items-center"
            >
              <label className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <input
                  type="checkbox"
                  checked={link.enabled}
                  onChange={(event) => updateLink(channel.id, { enabled: event.target.checked })}
                  disabled={isSaving}
                  className="size-4 rounded border-border text-primary focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
                />
                <span>
                  {channel.label}
                  <span className="mt-1 block text-xs font-medium text-muted-foreground">
                    {link.enabled ? "Shown in footer" : "Hidden from footer"}
                  </span>
                </span>
              </label>

              <div className="flex min-w-0 items-center gap-2">
                <input
                  value={link.href}
                  onChange={(event) => updateLink(channel.id, { href: event.target.value })}
                  type="url"
                  inputMode="url"
                  name={`footer-social-${channel.id}`}
                  autoComplete="url"
                  autoCapitalize="none"
                  spellCheck={false}
                  required={link.enabled}
                  disabled={isSaving}
                  placeholder={channel.placeholder}
                  className="h-11 min-w-0 flex-1 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
                />
                {link.href ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${channel.label} link`}
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <ExternalLink aria-hidden="true" className="size-4" />
                  </a>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      {error ? (
        <p role="alert" className="mt-5 rounded-md border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-medium text-rose-800 dark:border-rose-400/30 dark:bg-rose-400/15 dark:text-rose-100">
          {error}
        </p>
      ) : null}

      {notice ? (
        <p role="status" className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-100">
          {notice}
        </p>
      ) : null}

      <div className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? <LoaderCircle aria-hidden="true" className="size-4 animate-spin" /> : <Save aria-hidden="true" className="size-4" />}
          Save social links
        </button>

        {updatedAt ? (
          <p className="text-xs font-medium text-muted-foreground">
            Last updated {new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(updatedAt))}
          </p>
        ) : null}
      </div>
    </form>
  );
}
