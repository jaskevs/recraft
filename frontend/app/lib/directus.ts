import { createDirectus, rest, readItems } from "@directus/sdk";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: any;
  status: string;
  date_created: string;
  date_updated: string;
  category?: Category | null;
  tags?: Tag[];
  reading_time?: number | null;
}

type RawTag = Tag | { tags_id?: Tag | null } | null | undefined;

interface RawPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  featured_image?: any;
  status: string;
  date_created: string;
  date_updated: string;
  category?: Category | Record<string, unknown> | null;
  tags?: RawTag[] | null;
  reading_time?: number | string | null;
  [key: string]: unknown;
}

interface Schema {
  posts: RawPost[];
  categories: Category[];
  tags: Tag[];
}

const DIRECTUS_URL =
  typeof window !== "undefined"
    ? (window as any).ENV?.DIRECTUS_URL
    : process.env.DIRECTUS_URL || "http://localhost:8055";

const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());

const normalizeCategory = (category: RawPost["category"]): Category | null => {
  if (!category || typeof category !== "object") {
    return null;
  }

  const base = category as Partial<Category>;

  if (
    typeof base.id !== "string" ||
    typeof base.name !== "string" ||
    typeof base.slug !== "string"
  ) {
    return null;
  }

  return {
    id: base.id,
    name: base.name,
    slug: base.slug,
  };
};

const normalizeTag = (tag: RawTag): Tag | null => {
  if (!tag || typeof tag !== "object") {
    return null;
  }

  const source = (tag as any).tags_id ?? tag;

  if (!source || typeof source !== "object") {
    return null;
  }

  const base = source as Partial<Tag>;

  if (
    typeof base.id !== "string" ||
    typeof base.name !== "string" ||
    typeof base.slug !== "string"
  ) {
    return null;
  }

  return {
    id: base.id,
    name: base.name,
    slug: base.slug,
  };
};

const normalizeTags = (tags: RawPost["tags"]): Tag[] => {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .map((tag) => normalizeTag(tag))
    .filter((tag): tag is Tag => Boolean(tag));
};

const normalizeReadingTime = (
  value: RawPost["reading_time"]
): number | null => {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
};

const normalizePost = (raw: RawPost): Post => {
  const tags = normalizeTags(raw.tags);

  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    content: raw.content,
    excerpt: raw.excerpt ?? undefined,
    featured_image: raw.featured_image,
    status: raw.status,
    date_created: raw.date_created,
    date_updated: raw.date_updated,
    category: normalizeCategory(raw.category),
    tags,
    reading_time: normalizeReadingTime(raw.reading_time),
  };
};

export const getAssetUrl = (
  assetId: string | any,
  width?: number,
  height?: number,
  quality?: number
) => {
  let id = assetId;

  if (typeof assetId === "object" && assetId !== null) {
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

  let url = `${DIRECTUS_URL}/assets/${id}`;

  const params = new URLSearchParams();
  if (width) params.append("width", width.toString());
  if (height) params.append("height", height.toString());
  if (quality) params.append("quality", quality.toString());

  if (width || height) {
    params.append("fit", "cover");
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  return url;
};

export const getPosts = async (): Promise<Post[]> => {
  const rawPosts = await directus.request(
    readItems<RawPost>("posts", {
      filter: {
        status: {
          _eq: "published",
        },
      },
      sort: ["-date_created"],
      fields: [
        "*",
        "featured_image.*",
        "category.id",
        "category.name",
        "category.slug",
        "tags.id",
        "tags.name",
        "tags.slug",
      ],
    })
  );

  return rawPosts.map((post) => normalizePost(post));
};

export const getPost = async (slug: string): Promise<Post | null> => {
  const rawPosts = await directus.request(
    readItems<RawPost>("posts", {
      filter: {
        slug: {
          _eq: slug,
        },
        status: {
          _eq: "published",
        },
      },
      limit: 1,
      fields: [
        "*",
        "featured_image.*",
        "category.id",
        "category.name",
        "category.slug",
        "tags.id",
        "tags.name",
        "tags.slug",
      ],
    })
  );

  const post = rawPosts[0];

  return post ? normalizePost(post) : null;
};

export type { Post, Category, Tag };