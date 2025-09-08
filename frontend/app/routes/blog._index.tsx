import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPosts, getAssetUrl, type Post } from "../lib/directus";
import { CalendarIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog — reCraft" },
    { name: "description", content: "Read our thoughts and insights on design, technology, and creativity" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const posts = await getPosts();
    return json({ posts, success: true, error: null as string | null });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return json({ posts: [] as Post[], success: false, error: "Failed to fetch posts" });
  }
}

export default function BlogIndex() {
  const { posts, success, error } = useLoaderData<typeof loader>();

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="minimal-content" style={{ paddingTop: 'calc(var(--header-height) + var(--space-2xl))' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--space-4xl)',
          paddingBottom: 'var(--space-2xl)',
          borderBottom: '1px solid var(--color-gray)'
        }}>
          <h1 style={{ 
            fontSize: 'var(--text-4xl)', 
            fontWeight: 600, 
            marginBottom: 'var(--space-md)',
            letterSpacing: '-0.03em'
          }}>
            Blog
          </h1>
          <p style={{ 
            fontSize: 'var(--text-lg)', 
            color: 'var(--color-dark-gray)',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Thoughts and insights on design, technology, and the creative process
          </p>
        </div>
        
        {!success && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 0', 
            color: 'var(--color-dark-gray)' 
          }}>
            <p>Unable to load posts. Please ensure Directus is running at localhost:8055.</p>
          </div>
        )}

        {posts.length === 0 && success ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 0', 
            color: 'var(--color-dark-gray)' 
          }}>
            <p>No posts found. Create some posts in Directus and make sure they're published.</p>
          </div>
        ) : (
          <>
            <div className="minimal-blog-grid">
              {posts.map((post: Post) => (
                <Link 
                  key={post.id} 
                  to={`/blog/${post.slug}`} 
                  className="minimal-post-card"
                >
                  {post.featured_image && getAssetUrl(post.featured_image, 400, 240, 80) && (
                    <img 
                      src={getAssetUrl(post.featured_image, 400, 240, 80)}
                      alt={post.title}
                      className="minimal-post-image"
                      onError={(e) => {
                        console.error('Failed to load image:', post.featured_image);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="minimal-post-content">
                    <div className="minimal-post-meta">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CalendarIcon style={{ width: '14px', height: '14px' }} />
                        {formatDate(post.date_created)}
                      </span>
                      <span>·</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <ClockIcon style={{ width: '14px', height: '14px' }} />
                        Read
                      </span>
                    </div>
                    <h3 className="minimal-post-title">{post.title}</h3>
                    <p className="minimal-post-excerpt">
                      {post.excerpt || "Continue reading to discover more insights and perspectives..."}
                    </p>
                    <div className="minimal-read-more">
                      Read article 
                      <ArrowRightIcon style={{ width: '16px', height: '16px', marginLeft: '0.5rem' }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination Placeholder */}
            {posts.length > 12 && (
              <div style={{ 
                textAlign: 'center', 
                marginTop: 'var(--space-4xl)', 
                padding: 'var(--space-xl) 0' 
              }}>
                <div style={{
                  display: 'inline-flex',
                  gap: 'var(--space-sm)',
                  alignItems: 'center'
                }}>
                  <button 
                    disabled
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid var(--color-gray)',
                      background: 'transparent',
                      color: 'var(--color-medium-gray)',
                      cursor: 'not-allowed'
                    }}
                  >
                    ← Previous
                  </button>
                  <span style={{ 
                    padding: '0.5rem 1rem',
                    backgroundColor: 'var(--color-black)',
                    color: 'var(--color-pure-white)',
                    fontSize: 'var(--text-sm)'
                  }}>
                    1
                  </span>
                  <button 
                    disabled
                    style={{
                      padding: '0.5rem 1rem',
                      border: '1px solid var(--color-gray)',
                      background: 'transparent',
                      color: 'var(--color-medium-gray)',
                      cursor: 'not-allowed'
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}