import { useState } from "react";
import { categories } from "../data/categories";
import { supabase } from "../lib/supabaseClient";
import { getDeviceId } from "../lib/deviceId";
import { useSpeech } from "../lib/useSpeech";

const ICONS = {
  coin: "🪙",
  heart: "❤️",
  leaf: "🌿",
  star: "⭐",
  wind: "🌬️",
  flame: "🔥",
  sun: "☀️",
  moon: "🌙",
  rocket: "🚀",
  sparkle: "✨",
};

const GENERIC_ERROR = "something went wrong generating your affirmation. please try again.";
const RESULT_SPEECH_ID = "generate-result";

export default function Generate() {
  const [feeling, setFeeling] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [result, setResult] = useState(null);
  const [lastPrompt, setLastPrompt] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | limited | error
  const [statusMessage, setStatusMessage] = useState("");
  const { speakingId, toggleSpeak } = useSpeech();

  function toggleCategory(slug) {
    setSelectedCategory((current) => (current === slug ? null : slug));
  }

  async function runGenerate({ text, categoryLabel, categorySlug }) {
    setStatus("loading");
    setStatusMessage("");

    const { data, error } = await supabase.functions.invoke("generate-affirmation", {
      body: { text, category: categoryLabel, deviceId: getDeviceId() },
    });

    if (error) {
      if (error.context?.status === 429) {
        setStatus("limited");
        setStatusMessage("you've used all 3 free affirmations for today — come back tomorrow for more.");
      } else {
        setStatus("error");
        setStatusMessage(GENERIC_ERROR);
      }
      return;
    }

    if (!data?.affirmation) {
      setStatus("error");
      setStatusMessage(GENERIC_ERROR);
      return;
    }

    setResult({ text: data.affirmation, category: categorySlug });
    setStatus("idle");
  }

  async function handleGenerate() {
    const trimmedFeeling = feeling.trim();
    if (!trimmedFeeling && !selectedCategory) return;
    if (status === "loading") return;

    const categoryMeta = selectedCategory ? categories.find((c) => c.slug === selectedCategory) : null;
    const text = trimmedFeeling || `something related to ${categoryMeta?.label ?? "life"}`;
    const categoryLabel = categoryMeta?.label ?? "";

    setLastPrompt({ text, categoryLabel, categorySlug: selectedCategory });
    await runGenerate({ text, categoryLabel, categorySlug: selectedCategory });
  }

  async function handleTryAgain() {
    if (!lastPrompt || status === "loading") return;
    await runGenerate(lastPrompt);
  }

  function handleListen() {
    if (!result) return;
    toggleSpeak(RESULT_SPEECH_ID, result.text);
  }

  const resultMeta = result?.category ? categories.find((c) => c.slug === result.category) : null;
  const isRegenerating = status === "loading" && Boolean(result);
  const isSpeaking = speakingId === RESULT_SPEECH_ID;

  return (
    <div className="page page-generate">
      <section className="generate-hero">
        <p className="eyebrow">generate</p>
        <h1>what's on your mind?</h1>
        <p className="tagline">tell us how you feel or what you're working on</p>
      </section>

      <section className="generate-form">
        <div className="generate-form-box">
          <div className="form-guide">
            <p className="form-guide-title">tell us what's on your mind.</p>
            <p className="form-guide-subtitle">we'll turn it into your affirmation.</p>
          </div>

          <label htmlFor="feeling">how are you feeling?</label>
          <input
            id="feeling"
            type="text"
            placeholder="i'm nervous about a job interview"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            disabled={status === "loading"}
          />

          <span className="section-label">or pick a category</span>
          <div className="chip-row">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.slug}
                className={`category-chip${selectedCategory === cat.slug ? " active" : ""}`}
                style={{ background: cat.color, color: cat.ink, borderColor: cat.ink }}
                onClick={() => toggleCategory(cat.slug)}
                disabled={status === "loading"}
              >
                {ICONS[cat.icon]} {cat.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-primary generate-btn"
            onClick={handleGenerate}
            disabled={status === "loading" || (!feeling.trim() && !selectedCategory)}
          >
            {status === "loading" ? "generating…" : "generate my affirmation →"}
          </button>

          {status === "limited" && (
            <div className="form-status form-status-limited">
              <span className="status-stamp">⏳ limit reached</span>
              <p>{statusMessage}</p>
            </div>
          )}

          {status === "error" && (
            <div className="form-status form-status-error">
              <span className="status-stamp">✕ error</span>
              <p>{statusMessage}</p>
            </div>
          )}
        </div>
      </section>

      <section className="generate-result">
        {status === "loading" && !result ? (
          <p className="result-empty">crafting your affirmation…</p>
        ) : result ? (
          <div className="result-card">
            {resultMeta && (
              <span
                className="aotd-stamp"
                style={{ background: resultMeta.color, color: resultMeta.ink, borderColor: resultMeta.ink }}
              >
                {ICONS[resultMeta.icon]} {resultMeta.label}
              </span>
            )}
            <blockquote>
              {isRegenerating ? "crafting your next affirmation…" : <>&ldquo;{result.text}&rdquo;</>}
            </blockquote>
            <div className="result-actions">
              <button className="icon-btn" onClick={handleTryAgain} disabled={status === "loading"}>
                🔁 try again
              </button>
              <button className="icon-btn" onClick={handleListen} disabled={isRegenerating}>
                {isSpeaking ? "⏹️ stop" : "🔊 listen"}
              </button>
              <button className="icon-btn">🤍 save</button>
              <button className="icon-btn">⬇️ share card</button>
            </div>
          </div>
        ) : (
          <p className="result-empty">your affirmation will show up here once you generate one.</p>
        )}
      </section>
    </div>
  );
}
