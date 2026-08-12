import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { posts } from "../data/posts";
import { formatDate } from "../lib/formatDate";

export default function Blog() {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="page page-blog">
      <Helmet>
        <title>Blog - Smart Affirmations</title>
        <meta
          name="description"
          content="notes on affirmations, self-talk, and the psychology behind them, from the team behind smart affirmations."
        />
        <link rel="canonical" href="https://smartaffirmations.com/blog" />
      </Helmet>

      <section className="blog-hero">
        <h1>blog</h1>
        <p className="tagline">more coming soon</p>
      </section>

      <section className="post-list">
        <span className="section-label">
          {sortedPosts.length} post{sortedPosts.length === 1 ? "" : "s"}
        </span>

        {sortedPosts.length === 0 ? (
          <p className="empty-state">no posts yet — check back soon.</p>
        ) : (
          <div className="post-grid">
            {sortedPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} className="post-card" key={post.slug}>
                <span className="post-card-date">{formatDate(post.date)}</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <span className="post-card-link">read more →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
