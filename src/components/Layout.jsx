import { Link, Outlet } from "react-router-dom";
import { navLinks } from "../data/navLinks";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="logo">smart affirmations</Link>
        <nav>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
