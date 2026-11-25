import { sql } from "drizzle-orm";
import { check, index, integer, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const verdictEnum = pgEnum("verdict", ["supported", "mixed", "preliminary", "unsupported"]);
export const roundModeEnum = pgEnum("round_mode", ["daily", "review", "practice"]);

export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  accountRef: text("account_ref").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const cardProgress = pgTable(
  "card_progress",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    accountRef: text("account_ref")
      .notNull()
      .references(() => accounts.accountRef, { onDelete: "cascade" }),
    cardId: text("card_id").notNull(),
    attempts: integer("attempts").default(0).notNull(),
    correct: integer("correct").default(0).notNull(),
    lastSelectedVerdict: verdictEnum("last_selected_verdict").notNull(),
    lastConfidence: integer("last_confidence").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("card_progress_account_card_unique").on(table.accountRef, table.cardId),
    index("card_progress_account_idx").on(table.accountRef),
    check("card_progress_attempts_nonnegative", sql`${table.attempts} >= 0`),
    check("card_progress_correct_bounds", sql`${table.correct} >= 0 AND ${table.correct} <= ${table.attempts}`),
    check("card_progress_confidence_bounds", sql`${table.lastConfidence} BETWEEN 1 AND 3`),
  ],
);

export const rounds = pgTable(
  "rounds",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    accountRef: text("account_ref")
      .notNull()
      .references(() => accounts.accountRef, { onDelete: "cascade" }),
    mode: roundModeEnum("mode").notNull(),
    seed: text("seed").notNull(),
    score: integer("score").notNull(),
    total: integer("total").notNull(),
    correct: integer("correct").notNull(),
    calibrationFlags: integer("calibration_flags").default(0).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("rounds_account_mode_seed_unique").on(table.accountRef, table.mode, table.seed),
    index("rounds_account_idx").on(table.accountRef),
    check("rounds_score_nonnegative", sql`${table.score} >= 0`),
    check("rounds_total_positive", sql`${table.total} > 0`),
    check("rounds_correct_bounds", sql`${table.correct} >= 0 AND ${table.correct} <= ${table.total}`),
  ],
);
