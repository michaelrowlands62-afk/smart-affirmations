import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <div className="page page-legal">
      <Helmet>
        <title>privacy policy | smart affirmations</title>
        <meta
          name="description"
          content="what data smart affirmations collects, why, and how the third-party services we use (openai, elevenlabs, supabase, netlify) fit in. plain english, uk gdpr compliant."
        />
      </Helmet>

      <header className="legal-hero">
        <span className="eyebrow">legal</span>
        <h1>privacy policy</h1>
        <p className="tagline">
          a plain-english explanation of what data smart affirmations collects and why — no legal
          maze, no fine print designed to be skipped.
        </p>
      </header>

      <article className="legal-article">
        <section className="legal-section">
          <h2>who we are</h2>
          <p>
            smart affirmations is a UK-based website. this policy explains what personal data we
            collect when you use the site, why we collect it, and what your rights are under UK
            GDPR (the UK General Data Protection Regulation) and the Data Protection Act 2018.
          </p>
        </section>

        <section className="legal-section">
          <h2>what we collect</h2>
          <p>we keep this deliberately minimal. here's everything that's collected on this site:</p>
          <ul>
            <li>
              <strong>contact form submissions</strong> — if you use the contact page, we collect
              your name, email address, and message. this is submitted via Netlify Forms so we can
              read and reply to you.
            </li>
            <li>
              <strong>affirmation input text</strong> — when you use the generator, whatever you
              type is sent to OpenAI to generate a response. this text is used only to produce your
              affirmation and isn't linked to your identity, an account, or any profile — we don't
              know who you are when this happens.
            </li>
            <li>
              <strong>a device/browser identifier</strong> — a random id is generated and stored in
              your browser purely to enforce our daily limits on how many affirmations you can
              generate and how many voice listens you can use. it isn't used for tracking,
              advertising, or building a profile of you, and it isn't linked to any personal
              information.
            </li>
            <li>
              <strong>a voice preference</strong> — if you pick a voice for the "listen" feature,
              that choice is saved locally in your own browser (not on our servers) so it's
              remembered next time you visit.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>no accounts, no logins</h2>
          <p>
            smart affirmations doesn't have user accounts, logins, or passwords. there's nothing to
            sign up for, and we don't build profiles tied to who you are.
          </p>
        </section>

        <section className="legal-section">
          <h2>third-party services we use</h2>
          <p>
            some parts of the site rely on other companies to work. each of them processes a
            limited amount of data on our behalf, under their own privacy policies:
          </p>
          <ul>
            <li>
              <strong>OpenAI</strong> — generates your affirmation text from what you type. see{" "}
              <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noreferrer">
                OpenAI's privacy policy
              </a>.
            </li>
            <li>
              <strong>ElevenLabs</strong> — generates the spoken audio for the "listen" feature. see{" "}
              <a href="https://elevenlabs.io/privacy-policy" target="_blank" rel="noreferrer">
                ElevenLabs' privacy policy
              </a>.
            </li>
            <li>
              <strong>Supabase</strong> — powers our backend and database, including the daily rate
              limits described above. see{" "}
              <a href="https://supabase.com/privacy" target="_blank" rel="noreferrer">
                Supabase's privacy policy
              </a>.
            </li>
            <li>
              <strong>Netlify</strong> — hosts the site and handles contact form submissions. see{" "}
              <a href="https://www.netlify.com/privacy/" target="_blank" rel="noreferrer">
                Netlify's privacy policy
              </a>.
            </li>
          </ul>
          <p>
            some of these providers are based outside the UK and may process data on servers
            abroad. where that happens, they're responsible for maintaining appropriate safeguards
            for that transfer under their own policies.
          </p>
        </section>

        <section className="legal-section">
          <h2>we don't sell your data</h2>
          <p>
            we don't sell your data, and we don't share it with third parties for their own
            advertising or marketing purposes. the only sharing that happens is with the service
            providers listed above, strictly so the site can function.
          </p>
        </section>

        <section className="legal-section">
          <h2>your rights, and how to reach us</h2>
          <p>
            under UK GDPR you have the right to ask what personal data we hold about you, correct
            it, or have it deleted — in practice, that mostly applies to contact form submissions,
            since that's the only data we hold that identifies you. to ask about or request
            deletion of your contact form data, get in touch via our{" "}
            <Link to="/contact">contact page</Link>. you also have the right to lodge a complaint
            with the UK's Information Commissioner's Office (ICO) if you're unhappy with how we've
            handled your data.
          </p>
        </section>

        <section className="legal-section">
          <h2>children's privacy</h2>
          <p>
            smart affirmations is not intended for children under 13, and we don't knowingly
            collect data from anyone in that age group.
          </p>
        </section>

        <section className="legal-section">
          <h2>changes to this policy</h2>
          <p>
            we may update this policy from time to time as the site changes. if we make significant
            changes, we'll update the date below.
          </p>
          <p className="legal-updated">last updated: 9 August 2026</p>
        </section>
      </article>
    </div>
  );
}
