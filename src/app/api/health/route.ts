import { CARDS } from "@/data/catalog";
import { dbSource, getDb } from "@/db/client";
import { sql } from "drizzle-orm";
import { errorResponse, jsonResponse } from "@/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    await db.execute(sql`select 1`);
    return jsonResponse({ status: "ok", database: dbSource(), cards: CARDS.length });
  } catch (error) {
    return errorResponse(error);
  }
}
