// Supabase Edge Function: generate-affirmation
//
// POST { text: string, category?: string, tone?: string, deviceId: string }
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
// deviceId is client-supplied and trivially spoofable (see below), so this
// caps total requests per IP per day as a harder-to-fake backstop. Set well
// above DAILY_LIMIT so a household/office sharing one IP isn't penalized for
// normal use — this exists to stop a single script cycling fake device ids,
// not to further restrict ordinary visitors.
const IP_DAILY_LIMIT = 20;
const OPENAI_MODEL = "gpt-4o";

function getClientIp(req: Request): string | null {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : null;
}

// Browser-enforced only — this doesn't stop direct/scripted calls to the
// function (curl, server-to-server, etc. never send/respect an Origin header
// the way a browser does), so it isn't an anti-abuse control on its own. It
// does stop some other website's client-side JS from quietly calling this
// function using our public keys. Real protection against direct abuse is
// the per-device rate limit below, not CORS.
const ALLOWED_ORIGINS = new Set([
  "https://smartaffirmations.com",
  "https://smart-affirmations.netlify.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

function buildCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://smartaffirmations.com",
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

const BASE_SYSTEM_PROMPT = `you write affirmations for "smart affirmations", a site with a lowercase, warm, punchy, no-nonsense voice — grounded and specific, never grandiose or unbelievable.

rules:
- write exactly one affirmation, nothing else — no preamble, no quotation marks, no explanation
- lowercase only, including the start of the sentence
- roughly 6-16 words
- never promise fame, riches, or perfection
- no exclamation marks, no emoji, no hashtags

never use cliché affirmation phrases or generic self-help language. banned, do not write anything close to these: "i am worthy", "i am enough", "every day in every way", "i attract abundance", "abundance flows to me", "i radiate", "the universe", "i deserve", "i am capable of anything", "i am becoming the best version of myself", "align with my highest self", "i am a magnet for", "i choose to", "manifest", "good vibes only". if a phrase would fit on a generic inspirational poster, don't write it — go more specific and more strange instead.

reflect the person's actual input back into the affirmation. pull specific words, details, names, events, or fears they mentioned and use them directly — don't launder their input into a generic topic or emotion category. if they mention a specific thing (a person's name, a deadline, a diagnosis, a breakup, a exam, a stage), that specific thing should be visibly present in the affirmation, not abstracted away.

before you write, work out silently — do not output this, output only the final affirmation line —:
- what is this person's actual struggle or starting point, in their own terms
- what is genuinely at stake for them: who or what they're doing this for
- what would a real turning point or declaration sound like for this exact situation, not a generic one
use that thinking to shape the one line you output. never print the thinking itself.

write the affirmation as a declaration of an already-true internal state, not a description of an activity, effort, or process. state the underlying resolve, determination, or identity as already real right now — don't describe an ongoing search, journey, or effort toward it. avoid phrasing like "i explore," "i work towards," "i am finding ways to," "i am learning to," "i am on a journey to." say the truth underneath that effort as already settled fact.

forbidden, never use these or any equivalent present-continuous "trying to get there" phrasing: "i am finding," "i am exploring," "i am working toward," "i am searching for." these describe a process in motion, not a declared truth — the affirmation must land on the truth itself, not the pursuit of it.

real example of this in practice — input: "i have little money but am determined to find a way to make money online so i can help myself and my children live free." a weak answer would describe the search ("i am finding ways to make money online for my children"). a strong answer, in this spirit, states it as already true and keeps the contrast and the exact noun: "i started with next to nothing, and that's exactly why my kids will grow up free."

preserve specific meaningful nouns from the user's input word-for-word wherever possible. if they say "my children," keep "my children" — don't soften it to "my family." if they say "free," "my son," a named goal, or a named fear, use that exact word, not a vaguer synonym. specificity is the point; don't round it off.

when the input has contrast or tension in it — little vs. what they're building, fear vs. determination, where they started vs. where they're headed — lean into that tension as the core structure of the affirmation. that contrast is usually the sharpest, most specific part of what someone shared, so build the line around it rather than picking one side and dropping the other.

vary sentence structure and length between generations. don't default to the same "i [verb] ___" template every time. mix it up across these kinds of moves:
- a short punchy fragment (3-6 words)
- a statement that starts with the situation, not "i"
- an observation turned into a claim ("this fear is loud, not true")
- a direct address to the thing they're facing
- a longer sentence with a turn or contrast in the middle
first person is still the default center of gravity, but it doesn't have to open every line with "i".

if the person's input is short or vague (a single word, a fragment, no real detail), do not fall back to a generic line. instead invent something specific and original using the category and tone as texture — a concrete image, a plausible scene, or a sharp specific claim — so it still reads like it was written for a real person, not auto-filled.`;

const TONE_STYLES: Record<string, string> = {
  "motivational coach": `tone for this one: motivational coach.
- energetic and encouraging, like a coach fired up for the person
- push them forward, lean into momentum and effort
- still grounded — hype without exclamation marks or empty hype-speak`,
  "calm & gentle": `tone for this one: calm & gentle.
- soft, reassuring, unhurried — like a quiet exhale
- slower rhythm, gentler words, nothing urgent or forceful
- comfort and steadiness over push or intensity`,
  "no-nonsense": `tone for this one: no-nonsense.
- direct, blunt, no fluff — say the thing and stop
- this is the voice of someone who has trained for years and doesn't waste words: a black belt's directness, not a motivational poster
- no softening, no hedging, no warmth for warmth's sake — just what's true and useful`,
};

const DEFAULT_TONE_STYLE = `tone for this one: balanced.
- warm and encouraging, but grounded and even-keeled
- neither soft nor blunt — steady, plainspoken confidence`;

const VOICE_EXAMPLES = `examples of the voice and its structural variety (these are style references only — never reuse their content or topics):
i turn effort into opportunity, and opportunity into income.
this spiral has an end, even when it doesn't feel like it.
still standing after that email. that's the whole update.
hard days build the muscle no one else can see.
the exam doesn't get to decide what you're capable of.
not shrinking. not today.`;

const DECLARATION_EXAMPLES = `examples of weak, descriptive drafts vs. strong, declarative rewrites (generic illustrations, not affirmations to reuse — just the pattern to follow):
weak: "i explore ways to earn money for my family" — describes an ongoing search, softens "my family."
strong: "i started with nothing, and that's exactly why my family will have everything" — states resolve as already true, keeps the contrast, keeps the exact noun.

weak: "i am working towards being less afraid of failing my son" — describes an effort in progress.
strong: "i can be afraid and still show up for my son" — names the fear directly, states the resolve as already real.

weak: "i am finding ways to feel free after the divorce" — describes a search, generic word "free."
strong: "the divorce didn't get the last word — free does" — leans into the contrast, keeps "free" and "divorce" exact.`;

function buildSystemPrompt(tone: string): string {
  const toneBlock = (tone && TONE_STYLES[tone.toLowerCase()]) || DEFAULT_TONE_STYLE;
  return `${BASE_SYSTEM_PROMPT}\n\n${toneBlock}\n\n${VOICE_EXAMPLES}\n\n${DECLARATION_EXAMPLES}`;
}

function buildUserPrompt(text: string, category: string): string {
  const categoryLine = category ? `\ncategory they picked: ${category}` : "";
  return `write one affirmation for someone who said: "${text}"${categoryLine}\n\nuse their specific words and details where you can. if what they said is short or vague, invent something specific and original using the category and tone instead of writing something generic.`;
}

Deno.serve(async (req: Request) => {
  const corsHeaders = buildCorsHeaders(req);
  function jsonResponse(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "method_not_allowed" }, 405);
  }

  let body: { text?: unknown; category?: unknown; tone?: unknown; deviceId?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const text = typeof body.text === "string" ? body.text.trim().slice(0, 500) : "";
  const category = typeof body.category === "string" ? body.category.trim().slice(0, 60) : "";
  const tone = typeof body.tone === "string" ? body.tone.trim().slice(0, 40) : "";
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
  const clientIp = getClientIp(req);
  const rateLimitedResponse = () =>
    jsonResponse(
      {
        error: "rate_limited",
        message: "you've used all 3 free affirmations for today — come back tomorrow for more.",
      },
      429
    );

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
    return rateLimitedResponse();
  }

  if (clientIp) {
    // Fails open, not closed: this is a supplementary backstop on top of the
    // device_id limit above, not the primary control, so a lookup error here
    // (e.g. the `ip` column not existing yet on an unmigrated database)
    // logs and skips the ip check rather than blocking every request.
    const { data: ipRows, error: ipFetchError } = await supabase
      .from("generation_limits")
      .select("request_count")
      .eq("ip", clientIp)
      .eq("request_date", today);

    if (ipFetchError) {
      console.error("generate-affirmation: ip rate limit lookup failed", ipFetchError);
    } else {
      const ipTotal = (ipRows ?? []).reduce((sum, row) => sum + row.request_count, 0);
      if (ipTotal >= IP_DAILY_LIMIT) {
        return rateLimitedResponse();
      }
    }
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
        { role: "system", content: buildSystemPrompt(tone) },
        { role: "user", content: buildUserPrompt(text, category) },
      ],
      temperature: 1.0,
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

  if (existing) {
    await supabase
      .from("generation_limits")
      .update({ request_count: existing.request_count + 1, ip: clientIp, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await supabase.from("generation_limits").insert({
      device_id: deviceId,
      ip: clientIp,
      request_date: today,
      request_count: 1,
    });
  }

  return jsonResponse({ affirmation });
});
