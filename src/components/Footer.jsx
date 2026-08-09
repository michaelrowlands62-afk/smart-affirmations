import { Link } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import { categories } from "../data/categories";

const FOOTER_CATEGORY_SLUGS = ["wealth", "love", "confidence", "anxiety", "morning"];
const footerCategories = FOOTER_CATEGORY_SLUGS.map((slug) =>
  categories.find((c) => c.slug === slug)
).filter(Boolean);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">smart affirmations</Link>
          <p className="footer-tagline">your daily affirmation, made personal.</p>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">site</span>
          <nav className="footer-links">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            ))}
          </nav>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">categories</span>
          <nav className="footer-links">
            {footerCategories.map((cat) => (
              <Link key={cat.slug} to={`/explore?category=${cat.slug}`}>{cat.label}</Link>
            ))}
          </nav>
        </div>

        <div className="footer-col">
          <span className="footer-col-title">legal</span>
          <nav className="footer-links">
            <Link to="/privacy-policy">privacy policy</Link>
            <Link to="/terms-of-use">terms of use</Link>
          </nav>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Smart Affirmations. All rights reserved.</p>
      </div>
    </footer>
  );
}
