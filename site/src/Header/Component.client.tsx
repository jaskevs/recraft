'use client'

import { Navigation, type ThemeNavigationItem } from '@/components/theme/Navigation'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
}

type HeaderNavLink = NonNullable<Header['navItems']>[number]['link']

const linkToNavItem = (link?: HeaderNavLink | null): ThemeNavigationItem | null => {
  if (!link?.label) return null

  if (link.type === 'custom' && link.url) {
    return {
      label: link.label,
      href: link.url,
      newTab: link.newTab,
    }
  }

  if (
    link.type === 'reference' &&
    link.reference?.value &&
    typeof link.reference.value === 'object' &&
    link.reference.value.slug
  ) {
    const prefix = link.reference.relationTo === 'pages' ? '' : `/${link.reference.relationTo}`
    return {
      label: link.label,
      href: `${prefix}/${link.reference.value.slug}`,
      newTab: link.newTab,
    }
  }

  return null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const navItems = (data?.navItems ?? [])
    .map(({ link }) => linkToNavItem(link))
    .filter((item): item is ThemeNavigationItem => Boolean(item))

  return <Navigation navItems={navItems} theme={theme} />
}