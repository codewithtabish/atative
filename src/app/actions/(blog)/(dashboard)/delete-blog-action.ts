"use server";

import { auth } from "@clerk/nextjs/server";

import { revalidatePath, revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";

import { pingIndexNow } from "@/lib/index-now";
import prisma from "@/lib/prisam-client";

// ============================================================
// TYPES
// ============================================================

export type DeleteBlogResult =
  | {
      success: true;
      data: {
        id: string;
        slug: string;
      };
    }
  | {
      success: false;
      error: string;
    };

const SITE_URL = "https://www.alentah.com";

// ============================================================
// DELETE BLOG ACTION
// ============================================================

export async function deleteBlogAction(blogId: string): Promise<DeleteBlogResult> {
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
    // VALIDATION
    // ========================================================

    if (!blogId?.trim()) {
      return {
        success: false,
        error: "Blog id is required.",
      };
    }

    // ========================================================
    // FIND BLOG
    // ========================================================

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      select: {
        id: true,
        slug: true,
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

    if (!blog) {
      return {
        success: false,
        error: "Blog not found.",
      };
    }

    // ========================================================
    // SAVE URL IDENTIFIERS BEFORE DELETE
    // ========================================================

    const blogSlug = blog.slug;
    const categorySlug = blog.category.slug;
    const subcategorySlug = blog.subcategory.slug;

    const blogUrl = `${SITE_URL}/${categorySlug}/${subcategorySlug}/${blogSlug}`;

    // ========================================================
    // DELETE BLOG
    // ========================================================

    await prisma.blog.delete({
      where: {
        id: blog.id,
      },
    });

    // ========================================================
    // PATH REVALIDATION
    // ========================================================

    // Homepage
    revalidatePath("/");

    // Dashboard blog list
    revalidatePath("/dashboard/blogs");

    // Individual blog URL
    revalidatePath(`/${categorySlug}/${subcategorySlug}/${blogSlug}`);

    // Category page
    revalidatePath(`/${categorySlug}`);

    // Subcategory page
    revalidatePath(`/${categorySlug}/${subcategorySlug}`);

    // ========================================================
    // CACHE TAG REVALIDATION
    // ========================================================

    // HOME
    revalidateTag(CACHE_TAGS.home, "max");
    revalidateTag(CACHE_TAGS.homeScreen, "max");

    // CATEGORY
    revalidateTag(CACHE_TAGS.categoryPageBlogs(categorySlug), "max");

    // SUBCATEGORY
    revalidateTag(CACHE_TAGS.subcategoryPageBlogs(subcategorySlug), "max");

    // INDIVIDUAL BLOG
    revalidateTag(CACHE_TAGS.blog(blogSlug), "max");

    // COMMENTS
    revalidateTag(CACHE_TAGS.comments(blog.id), "max");

    // DASHBOARD
    revalidateTag(CACHE_TAGS.dashboardBlogs, "max");

    // ========================================================
    // NOTIFY INDEXNOW
    // ========================================================

    await pingIndexNow(blogUrl);

    // ========================================================
    // RESPONSE
    // ========================================================

    return {
      success: true,
      data: {
        id: blog.id,
        slug: blog.slug,
      },
    };
  } catch (error) {
    console.error("❌ Delete blog error:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete blog",
    };
  }
}
