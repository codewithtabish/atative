// src/app/actions/(blog)/update-blog-action.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { OpenAI } from "openai";

import { CACHE_TAGS } from "@/lib/cache-keys";
import prisma from "@/lib/prisam-client";
import { TableOfContentsItem } from "@/schemas/blog-schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// ============================================================
// INPUT / OUTPUT TYPES
// If you already have UpdateBlogInput / UpdateBlogResult in
// @/schemas/blog-schema, delete these locals and import from there
// instead — kept local here since that file wasn't shared.
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
  | { success: false; error: string };

// ============================================================
// HELPERS
// Duplicated from blog-creation-action.ts. If you need these in a
// third place, move them to a shared src/lib/blog-content.ts.
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
          content: `Blog Title: ${title}\n\nBlog Content:\n${contentText.slice(0, 3500)}`,
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
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return { success: false, error: "Unauthorized. Please sign in." };
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      return { success: false, error: "User not found in database." };
    }

    // Validation
    if (!data.id?.trim()) return { success: false, error: "Blog id is required." };
    if (!data.title?.trim()) return { success: false, error: "Title is required." };
    if (!data.slug?.trim()) return { success: false, error: "Slug is required." };
    if (!data.bannerImage) return { success: false, error: "Banner image is required." };
    if (!data.ogImage) return { success: false, error: "OG image is required." };
    if (!data.categoryId || !data.subcategoryId) {
      return { success: false, error: "Category and subcategory are required." };
    }
    if (!data.content?.blocks?.length) {
      return { success: false, error: "Blog content cannot be empty." };
    }

    const existingBlog = await prisma.blog.findUnique({
      where: { id: data.id },
      select: { id: true, slug: true },
    });
    if (!existingBlog) {
      return { success: false, error: "Blog not found." };
    }

    // Duplicate slug check — only against OTHER blogs, since keeping the
    // same slug on save must not trip over itself.
    if (data.slug !== existingBlog.slug) {
      const slugTaken = await prisma.blog.findFirst({
        where: { slug: data.slug, NOT: { id: data.id } },
        select: { id: true },
      });
      if (slugTaken) {
        return { success: false, error: "A blog with this slug already exists." };
      }
    }

    // Validate category + subcategory
    const subcategory = await prisma.subcategory.findFirst({
      where: {
        id: data.subcategoryId,
        categoryId: data.categoryId,
        isActive: true,
      },
      select: { id: true },
    });
    if (!subcategory) {
      return { success: false, error: "Invalid category / subcategory combination." };
    }

    const contentText = extractTextFromContent(data.content);
    const seoData = await generateSEOWithAI(data.title, contentText);
    const readingTime = estimateReadingTime(data.content);
    const canonicalUrl = `${BASE_URL}/blogs/${data.slug}`;

    const status = data.status || "DRAFT";
    const isPublished = status === "PUBLISHED";

    const blog = await prisma.blog.update({
      where: { id: data.id },
      data: {
        title: data.title.trim(),
        slug: data.slug.trim(),
        shortDescription: seoData.shortDescription,
        content: data.content,
        tableOfContents: data.tableOfContents ?? [],
        type: data.type as any,
        status: status as any,
        bannerImage: data.bannerImage,
        bannerImageAlt: data.bannerImageAlt || data.title,
        featured: data.featured ?? false,
        publishedAt: isPublished ? new Date() : null,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
        categoryId: data.categoryId,
        subcategoryId: data.subcategoryId,
        readingTime,
        seo: {
          upsert: {
            create: {
              metaTitle: seoData.metaTitle,
              metaDescription: seoData.metaDescription,
              canonicalUrl,
              noIndex: false,
              noFollow: false,
              ogTitle: data.title,
              ogDescription: seoData.ogDescription,
              ogImage: data.ogImage,
              twitterTitle: data.title,
              twitterDescription: seoData.twitterDescription,
              twitterImage: data.ogImage,
              schemaType: "Article",
            },
            update: {
              metaTitle: seoData.metaTitle,
              metaDescription: seoData.metaDescription,
              canonicalUrl,
              ogTitle: data.title,
              ogDescription: seoData.ogDescription,
              ogImage: data.ogImage,
              twitterTitle: data.title,
              twitterDescription: seoData.twitterDescription,
              twitterImage: data.ogImage,
            },
          },
        },
      },
      include: { seo: true },
    });

    // ============================================================
    // REVALIDATION
    // ============================================================
    revalidatePath("/");
    revalidatePath("/dashboard/blogs");

    revalidateTag(CACHE_TAGS.home, "max");
    revalidateTag(CACHE_TAGS.homeScreen, "max");
    revalidateTag(CACHE_TAGS.dashboardBlogs, "max");
    revalidateTag(CACHE_TAGS.blog(blog.slug), "max");
    // If the slug changed, the OLD cached single-blog page is now stale too.
    if (existingBlog.slug !== blog.slug) {
      revalidateTag(CACHE_TAGS.blog(existingBlog.slug), "max");
    }
    revalidateTag(CACHE_TAGS.comments(blog.id), "max");

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
