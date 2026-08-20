// src/app/actions/(blog)/update-blog-action.ts

"use server";

import { auth } from "@clerk/nextjs/server";

import { revalidatePath, revalidateTag } from "next/cache";

import { OpenAI } from "openai";

import { CACHE_TAGS } from "@/lib/cache-keys";

import prisma from "@/lib/prisam-client";

import { pingIndexNow } from "@/lib/index-now";
import { TableOfContentsItem } from "@/schemas/blog-schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.alentah.com";

// ============================================================
// INPUT / OUTPUT TYPES
// ============================================================

export interface UpdateBlogInput {
  id: string;
  title: string;
  slug: string;
  content: any;
  bannerImage: string;
  bannerImageAlt?: string;
  ogImage: string;
  categoryId: string;
  subcategoryId: string;
  type?: string;
  status?: string;
  featured?: boolean;
  scheduledAt?: string | null;
  tableOfContents?: TableOfContentsItem[];
}

export type UpdateBlogResult =
  | {
      success: true;
      data: {
        blog: {
          id: string;
          title: string;
          slug: string;
          shortDescription: string | null;
          featured: boolean;
          status: string;
          publishedAt: Date | null;
          updatedAt: Date;
        };
      };
    }
  | {
      success: false;
      error: string;
    };

// ============================================================
// HELPERS
// ============================================================

function extractTextFromContent(content: any): string {
  if (!content?.blocks) return "";

  return content.blocks
    .map((block: any) => {
      switch (block.type) {
        case "paragraph":
        case "aitext":
          return block.data?.text || "";

        case "header":
          return `${"#".repeat(block.data?.level || 2)} ${block.data?.text || ""}`;

        case "list":
        case "checklist":
          return (block.data?.items || [])
            .map((item: any) => (typeof item === "string" ? item : item.content || item.text || ""))
            .join("\n");

        case "quote":
          return `> ${block.data?.text || ""}`;

        case "raw":
          return (block.data?.html || "")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
}

function estimateReadingTime(content: any): number {
  const text = extractTextFromContent(content);
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
}

// ============================================================
// AI SEO GENERATION
// ============================================================

async function generateSEOWithAI(title: string, contentText: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert SEO specialist. Generate professional SEO metadata and a short description.

STRICT RULES:

- DO NOT change the title
- shortDescription: 1-2 sentences, max 160 characters
- metaTitle under 60 characters
- metaDescription under 160 characters
- Return ONLY valid JSON

{
  "shortDescription": "...",
  "metaTitle": "...",
  "metaDescription": "...",
  "ogDescription": "...",
  "twitterDescription": "...",
  "keywords": ["max", "10"],
  "summary": "2-3 sentence summary"
}`,
        },
        {
          role: "user",
          content: `Blog Title: ${title}

Blog Content:

${contentText.slice(0, 3500)}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const aiResponse = response.choices[0]?.message?.content || "";

    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);

      return {
        shortDescription:
          parsed.shortDescription ||
          `Learn about ${title} — a comprehensive guide with expert insights.`,

        metaTitle: parsed.metaTitle || title.slice(0, 60),

        metaDescription:
          parsed.metaDescription ||
          `Read about ${title}. Discover detailed insights and information.`,

        ogDescription: parsed.ogDescription || `Learn more about ${title}`,

        twitterDescription:
          parsed.twitterDescription || parsed.ogDescription || `Learn about ${title}`,

        keywords: Array.isArray(parsed.keywords) ? parsed.keywords.slice(0, 10) : [],

        summary: parsed.summary || "",
      };
    }

    throw new Error("Invalid AI response format");
  } catch (error) {
    console.error("OpenAI generation error:", error);

    return {
      shortDescription: `Learn about ${title} — a comprehensive guide with expert insights and practical tips.`,

      metaTitle: title.slice(0, 60),

      metaDescription: `Read about ${title}. Discover detailed insights, tips, and comprehensive information.`,

      ogDescription: `Explore ${title} - a comprehensive guide with expert insights.`,

      twitterDescription: `Learn about ${title} - expert insights and comprehensive guide.`,

      keywords: [title.toLowerCase().replace(/\s+/g, "-")],

      summary: `A comprehensive guide about ${title}.`,
    };
  }
}

// ============================================================
// UPDATE BLOG ACTION
// ============================================================

export async function updateBlogAction(data: UpdateBlogInput): Promise<UpdateBlogResult> {
  try {
    // ========================================================
    // AUTHENTICATION
    // ========================================================

    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return {
        success: false,
        error: "Unauthorized. Please sign in.",
      };
    }

    // ========================================================
    // FIND USER
    // ========================================================

    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found in database.",
      };
    }

    // ========================================================
    // VALIDATION
    // ========================================================

    if (!data.id?.trim()) {
      return {
        success: false,
        error: "Blog id is required.",
      };
    }

    if (!data.title?.trim()) {
      return {
        success: false,
        error: "Title is required.",
      };
    }

    if (!data.slug?.trim()) {
      return {
        success: false,
        error: "Slug is required.",
      };
    }

    if (!data.bannerImage) {
      return {
        success: false,
        error: "Banner image is required.",
      };
    }

    if (!data.ogImage) {
      return {
        success: false,
        error: "OG image is required.",
      };
    }

    if (!data.categoryId || !data.subcategoryId) {
      return {
        success: false,
        error: "Category and subcategory are required.",
      };
    }

    if (!data.content?.blocks?.length) {
      return {
        success: false,
        error: "Blog content cannot be empty.",
      };
    }

    // ========================================================
    // FIND EXISTING BLOG
    // ========================================================

    const existingBlog = await prisma.blog.findUnique({
      where: {
        id: data.id,
      },
      select: {
        id: true,
        slug: true,
        status: true,
        categoryId: true,
        subcategoryId: true,

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
    });

    if (!existingBlog) {
      return {
        success: false,
        error: "Blog not found.",
      };
    }

    // ========================================================
    // SAVE OLD PUBLIC URL
    // ========================================================

    const oldBlogUrl =
      `${BASE_URL}/${existingBlog.category.slug}/` +
      `${existingBlog.subcategory.slug}/${existingBlog.slug}`;

    // ========================================================
    // DUPLICATE SLUG CHECK
    // ========================================================

    const newSlug = data.slug.trim();

    if (newSlug !== existingBlog.slug) {
      const slugTaken = await prisma.blog.findFirst({
        where: {
          slug: newSlug,
          NOT: {
            id: data.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (slugTaken) {
        return {
          success: false,
          error: "A blog with this slug already exists.",
        };
      }
    }

    // ========================================================
    // VALIDATE CATEGORY + SUBCATEGORY
    // ========================================================

    const subcategory = await prisma.subcategory.findFirst({
      where: {
        id: data.subcategoryId,
        categoryId: data.categoryId,
        isActive: true,
      },
      select: {
        id: true,
        slug: true,

        category: {
          select: {
            id: true,
            slug: true,
            isActive: true,
          },
        },
      },
    });

    if (!subcategory || !subcategory.category || !subcategory.category.isActive) {
      return {
        success: false,
        error: "Invalid category / subcategory combination.",
      };
    }

    // ========================================================
    // CATEGORY + SUBCATEGORY SLUGS
    // ========================================================

    const categorySlug = subcategory.category.slug;
    const subcategorySlug = subcategory.slug;

    // ========================================================
    // CANONICAL URL
    // ========================================================

    const canonicalUrl = `${BASE_URL}/${categorySlug}/` + `${subcategorySlug}/${newSlug}`;

    // ========================================================
    // CONTENT + SEO
    // ========================================================

    const contentText = extractTextFromContent(data.content);

    const seoData = await generateSEOWithAI(data.title.trim(), contentText);

    const readingTime = estimateReadingTime(data.content);

    // ========================================================
    // STATUS
    // ========================================================

    const status = data.status || "DRAFT";

    const isPublished = status === "PUBLISHED";

    // ========================================================
    // UPDATE BLOG
    // ========================================================

    const blog = await prisma.blog.update({
      where: {
        id: data.id,
      },

      data: {
        title: data.title.trim(),

        slug: newSlug,

        shortDescription: seoData.shortDescription,

        content: data.content,

        tableOfContents: data.tableOfContents ?? [],

        type: data.type as any,

        status: status as any,

        bannerImage: data.bannerImage,

        bannerImageAlt: data.bannerImageAlt || data.title.trim(),

        featured: data.featured ?? false,

        publishedAt: isPublished
          ? existingBlog.status !== "PUBLISHED" ||
            existingBlog.categoryId !== data.categoryId ||
            existingBlog.subcategoryId !== data.subcategoryId ||
            existingBlog.slug !== newSlug
            ? new Date()
            : undefined
          : null,

        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,

        categoryId: data.categoryId,

        subcategoryId: data.subcategoryId,

        readingTime,

        // ====================================================
        // SEO
        // ====================================================

        seo: {
          upsert: {
            create: {
              metaTitle: seoData.metaTitle,

              metaDescription: seoData.metaDescription,

              canonicalUrl,

              noIndex: false,

              noFollow: false,

              ogTitle: data.title.trim(),

              ogDescription: seoData.ogDescription,

              ogImage: data.ogImage,

              twitterTitle: data.title.trim(),

              twitterDescription: seoData.twitterDescription,

              twitterImage: data.ogImage,

              schemaType: "Article",
            },

            update: {
              metaTitle: seoData.metaTitle,

              metaDescription: seoData.metaDescription,

              canonicalUrl,

              noIndex: false,

              noFollow: false,

              ogTitle: data.title.trim(),

              ogDescription: seoData.ogDescription,

              ogImage: data.ogImage,

              twitterTitle: data.title.trim(),

              twitterDescription: seoData.twitterDescription,

              twitterImage: data.ogImage,
            },
          },
        },
      },

      include: {
        seo: true,
      },
    });

    // ========================================================
    // CURRENT BLOG URL
    // ========================================================

    const newBlogUrl = canonicalUrl;

    // ========================================================
    // CACHE REVALIDATION
    // ========================================================

    // Dashboard
    revalidatePath("/dashboard/blogs");

    revalidateTag(CACHE_TAGS.dashboardBlogs, "max");

    // Homepage
    revalidatePath("/");

    revalidateTag(CACHE_TAGS.home, "max");

    revalidateTag(CACHE_TAGS.homeScreen, "max");

    // Current category
    revalidatePath(`/${categorySlug}`);

    revalidateTag(CACHE_TAGS.categoryPageBlogs(categorySlug), "max");

    // Current subcategory
    revalidatePath(`/${categorySlug}/${subcategorySlug}`);

    revalidateTag(CACHE_TAGS.subcategoryPageBlogs(subcategorySlug), "max");

    // Current blog
    revalidatePath(`/${categorySlug}/${subcategorySlug}/${newSlug}`);

    revalidateTag(CACHE_TAGS.blog(blog.slug), "max");

    // ========================================================
    // OLD BLOG URL / CACHE
    // ========================================================

    const blogUrlChanged =
      existingBlog.slug !== newSlug ||
      existingBlog.categoryId !== data.categoryId ||
      existingBlog.subcategoryId !== data.subcategoryId;

    if (blogUrlChanged) {
      revalidatePath(oldBlogUrl);

      revalidateTag(CACHE_TAGS.blog(existingBlog.slug), "max");
    }

    // ========================================================
    // OLD CATEGORY CACHE
    // ========================================================

    if (existingBlog.categoryId !== data.categoryId) {
      revalidateTag(CACHE_TAGS.categoryPageBlogs(existingBlog.category.slug), "max");

      revalidatePath(`/${existingBlog.category.slug}`);
    }

    // ========================================================
    // OLD SUBCATEGORY CACHE
    // ========================================================

    if (existingBlog.subcategoryId !== data.subcategoryId) {
      revalidateTag(CACHE_TAGS.subcategoryPageBlogs(existingBlog.subcategory.slug), "max");

      revalidatePath(`/${existingBlog.category.slug}/${existingBlog.subcategory.slug}`);
    }

    // ========================================================
    // COMMENTS
    // ========================================================

    revalidateTag(CACHE_TAGS.comments(blog.id), "max");

    // ========================================================
    // INDEXNOW
    // ========================================================

    if (isPublished) {
      // Notify IndexNow about the current/new URL.
      await pingIndexNow(newBlogUrl);

      // If the public URL changed, notify IndexNow
      // about the old URL as well.
      if (blogUrlChanged && existingBlog.status === "PUBLISHED") {
        await pingIndexNow(oldBlogUrl);
      }
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    return {
      success: true,

      data: {
        blog: {
          id: blog.id,

          title: blog.title,

          slug: blog.slug,

          shortDescription: blog.shortDescription,

          featured: blog.featured,

          status: blog.status,

          publishedAt: blog.publishedAt,

          updatedAt: blog.updatedAt,
        },
      },
    };
  } catch (error) {
    console.error("❌ Update blog error:", error);

    return {
      success: false,

      error: error instanceof Error ? error.message : "Failed to update blog",
    };
  }
}
