import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { affirmationOfTheDay } from "../data/affirmations";
import { useSpeech } from "../lib/useSpeech";
import { useShareCard } from "../lib/useShareCard";
import { useVoicePreference } from "../lib/useVoicePreference";
import VoicePicker from "../components/VoicePicker";

const AOTD_SPEECH_ID = "aotd";

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

export default function Home() {
  const today = affirmationOfTheDay();
  const { speakingId, toggleSpeak } = useSpeech();
  const { shareCard, getShareStatus } = useShareCard();
  const { voiceId, selectVoice } = useVoicePreference();
  const isSpeaking = speakingId === AOTD_SPEECH_ID;
  const shareStatus = getShareStatus(AOTD_SPEECH_ID);

  return (
    <div className="page page-home">
      <section className="hero">
        <span className="eyebrow">smart affirmations</span>
        <div className="hero-stamp-wrap">
          <div className="hero-card">
            <h1>i am the proof i needed.</h1>
          </div>
          <span className="hero-badge">my affirmation</span>
        </div>
        <p className="tagline">your daily affirmation, picked for wealth, love, health and more</p>
        <div className="hero-actions">
          <Link to="/generate" className="btn btn-primary">generate yours →</Link>
          <Link to="/explore" className="btn btn-outline">explore categories</Link>
        </div>
      </section>

      <section className="category-grid">
        <span className="section-label">explore by category</span>
        <div className="tile-grid">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/explore?category=${cat.slug}`}
              className="category-tile"
              style={{ background: cat.color, color: cat.ink, borderColor: cat.ink }}
            >
              <span>{ICONS[cat.icon]}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="seo-section">
        <div className="seo-card">
          <span className="seo-tag" style={{ background: "var(--sun)" }}>the basics</span>
          <h2>what smart affirmations is about</h2>
          <p>
            smart affirmations is a simple home for words that actually help. we write short,
            punchy lines you can say to yourself before a hard meeting, after a rough night, or
            on an ordinary tuesday that needs a little lift. no vague positivity, no fluff, no
            ten-paragraph mindset lectures — just a sentence you can carry with you.
          </p>
          <p>
            everything here is sorted by what you're going through: wealth, love, health,
            confidence, anxiety, strength, morning, sleep, motivation and self-love. pick a
            category that matches your day, or tell our ai generator what's on your mind and get
            a line built for that exact moment. save the ones that hit, share the ones that might
            help a friend, and come back tomorrow for a fresh one.
          </p>
          <p>
            this isn't about pretending everything's fine. it's about giving your mind something
            true and useful to hold onto, one sentence at a time — written by us, said by you,
            until it sounds like your own voice.
          </p>
          <p>
            no sign-up wall, no paywall on the basics. browse free, generate free, come back as
            often as you like. if one line changes how your day goes, that's the whole point.
          </p>
        </div>
      </section>

      <section className="affirmation-of-the-day">
        <div className="aotd-card">
          <span className="aotd-badge" style={{ background: "var(--sun)" }}>
            today's affirmation
          </span>
          <blockquote>&ldquo;{today.text}&rdquo;</blockquote>
          <VoicePicker voiceId={voiceId} onSelect={selectVoice} />
          <div className="aotd-actions">
            <button className="icon-btn" onClick={() => toggleSpeak(AOTD_SPEECH_ID, today.text, voiceId)}>
              {isSpeaking ? "⏹️ stop" : "🔊 listen"}
            </button>
            <button className="icon-btn">🤍 save</button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => shareCard(AOTD_SPEECH_ID, { text: today.text, badgeLabel: "today's affirmation" })}
              disabled={shareStatus === "loading"}
            >
              {shareStatus === "loading"
                ? "⏳ rendering…"
                : shareStatus === "done"
                  ? "✅ downloaded"
                  : shareStatus === "error"
                    ? "✕ try again"
                    : "⬇️ share card"}
            </button>
          </div>
        </div>
      </section>

      <section className="seo-section">
        <div className="seo-card">
          <span className="seo-tag" style={{ background: "var(--coral)" }}>the why</span>
          <h2>why affirmations work</h2>
          <p>
            affirmations work because your brain believes what it hears on repeat. say something
            enough times, in your own voice, and it stops sounding like a suggestion and starts
            sounding like a fact you already know.
          </p>
          <p>
            confidence builds the same way muscle does — through reps. a line like &ldquo;i walk
            into every room prepared&rdquo; said before every hard conversation slowly becomes
            true, because you start acting like it already is. that's not magic, that's practice.
          </p>
          <p>
            self-love needs the same repetition. most of us are fluent in self-criticism and
            rusty at anything kinder. affirmations retrain that inner voice, one sentence at a
            time, until being kind to yourself feels normal instead of forced.
          </p>
          <p>
            for anxiety, affirmations aren't about silencing the feeling — they're about giving
            you something steady to stand on while the feeling passes through. &ldquo;this is
            temporary, i am not&rdquo; doesn't erase a hard moment. it gets you to the other side
            of it.
          </p>
          <p>
            motivation runs out fast when it depends on how you feel that day. affirmations
            don't wait around for motivation — they build a mindset that shows up anyway, on the
            easy days and the hard ones, until showing up is just who you are.
          </p>
          <p>
            none of this replaces real support when you need it. affirmations are a tool for the
            everyday moments — the meeting, the message, the monday — not a stand-in for therapy
            or medical care.
          </p>
        </div>
      </section>

      <section className="generator-teaser">
        <div className="generator-box">
          <span className="section-label">ai generator</span>
          <p className="prompt">tell us how you're feeling, get an affirmation made for you</p>
          <div className="generator-row">
            <input type="text" placeholder="i'm nervous about a job interview" />
            <Link to="/generate" className="btn btn-primary">generate</Link>
          </div>
        </div>
      </section>

      <section className="seo-section">
        <div className="seo-card">
          <span className="seo-tag" style={{ background: "#5FD9C0" }}>the how-to</span>
          <h2>how to use your affirmations</h2>
          <p>
            say it out loud, not just in your head. your own voice, spoken with a little
            intention, sticks in a way silent reading never quite does.
          </p>
          <p>
            pick one line and repeat it — in the shower, on your commute, before you open your
            laptop. repetition is what turns a nice sentence into a real belief. one read-through
            won't move much. twenty mornings in a row will.
          </p>
          <p>
            pair it with something you already do every day. brushing your teeth, making coffee,
            waiting for the kettle to boil — attach your affirmation to a habit you already have
            and you'll never have to remember to do it separately.
          </p>
          <p>
            write it down somewhere you'll actually see it. a sticky note on the mirror, a lock
            screen, the notes app you open a hundred times a day without thinking. the goal isn't
            to find it once, it's to bump into it constantly until it sinks in.
          </p>
          <p>
            and let it change as you do. what you needed in january isn't what you need in july.
            lean on more sleep affirmations during a hard stretch, more motivation ones when
            you're building something new. the right words find you at the right time.
          </p>
          <p>
            there's no wrong way to do this. some people whisper their line before bed, others
            say it to the mirror each morning. try a few approaches, notice what sticks, and keep
            the one that actually changes how you feel.
          </p>
        </div>
      </section>

      <section className="why-choose">
        <div className="why-choose-box">
          <h2>why choose smart affirmations</h2>
          <div className="badge-row">
            <span className="badge">✅ original content</span>
            <span className="badge">✍️ expertly written</span>
            <span className="badge">⚡ easy to use</span>
            <span className="badge">🔄 updated regularly</span>
          </div>
        </div>
      </section>
    </div>
  );
}
