'use client'

import React from 'react'

export const Hero: React.FC = () => {
  return (
    <section className="home-hero">
      {/* Animated gradient orbs */}
      <div className="home-hero-bg" aria-hidden="true">
        <div className="home-hero-orb home-hero-orb--1" />
        <div className="home-hero-orb home-hero-orb--2" />
        <div className="home-hero-orb home-hero-orb--3" />
      </div>

      {/* Content */}
      <div className="home-hero-content">
        <span className="home-hero-label">Exploring the frontier</span>
        <h1 className="home-hero-title">
          Where <span className="accent">Machines</span> Learn
          <br />
          to Dream
        </h1>
        <p className="home-hero-subtitle">
          A space for thinking about artificial intelligence, human-computer interaction,
          and the expanding boundaries of what we can create together.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="home-hero-scroll">
        <span>Scroll</span>
        <div className="home-hero-scroll-line" />
      </div>
    </section>
  )
}
