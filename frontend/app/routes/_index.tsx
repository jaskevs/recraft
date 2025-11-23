import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getAssetUrl, getPosts, type Post } from "../lib/directus";
import { Calendar, Clock, ArrowRight } from "react-feather";
import { formatDate } from "../utils/format";

export const meta: MetaFunction = () => {
  return [
    { title: "reCraft - Thoughtful writing on design & technology" },
    {
      name: "description",
      content:
        "A minimalist blog focused on design, technology, and thoughtful perspectives.",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const posts = await getPosts();
    return json({ posts, success: true, error: null as string | null });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return json({
      posts: [] as Post[],
      success: false,
      error: "Failed to fetch posts",
    });
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { posts, success, error } = data;

  // Format date
  return (
    <>
      {/* Hero Section */}
      <section className="minimal-hero">
        <div className="container container-narrow">
          <h1>
            <strong>reCraft</strong> — Thoughtful writing on design & technology
          </h1>
          <p>
            Exploring the intersection of creativity, functionality, and human
            experience through minimal design and clear thinking.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="minimal-content">
        <div className="container">
          {!success && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 0",
                color: "var(--color-dark-gray)",
              }}
            >
              <p>
                Unable to load posts. Please ensure Directus is running at
                localhost:8055.
              </p>
            </div>
          )}

          {posts.length === 0 && success ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 0",
                color: "var(--color-dark-gray)",
              }}
            >
              <p>
                No posts found. Create some posts in Directus and make sure
                they're published.
              </p>
            </div>
          ) : (
            <>
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "var(--space-3xl)",
                }}
              >
                <h2
                  style={{
                    fontSize: "var(--text-2xl)",
                    fontWeight: 500,
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  Latest Posts
                </h2>
                <p style={{ color: "var(--color-dark-gray)" }}>
                  Recent thoughts and insights
                </p>
              </div>

              <div className="minimal-blog-grid">
                {posts.slice(0, 6).map((post: Post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="minimal-post-card"
                  >
                    {post.featured_image && (
                      <img
                        src={getAssetUrl(post.featured_image, 800, undefined, 85) || ''}
                        alt={post.title}
                        className="minimal-post-image"
                        onError={(e) => {
                          console.log(
                            "Image failed to load:",
                            post.featured_image
                          );
                          console.log(
                            "Generated URL:",
                            getAssetUrl(post.featured_image, 400, 240, 80)
                          );
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <div className="minimal-post-content">
                      <div className="minimal-post-meta">
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <Calendar
                            size={14}
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          {formatDate(post.date_created)}
                        </span>
                        <span>·</span>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <Clock
                            size={14}
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          Read
                        </span>
                      </div>
                      <h3 className="minimal-post-title">{post.title}</h3>
                      <p className="minimal-post-excerpt">
                        {post.excerpt ||
                          "Continue reading to discover more insights and perspectives..."}
                      </p>
                      <div className="minimal-read-more">
                        Read article
                        <ArrowRight
                          size={16}
                          strokeWidth={1.6}
                          style={{ marginLeft: "0.5rem" }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {posts.length > 6 && (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "var(--space-3xl)",
                    padding: "var(--space-2xl) 0",
                  }}
                >
                  <Link
                    to="/blog"
                    style={{
                      display: "inline-block",
                      padding: "0.75rem 2rem",
                      border: "1px solid var(--color-black)",
                      color: "var(--color-black)",
                      fontWeight: 500,
                      transition: "all var(--transition-base)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--color-black)";
                      e.currentTarget.style.color = "var(--color-pure-white)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--color-black)";
                    }}
                  >
                    View all posts
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}


