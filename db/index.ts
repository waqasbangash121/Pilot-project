import "server-only";

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const MAX_DATABASE_FETCH_ATTEMPTS = 3;
const RETRYABLE_HTTP_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

let retryFetchConfigured = false;

function databaseUrl(): string {
  const value = process.env.DATABASE_URL?.trim();

  if (!value) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return value;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retryDelay(attempt: number): number {
  return 150 * 2 ** attempt + Math.floor(Math.random() * 75);
}

function isRequest(value: unknown): value is Request {
  return typeof Request !== "undefined" && value instanceof Request;
}

async function fetchBodyText(input: RequestInfo | URL, init?: RequestInit): Promise<string> {
  const body = init?.body;

  if (typeof body === "string") return body;
  if (body instanceof URLSearchParams) return body.toString();
  if (body instanceof ArrayBuffer) return new TextDecoder().decode(body);
  if (ArrayBuffer.isView(body)) {
    return new TextDecoder().decode(body);
  }

  if (isRequest(input)) {
    try {
      return await input.clone().text();
    } catch {
      return "";
    }
  }

  return "";
}

function isReadOnlySqlRequest(bodyText: string): boolean {
  const body = bodyText.toLowerCase();
  if (!body) return false;

  if (/\b(insert|update|delete|alter|create|drop|truncate|grant|revoke|merge|copy)\b/.test(body)) {
    return false;
  }

  return /\b(select|with|show|explain)\b/.test(body);
}

function isTransientFetchError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes("fetch failed") ||
    message.includes("ECONNRESET") ||
    message.includes("ECONNREFUSED") ||
    message.includes("ENOTFOUND") ||
    message.includes("ETIMEDOUT") ||
    message.includes("UND_ERR")
  );
}

function requestForAttempt(input: RequestInfo | URL): RequestInfo | URL {
  return isRequest(input) ? input.clone() : input;
}

function configureNeonFetchRetry() {
  if (retryFetchConfigured) return;

  const baseFetch = (neonConfig.fetchFunction ?? globalThis.fetch)?.bind(globalThis);
  if (!baseFetch) return;

  neonConfig.fetchFunction = async (input: RequestInfo | URL, init?: RequestInit) => {
    const bodyText = await fetchBodyText(input, init);
    const canRetry = isReadOnlySqlRequest(bodyText);
    let lastError: unknown;

    for (let attempt = 0; attempt < MAX_DATABASE_FETCH_ATTEMPTS; attempt += 1) {
      try {
        const response = await baseFetch(requestForAttempt(input), init);

        if (
          canRetry &&
          RETRYABLE_HTTP_STATUSES.has(response.status) &&
          attempt < MAX_DATABASE_FETCH_ATTEMPTS - 1
        ) {
          response.body?.cancel().catch(() => undefined);
          await sleep(retryDelay(attempt));
          continue;
        }

        return response;
      } catch (error) {
        lastError = error;

        if (!canRetry || !isTransientFetchError(error) || attempt >= MAX_DATABASE_FETCH_ATTEMPTS - 1) {
          throw error;
        }

        await sleep(retryDelay(attempt));
      }
    }

    throw lastError;
  };

  retryFetchConfigured = true;
}

function createDatabase() {
  configureNeonFetchRetry();
  return drizzle(databaseUrl());
}

function createSqlClient() {
  configureNeonFetchRetry();
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

