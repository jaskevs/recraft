'use client'

import React, { useState } from 'react'

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send to your newsletter API
    console.log('Newsletter signup:', email)
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <form className="footer-newsletter-form" onSubmit={handleSubmit}>
      <div className="footer-input-wrapper">
        <input
          type="email"
          placeholder="Enter your email"
          className="footer-email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="footer-submit-btn">
          {status === 'success' ? (
            <>
              Subscribed
              <svg
                className="footer-btn-check"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3334 4L6.00008 11.3333L2.66675 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          ) : (
            <>
              Subscribe
              <svg
                className="footer-btn-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33337 8H12.6667M12.6667 8L8.00004 3.33334M12.6667 8L8.00004 12.6667"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          )}
        </button>
      </div>
      <p className="footer-form-note">
        {status === 'success'
          ? "Thanks for subscribing!"
          : "No spam. Unsubscribe anytime."}
      </p>
    </form>
  )
}
