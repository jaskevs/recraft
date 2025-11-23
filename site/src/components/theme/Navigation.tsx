'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Menu, X } from 'lucide-react'

export type ThemeNavigationItem = {
  href: string
  label: string
  newTab?: boolean | null
}

interface NavigationProps {
  navItems?: ThemeNavigationItem[]
  theme?: string | null
}

const DEFAULT_NAV_ITEMS: ThemeNavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const Navigation = ({ navItems, theme }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 10)
      setIsCollapsed(currentScrollY > 50)
    }

    handleScroll()

    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMobileMenuOpen])

  const itemsToRender = useMemo(() => {
    const cleaned = (navItems ?? []).filter(
      (item): item is ThemeNavigationItem => Boolean(item?.href && item?.label),
    )

    return cleaned.length ? cleaned : DEFAULT_NAV_ITEMS
  }, [navItems])

  const isActivePath = (href: string) => {
    if (!pathname) return false
    if (href === '/') {
      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  return (
    <>
      <header
        className={`minimal-header ${isScrolled ? 'scrolled' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        data-theme={theme ?? undefined}
      >
        <div className="container">
          <Link href="/" className="minimal-logo">
            <img
              src="/assets/img/recraft_icon.svg"
              alt="reCraft Icon"
              style={{ height: '36px', width: 'auto' }}
            />
            <img
              src="/assets/img/recraft_text.svg"
              alt="reCraft Text"
              style={{ height: '40px', width: 'auto', marginLeft: '8px' }}
            />
          </Link>

          <nav className={`minimal-nav ${isCollapsed ? 'collapsed' : ''}`}>
            {itemsToRender.map((item) => {
              const isActive = isActivePath(item.href)
              const newTabProps = item.newTab
                ? { rel: 'noopener noreferrer', target: '_blank' }
                : undefined

              return (
                <Link
                  key={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={isActive ? 'active' : undefined}
                  href={item.href}
                  {...newTabProps}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <button
            className={`minimal-menu-toggle ${isMobileMenuOpen ? 'active' : ''} ${isCollapsed ? 'show' : ''}`}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="minimal-mobile-navigation"
            type="button"
          >
            {isMobileMenuOpen ? (
              <X size={24} strokeWidth={1.6} aria-hidden="true" />
            ) : (
              <Menu size={24} strokeWidth={1.6} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <div
        id="minimal-mobile-navigation"
        className={`minimal-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
        aria-hidden={!isMobileMenuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsMobileMenuOpen(false)
          }
        }}
      >
        <nav className="minimal-mobile-menu-nav" aria-label="Mobile navigation">
          {itemsToRender.map((item, index) => {
            const isActive = isActivePath(item.href)
            const newTabProps = item.newTab
              ? { rel: 'noopener noreferrer', target: '_blank' }
              : undefined

            return (
              <Link
                key={`${item.href}-${index}`}
                aria-current={isActive ? 'page' : undefined}
                className={isActive ? 'active' : undefined}
                data-number={String(index + 1).padStart(2, '0')}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                {...newTabProps}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
