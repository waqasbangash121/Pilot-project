import "server-only";

import { drizzle } from "drizzle-orm/neon-http";

function databaseUrl(): string {
  const value = process.env.DATABASE_URL?.trim();

  if (!value) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return value;
}

function createDatabase() {
  return drizzle(databaseUrl());
}

let database: ReturnType<typeof createDatabase> | undefined;

export function getDb() {
  return (database ??= createDatabase());
}
