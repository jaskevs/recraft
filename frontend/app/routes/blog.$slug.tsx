import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getPost, getAssetUrl, type Post } from "../lib/directus";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [
      { title: "Post Not Found - Re:hive Space" },
      { name: "description", content: "The requested blog post could not be found." },
    ];
  }

  return [
    { title: `${data.post.title} - Re:hive Space` },
    { name: "description", content: data.post.excerpt || `Read ${data.post.title} on Re:hive Space` },
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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link 
            to="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </nav>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {post.featured_image && (
            <img 
              src={getAssetUrl(post.featured_image)}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}
          
          <div className="p-8">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              
              <div className="flex items-center text-gray-600">
                <time dateTime={post.date_created}>
                  {new Date(post.date_created).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            </header>

            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </div>
  );
}