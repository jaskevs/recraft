import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="post-hero">
      {/* Hero Image - Full Width, No Overlay (Pinterest Style) */}
      <div className="post-hero-image-wrapper">
        {heroImage && typeof heroImage !== 'string' && (
          <Media
            imgClassName="post-hero-image"
            priority
            resource={heroImage}
          />
        )}
      </div>

      {/* Content Below Image - Centered */}
      <div className="post-hero-content">
        {/* Meta: Categories + Date */}
        <div className="post-hero-meta">
          {categories && categories.length > 0 && (
            <div className="post-hero-categories">
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  return (
                    <span key={index} className="post-hero-category">
                      {categoryTitle || 'Untitled'}
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}
          {publishedAt && (
            <time className="post-hero-date" dateTime={publishedAt}>
              {formatDateTime(publishedAt)}
            </time>
          )}
        </div>

        {/* Title */}
        <h1 className="post-hero-title">{title}</h1>

        {/* Author */}
        {hasAuthors && (
          <p className="post-hero-author">
            By <span className="post-hero-author-name">{formatAuthors(populatedAuthors)}</span>
          </p>
        )}
      </div>
    </div>
  )
}
