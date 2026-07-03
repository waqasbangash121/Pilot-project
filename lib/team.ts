import "server-only";

import { randomUUID } from "node:crypto";
import { and, asc, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { teamMembers, workspaces, workspaceSettings, type TeamMember } from "@/db/schema";
import { CONTENT_WORKSPACE_ID } from "@/lib/content-store";
import type { TeamMemberInput, TeamMemberRecord } from "@/types/team";

export class TeamInputError extends Error {}
export class TeamStoreError extends Error {}

function requiredString(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") throw new TeamInputError(`${label} is required.`);

  const result = value.trim();
  if (!result) throw new TeamInputError(`${label} is required.`);
  if (result.length > maxLength) throw new TeamInputError(`${label} must be ${maxLength} characters or fewer.`);

  return result;
}

function optionalString(value: unknown, label: string, maxLength: number): string {
  if (typeof value !== "string") return "";

  const result = value.trim();
  if (result.length > maxLength) throw new TeamInputError(`${label} must be ${maxLength} characters or fewer.`);

  return result;
}

function normalizePhoto(value: unknown): string {
  if (typeof value !== "string") return "";

  const path = value.trim();
  if (!path) return "";

  if (path.startsWith("data:image/")) {
    if (path.length > 1_500_000) throw new TeamInputError("Photo upload must be 1 MB or smaller.");
    if (/^data:image\/(png|jpe?g|webp|avif);base64,[a-z0-9+/=]+$/i.test(path)) return path;
    throw new TeamInputError("Photo upload must be a PNG, JPG, WebP, or AVIF image.");
  }

  const normalized = optionalString(path, "Photo", 2000);
  if (normalized.startsWith("/")) return normalized;

  try {
    const url = new URL(normalized);
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString();
  } catch {
    // Fall through to the user-facing validation error below.
  }

  throw new TeamInputError("Photo must be a root-relative path, an http(s) URL, or an uploaded image.");
}

function normalizeDisplayOrder(value: unknown): number {
  const order = Number(value ?? 0);
  if (!Number.isInteger(order) || order < 0 || order > 9999) {
    throw new TeamInputError("Display order must be a whole number between 0 and 9999.");
  }

  return order;
}

function toRecord(member: TeamMember): TeamMemberRecord {
  return {
    id: member.id,
    name: member.name,
    designation: member.designation,
    quote: member.quote,
    photoUrl: member.photoUrl ?? "",
    displayOrder: member.displayOrder,
    createdAt: member.createdAt.toISOString(),
    updatedAt: member.updatedAt.toISOString(),
  };
}

async function ensureWorkspace(): Promise<void> {
  const db = getDb();

  await db.insert(workspaces).values({
    id: CONTENT_WORKSPACE_ID,
    name: "Hyper Content Studio",
  }).onConflictDoNothing({ target: workspaces.id });

  await db.insert(workspaceSettings).values({
    workspaceId: CONTENT_WORKSPACE_ID,
  }).onConflictDoNothing({ target: workspaceSettings.workspaceId });
}

export function parseTeamMemberInput(value: unknown): TeamMemberInput {
  if (!value || typeof value !== "object") throw new TeamInputError("Invalid team member form data.");

  const input = value as Record<string, unknown>;

  return {
    name: requiredString(input.name, "Name", 120),
    designation: requiredString(input.designation, "Designation", 140),
    quote: optionalString(input.quote, "Quote", 220),
    photoUrl: normalizePhoto(input.photoUrl),
    displayOrder: normalizeDisplayOrder(input.displayOrder),
  };
}

export async function listTeamMembers(): Promise<TeamMemberRecord[]> {
  const db = getDb();
  const members = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.workspaceId, CONTENT_WORKSPACE_ID))
    .orderBy(asc(teamMembers.displayOrder), asc(teamMembers.createdAt));

  return members.map(toRecord);
}

export async function getTeamMemberById(id: string): Promise<TeamMemberRecord | null> {
  const db = getDb();
  const [member] = await db
    .select()
    .from(teamMembers)
    .where(and(eq(teamMembers.workspaceId, CONTENT_WORKSPACE_ID), eq(teamMembers.id, id)))
    .limit(1);

  return member ? toRecord(member) : null;
}

export async function saveTeamMember(input: TeamMemberInput, id?: string): Promise<TeamMemberRecord> {
  await ensureWorkspace();

  const db = getDb();
  const now = new Date();
  const values = {
    workspaceId: CONTENT_WORKSPACE_ID,
    name: input.name,
    designation: input.designation,
    quote: input.quote,
    photoUrl: input.photoUrl || null,
    displayOrder: input.displayOrder,
    updatedAt: now,
  };

  if (id) {
    const updated = await db
      .update(teamMembers)
      .set(values)
      .where(and(eq(teamMembers.workspaceId, CONTENT_WORKSPACE_ID), eq(teamMembers.id, id)))
      .returning();

    if (!updated[0]) throw new TeamStoreError("This team member no longer exists.");
    return toRecord(updated[0]);
  }

  const inserted = await db
    .insert(teamMembers)
    .values({
      id: randomUUID(),
      ...values,
      createdAt: now,
    })
    .returning();

  return toRecord(inserted[0]);
}

export async function deleteTeamMember(id: string): Promise<{ id: string; name: string }> {
  const db = getDb();
  const deleted = await db
    .delete(teamMembers)
    .where(and(eq(teamMembers.workspaceId, CONTENT_WORKSPACE_ID), eq(teamMembers.id, id)))
    .returning({ id: teamMembers.id, name: teamMembers.name });

  if (!deleted[0]) throw new TeamStoreError("This team member no longer exists.");

  return deleted[0];
}




