// src/lib/cache-keys.ts

// Central place for cache tags used with `use cache` + `revalidateTag`.
// Add more here as new features need caching.

export const CACHE_TAGS = {
  categories: "categories", // all categories list
  users: "users", // all users list,
  home: "home",
  category: (slug: string) => `category:${slug}`,
} as const;
