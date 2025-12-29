'use client'

import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'

export type FeaturedCardProps = {
  post: Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>
  className?: string
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({ post, className = '' }) => {
  const { slug, categories, meta, title, publishedAt } = post
  const { image: metaImage } = meta || {}

  const href = `/posts/${slug}`

  // Get first category
  const firstCategory =
    categories && categories.length > 0 && typeof categories[0] === 'object'
      ? categories[0].title
      : null

  return (
    <Link href={href} className={`featured-card ${className}`}>
      <div className="featured-card-content">
        {firstCategory && <span className="featured-card-category">{firstCategory}</span>}
        <h3 className="featured-card-title">{title}</h3>
        {publishedAt && (
          <time className="featured-card-date" dateTime={publishedAt}>
            {formatDateTime(publishedAt)}
          </time>
        )}
      </div>

      {/* Image that appears on hover */}
      {metaImage && typeof metaImage !== 'string' && (
        <div className="featured-card-image">
          <div className="featured-card-overlay" />
          <Media resource={metaImage} imgClassName="w-full h-full object-cover" />
        </div>
      )}
    </Link>
  )
}
