import { NextResponse } from "next/server";
import { sessionCookie } from "@/server/session";
import { HttpError } from "@/server/errors";

export { HttpError, RoundAlreadyPlayedError } from "@/server/errors";

export function jsonResponse(body: unknown, init?: ResponseInit, token?: string) {
  const response = NextResponse.json(body, init);
  if (token) response.cookies.set(sessionCookie(token));
  return response;
}

export function errorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  console.error("ProofShelf request failed", error);
  return NextResponse.json({ error: "The request could not be completed." }, { status: 500 });
}
