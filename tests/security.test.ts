import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { assertSameOrigin, clearedSessionCookie, sessionCookie } from "@/server/session";
import { HttpError } from "@/server/errors";

function request(origin?: string) {
  return new NextRequest("http://localhost/api/rounds", {
    method: "POST",
    headers: { host: "localhost", ...(origin ? { origin } : {}) },
  });
}

describe("session and origin security", () => {
  it("sets production cookies to httpOnly secure and same-site lax", () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    try {
      const cookie = sessionCookie("opaque-token");
      expect(cookie).toMatchObject({
        name: "proofshelf_session",
        value: "opaque-token",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
      expect(cookie.maxAge).toBeGreaterThan(0);
      expect(clearedSessionCookie().maxAge).toBe(0);
    } finally {
      process.env.NODE_ENV = previous;
    }
  });

  it("accepts same-origin mutations and missing Origin headers", () => {
    expect(() => assertSameOrigin(request())).not.toThrow();
    expect(() => assertSameOrigin(request("http://localhost"))).not.toThrow();
  });

  it("rejects cross-origin mutations with 403", () => {
    expect(() => assertSameOrigin(request("https://example.com"))).toThrow(HttpError);
    try {
      assertSameOrigin(request("https://example.com"));
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect((error as HttpError).status).toBe(403);
    }
  });
});
