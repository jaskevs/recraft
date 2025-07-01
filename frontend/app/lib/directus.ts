import { createDirectus, rest, readItems } from '@directus/sdk';

// Define your schema types
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  status: string;
  date_created: string;
  date_updated: string;
}

interface Schema {
  posts: Post[];
}

// Get the Directus URL from environment or default to localhost
const DIRECTUS_URL = typeof window !== 'undefined'
    ? (window as any).ENV?.DIRECTUS_URL
    : process.env.DIRECTUS_URL || 'http://localhost:8055';

// Create Directus client
const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());

// Helper function to get full asset URL
export const getAssetUrl = (assetId: string) => {
  return `${DIRECTUS_URL}/assets/${assetId}`;
};

// Helper functions
export const getPosts = async () => {
  return await directus.request(
    readItems('posts', {
      filter: {
        status: {
          _eq: 'published'
        }
      },
      sort: ['-date_created'],
      fields: ['*']
    })
  );
};

export const getPost = async (slug: string) => {
  const posts = await directus.request(
    readItems('posts', {
      filter: {
        slug: {
          _eq: slug
        },
        status: {
          _eq: 'published'
        }
      },
      limit: 1,
      fields: ['*']
    })
  );
  
  return posts[0] || null;
};

export type { Post };