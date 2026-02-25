'use client'

import React, { useState } from 'react'

export const SignalCTA: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send to your newsletter API
    console.log('Newsletter signup:', email)
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section className="home-signal">
      <div className="home-signal-content">
        {/* Signal icon */}
        <svg className="home-signal-icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="24" cy="24" r="6" />
          <path d="M24 4V10" strokeLinecap="round" />
          <path d="M24 38V44" strokeLinecap="round" />
          <path d="M4 24H10" strokeLinecap="round" />
          <path d="M38 24H44" strokeLinecap="round" />
          <circle cx="24" cy="24" r="14" strokeDasharray="4 4" />
          <circle cx="24" cy="24" r="20" strokeDasharray="2 6" />
        </svg>

        <h2 className="home-signal-title">Join the Signal</h2>
        <p className="home-signal-subtitle">
          Weekly dispatches from the frontier of human-computer symbiosis.
          Thoughts on AI, design, and the future we&apos;re building.
        </p>

        {status === 'success' ? (
          <div className="home-signal-success">
            <p style={{ color: 'var(--home-accent)', fontSize: '1.125rem', fontWeight: 500 }}>
              Welcome to the signal. Check your inbox.
            </p>
          </div>
        ) : (
          <form className="home-signal-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              className="home-signal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="home-signal-button">
              Subscribe
            </button>
          </form>
        )}

        <p className="home-signal-note">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </section>
  )
}
