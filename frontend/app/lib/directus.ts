import { createDirectus, rest, readItems } from "@directus/sdk";

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
const DIRECTUS_URL =
  typeof window !== "undefined"
    ? (window as any).ENV?.DIRECTUS_URL
    : process.env.DIRECTUS_URL || "http://localhost:8055";

// Create Directus client
const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());

// Helper function to get full asset URL
export const getAssetUrl = (
  assetId: string | any,
  width?: number,
  height?: number,
  quality?: number
) => {
  // Handle case where assetId might be an object (file object from Directus)
  let id = assetId;

  if (typeof assetId === "object" && assetId !== null) {
    // Try different possible properties for the file ID
    id =
      assetId.id ||
      assetId.filename_disk ||
      assetId.filename ||
      assetId.key ||
      assetId.uuid;
  }

  if (!id || id === "") {
    console.warn("No valid asset ID found:", assetId);
    return null;
  }

  // Build URL with optional transformations
  let url = `${DIRECTUS_URL}/assets/${id}`;

  const params = new URLSearchParams();
  if (width) params.append("width", width.toString());
  if (height) params.append("height", height.toString());
  if (quality) params.append("quality", quality.toString());

  // Add fit parameter for better image cropping
  if (width || height) {
    params.append("fit", "cover");
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return url;
};

// Helper functions
export const getPosts = async () => {
  return await directus.request(
    readItems("posts", {
      filter: {
        status: {
          _eq: "published",
        },
      },
      sort: ["-date_created"],
      fields: ["*", "featured_image.*"],
    })
  );
};

export const getPost = async (slug: string) => {
  const posts = await directus.request(
    readItems("posts", {
      filter: {
        slug: {
          _eq: slug,
        },
        status: {
          _eq: "published",
        },
      },
      limit: 1,
      fields: ["*", "featured_image.*"],
    })
  );

  return posts[0] || null;
};

export type { Post };
