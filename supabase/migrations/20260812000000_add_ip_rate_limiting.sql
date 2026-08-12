-- Adds a per-IP backstop alongside the existing per-device daily rate limits.
-- device_id is entirely client-supplied and trivially spoofable (see
-- Edge Function comments), so this gives the rate limit a second, harder-to-
-- fake signal to check. Additive-only: nullable column, no changes to the
-- existing unique(device_id, request_date) constraint, existing rows unaffected.
--
-- Run this once in the Supabase SQL editor (or `supabase db push` with DB
-- credentials), then deploy the updated generate-affirmation and
-- text-to-speech Edge Functions that read/write this column.

alter table generation_limits add column if not exists ip text;
alter table tts_limits add column if not exists ip text;

-- speeds up the "sum request_count for this ip today" lookup the functions
-- now do on every request.
create index if not exists generation_limits_ip_date_idx
  on generation_limits (ip, request_date);

create index if not exists tts_limits_ip_date_idx
  on tts_limits (ip, request_date);
