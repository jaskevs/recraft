'use client'

import React, { useEffect, useRef } from 'react'

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const elements = containerRef.current?.querySelectorAll('.manifesto-animate')
    elements?.forEach((el, index) => {
      ;(el as HTMLElement).style.transitionDelay = `${index * 0.12}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="home-manifesto">
      <div className="home-manifesto-content" ref={containerRef}>
        {/* Opening statement */}
        <div className="manifesto-block manifesto-animate">
          <span className="manifesto-label">Our Purpose</span>
          <h2 className="manifesto-headline">
            The builders of tomorrow<br />
            <span className="manifesto-headline-light">are learning today.</span>
          </h2>
        </div>

        {/* Description */}
        <div className="manifesto-description manifesto-animate">
          <p>
            We chronicle the ideas, breakthroughs, and patterns
            that are reshaping what's possible with AI.
          </p>
        </div>

        {/* Values */}
        <div className="manifesto-values">
          <div className="manifesto-value manifesto-animate">
            <span className="manifesto-value-label">Focus</span>
            <p className="manifesto-value-text">
              Not just what's new—<em>what matters.</em>
            </p>
          </div>
          <div className="manifesto-value manifesto-animate">
            <span className="manifesto-value-label">Depth</span>
            <p className="manifesto-value-text">
              Not just theory—<em>craft.</em>
            </p>
          </div>
        </div>

        {/* Closing */}
        <div className="manifesto-closing manifesto-animate">
          <p className="manifesto-audience">For those who build, create, and lead.</p>
          <p className="manifesto-tagline">
            Where clarity meets <span className="accent">possibility</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
