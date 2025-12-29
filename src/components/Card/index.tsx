'use client'

import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { formatDateTime } from '@/utilities/formatDateTime'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt'>

export const Card: React.FC<{
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
}> = (props) => {
  const { className = '', doc, relationTo, showCategories } = props

  const { slug, categories, meta, title, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  // Get first category for display
  const firstCategory =
    hasCategories && typeof categories[0] === 'object' ? categories[0].title : null

  return (
    <Link href={href} className={`blog-card ${className}`}>
      {/* Image */}
      <div className="blog-card-image-wrapper">
        {!metaImage && <div className="blog-card-no-image">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media resource={metaImage} imgClassName="blog-card-image" />
        )}
      </div>

      {/* Content */}
      <div className="blog-card-content">
        {/* Meta line: Category + Date */}
        <div className="blog-card-meta">
          {showCategories && firstCategory && (
            <>
              <span className="blog-card-category">{firstCategory}</span>
              {publishedAt && <span className="blog-card-meta-separator">·</span>}
            </>
          )}
          {publishedAt && (
            <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
          )}
        </div>

        {/* Title */}
        {title && <h3 className="blog-card-title">{title}</h3>}

        {/* Excerpt */}
        {description && <p className="blog-card-excerpt">{sanitizedDescription}</p>}
      </div>
    </Link>
  )
}
