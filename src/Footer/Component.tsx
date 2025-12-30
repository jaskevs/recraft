import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { NewsletterForm } from './NewsletterForm'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  // Split nav items into two columns
  const midPoint = Math.ceil(navItems.length / 2)
  const column1 = navItems.slice(0, midPoint)
  const column2 = navItems.slice(midPoint)

  return (
    <footer className="site-footer">
      {/* Decorative top border */}
      <div className="footer-border-accent" aria-hidden="true" />

      <div className="footer-container">
        {/* Newsletter Section */}
        <section className="footer-newsletter">
          <div className="footer-newsletter-content">
            <span className="footer-newsletter-label">Stay Updated</span>
            <h2 className="footer-newsletter-title">
              Get the latest insights delivered to your inbox
            </h2>
            <p className="footer-newsletter-description">
              Join our newsletter for weekly updates on new articles, tutorials, and more.
            </p>
          </div>

          <NewsletterForm />
        </section>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Branding Column */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link">
              <Logo />
            </Link>
            <p className="footer-tagline">
              Building digital experiences that inspire and engage.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer-nav-columns">
            <div className="footer-nav-column">
              <h3 className="footer-nav-title">Navigation</h3>
              <nav className="footer-nav-links">
                {column1.map(({ link }, i) => (
                  <CMSLink className="footer-nav-link" key={i} {...link} />
                ))}
              </nav>
            </div>

            <div className="footer-nav-column">
              <h3 className="footer-nav-title">Resources</h3>
              <nav className="footer-nav-links">
                {column2.map(({ link }, i) => (
                  <CMSLink className="footer-nav-link" key={i} {...link} />
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <ThemeSelector />
          </div>

          <div className="footer-bottom-right">
            <span className="footer-made-with">
              Crafted with passion
              <span className="footer-heart" aria-hidden="true">♥</span>
            </span>
          </div>
        </div>
      </div>

      {/* Large decorative text */}
      <div className="footer-decoration" aria-hidden="true">
        <span className="footer-decoration-text">INNOVATE</span>
      </div>
    </footer>
  )
}
