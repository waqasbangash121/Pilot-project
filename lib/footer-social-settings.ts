import "server-only";

import { eq } from "drizzle-orm";

import { getDb } from "@/db";
import { workspaceSettings } from "@/db/schema";
import {
  defaultFooterSocialLinks,
  footerSocialChannels,
  type FooterSocialChannel,
  type FooterSocialLink,
  type FooterSocialSettingsSummary,
} from "@/config/footer-social";
import { ensureDefaultWorkspace } from "@/lib/workspace";
import type { RouteItem } from "@/types";

const footerSocialSettingsKey = "footerSocialLinks";
const maxUrlLength = 500;

export class FooterSocialSettingsError extends Error {
  constructor(
    message: string,
    readonly statusCode = 400,
  ) {
    super(message);
    this.name = "FooterSocialSettingsError";
  }
}

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function defaultLinkFor(channel: FooterSocialChannel): FooterSocialLink {
  const defaultLink = defaultFooterSocialLinks.find((link) => link.channel === channel.id);

  return {
    channel: channel.id,
    label: channel.label,
    href: defaultLink?.href ?? "",
    enabled: Boolean(defaultLink?.enabled),
  };
}

function routeItemFromLink(link: FooterSocialLink): RouteItem {
  const channel = footerSocialChannels.find((item) => item.id === link.channel);

  return {
    label: link.label,
    href: link.href,
    description: channel?.description ?? `${link.label} social profile`,
  };
}

function normalizeStoredSocialLinks(contentDefaults: Record<string, unknown> | null): FooterSocialLink[] {
  const storedSettings = contentDefaults?.[footerSocialSettingsKey];
  const storedLinks =
    isRecord(storedSettings) && Array.isArray(storedSettings.links) ? storedSettings.links : null;

  return footerSocialChannels.map((channel) => {
    const fallback = defaultLinkFor(channel);
    const source = storedLinks?.find((item) => isRecord(item) && item.channel === channel.id);

    if (!isRecord(source)) return fallback;

    const href = cleanString(source.href, maxUrlLength);

    return {
      channel: channel.id,
      label: channel.label,
      href,
      enabled: Boolean(source.enabled),
    };
  });
}

async function workspaceSettingsRecord() {
  const workspaceId = await ensureDefaultWorkspace();
  const db = getDb();

  const [settings] = await db
    .select({
      contentDefaults: workspaceSettings.contentDefaults,
      updatedAt: workspaceSettings.updatedAt,
    })
    .from(workspaceSettings)
    .where(eq(workspaceSettings.workspaceId, workspaceId))
    .limit(1);

  return { workspaceId, settings };
}

function settingsSummaryFromRecord(
  settings: { contentDefaults: Record<string, unknown>; updatedAt: Date } | undefined,
): FooterSocialSettingsSummary {
  return {
    links: normalizeStoredSocialLinks(settings?.contentDefaults ?? null),
    updatedAt: settings?.updatedAt?.toISOString() ?? null,
  };
}

function validateUrl(channel: FooterSocialChannel, href: string): void {
  try {
    const url = new URL(href);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      throw new Error("Unsupported URL protocol.");
    }
  } catch {
    throw new FooterSocialSettingsError(`Enter a valid http or https URL for ${channel.label}.`);
  }
}

function socialLinksFromInput(value: unknown): FooterSocialLink[] {
  if (!isRecord(value)) {
    throw new FooterSocialSettingsError("Invalid footer social settings request.");
  }

  const inputLinks = Array.isArray(value.links) ? value.links : [];

  return footerSocialChannels.map((channel) => {
    const source = inputLinks.find((item) => isRecord(item) && item.channel === channel.id);
    const href = isRecord(source) ? cleanString(source.href, maxUrlLength) : "";
    const enabled = isRecord(source) ? Boolean(source.enabled) : false;

    if (enabled && !href) {
      throw new FooterSocialSettingsError(`Enter a URL before enabling ${channel.label}.`);
    }

    if (href) validateUrl(channel, href);

    return {
      channel: channel.id,
      label: channel.label,
      href,
      enabled,
    };
  });
}

export async function getFooterSocialSettingsSummary(): Promise<FooterSocialSettingsSummary> {
  const { settings } = await workspaceSettingsRecord();
  return settingsSummaryFromRecord(settings);
}

export async function saveFooterSocialSettings(value: unknown): Promise<FooterSocialSettingsSummary> {
  const links = socialLinksFromInput(value);
  const { workspaceId, settings } = await workspaceSettingsRecord();
  const db = getDb();
  const now = new Date();
  const contentDefaults = {
    ...(settings?.contentDefaults ?? {}),
    [footerSocialSettingsKey]: { links },
  };

  await db
    .update(workspaceSettings)
    .set({
      contentDefaults,
      updatedAt: now,
    })
    .where(eq(workspaceSettings.workspaceId, workspaceId));

  return getFooterSocialSettingsSummary();
}

export function defaultFooterSocialRouteItems(): RouteItem[] {
  return defaultFooterSocialLinks.filter((link) => link.enabled && link.href).map(routeItemFromLink);
}

export async function getFooterSocialRouteItems(): Promise<RouteItem[]> {
  const settings = await getFooterSocialSettingsSummary();
  return settings.links.filter((link) => link.enabled && link.href).map(routeItemFromLink);
}

export async function getFooterSocialRouteItemsWithFallback(): Promise<RouteItem[]> {
  try {
    return await getFooterSocialRouteItems();
  } catch {
    return defaultFooterSocialRouteItems();
  }
}
