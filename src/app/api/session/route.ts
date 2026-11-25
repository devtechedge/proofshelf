import type { NextRequest } from "next/server";
import { assertSameOrigin, clearedSessionCookie, eraseAccount } from "@/server/session";
import { errorResponse, jsonResponse } from "@/server/http";

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
  try {
    assertSameOrigin(request);
    await eraseAccount(request);
    const response = jsonResponse({ status: "erased" });
    response.cookies.set(clearedSessionCookie());
    return response;
  } catch (error) {
    return errorResponse(error);
  }
}
