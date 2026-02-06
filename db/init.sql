-- WAYN database schema (PostgreSQL)
-- Run with: psql -f db/init.sql postgres

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  age integer,
  status text,
  initials text NOT NULL,
  plan text NOT NULL DEFAULT 'Free',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS checkpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS checkpoint_areas (
  checkpoint_id uuid NOT NULL REFERENCES checkpoints(id) ON DELETE CASCADE,
  life_area_id text NOT NULL,
  score integer NOT NULL CHECK (score BETWEEN 1 AND 10),
  note text NOT NULL,
  PRIMARY KEY (checkpoint_id, life_area_id)
);

CREATE TABLE IF NOT EXISTS directions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  expected_outcome text NOT NULL,
  period text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  review_at timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('В процессе', 'Ожидает проверки', 'Завершено'))
);

CREATE TABLE IF NOT EXISTS direction_criteria (
  direction_id uuid NOT NULL REFERENCES directions(id) ON DELETE CASCADE,
  criterion_key text NOT NULL,
  expected integer NOT NULL,
  actual integer,
  PRIMARY KEY (direction_id, criterion_key)
);

CREATE INDEX IF NOT EXISTS idx_checkpoints_user_id ON checkpoints(user_id);
CREATE INDEX IF NOT EXISTS idx_directions_user_id ON directions(user_id);
