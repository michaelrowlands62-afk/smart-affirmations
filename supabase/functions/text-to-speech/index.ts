// Supabase Edge Function: text-to-speech
//
// POST { text: string, voiceId: string, deviceId: string }
// -> 200 { audioBase64: string, mimeType: string }
// -> 429 { error: "rate_limited", message: string }   (5 listens/device/day)
// -> 4xx/5xx { error: string }
//
// Requires these env vars (set as function secrets, never committed):
//   ELEVENLABS_API_KEY      - your ElevenLabs API key
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically by
// the Supabase Edge Functions runtime — no need to set them manually.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const DAILY_LIMIT = 5;
// deviceId is client-supplied and trivially spoofable (see below), so this
// caps total requests per IP per day as a harder-to-fake backstop. Set well
// above DAILY_LIMIT so a household/office sharing one IP isn't penalized for
// normal use — this exists to stop a single script cycling fake device ids,
// not to further restrict ordinary visitors.
const IP_DAILY_LIMIT = 30;
const ELEVENLABS_MODEL = "eleven_turbo_v2_5";

function getClientIp(req: Request): string | null {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor ? forwardedFor.split(",")[0].trim() : null;
}

// Allowlist of selectable voices — the client sends a voiceId, but we only ever
// call ElevenLabs with one of these known-good IDs, never whatever the client sent.
const ALLOWED_VOICE_IDS = new Set([
  "l32B8XDoylOsZKiSdfhE", // Carla
  "IRHApOXLvnW57QJPQH2P", // Adam
  "yj30vwTGJxSHezdAGsv9", // Jessa
  "iNwXKItkuLxqequ5ZM3w", // Sir Blandy
]);
const DEFAULT_VOICE_ID = "l32B8XDoylOsZKiSdfhE"; // Carla

// Browser-enforced only — this doesn't stop direct/scripted calls to the
// function (curl, server-to-server, etc. never send/respect an Origin header
// the way a browser does), so it isn't an anti-abuse control on its own. It
// does stop some other website's client-side JS from quietly calling this
// function using our public keys. Real protection against direct abuse is
// the per-device rate limit below, not CORS.
const ALLOWED_ORIGINS = new Set([
  "https://smartaffirmations.com",
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

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
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

  let body: { text?: unknown; voiceId?: unknown; deviceId?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "invalid_json" }, 400);
  }

  const text = typeof body.text === "string" ? body.text.trim().slice(0, 500) : "";
  const requestedVoiceId = typeof body.voiceId === "string" ? body.voiceId.trim() : "";
  const deviceId = typeof body.deviceId === "string" ? body.deviceId.trim().slice(0, 100) : "";

  if (!text) return jsonResponse({ error: "text_required" }, 400);
  if (!deviceId) return jsonResponse({ error: "device_id_required" }, 400);

  const voiceId = ALLOWED_VOICE_IDS.has(requestedVoiceId) ? requestedVoiceId : DEFAULT_VOICE_ID;

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const elevenLabsApiKey = Deno.env.get("ELEVENLABS_API_KEY");

  if (!supabaseUrl || !serviceRoleKey || !elevenLabsApiKey) {
    console.error("text-to-speech: missing required environment variables");
    return jsonResponse({ error: "server_misconfigured" }, 500);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, UTC
  const clientIp = getClientIp(req);
  const rateLimitedResponse = () =>
    jsonResponse(
      {
        error: "rate_limited",
        message: "you've used all 5 free listens for today — come back tomorrow for more.",
      },
      429
    );

  const { data: existing, error: fetchError } = await supabase
    .from("tts_limits")
    .select("id, request_count")
    .eq("device_id", deviceId)
    .eq("request_date", today)
    .maybeSingle();

  if (fetchError) {
    console.error("text-to-speech: rate limit lookup failed", fetchError);
    return jsonResponse({ error: "server_error" }, 500);
  }

  if (existing && existing.request_count >= DAILY_LIMIT) {
    return rateLimitedResponse();
  }

  if (clientIp) {
    const { data: ipRows, error: ipFetchError } = await supabase
      .from("tts_limits")
      .select("request_count")
      .eq("ip", clientIp)
      .eq("request_date", today);

    if (ipFetchError) {
      console.error("text-to-speech: ip rate limit lookup failed", ipFetchError);
    } else {
      const ipTotal = (ipRows ?? []).reduce((sum, row) => sum + row.request_count, 0);
      if (ipTotal >= IP_DAILY_LIMIT) {
        return rateLimitedResponse();
      }
    }
  }

  const elevenLabsResponse = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
        "xi-api-key": elevenLabsApiKey,
      },
      body: JSON.stringify({
        text,
        model_id: ELEVENLABS_MODEL,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!elevenLabsResponse.ok) {
    console.error("text-to-speech: elevenlabs request failed", await elevenLabsResponse.text());
    return jsonResponse({ error: "generation_failed" }, 502);
  }

  const audioBuffer = await elevenLabsResponse.arrayBuffer();
  if (!audioBuffer.byteLength) {
    return jsonResponse({ error: "generation_failed" }, 502);
  }

  if (existing) {
    await supabase
      .from("tts_limits")
      .update({ request_count: existing.request_count + 1, ip: clientIp, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
  } else {
    await supabase.from("tts_limits").insert({
      device_id: deviceId,
      ip: clientIp,
      request_date: today,
      request_count: 1,
    });
  }

  return jsonResponse({ audioBase64: toBase64(audioBuffer), mimeType: "audio/mpeg" });
});
