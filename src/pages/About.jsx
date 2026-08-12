import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="page page-about">
      <Helmet>
        <title>About - Smart Affirmations</title>
        <meta
          name="description"
          content="the story behind smart affirmations — a father-daughter project built by a lifelong martial artist who first tried affirmations as a teenager and never stopped."
        />
        <link rel="canonical" href="https://smartaffirmations.com/about" />
      </Helmet>

      <article className="article">
        <header className="article-hero">
          <span className="eyebrow">about</span>
          <h1>the story behind smart affirmations</h1>
          <p className="tagline">
            not abstract self-help content — this comes from someone who's actually used
            affirmations under real pressure, for years
          </p>
        </header>

        <div className="article-body">
          <section className="article-section">
            <h2>a lifetime in martial arts</h2>
            <p>
              this site was built by Mike, who's been heavily involved in martial arts since he was
              a teenager. over the years that's meant boxing, kickboxing, and training all the way
              to a 2nd dan black belt in WT Taekwondo. that's a lot of time spent in situations
              where nerves, focus, and the ability to talk yourself through something hard aren't
              optional extras — they're part of the job.
            </p>
            <p>
              it's also exactly the kind of environment where you find out pretty quickly whether a
              mental tool actually holds up, or whether it just sounds good in theory. training and
              competing don't leave much room for wishful thinking.
            </p>
          </section>

          <section className="article-section">
            <h2>the tom platz moment</h2>
            <p>
              as a teenager, Mike came across bodybuilder Tom Platz talking about how he used
              affirmations to reach his goals. it was a simple idea, but it stuck — enough that Mike
              decided to actually try it himself instead of just filing it away as an interesting
              thing he'd heard once.
            </p>
            <div className="pull-quote">
              <p>
                "a bodybuilder talking about affirmations was the moment this whole thing started —
                one teenager deciding to actually try it, instead of just thinking it sounded
                interesting."
              </p>
            </div>
          </section>

          <section className="article-section">
            <h2>what happened next</h2>
            <p>
              the results were significant enough that affirmations didn't stay a one-time
              experiment. they became part of training, part of competing, and eventually part of
              life generally — not confined to the gym or the dojo, but woven into how Mike
              approaches things day to day. that's a long track record to build a site on: years of
              actually using the practice, not just reading about it.
            </p>
          </section>

          <section className="article-section">
            <h2>why smart affirmations exists</h2>
            <p>
              a lot of affirmation content out there is written from a distance — theory without
              much behind it. smart affirmations comes from the opposite direction. it's built by
              someone who has tested affirmations under real physical and competitive pressure for
              years, not someone who read about the idea and decided it sounded good enough to
              write up.
            </p>
            <p>
              that's the whole reason this site exists: to take something that's genuinely helped,
              and make it easier for other people to actually use — instead of leaving it as a
              vague piece of advice that's easy to hear and hard to act on.
            </p>
          </section>

          <section className="article-section">
            <h2>a father-daughter project</h2>
            <p>
              smart affirmations was built by Mike together with his daughter Natalie, who is also
              a taekwondo black belt in her own right. this is a shared project between the two of
              them — built on the same practice they both know from the inside, not just something
              handed down secondhand.
            </p>
          </section>

          <div className="article-cta">
            <div className="generate-cta-box">
              <p>ready to put it into practice?</p>
              <Link to="/generate" className="btn btn-primary">generate your own →</Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
