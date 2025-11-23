import type { ReactNode } from 'react'
import { Clock } from 'lucide-react'

interface TypographyProps {
  children: ReactNode
  className?: string
}

export const H1 = ({ children, className = '' }: TypographyProps) => (
  <h1 className={	ext-4xl md:text-5xl font-sans font-semibold text-gray-900 leading-tight tracking-tight }>
    {children}
  </h1>
)

export const H2 = ({ children, className = '' }: TypographyProps) => (
  <h2 className={	ext-2xl md:text-3xl font-sans font-semibold text-gray-900 leading-tight tracking-tight }>
    {children}
  </h2>
)

export const H3 = ({ children, className = '' }: TypographyProps) => (
  <h3 className={	ext-xl md:text-2xl font-sans font-semibold text-gray-900 leading-snug }>
    {children}
  </h3>
)

export const H4 = ({ children, className = '' }: TypographyProps) => (
  <h4 className={	ext-lg md:text-xl font-sans font-medium text-gray-900 leading-snug }>
    {children}
  </h4>
)

export const BodyText = ({ children, className = '' }: TypographyProps) => (
  <p className={	ext-lg leading-relaxed text-gray-700 font-serif }>
    {children}
  </p>
)

export const LeadText = ({ children, className = '' }: TypographyProps) => (
  <p className={	ext-xl md:text-2xl leading-relaxed text-gray-600 font-serif }>
    {children}
  </p>
)

export const SmallText = ({ children, className = '' }: TypographyProps) => (
  <p className={	ext-sm leading-relaxed text-gray-600 }>{children}</p>
)

export const Caption = ({ children, className = '' }: TypographyProps) => (
  <span className={	ext-sm text-gray-500 }>{children}</span>
)

interface ReadingTimeProps {
  wordCount: number
  wordsPerMinute?: number
  className?: string
}

export const ReadingTime = ({ wordCount, wordsPerMinute = 200, className = '' }: ReadingTimeProps) => {
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return (
    <Caption className={inline-flex items-center gap-1 }>
      <Clock size={16} strokeWidth={1.6} aria-hidden="true" />
      {readingTime} min read
    </Caption>
  )
}

interface ExcerptProps {
  content: string
  maxLength?: number
  className?: string
}

export const Excerpt = ({ content, maxLength = 160, className = '' }: ExcerptProps) => {
  const excerpt = content.length > maxLength ? ${content.substring(0, maxLength).trim()}... : content

  return <p className={	ext-gray-600 leading-relaxed }>{excerpt}</p>
}
