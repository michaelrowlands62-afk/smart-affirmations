import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../data/categories";
import { affirmations } from "../data/affirmations";
import { useSpeech } from "../lib/useSpeech";
import { useShareCard } from "../lib/useShareCard";
import { useVoicePreference } from "../lib/useVoicePreference";
import VoicePicker from "../components/VoicePicker";

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
  const { shareCard, getShareStatus } = useShareCard();
  const { voiceId, selectVoice } = useVoicePreference();

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
      <Helmet>
        <title>Smart Affirmations</title>
        <meta
          name="description"
          content="browse hundreds of affirmations by category — wealth, love, health, confidence, anxiety, strength, morning, sleep, motivation and self-love — or search for exactly what you need."
        />
        {/* always canonicalizes to the unfiltered /explore URL — category filters use a query
            param, and indexing every ?category= permutation as a separate page would create
            duplicate content */}
        <link rel="canonical" href="https://smartaffirmations.com/explore" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Smart Affirmations" />
        <meta property="og:url" content="https://smartaffirmations.com/explore" />
        <meta property="og:title" content="Smart Affirmations" />
        <meta
          property="og:description"
          content="browse hundreds of affirmations by category — wealth, love, health, confidence, anxiety, strength, morning, sleep, motivation and self-love — or search for exactly what you need."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Smart Affirmations" />
        <meta
          name="twitter:description"
          content="browse hundreds of affirmations by category — wealth, love, health, confidence, anxiety, strength, morning, sleep, motivation and self-love — or search for exactly what you need."
        />
      </Helmet>

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
          <label htmlFor="explore-search" className="sr-only">search affirmations</label>
          <input
            id="explore-search"
            type="text"
            placeholder="search affirmations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <VoicePicker voiceId={voiceId} onSelect={selectVoice} />
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
              const shareStatus = getShareStatus(cardId);
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
                    <button className="icon-btn" onClick={() => toggleSpeak(cardId, a.text, voiceId)}>
                      {speakingId === cardId ? "⏹️ stop" : "🔊 listen"}
                    </button>
                    <button className="icon-btn">🤍 save</button>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() =>
                        shareCard(cardId, {
                          text: a.text,
                          badgeLabel: meta.label,
                          background: meta.color,
                          ink: meta.ink,
                          badgeBackground: meta.color,
                          badgeInk: meta.ink,
                          filename: `smart-affirmation-${meta.slug}.png`,
                        })
                      }
                      disabled={shareStatus === "loading"}
                    >
                      {shareStatus === "loading"
                        ? "⏳ rendering…"
                        : shareStatus === "done"
                          ? "✅ done"
                          : shareStatus === "error"
                            ? "✕ retry"
                            : "⬇️ share"}
                    </button>
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
