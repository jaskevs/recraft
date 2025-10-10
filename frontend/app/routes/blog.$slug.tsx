import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getPost, getAssetUrl, type Post } from "../lib/directus";
import { Calendar, Clock, User, ArrowLeft } from "react-feather";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [
      { title: "Post Not Found - reCraft" },
      {
        name: "description",
        content: "The requested blog post could not be found.",
      },
    ];
  }

  return [
    { title: `${data.post.title} — reCraft` },
    {
      name: "description",
      content: data.post.excerpt || `Read ${data.post.title} on reCraft`,
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  try {
    const post = await getPost(slug);

    if (!post) {
      throw new Response("Not Found", { status: 404 });
    }

    return json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Response("Error loading post", { status: 500 });
  }
};

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Estimate reading time (rough calculation)
  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <article className="minimal-article">
      <header className="minimal-article-header">
        <h1 className="minimal-article-title">{post.title}</h1>
        <div className="minimal-article-meta">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Calendar size={16} strokeWidth={1.6} aria-hidden="true" />
            {formatDate(post.date_created)}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Clock size={16} strokeWidth={1.6} aria-hidden="true" />
            {estimateReadingTime(post.content)}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <User size={16} strokeWidth={1.6} aria-hidden="true" />
            by reCraft
          </span>
        </div>
      </header>

      {post.featured_image &&
        getAssetUrl(post.featured_image, 800, undefined, 85) && (
          <div
            style={{
              marginBottom: "var(--space-3xl)",
              textAlign: "center",
            }}
          >
            <img
              src={getAssetUrl(post.featured_image, 800, undefined, 85) || ''}
              alt={post.title}
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "auto",
                border: "1px solid var(--color-gray)",
              }}
              onError={(e) => {
                console.error(
                  "Failed to load featured image:",
                  post.featured_image
                );
                e.currentTarget.parentElement!.style.display = "none";
              }}
            />
          </div>
        )}

      <div
        className="minimal-article-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer
        style={{
          marginTop: "var(--space-4xl)",
          paddingTop: "var(--space-3xl)",
          borderTop: "1px solid var(--color-gray)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-lg)",
          }}
        >
          <Link to="/blog" className="minimal-back-link">
            <ArrowLeft size={16} strokeWidth={1.6} aria-hidden="true" />
            Back to Blog
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-md)",
              color: "var(--color-dark-gray)",
              fontSize: "var(--text-sm)",
            }}
          >
            <span>Share:</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined") {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(post.title);
                  window.open(
                    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
                    "_blank"
                  );
                }
              }}
              style={{
                color: "var(--color-dark-gray)",
                transition: "color var(--transition-base)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-black)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-dark-gray)")
              }
            >
              Twitter
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (typeof window !== "undefined") {
                  const url = encodeURIComponent(window.location.href);
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
                    "_blank"
                  );
                }
              }}
              style={{
                color: "var(--color-dark-gray)",
                transition: "color var(--transition-base)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-black)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-dark-gray)")
              }
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Related Posts Section (placeholder) */}
      <div
        style={{
          marginTop: "var(--space-4xl)",
          paddingTop: "var(--space-3xl)",
          borderTop: "1px solid var(--color-gray)",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: 500,
            marginBottom: "var(--space-lg)",
            color: "var(--color-black)",
          }}
        >
          More Articles
        </h3>
        <Link
          to="/blog"
          style={{
            color: "var(--color-dark-gray)",
            fontSize: "var(--text-sm)",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          View all posts
        </Link>
      </div>
    </article>
  );
}

