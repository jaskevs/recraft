import type { Metadata } from 'next/types'

import { FeaturedCard } from '@/components/FeaturedCard'
import { Card } from '@/components/Card'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  // Split posts: first 3 for featured, rest for grid
  const featuredPosts = posts.docs.slice(0, 3)
  const gridPosts = posts.docs.slice(3)

  return (
    <div className="pt-24 pb-16">
      <PageClient />

      {/* Page Header */}
      <header className="blog-page-header">
        <h1 className="blog-page-title">Blog</h1>
        <p className="blog-page-subtitle">
          Insights, tutorials, and updates from our team
        </p>
      </header>

      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="featured-section">
          <div className="featured-grid">
            {featuredPosts.map((post, index) => (
              <FeaturedCard key={post.slug || index} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Category Filter (placeholder for now) */}
      <div className="category-filter">
        <span className="category-filter-label">Filter by:</span>
        <button className="category-pill active">All</button>
        <button className="category-pill">Insights</button>
        <button className="category-pill">Tutorials</button>
        <button className="category-pill">News</button>
      </div>

      {/* Page Range */}
      <div className="max-w-[1200px] mx-auto px-4 pt-6">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      {/* Blog Grid */}
      <div className="blog-grid">
        {gridPosts.map((post, index) => (
          <Card
            key={post.slug || index}
            doc={post}
            relationTo="posts"
            showCategories
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="max-w-[1200px] mx-auto px-4">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog | Latest Posts and Insights`,
  }
}
