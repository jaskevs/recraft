import type { Metadata } from 'next/types'

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

  return (
    <div className="blog-listing-page">
      <PageClient />

      {/* Hero Section */}
      <header className="blog-hero">
        <div className="blog-hero-content">
          <span className="blog-hero-label">Our Blog</span>
          <h1 className="blog-hero-title">Stories & Insights</h1>
          <p className="blog-hero-subtitle">
            Discover the latest insights, tutorials, and updates from our team
          </p>
        </div>
        <div className="blog-hero-decoration" aria-hidden="true" />
      </header>

      {/* Main Content Section */}
      <section className="blog-main-section">
        {/* Section Header with Filter */}
        <div className="blog-section-header">
          <div className="blog-section-title-row">
            <h2 className="blog-section-title">Latest Posts</h2>
            <PageRange
              collection="posts"
              currentPage={posts.page}
              limit={12}
              totalDocs={posts.totalDocs}
            />
          </div>

          {/* Filter Bar */}
          <div className="blog-filter-bar">
            <span className="blog-filter-label">Filter:</span>
            <div className="blog-filter-pills">
              <button className="blog-filter-pill active">All</button>
              <button className="blog-filter-pill">Insights</button>
              <button className="blog-filter-pill">Tutorials</button>
              <button className="blog-filter-pill">News</button>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="blog-posts-grid">
          {posts.docs.map((post, index) => (
            <Card
              key={post.slug || index}
              doc={post}
              relationTo="posts"
              showCategories
            />
          ))}
        </div>

        {/* Pagination */}
        {posts.totalPages > 1 && posts.page && (
          <div className="blog-pagination">
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          </div>
        )}
      </section>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog | Stories & Insights`,
  }
}
