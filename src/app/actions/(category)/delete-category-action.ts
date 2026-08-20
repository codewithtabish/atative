// src/app/actions/(category)/delete-category-action.ts

"use server";

import { auth } from "@clerk/nextjs/server";

import { revalidatePath, revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";

import { pingIndexNow } from "@/lib/index-now";
import prisma from "@/lib/prisam-client";

type DeleteCategoryResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

const SITE_URL = "https://www.alentah.com";

export async function deleteCategoryAction(categoryId: string): Promise<DeleteCategoryResult> {
  // ============================================================
  // 1. AUTHENTICATION
  // ============================================================

  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "You must be signed in.",
    };
  }

  // ============================================================
  // 2. ADMIN AUTHORIZATION
  // ============================================================

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      role: true,
    },
  });

  if (!dbUser || dbUser.role !== "ADMIN") {
    return {
      success: false,
      error: "You are not authorized to do this.",
    };
  }

  // ============================================================
  // 3. VALIDATE CATEGORY ID
  // ============================================================

  if (!categoryId?.trim()) {
    return {
      success: false,
      error: "Missing category id.",
    };
  }

  try {
    // ============================================================
    // 4. CHECK CATEGORY EXISTS
    // ============================================================

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        slug: true,
        editorId: true,
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found.",
      };
    }

    // Save the public URL before deleting the category.
    const categoryUrl = `${SITE_URL}/${category.slug}`;

    // ============================================================
    // 5. DELETE CATEGORY
    //
    // Deletes:
    // - Category
    // - Its subcategories
    //
    // Does NOT delete:
    // - Editor
    // ============================================================

    await prisma.$transaction([
      prisma.subcategory.deleteMany({
        where: {
          categoryId,
        },
      }),

      prisma.category.delete({
        where: {
          id: categoryId,
        },
      }),
    ]);

    // ============================================================
    // 6. REVALIDATE CACHE
    // ============================================================

    revalidateTag(CACHE_TAGS.categories, "max");

    revalidateTag(CACHE_TAGS.editors, "max");

    revalidatePath("/dashboard/category");

    revalidatePath("/dashboard/editors");

    // ============================================================
    // 7. NOTIFY INDEXNOW
    // ============================================================

    await pingIndexNow(categoryUrl);

    // ============================================================
    // 8. SUCCESS
    // ============================================================

    return {
      success: true,
    };
  } catch (err) {
    console.error("[deleteCategoryAction] Error:", err);

    return {
      success: false,
      error: "Something went wrong. Try again.",
    };
  }
}
