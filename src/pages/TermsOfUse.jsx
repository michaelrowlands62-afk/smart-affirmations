import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function TermsOfUse() {
  return (
    <div className="page page-legal">
      <Helmet>
        <title>terms of use | smart affirmations</title>
        <meta
          name="description"
          content="the terms for using smart affirmations, including what the site is (and isn't) for, acceptable use, intellectual property, and liability."
        />
      </Helmet>

      <header className="legal-hero">
        <span className="eyebrow">legal</span>
        <h1>terms of use</h1>
        <p className="tagline">
          the ground rules for using smart affirmations, written in plain english.
        </p>
      </header>

      <article className="legal-article">
        <section className="legal-section">
          <h2>acceptance of these terms</h2>
          <p>
            by using smart affirmations, you agree to these terms of use. if you don't agree with
            them, please don't use the site.
          </p>
        </section>

        <section className="legal-section">
          <h2>what this site is for</h2>
          <p>
            smart affirmations provides affirmations for general wellbeing and motivational
            purposes only. it is not a substitute for professional medical, psychological, or
            therapeutic advice, diagnosis, or treatment. if you're dealing with a mental health
            concern, please speak to a qualified professional or, in an emergency, contact your
            local emergency services.
          </p>
        </section>

        <section className="legal-section">
          <h2>ai-generated content</h2>
          <p>
            affirmations generated on this site are produced with the help of AI. we do our best to
            keep the tone and quality consistent, but AI-generated content can occasionally be
            imperfect, repetitive, or not quite land the way it's meant to. it's provided "as is,"
            without any guarantee that a given affirmation will be accurate, complete, or suited to
            your specific situation.
          </p>
        </section>

        <section className="legal-section">
          <h2>acceptable use</h2>
          <p>when using this site, you agree not to:</p>
          <ul>
            <li>attempt to abuse, overload, or disrupt the service</li>
            <li>attempt to circumvent our daily generation or listen rate limits</li>
            <li>scrape, systematically extract, or automate bulk collection of site content</li>
            <li>use the site for any unlawful purpose, or in a way that could harm the service or other users</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>intellectual property</h2>
          <p>
            the smart affirmations name, branding, and site content — including curated
            affirmations, articles, and design — belong to smart affirmations unless stated
            otherwise. you're welcome to share individual affirmations for personal use, but please
            don't republish or resell our content wholesale as your own.
          </p>
          <p>
            anything you submit through our contact form remains yours — we don't claim ownership
            of it, and we use it only to respond to you.
          </p>
        </section>

        <section className="legal-section">
          <h2>limitation of liability</h2>
          <p>
            smart affirmations is provided on an "as is" and "as available" basis. to the fullest
            extent permitted by law, we're not liable for any loss or damage arising from your use
            of the site, including reliance on any affirmation or content it generates. nothing in
            these terms excludes or limits liability where it would be unlawful to do so.
          </p>
        </section>

        <section className="legal-section">
          <h2>changes to these terms</h2>
          <p>
            we may update these terms from time to time as the site evolves. continued use of the
            site after a change means you accept the updated terms.
          </p>
          <p className="legal-updated">last updated: 9 August 2026</p>
        </section>

        <section className="legal-section">
          <h2>questions</h2>
          <p>
            if anything here is unclear, get in touch via our <Link to="/contact">contact page</Link>.
          </p>
        </section>
      </article>
    </div>
  );
}
