// src/app/actions/(blog)/(dashboard)/delete-blog-action.ts

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";
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
    //
    // We MUST fetch the category/subcategory before deleting
    // the blog because their slugs are required for targeted
    // cache invalidation.
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
    // SAVE CACHE IDENTIFIERS BEFORE DELETE
    // ========================================================

    const blogSlug = blog.slug;
    const categorySlug = blog.category.slug;
    const subcategorySlug = blog.subcategory.slug;

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
    //
    // Example:
    // /ai/generative-ai/what-are-large-language-models-llms
    //
    revalidatePath(`/${categorySlug}/${subcategorySlug}/${blogSlug}`);

    // Category page
    //
    // Example:
    // /ai
    //
    revalidatePath(`/${categorySlug}`);

    // Subcategory page
    //
    // Example:
    // /ai/generative-ai
    //
    revalidatePath(`/${categorySlug}/${subcategorySlug}`);

    // ========================================================
    // CACHE TAG REVALIDATION
    // ========================================================

    // --------------------------------------------------------
    // HOME
    // --------------------------------------------------------

    revalidateTag(CACHE_TAGS.home, "max");
    revalidateTag(CACHE_TAGS.homeScreen, "max");

    // --------------------------------------------------------
    // CATEGORY
    //
    // Example:
    // category:blogs:ai
    // --------------------------------------------------------

    revalidateTag(CACHE_TAGS.categoryPageBlogs(categorySlug), "max");

    // --------------------------------------------------------
    // SUBCATEGORY
    //
    // Example:
    // subcategory:blogs:generative-ai
    // --------------------------------------------------------

    revalidateTag(CACHE_TAGS.subcategoryPageBlogs(subcategorySlug), "max");

    // --------------------------------------------------------
    // INDIVIDUAL BLOG
    //
    // Example:
    // blog:what-are-large-language-models-llms
    // --------------------------------------------------------

    revalidateTag(CACHE_TAGS.blog(blogSlug), "max");

    // --------------------------------------------------------
    // COMMENTS
    // --------------------------------------------------------

    revalidateTag(CACHE_TAGS.comments(blog.id), "max");

    // --------------------------------------------------------
    // DASHBOARD
    // --------------------------------------------------------

    revalidateTag(CACHE_TAGS.dashboardBlogs, "max");

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
