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

-- the contact form runs with the public anon key, so lock this table down:
-- anyone can submit a message, but nobody can read, edit, or delete
-- submissions through the anon key (only via the Supabase dashboard / service role).
alter table contact_submissions enable row level security;

create policy "anon can submit contact form"
  on contact_submissions for insert
  to anon
  with check (true);

-- tracks the generate-affirmation edge function's daily rate limit, one row
-- per device per day. only the edge function (using the service-role key)
-- ever touches this table, so RLS is enabled with no policies at all —
-- anon/authenticated clients get zero access, by design.
create table generation_limits (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  request_date date not null default current_date,
  request_count integer not null default 1,
  updated_at timestamptz not null default now(),
  unique (device_id, request_date)
);

alter table generation_limits enable row level security;
