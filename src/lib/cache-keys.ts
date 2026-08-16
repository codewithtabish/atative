// src/lib/cache-keys.ts

// Central place for cache tags used with `use cache` + `revalidateTag`.

export const CACHE_TAGS = {
  categories: "categories",
  users: "users",

  // Home
  home: "home",
  homeBlogs: "home:blogs",

  // Category pages
  category: (slug: string) => `category:${slug}`,

  // Individual blog
  blog: (slug: string) => `blog:${slug}`,
} as const;
