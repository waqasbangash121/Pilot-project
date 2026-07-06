import "server-only";

import { neon } from "@neondatabase/serverless";
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

function createSqlClient() {
  return neon(databaseUrl());
}

let database: ReturnType<typeof createDatabase> | undefined;
let sqlClient: ReturnType<typeof createSqlClient> | undefined;

export function getDb() {
  return (database ??= createDatabase());
}

export function getSql() {
  return (sqlClient ??= createSqlClient());
}
