import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { guides } from "../data/guides";

export default function Learn() {
  return (
    <div className="page page-learn">
      <Helmet>
        <title>Learn - Smart Affirmations</title>
        <meta
          name="description"
          content="short, honest guides on how affirmations work, how to write your own, and how to use them for sleep, sport, anxiety, confidence and more."
        />
        <link rel="canonical" href="https://smartaffirmations.com/learn" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Smart Affirmations" />
        <meta property="og:url" content="https://smartaffirmations.com/learn" />
        <meta property="og:title" content="Learn - Smart Affirmations" />
        <meta
          property="og:description"
          content="short, honest guides on how affirmations work, how to write your own, and how to use them for sleep, sport, anxiety, confidence and more."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Learn - Smart Affirmations" />
        <meta
          name="twitter:description"
          content="short, honest guides on how affirmations work, how to write your own, and how to use them for sleep, sport, anxiety, confidence and more."
        />
      </Helmet>

      <section className="learn-hero">
        <h1>learn</h1>
        <p className="tagline">short guides on how to use affirmations well</p>
      </section>

      <section className="seo-section">
        <div className="seo-card">
          <span className="seo-tag" style={{ background: "var(--sun)" }}>start here</span>
          <h2>what this hub is for</h2>
          <p>
            most affirmation advice online falls into one of two camps. either it's dismissed as
            new-age fluff you say to a mirror and forget about, or it's oversold as some kind of
            life hack that rewires your brain in a week flat. neither one is very useful, and
            neither one is quite true. this hub is the space in between — a set of short, honest
            guides on what affirmations actually are, why they work when they work, and why they
            sometimes don't. no miracle claims, no fake studies, just the actual thinking behind
            a practice that's older, and more ordinary, than the internet makes it look.
          </p>
          <p>
            we built smart affirmations because a good line, said the right way, at the right
            moment, genuinely helps. but "the right way" and "the right moment" matter more than
            most people realize, and nobody hands you that part. a line that's too big to believe
            can do more harm than good. a line said once and never again barely registers. a line
            that isn't really about you doesn't land the way a personal one does. so instead of
            just handing you more affirmations, this section hands you the thinking behind them —
            the psychology, the practice, the timing — so you can use the ones you already have
            more effectively, and write better ones of your own.
          </p>
          <p>
            below are ten guides, each one focused on a single piece of the picture. we start
            with the fundamentals: what an affirmation actually is, and how to write ones that
            sound like you instead of a greeting card. from there we get into practice — mirror
            work, using affirmations while you sleep, weaving them into a workout or a slow yoga
            flow, and the kind of short self-talk athletes lean on before and during competing in
            sport. then we get specific: building a morning routine that survives past week one,
            and choosing the right words when what you're dealing with is anxiety or a shaky
            sense of confidence. the last guide is the one we wish everyone read first — the
            handful of ordinary mistakes that quietly sink most people's affirmation habit before
            it ever gets the chance to work.
          </p>
          <p>
            none of these guides ask you to take anything on faith. where there's real research
            behind a claim, we say so and explain what it actually found — including the parts
            that are more modest, or more complicated, than a five-word headline. where something
            is just common practice with no rigorous evidence either way, we say that too. our
            goal isn't to sell you on affirmations. it's to help you use them well, on your own
            terms, in whatever way actually fits your life.
          </p>
          <p>
            read them in any order. pick the one that matches whatever's going on for you right
            now, or start from the top if you want the full picture. either way, once you're
            ready to put any of it into practice, our <Link to="/generate">ai generator</Link> can
            build a line around your exact situation instead of leaving you stuck with something
            generic off a list.
          </p>
        </div>
      </section>

      <section className="guide-index">
        <h2 className="sr-only">the guides</h2>
        <span className="section-label" aria-hidden="true">the guides</span>
        <div className="guide-grid">
          {guides.map((guide) => {
            const CardTag = guide.live ? Link : "div";
            return (
              <CardTag
                key={guide.slug}
                {...(guide.live ? { to: `/learn/${guide.slug}` } : {})}
                className={`guide-card${guide.live ? "" : " guide-card--soon"}`}
              >
                <span
                  className="guide-card-tag"
                  style={{ background: guide.color, color: guide.ink, borderColor: guide.ink }}
                >
                  <span role="img" aria-label={`${guide.title} icon`}>{guide.icon}</span>
                  {" "}{guide.tag}
                </span>
                <h3>{guide.title}</h3>
                <p>{guide.summary}</p>
                <span className="guide-card-link">
                  {guide.live ? "read the guide →" : "coming soon"}
                </span>
              </CardTag>
            );
          })}
        </div>
      </section>
    </div>
  );
}
