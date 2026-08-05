-- Smart Affirmations — planned Supabase schema
-- Run this in the Supabase SQL editor once the project is connected.

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,        -- e.g. 'wealth', 'love', 'health'
  color text not null,              -- hex code used for the tile/accent
  icon text,                        -- icon name used in the UI
  created_at timestamptz default now()
);

create table affirmations (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  text text not null,
  source text default 'curated',    -- 'curated' or 'ai_generated'
  created_at timestamptz default now()
);

create table saved_affirmations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  affirmation_id uuid references affirmations(id),
  created_at timestamptz default now()
);

create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
