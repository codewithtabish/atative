// src/app/actions/(blog)/(dashboard)/delete-blog-action.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";
import prisma from "@/lib/prisam-client";

export type DeleteBlogResult =
  { success: true; data: { id: string; slug: string } } | { success: false; error: string };

export async function deleteBlogAction(blogId: string): Promise<DeleteBlogResult> {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return { success: false, error: "Unauthorized. Please sign in." };
    }

    if (!blogId?.trim()) {
      return { success: false, error: "Blog id is required." };
    }

    // Look the blog up first so we still have its slug/id to revalidate
    // the right cache tags AFTER it's gone.
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      select: { id: true, slug: true },
    });

    if (!blog) {
      return { success: false, error: "Blog not found." };
    }

    await prisma.blog.delete({ where: { id: blogId } });

    // ============================================================
    // REVALIDATION
    // ============================================================
    revalidatePath("/");
    revalidatePath("/dashboard/blogs");

    revalidateTag(CACHE_TAGS.home, "max");
    revalidateTag(CACHE_TAGS.homeScreen, "max");
    revalidateTag(CACHE_TAGS.blog(blog.slug), "max");
    revalidateTag(CACHE_TAGS.comments(blog.id), "max");
    revalidateTag(CACHE_TAGS.dashboardBlogs, "max");

    return { success: true, data: { id: blog.id, slug: blog.slug } };
  } catch (error) {
    console.error("❌ Delete blog error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete blog",
    };
  }
}
