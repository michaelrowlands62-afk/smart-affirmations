// Supabase Edge Function: generate-affirmation
//
// POST { text: string, category?: string, deviceId: string }
// -> 200 { affirmation: string }
// -> 429 { error: "rate_limited", message: string }   (3 generations/device/day)
// -> 4xx/5xx { error: string }
//
// Requires these env vars (set as function secrets, never committed):
//   OPENAI_API_KEY          - your OpenAI API key
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically by
// the Supabase Edge Functions runtime — no need to set them manually.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const DAILY_LIMIT = 3;
const OPENAI_MODEL = "gpt-4o-mini";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const SYSTEM_PROMPT = `you write affirmations for "smart affirmations", a site with a lowercase, warm, punchy, no-nonsense voice — grounded and specific, never grandiose or unbelievable.

rules:
- write exactly one affirmation, nothing else — no preamble, no quotation marks, no explanation
- lowercase only, including the start of the sentence
- present tense, first person ("i ...")
- one short sentence, roughly 6-16 words
- personal and concrete, tied to what the person actually said, not generic
- warm and encouraging, but grounded — never promise fame, riches, or perfection
- no exclamation marks, no emoji, no hashtags

examples of the voice:
i turn effort into opportunity, and opportunity into income.
i don't shrink to make other people comfortable.
this spiral has an end, even when it doesn't feel like it.
hard days build the muscle no one else can see.`;

function buildUserPrompt(text: string, category: string): string {
  const categoryLine = category ? `\ncategory they picked: ${category}` : "";
  return `write one affirmation for someone who said: "${text}"${categoryLine}`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "method_not_allowed" }, 405);
  }

  let body: { text?: unknown; category?: unknown; deviceId?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const text = typeof body.text === "string" ? body.text.trim().slice(0, 500) : "";
  const category = typeof body.category === "string" ? body.category.trim().slice(0, 60) : "";
  const deviceId = typeof body.deviceId === "string" ? body.deviceId.trim().slice(0, 100) : "";

  if (!text) return jsonResponse({ error: "text_required" }, 400);
  if (!deviceId) return jsonResponse({ error: "device_id_required" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const openaiApiKey = Deno.env.get("OPENAI_API_KEY");

  if (!supabaseUrl || !serviceRoleKey || !openaiApiKey) {
    console.error("generate-affirmation: missing required environment variables");
    return jsonResponse({ error: "server_misconfigured" }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, UTC

  const { data: existing, error: fetchError } = await supabase
    .from("generation_limits")
    .select("id, request_count")
    .eq("device_id", deviceId)
    .eq("request_date", today)
    .maybeSingle();

  if (fetchError) {
    console.error("generate-affirmation: rate limit lookup failed", fetchError);
    return jsonResponse({ error: "server_error" }, 500);
  }

  if (existing && existing.request_count >= DAILY_LIMIT) {
    return jsonResponse(
      {
        error: "rate_limited",
        message: "you've used all 3 free affirmations for today — come back tomorrow for more.",
      },
      429
    );
  }

  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(text, category) },
      ],
      temperature: 0.9,
      max_tokens: 60,
    }),
  });

  if (!openaiResponse.ok) {
    console.error("generate-affirmation: openai request failed", await openaiResponse.text());
    return jsonResponse({ error: "generation_failed" }, 502);
  }

  const completion = await openaiResponse.json();
  const raw = completion.choices?.[0]?.message?.content ?? "";
  const affirmation = raw.trim().replace(/^["']|["']$/g, "").trim();

  if (!affirmation) {
    return jsonResponse({ error: "generation_failed" }, 502);
  }

  // Only count successful generations against the limit.
  if (existing) {
    await supabase
      .from("generation_limits")
      .update({ request_count: existing.request_count + 1, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await supabase.from("generation_limits").insert({
      device_id: deviceId,
      request_date: today,
      request_count: 1,
    });
  }

  return jsonResponse({ affirmation });
});
