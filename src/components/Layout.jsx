import { Link, Outlet } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "home" },
  { to: "/generate", label: "generate" },
  { to: "/explore", label: "explore" },
  { to: "/learn", label: "learn" },
  { to: "/about", label: "about" },
  { to: "/blog", label: "blog" },
  { to: "/contact", label: "contact" },
];

export default function Layout() {
  return (
    <div className="site">
      <header className="site-header">
        <Link to="/" className="logo">smart affirmations</Link>
        <nav>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Smart Affirmations</p>
      </footer>
    </div>
  );
}
