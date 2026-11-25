import { NextResponse } from "next/server";
import { sessionCookie } from "@/server/session";

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class RoundAlreadyPlayedError extends HttpError {
  constructor() {
    super(409, "This round has already been recorded. Try review mode instead.");
  }
}

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
