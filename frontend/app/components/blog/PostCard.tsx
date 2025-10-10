import { Link } from "@remix-run/react";
import { H3, BodyText, Caption, Excerpt, ReadingTime } from "../ui/Typography";
import { ArrowRight, Clock, Calendar } from "react-feather";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  published_date: string;
  featured_image?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  tags?: string[];
  reading_time?: number;
}

interface PostCardProps {
  post: Post;
  layout?: "card" | "list" | "featured";
  showImage?: boolean;
  showExcerpt?: boolean;
  className?: string;
}

export const PostCard = ({
  post,
  layout = "card",
  showImage = true,
  showExcerpt = true,
  className = "",
}: PostCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getWordCount = (content: string) => {
    return content.trim().split(/\s+/).length;
  };

  const wordCount = post.content ? getWordCount(post.content) : 0;

  if (layout === "list") {
    return (
      <article
        className={`group py-8 border-b border-border-light last:border-b-0 ${className}`}
      >
        <div className="flex flex-col space-y-3">
          {/* Meta information */}
          <div className="flex items-center space-x-4 text-sm text-primary-600">
            <time
              dateTime={post.published_date}
              className="inline-flex items-center gap-1"
            >
              <Calendar size={16} strokeWidth={1.6} aria-hidden="true" />
              {formatDate(post.published_date)}
            </time>
            {wordCount > 0 && (
              <>
                <span>•</span>
                <ReadingTime wordCount={wordCount} />
              </>
            )}
            {post.tags && post.tags.length > 0 && (
              <>
                <span>•</span>
                <span className="text-accent-600">{post.tags[0]}</span>
              </>
            )}
          </div>

          {/* Title */}
          <H3 className="group-hover:text-accent-600 transition-colors duration-200">
            <Link to={`/blog/${post.slug}`} className="block">
              {post.title}
            </Link>
          </H3>

          {/* Excerpt */}
          {showExcerpt && (post.excerpt || post.content) && (
            <Excerpt
              content={post.excerpt || post.content || ""}
              maxLength={180}
              className="text-primary-600"
            />
          )}

          {/* Read more link */}
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200"
          >
            Continue reading
            <ArrowRight
              size={16}
              strokeWidth={1.6}
              style={{ marginLeft: "0.5rem" }}
              aria-hidden="true"
            />
          </Link>
        </div>
      </article>
    );
  }

  if (layout === "featured") {
    return (
      <article className={`group relative ${className}`}>
        <Link to={`/blog/${post.slug}`} className="block">
          {/* Featured Image */}
          {showImage && post.featured_image && (
            <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-2xl bg-surface-200">
              <img
                src={post.featured_image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          {/* Content */}
          <div className="space-y-4">
            {/* Meta */}
            <div className="flex items-center space-x-4 text-sm text-primary-600">
              <time
                dateTime={post.published_date}
                className="inline-flex items-center gap-1"
              >
                <Calendar size={16} strokeWidth={1.6} aria-hidden="true" />
                {formatDate(post.published_date)}
              </time>
              {wordCount > 0 && (
                <>
                  <span>•</span>
                  <ReadingTime wordCount={wordCount} />
                </>
              )}
            </div>

            {/* Title */}
            <H3 className="group-hover:text-accent-600 transition-colors duration-200 text-2xl md:text-3xl">
              {post.title}
            </H3>

            {/* Excerpt */}
            {showExcerpt && (post.excerpt || post.content) && (
              <Excerpt
                content={post.excerpt || post.content || ""}
                maxLength={220}
                className="text-lg text-primary-600"
              />
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-accent-50 text-accent-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      </article>
    );
  }

  // Default card layout
  return (
    <article
      className={`group bg-surface-50 rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 ${className}`}
    >
      <Link to={`/blog/${post.slug}`} className="block">
        {/* Featured Image */}
        {showImage && post.featured_image && (
          <div className="relative aspect-[16/10] overflow-hidden bg-surface-200">
            <img
              src={post.featured_image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Card Content */}
        <div className="p-6 space-y-4">
          {/* Meta information */}
          <div className="flex items-center justify-between text-sm text-primary-600">
            <time
              dateTime={post.published_date}
              className="inline-flex items-center gap-1"
            >
              <Calendar size={16} strokeWidth={1.6} aria-hidden="true" />
              {formatDate(post.published_date)}
            </time>
            {wordCount > 0 && <ReadingTime wordCount={wordCount} />}
          </div>

          {/* Title */}
          <H3 className="group-hover:text-accent-600 transition-colors duration-200">
            {post.title}
          </H3>

          {/* Excerpt */}
          {showExcerpt && (post.excerpt || post.content) && (
            <Excerpt
              content={post.excerpt || post.content || ""}
              maxLength={140}
              className="text-primary-600"
            />
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-accent-50 text-accent-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Read more link */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200 group-hover:translate-x-1">
              Read more →
            </span>

            {/* Author info if available */}
            {post.author && (
              <div className="flex items-center space-x-2">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <Caption>{post.author.name}</Caption>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};
