import React from 'react'
import Link from 'next/link'

const featuredPosts = [
  {
    title: 'The Quiet Revolution of Conversational AI',
    excerpt: 'How language models are reshaping our relationship with machines, one conversation at a time. The implications extend far beyond chatbots.',
    category: 'AI & Intelligence',
    date: 'December 28, 2024',
    readTime: '8 min read',
    size: 'large',
    href: '/posts/conversational-ai-revolution',
  },
  {
    title: 'Designing for the Invisible Interface',
    excerpt: 'When the best UI is no UI at all. Exploring ambient computing and the disappearing screen.',
    category: 'Interactions',
    date: 'December 22, 2024',
    readTime: '5 min read',
    size: 'normal',
    href: '/posts/invisible-interface',
  },
  {
    title: 'The Web We Deserve',
    excerpt: 'Rethinking digital experiences for the next decade. What if we started over?',
    category: 'Web & Interfaces',
    date: 'December 18, 2024',
    readTime: '6 min read',
    size: 'normal',
    href: '/posts/web-we-deserve',
  },
  {
    title: 'Augmented Creativity: AI as Creative Partner',
    excerpt: 'Exploring the symbiosis between human intuition and machine capability. The future of creative work.',
    category: 'Human Potential',
    date: 'December 15, 2024',
    readTime: '7 min read',
    size: 'wide',
    href: '/posts/augmented-creativity',
  },
]

export const FeaturedPosts: React.FC = () => {
  return (
    <section className="home-featured">
      <div className="home-featured-header">
        <div>
          <span className="home-featured-label">Latest Transmissions</span>
          <h2 className="home-featured-title">Recent Explorations</h2>
        </div>
        <Link href="/posts" className="home-featured-link">
          View all posts
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8H13M13 8L8 3M13 8L8 13" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="home-bento-grid">
        {featuredPosts.map((post) => (
          <Link
            key={post.title}
            href={post.href}
            className={`home-bento-card ${
              post.size === 'large' ? 'home-bento-card--large' : ''
            } ${post.size === 'wide' ? 'home-bento-card--wide' : ''}`}
          >
            <span className="home-bento-card-category">{post.category}</span>
            <div className="home-bento-card-content">
              <h3 className="home-bento-card-title">{post.title}</h3>
              <p className="home-bento-card-excerpt">{post.excerpt}</p>
              <div className="home-bento-card-meta">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
