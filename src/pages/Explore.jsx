import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../data/categories";
import { affirmations } from "../data/affirmations";
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

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [query, setQuery] = useState("");
  const { speakingId, toggleSpeak } = useSpeech();

  function selectCategory(slug) {
    if (slug === "all" || slug === activeCategory) {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return affirmations.filter((a) => {
      const matchesCategory = activeCategory === "all" || a.category === activeCategory;
      const matchesQuery = !q || a.text.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="page page-explore">
      <section className="explore-hero">
        <h1>explore</h1>
        <p className="tagline">browse affirmations by category, or search for what you need</p>
      </section>

      <section className="category-grid">
        <span className="section-label">filter by category</span>
        <div className="tile-grid">
          <button
            type="button"
            className={`category-tile${activeCategory === "all" ? " active" : ""}`}
            style={{ background: "var(--paper-raised)", color: "var(--ink)", borderColor: "var(--ink)" }}
            onClick={() => selectCategory("all")}
          >
            <span>✨</span>
            <span>all</span>
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.slug}
              className={`category-tile${activeCategory === cat.slug ? " active" : ""}`}
              style={{ background: cat.color, color: cat.ink, borderColor: cat.ink }}
              onClick={() => selectCategory(cat.slug)}
            >
              <span>{ICONS[cat.icon]}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="search-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="search affirmations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </section>

      <section className="affirmation-list">
        <span className="section-label">
          {filtered.length} affirmation{filtered.length === 1 ? "" : "s"}
        </span>

        {filtered.length === 0 ? (
          <p className="empty-state">nothing matches yet — try a different word or category.</p>
        ) : (
          <div className={`affirmation-cards${activeCategory !== "all" ? " affirmation-cards--fixed" : ""}`}>
            {filtered.map((a, i) => {
              const meta = categories.find((c) => c.slug === a.category);
              const cardId = `${a.category}-${i}`;
              return (
                <div className="affirmation-card" key={cardId}>
                  <span
                    className="affirmation-tag"
                    style={{ background: meta.color, color: meta.ink, borderColor: meta.ink }}
                  >
                    {ICONS[meta.icon]} {meta.label}
                  </span>
                  <blockquote>&ldquo;{a.text}&rdquo;</blockquote>
                  <div className="affirmation-actions">
                    <button className="icon-btn" onClick={() => toggleSpeak(cardId, a.text)}>
                      {speakingId === cardId ? "⏹️ stop" : "🔊 listen"}
                    </button>
                    <button className="icon-btn">🤍 save</button>
                    <button className="icon-btn">⬇️ share</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="generate-cta">
        <div className="generate-cta-box">
          <p>not finding the right words?</p>
          <Link to="/generate" className="btn btn-primary">generate your own →</Link>
        </div>
      </section>
    </div>
  );
}
