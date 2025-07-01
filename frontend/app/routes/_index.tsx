import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getAssetUrl, getPosts, type Post } from "../lib/directus";

export const meta: MetaFunction = () => {
  return [
    { title: "Re:hive Space - Tech Blog" },
    { name: "description", content: "A modern tech blog built with Remix and Directus" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const posts = await getPosts();
    return json({ posts, success: true, error: null as string | null });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return json({ posts: [] as Post[], success: false, error: "Failed to fetch posts" });
  }
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { posts, success, error } = data;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Re:hive Space
          </h1>
          <p className="text-lg text-gray-600">
            A modern tech blog built with Remix and Directus
          </p>
        </header>

        {!success && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">
              Error loading posts: {error}
            </p>
            <p className="text-red-600 text-sm mt-2">
              Make sure Directus is running at localhost:8055 and you have published posts.
            </p>
          </div>
        )}

        <main>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Latest Posts</h2>
          
          {posts.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                No posts found. Create some posts in Directus and make sure they're published!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: Post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  {post.featured_image && (
                    <img 
                      src={getAssetUrl(post.featured_image)}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time dateTime={post.date_created}>
                        {new Date(post.date_created).toLocaleDateString()}
                      </time>
                      <Link 
                        to={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}