import type { PgliteDatabase } from "drizzle-orm/pglite";
import * as schema from "./schema";
import { ddl } from "./ddl";

export type Database = PgliteDatabase<typeof schema>;
export type DbSource = "postgres" | "pglite";

type GlobalDb = typeof globalThis & {
  __proofshelfDb?: Promise<Database>;
  __proofshelfDbSource?: DbSource;
};

const globalRef = globalThis as GlobalDb;

export function activeDbSource(): DbSource {
  return process.env.DATABASE_URL?.trim() ? "postgres" : "pglite";
}

export function dbSource(): DbSource {
  return globalRef.__proofshelfDbSource ?? activeDbSource();
}

export async function createPgliteDatabase(): Promise<Database> {
  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const client = new PGlite();
  await client.waitReady;
  await client.exec(ddl);
  return drizzle(client, { schema });
}

async function createPostgresDatabase(url: string): Promise<Database> {
  const { drizzle } = await import("drizzle-orm/node-postgres");
  const { Pool } = await import("pg");
  const pool = new Pool({
    connectionString: url,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
  await pool.query(ddl);
  return drizzle(pool, { schema }) as unknown as Database;
}

async function createDatabase(): Promise<Database> {
  const source = activeDbSource();
  globalRef.__proofshelfDbSource = source;
  if (source === "postgres") {
    return createPostgresDatabase(process.env.DATABASE_URL!.trim());
  }
  return createPgliteDatabase();
}

export function getDb(): Promise<Database> {
  if (typeof window !== "undefined") {
    throw new Error("The database module is server-only.");
  }
  globalRef.__proofshelfDb ??= createDatabase().catch((error) => {
    globalRef.__proofshelfDb = undefined;
    throw error;
  });
  return globalRef.__proofshelfDb;
}
