import { KeyRound, Settings2, Share2, ShieldCheck } from "lucide-react";

import { AiSettingsForm } from "@/components/admin/ai-settings-form";
import { FooterSocialSettingsForm } from "@/components/admin/footer-social-settings-form";
import { getAiSettingsSummary } from "@/lib/ai-settings";
import { getFooterSocialSettingsSummary } from "@/lib/footer-social-settings";

export default async function AdminSettingsPage() {
  const [aiSettings, footerSocialSettings] = await Promise.all([
    getAiSettingsSummary(),
    getFooterSocialSettingsSummary(),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              <Settings2 aria-hidden="true" className="size-4 text-primary" />
              Workspace settings
            </span>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Control how Content Studio works.
            </h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Manage the secure integrations and shared workspace preferences that power drafting,
              review, and publishing.
            </p>
          </div>
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary">
            <ShieldCheck aria-hidden="true" className="size-6" />
          </span>
        </div>
      </section>

      <section aria-labelledby="footer-social-settings-heading">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Share2 aria-hidden="true" className="size-4 text-primary" />
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Footer settings
            </p>
          </div>
          <h2 id="footer-social-settings-heading" className="mt-2 text-2xl font-semibold tracking-tight">
            Manage social media links.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Set the Facebook, Twitter, Instagram, LinkedIn, and TikTok links that appear in the
            public website footer.
          </p>
        </div>
        <FooterSocialSettingsForm initialSettings={footerSocialSettings} />
      </section>

      <section aria-labelledby="ai-settings-heading">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <KeyRound aria-hidden="true" className="size-4 text-primary" />
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              AI settings
            </p>
          </div>
          <h2 id="ai-settings-heading" className="mt-2 text-2xl font-semibold tracking-tight">
            Bring your own OpenAI key.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            The saved key is used only by authenticated server-side Content Studio requests. It is
            not included in browser code, public pages, or GitHub content.
          </p>
        </div>
        <AiSettingsForm initialSettings={aiSettings} />
      </section>
    </div>
  );
}
