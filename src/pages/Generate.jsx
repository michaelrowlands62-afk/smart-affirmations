import { useState } from "react";
import { categories } from "../data/categories";
import { affirmations } from "../data/affirmations";

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

export default function Generate() {
  const [feeling, setFeeling] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [result, setResult] = useState(null);

  function toggleCategory(slug) {
    setSelectedCategory((current) => (current === slug ? null : slug));
  }

  function handleGenerate() {
    // ---- placeholder generation logic ----
    // TODO: replace this block with a real AI call, sending `feeling` (and
    // `selectedCategory`, if set) as the prompt and using the model's response
    // instead. For now we fake it by picking a random affirmation from the
    // local dataset, filtered to the selected category if one is chosen.
    const pool = selectedCategory
      ? affirmations.filter((a) => a.category === selectedCategory)
      : affirmations;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setResult(pick);
    // ---- end placeholder generation logic ----
  }

  const resultMeta = result ? categories.find((c) => c.slug === result.category) : null;

  return (
    <div className="page page-generate">
      <section className="generate-hero">
        <p className="eyebrow">generate</p>
        <h1>what's on your mind?</h1>
        <p className="tagline">tell us how you feel or what you're working on</p>
      </section>

      <section className="generate-form">
        <div className="generate-form-box">
          <label htmlFor="feeling">how are you feeling?</label>
          <input
            id="feeling"
            type="text"
            placeholder="i'm nervous about a job interview"
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
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
              >
                {ICONS[cat.icon]} {cat.label}
              </button>
            ))}
          </div>

          <button type="button" className="btn btn-primary generate-btn" onClick={handleGenerate}>
            generate my affirmation →
          </button>
        </div>
      </section>

      <section className="generate-result">
        {result ? (
          <div className="result-card">
            <span
              className="aotd-stamp"
              style={{ background: resultMeta.color, color: resultMeta.ink, borderColor: resultMeta.ink }}
            >
              {ICONS[resultMeta.icon]} {resultMeta.label}
            </span>
            <blockquote>&ldquo;{result.text}&rdquo;</blockquote>
            <div className="result-actions">
              <button className="icon-btn" onClick={handleGenerate}>🔁 try again</button>
              <button className="icon-btn">🔊 listen</button>
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
