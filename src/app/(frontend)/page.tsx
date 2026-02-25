import type { Metadata } from 'next'

import { Hero, Manifesto, Pillars, FeaturedPosts, SignalCTA } from '@/components/Home'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default function HomePage() {
  return (
    <main className="home-page">
      <Hero />
      <Manifesto />
      <Pillars />
      <FeaturedPosts />
      <SignalCTA />
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Where Machines Learn to Dream | AI, Interactions & Human Potential',
  description:
    'Exploring the frontier where human intuition meets artificial intelligence. Thoughts on AI, design, interactions, and the expanding boundaries of what we can create together.',
  openGraph: mergeOpenGraph({
    title: 'Where Machines Learn to Dream',
    description:
      'A space for thinking about artificial intelligence, human-computer interaction, and the expanding boundaries of what we can create together.',
    url: getServerSideURL(),
  }),
}
