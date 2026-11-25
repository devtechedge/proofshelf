export const ddl = `
DO $$ BEGIN
  CREATE TYPE verdict AS ENUM ('supported', 'mixed', 'preliminary', 'unsupported');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE round_mode AS ENUM ('daily', 'review', 'practice');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  account_ref text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS card_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  account_ref text NOT NULL REFERENCES accounts(account_ref) ON DELETE CASCADE,
  card_id text NOT NULL,
  attempts integer DEFAULT 0 NOT NULL,
  correct integer DEFAULT 0 NOT NULL,
  last_selected_verdict verdict NOT NULL,
  last_confidence integer NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT card_progress_attempts_nonnegative CHECK (attempts >= 0),
  CONSTRAINT card_progress_correct_bounds CHECK (correct >= 0 AND correct <= attempts),
  CONSTRAINT card_progress_confidence_bounds CHECK (last_confidence BETWEEN 1 AND 3)
);

CREATE TABLE IF NOT EXISTS rounds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  account_ref text NOT NULL REFERENCES accounts(account_ref) ON DELETE CASCADE,
  mode round_mode NOT NULL,
  seed text NOT NULL,
  score integer NOT NULL,
  total integer NOT NULL,
  correct integer NOT NULL,
  calibration_flags integer DEFAULT 0 NOT NULL,
  completed_at timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT rounds_score_nonnegative CHECK (score >= 0),
  CONSTRAINT rounds_total_positive CHECK (total > 0),
  CONSTRAINT rounds_correct_bounds CHECK (correct >= 0 AND correct <= total)
);

CREATE UNIQUE INDEX IF NOT EXISTS card_progress_account_card_unique ON card_progress(account_ref, card_id);
CREATE INDEX IF NOT EXISTS card_progress_account_idx ON card_progress(account_ref);
CREATE UNIQUE INDEX IF NOT EXISTS rounds_account_mode_seed_unique ON rounds(account_ref, mode, seed);
CREATE INDEX IF NOT EXISTS rounds_account_idx ON rounds(account_ref);
`;
