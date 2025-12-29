import type { Metadata } from 'next/types'

import { Card } from '@/components/Card'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
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
    <div className="pt-24 pb-16">
      <PageClient />

      {/* Page Header */}
      <header className="blog-page-header">
        <h1 className="blog-page-title">Blog</h1>
        <p className="blog-page-subtitle">
          Insights, tutorials, and updates from our team
        </p>
      </header>

      {/* Category Filter */}
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
      <div className="max-w-[1200px] mx-auto px-4">
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Blog | Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'posts',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
