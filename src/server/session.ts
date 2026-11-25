import { createHash, randomBytes } from "node:crypto";
import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { accounts } from "@/db/schema";

export const SESSION_COOKIE = "proofshelf_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 365;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;

export function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function accountRefForToken(token: string) {
  return `acct_${createHash("sha256").update(token).digest("hex")}`;
}

export function readSessionToken(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  return token && TOKEN_PATTERN.test(token) ? token : null;
}

export async function readAccountRef(request: NextRequest) {
  const token = readSessionToken(request);
  if (!token) return null;
  const accountRef = accountRefForToken(token);
  const db = await getDb();
  const existing = await db.select({ accountRef: accounts.accountRef }).from(accounts).where(eq(accounts.accountRef, accountRef)).limit(1);
  return existing[0]?.accountRef ?? null;
}

export async function getOrCreateAccount(request: NextRequest) {
  const existingToken = readSessionToken(request);
  const token = existingToken ?? createSessionToken();
  const accountRef = accountRefForToken(token);
  const db = await getDb();
  await db.insert(accounts).values({ accountRef }).onConflictDoNothing({ target: accounts.accountRef });
  return { accountRef, token, isNew: !existingToken };
}

export function sessionCookie(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function clearedSessionCookie() {
  return { ...sessionCookie(""), maxAge: 0 };
}

export async function eraseAccount(request: NextRequest) {
  const accountRef = await readAccountRef(request);
  if (!accountRef) return false;
  const db = await getDb();
  await db.delete(accounts).where(eq(accounts.accountRef, accountRef));
  return true;
}

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return;
  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    throw new Error("Invalid request origin.");
  }
  if (originHost !== request.headers.get("host")) {
    throw new Error("Cross-origin mutation rejected.");
  }
}
