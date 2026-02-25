'use client'

import React from 'react'
import Link from 'next/link'

const pillars = [
  {
    title: 'AI & Intelligence',
    description: 'Teaching machines, learning from them. Exploring the frontiers of artificial cognition and what it means for humanity.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="8" r="4" />
        <circle cx="24" cy="40" r="4" />
        <circle cx="8" cy="24" r="4" />
        <circle cx="40" cy="24" r="4" />
        <line x1="24" y1="12" x2="24" y2="16" />
        <line x1="24" y1="32" x2="24" y2="36" />
        <line x1="12" y1="24" x2="16" y2="24" />
        <line x1="32" y1="24" x2="36" y2="24" />
      </svg>
    ),
    href: '/posts?category=ai',
  },
  {
    title: 'Interactions',
    description: 'The dance between input and output. How we communicate with systems and how they respond to us.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 24C8 24 16 8 24 8C32 8 40 24 40 24C40 24 32 40 24 40C16 40 8 24 8 24Z" />
        <circle cx="24" cy="24" r="6" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
    href: '/posts?category=interactions',
  },
  {
    title: 'Web & Interfaces',
    description: 'Building the fabric of digital experience. The craft of creating spaces where humans and technology meet.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="8" width="32" height="32" rx="2" />
        <line x1="8" y1="16" x2="40" y2="16" />
        <line x1="16" y1="16" x2="16" y2="40" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
        <circle cx="24" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    href: '/posts?category=web',
  },
  {
    title: 'Human Potential',
    description: 'Amplifying what we are capable of. Technology as a lens to discover and extend human capabilities.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 4L24 8" />
        <path d="M24 40L24 44" />
        <path d="M4 24L8 24" />
        <path d="M40 24L44 24" />
        <circle cx="24" cy="24" r="12" />
        <path d="M24 16C20 16 16 20 16 24C16 28 20 32 24 32" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" />
      </svg>
    ),
    href: '/posts?category=human',
  },
]

export const Pillars: React.FC = () => {
  return (
    <section className="home-pillars">
      <div className="home-pillars-header">
        <span className="home-pillars-label">What We Explore</span>
        <h2 className="home-pillars-title">The Four Dimensions</h2>
      </div>

      <div className="home-pillars-grid">
        {pillars.map((pillar) => (
          <Link key={pillar.title} href={pillar.href} className="home-pillar-card">
            <div className="home-pillar-icon">{pillar.icon}</div>
            <h3 className="home-pillar-title">{pillar.title}</h3>
            <p className="home-pillar-description">{pillar.description}</p>
            <svg className="home-pillar-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ))}
      </div>
    </section>
  )
}
