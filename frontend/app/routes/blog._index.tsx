import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { H1, H2, BodyText } from "~/components/ui/Typography";
import { PostCard } from "~/components/blog/PostCard";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 12;
  const offset = (page - 1) * limit;

  // Build the filter for Directus
  let filter = "status=published";
  if (category) {
    filter += `&filter[tags][_contains]=${category}`;
  }

  try {
    // Replace with your actual Directus API call
    const response = await fetch(
      `${process.env.DIRECTUS_URL}/items/posts?${filter}&sort=-published_date&limit=${limit}&offset=${offset}`
    );
    const data = await response.json();
    
    // Get total count for pagination
    const countResponse = await fetch(
      `${process.env.DIRECTUS_URL}/items/posts?${filter}&aggregate[count]=*`
    );
    const countData = await countResponse.json();
    
    return json({
      posts: data.data || [],
      totalCount: countData.data?.[0]?.count || 0,
      currentPage: page,
      totalPages: Math.ceil((countData.data?.[0]?.count || 0) / limit),
      category,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return json({
      posts: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 0,
      category,
    });
  }
}

export default function BlogIndex() {
  const { posts, totalCount, currentPage, totalPages, category } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = [
    { name: "All", value: "" },
    { name: "Web Development", value: "web-development" },
    { name: "JavaScript", value: "javascript" },
    { name: "React", value: "react" },
    { name: "Tutorials", value: "tutorials" },
    { name: "Technology", value: "technology" },
  ];

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams);
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    params.delete("page"); // Reset to first page when changing category
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <section className="bg-white border-b border-border-light">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <H1 className="mb-4 font-serif">
              {category ? `${category.charAt(0).toUpperCase()}${category.slice(1).replace('-', ' ')}` : 'Blog'}
            </H1>
            <BodyText className="text-primary-600">
              {category 
                ? `Explore our latest insights on ${category.replace('-', ' ')}`
                : 'Discover thoughtful perspectives on technology, development, and innovation'
              }
            </BodyText>
            <div className="mt-6 text-sm text-primary-500">
              {totalCount} article{totalCount !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white border-b border-border-light">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  (category || "") === cat.value
                    ? "bg-accent-600 text-white shadow-soft"
                    : "bg-surface-100 text-primary-700 hover:bg-accent-50 hover:text-accent-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {posts.length > 0 ? (
            <>
              {/* Posts Grid */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
                {posts.map((post: any, index: number) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    layout="card"
                    className={`animate-slide-up`}
                    // style={{
                    //   animationDelay: `${index * 100}ms`
                    // }}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-surface-200 text-primary-400 cursor-not-allowed"
                        : "bg-white text-primary-700 hover:bg-accent-50 hover:text-accent-700 shadow-soft"
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                          page === currentPage
                            ? "bg-accent-600 text-white shadow-soft"
                            : "bg-white text-primary-700 hover:bg-accent-50 hover:text-accent-700 shadow-soft"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === totalPages
                        ? "bg-surface-200 text-primary-400 cursor-not-allowed"
                        : "bg-white text-primary-700 hover:bg-accent-50 hover:text-accent-700 shadow-soft"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* No Posts State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <H2 className="mb-4 text-primary-800">No posts found</H2>
              <BodyText className="text-primary-600 mb-6">
                {category
                  ? `No articles found in the "${category.replace('-', ' ')}" category.`
                  : "No articles have been published yet."
                }
              </BodyText>
              {category && (
                <button
                  onClick={() => handleCategoryChange("")}
                  className="inline-flex items-center px-6 py-3 bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-colors duration-200 font-medium"
                >
                  View All Articles
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}