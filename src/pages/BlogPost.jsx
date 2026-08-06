import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { posts } from "../data/posts";
import { formatDate } from "../lib/formatDate";

function groupIntoSections(content) {
  const sections = [];
  let current = null;

  for (const block of content) {
    if (block.type === "heading" && block.level === 2) {
      current = { heading: block.text, blocks: [] };
      sections.push(current);
      continue;
    }
    if (!current) {
      current = { heading: null, blocks: [] };
      sections.push(current);
    }
    current.blocks.push(block);
  }

  return sections;
}

function ContentBlock({ block }) {
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "heading" && block.level === 3) return <h3>{block.text}</h3>;
  if (block.type === "quote") {
    return (
      <div className="pull-quote">
        <p>{block.text}</p>
      </div>
    );
  }
  if (block.type === "callout") {
    const isWarning = block.variant === "warning";
    return (
      <div className={`callout-box${isWarning ? " callout-warning" : ""}`}>
        <span className="callout-icon" role="img" aria-label={isWarning ? "warning" : "lightbulb"}>
          {isWarning ? "⚠️" : "💡"}
        </span>
        <p>{block.text}</p>
      </div>
    );
  }
  return null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="page page-article">
        <Helmet>
          <title>post not found | smart affirmations</title>
          <meta name="description" content="this post doesn't exist or may have moved." />
        </Helmet>
        <article className="article">
          <header className="article-hero">
            <span className="eyebrow">blog</span>
            <h1>post not found</h1>
            <p className="tagline">this one doesn't exist, or it may have moved.</p>
          </header>
          <div className="article-body">
            <section className="article-cta">
              <div className="generate-cta-box">
                <p>head back and find something else to read.</p>
                <Link to="/blog" className="btn btn-primary">back to blog →</Link>
              </div>
            </section>
          </div>
        </article>
      </div>
    );
  }

  const sections = groupIntoSections(post.content);

  return (
    <div className="page page-article">
      <Helmet>
        <title>{post.title} | smart affirmations</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="article">
        <header className="article-hero">
          <span className="eyebrow">blog</span>
          <h1>{post.title}</h1>
          <p className="tagline">{formatDate(post.date)}</p>
        </header>

        <div className="article-body">
          {sections.map((section, i) => (
            <section className="article-section" key={i}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.blocks.map((block, j) => (
                <ContentBlock block={block} key={j} />
              ))}
            </section>
          ))}

          <section className="article-cta">
            <div className="generate-cta-box">
              <p>ready to put this into practice?</p>
              <Link to="/generate" className="btn btn-primary">generate your own →</Link>
            </div>
            <p className="post-back-link">
              <Link to="/blog">← back to all posts</Link>
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
