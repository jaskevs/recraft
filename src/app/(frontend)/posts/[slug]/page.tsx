import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ slug: decodedSlug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pb-16">
      <PageClient />

      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Pinterest-style Hero (image above, content below) */}
      <PostHero post={post} />

      {/* Article Content */}
      <div className="post-content">
        <RichText
          className="prose prose-lg dark:prose-invert max-w-none"
          data={post.content}
          enableGutter={false}
        />
      </div>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="related-posts-section">
          <div className="related-posts-header">
            <h2 className="related-posts-title">Related Posts</h2>
            <a href="/posts" className="related-posts-link">
              See all posts <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="related-posts-grid">
            {post.relatedPosts
              .filter((relatedPost) => typeof relatedPost === 'object')
              .slice(0, 2)
              .map((relatedPost, index) => {
                if (typeof relatedPost === 'object') {
                  return (
                    <a
                      key={relatedPost.slug || index}
                      href={`/posts/${relatedPost.slug}`}
                      className="blog-card"
                    >
                      <div className="blog-card-image-wrapper">
                        {relatedPost.heroImage && typeof relatedPost.heroImage !== 'string' && (
                          <img
                            src={relatedPost.heroImage.url || ''}
                            alt={relatedPost.heroImage.alt || relatedPost.title}
                            className="blog-card-image"
                          />
                        )}
                      </div>
                      <div className="blog-card-content">
                        <h3 className="blog-card-title">{relatedPost.title}</h3>
                      </div>
                    </a>
                  )
                }
                return null
              })}
          </div>
        </section>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
