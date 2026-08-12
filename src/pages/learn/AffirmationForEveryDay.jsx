import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const DAYS = [
  {
    name: "monday",
    mood:
      "the hardest restart of the week — shifting out of rest mode and back into structure, often before you feel ready to.",
    line: "monday doesn't need to be conquered, just started.",
  },
  {
    name: "tuesday",
    mood:
      "the quieter, less dramatic day — momentum is building, but nobody's cheering for it yet.",
    line: "tuesday is where the real work quietly happens.",
  },
  {
    name: "wednesday",
    mood:
      "the midweek push — energy dips here for a lot of people, right when there's still real distance left to cover.",
    line: "halfway isn't behind schedule — it's exactly on it.",
  },
  {
    name: "thursday",
    mood:
      "the fatigue day — the novelty of the week has worn off, but the finish line isn't close enough to coast toward yet.",
    line: "i don't need fresh energy to keep good form.",
  },
  {
    name: "friday",
    mood:
      "the winding-down day — closing loops, lowering the intensity, shifting from output toward rest.",
    line: "what didn't get done today can wait for monday.",
  },
  {
    name: "saturday",
    mood: "the open day — less structure, more permission, and less pressure to produce anything.",
    line: "today doesn't owe anyone output.",
  },
  {
    name: "sunday",
    mood:
      "the reset day — for a lot of people this one carries its own quiet dread about the week ahead, worth naming rather than ignoring.",
    line: "sunday is for resetting, not dreading what's next.",
  },
];

export default function AffirmationForEveryDay() {
  return (
    <div className="page page-article">
      <Helmet>
        <title>a short affirmation for every day of the week | smart affirmations</title>
        <meta
          name="description"
          content="one short, original affirmation for each day of the week — monday through sunday — matched to the different energy and pressure each day tends to bring."
        />
        <link rel="canonical" href="https://smartaffirmations.com/learn/an-affirmation-for-every-day-of-the-week" />
      </Helmet>

      <article className="article">
        <header className="article-hero">
          <span className="eyebrow">learn</span>
          <h1>a short affirmation for every day of the week</h1>
          <p className="tagline">
            one line for each day, monday through sunday — built around the different kind of push or
            steadiness each day tends to actually need
          </p>
        </header>

        <div className="article-body">
          <section className="article-section">
            <h2>why one line rarely fits a whole week</h2>
            <p>
              a week doesn't feel the same from one end to the other. monday has a different texture
              than friday. wednesday's slump doesn't feel like sunday's quiet dread. most affirmation
              lists hand you one generic line and expect it to carry all seven days equally, which is
              part of why it tends to stop working by wednesday — it was only ever built for one kind
              of day, not the one you're actually having.
            </p>
            <p>
              this guide takes a different approach: seven short, original lines, one for each day,
              matched to the general shape of energy and pressure that day tends to bring for a lot of
              people. none of these are meant as universal truths about your specific week — think of
              them as a starting shape you can adjust, not a fixed schedule to follow exactly.
            </p>
            <p>
              the shape below follows a fairly common working week — a slower start, a middle
              stretch that asks the most of you, and a wind-down toward the weekend — but the exact
              feeling of any given day will always depend more on your actual life than on which day
              of the calendar it happens to be. treat this as a template worth testing against your
              own week, not a schedule someone else has already decided for you.
            </p>
          </section>

          <section className="article-section">
            <h2>the week, day by day</h2>
            {DAYS.map((day) => (
              <div key={day.name} className="week-day-block">
                <h3>{day.name}</h3>
                <p>{day.mood}</p>
                <p className="week-day-line">
                  <em>"{day.line}"</em>
                </p>
              </div>
            ))}
          </section>

          <div className="pull-quote">
            <p>
              "the week doesn't need one line strong enough to cover all seven days. it needs seven
              lines honest enough to fit the day they're actually said on."
            </p>
          </div>

          <section className="article-section">
            <h2>a note on why these are grouped by day at all</h2>
            <p>
              grouping affirmations by day of the week isn't about the calendar having any special
              power over how you feel — it's a practical shortcut. most people's weeks do settle into
              some kind of recognizable rhythm, even a loose one, and having a line ready before a
              predictable rough patch arrives tends to work better than trying to write one from
              scratch in the middle of it. the day is really just a stand-in for a pattern; what
              actually matters is having something steady on hand before the pattern repeats itself.
            </p>
          </section>

          <section className="article-section">
            <h2>why these avoid the usual "monday motivation" lines</h2>
            <p>
              most day-of-the-week affirmation lists lean on the same handful of clichés — monday gets
              a forced burst of hype, friday gets a victory lap, sunday gets ignored entirely because
              nobody wants to write anything for the day everyone's dreading the week ahead. those
              lines tend to feel hollow fast, because they're reaching for a mood rather than
              describing one honestly.
            </p>
            <p>
              the lines above are written to hold two things at once: naming what a day actually tends
              to feel like, and offering something steady rather than something falsely upbeat. monday
              doesn't get told to be conquered, because most mondays don't feel conquerable — they just
              need starting. sunday doesn't get skipped, because the quiet dread a lot of people carry
              into it is real enough to name directly instead of talking over.
            </p>
          </section>

          <section className="article-section">
            <h2>using this as a weekly rhythm</h2>
            <p>
              you don't need a formal ritual to use this — most people find it works best attached to
              something they already do each morning: making coffee, the commute, brushing their
              teeth. say the day's line once, on purpose, rather than letting it just sit on a page.
              if a particular day's line doesn't match how that day actually feels for you specifically
              — maybe your hardest day is thursday, not monday — swap it. the point isn't the exact
              wording here, it's the underlying habit of matching the line to the day instead of
              reaching for one generic sentence and hoping it covers everything.
            </p>
            <p>
              some weeks won't follow this shape at all — a monday can show up feeling like a friday,
              and a wednesday can hit like the hardest day you've had in a month. that's fine. this
              rhythm is a default starting point, not a rule your week has to obey.
            </p>
            <p>
              it also helps to say the line before the day's pressure actually sets in, rather than
              reaching for it mid-crisis. a monday line said at 7am, before the inbox is open, does
              more work than the same line remembered at 11am once the day has already gone sideways.
              the earlier the line lands, the more it can shape how you walk into the day, rather than
              just react to how the day already went.
            </p>
          </section>

          <section className="article-section">
            <h2>when the default lines stop fitting</h2>
            <p>
              these seven lines are intentionally general, matched to the broad shape of a typical
              week rather than to your actual, specific tuesday. if a day is carrying something more
              particular — a deadline, a hard conversation, a low mood that doesn't match its usual
              slot — a line built around the general week probably won't land as well as one built
              around what's actually happening for you. that's exactly the gap a personalized
              affirmation is built to close.
            </p>
            <p>
              it's also worth noticing when a day keeps breaking the pattern week after week — say,
              every wednesday lands harder than the general "midweek push" framing accounts for.
              that's usually worth paying attention to rather than dismissing as one bad week. a
              recurring pattern like that is a signal about what's actually going on in your specific
              week, not a sign the day-by-day approach has failed. it just means that particular day
              deserves a line built around its specific cause, rather than the general shape most
              wednesdays tend to share. pairing this with a proper{" "}
              <Link to="/learn/morning-affirmation-routines">morning affirmation routine</Link>{" "}
              makes the day-by-day habit even easier to keep.
            </p>
          </section>

          <section className="article-cta">
            <div className="generate-cta-box">
              <p>need a line for a day that doesn't fit the usual pattern?</p>
              <Link to="/generate" className="btn btn-primary">generate yours →</Link>{" "}
              <Link to="/explore" className="btn btn-outline">or browse affirmations →</Link>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
