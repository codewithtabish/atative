import type { MetadataRoute } from "next";

import prisma from "@/lib/prisam-client";

const siteUrl = "https://www.alentah.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, subcategories, blogs] = await Promise.all([
    // ============================================================
    // PUBLIC ACTIVE CATEGORIES
    // ============================================================

    prisma.category.findMany({
      where: {
        isActive: true,
      },
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    }),

    // ============================================================
    // PUBLIC ACTIVE SUBCATEGORIES
    // ============================================================

    prisma.subcategory.findMany({
      where: {
        isActive: true,
        category: {
          isActive: true,
        },
      },
      select: {
        slug: true,
        updatedAt: true,
        category: {
          select: {
            slug: true,
          },
        },
      },
      orderBy: {
        sortOrder: "asc",
      },
    }),

    // ============================================================
    // ALL PUBLISHED BLOGS
    // ============================================================

    prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        slug: true,
        updatedAt: true,
        category: {
          select: {
            slug: true,
          },
        },
        subcategory: {
          select: {
            slug: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    }),
  ]);

  // ============================================================
  // STATIC PUBLIC PAGES
  // ============================================================

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/advertise`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ============================================================
  // CATEGORY PAGES
  // ============================================================

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // ============================================================
  // SUBCATEGORY PAGES
  // ============================================================

  const subcategoryPages: MetadataRoute.Sitemap = subcategories.map((subcategory) => ({
    url: `${siteUrl}/${subcategory.category.slug}/${subcategory.slug}`,
    lastModified: subcategory.updatedAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  // ============================================================
  // BLOG PAGES
  // ============================================================

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${siteUrl}/${blog.category.slug}/${blog.subcategory.slug}/${blog.slug}`,
    lastModified: blog.updatedAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // ============================================================
  // FINAL PUBLIC URLS
  // ============================================================

  return [...staticPages, ...categoryPages, ...subcategoryPages, ...blogPages];
}
