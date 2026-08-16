// src/lib/cache-keys.ts

// Central place for cache tags used with `use cache` + `revalidateTag`.

export const CACHE_TAGS = {
  categories: "categories",
  users: "users",

  // Home
  home: "home",
  homeScreen: "home:screen",

  // Category pages
  category: (slug: string) => `category:${slug}`,

  // Individual blog
  blog: (slug: string) => `blog:${slug}`,

  // Comments
  comments: (blogId: string) => `comments:${blogId}`,

  // Dashboard
  dashboardBlogs: "dashboard:blogs",
} as const;
