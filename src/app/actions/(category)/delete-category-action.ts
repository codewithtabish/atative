// src/app/actions/(category)/delete-category-action.ts

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";
import prisma from "@/lib/prisam-client";

type DeleteCategoryResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

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
        editorId: true,
      },
    });

    if (!category) {
      return {
        success: false,
        error: "Category not found.",
      };
    }

    // ============================================================
    // 5. DELETE CATEGORY
    //
    // Deletes:
    // - Category
    // - Its subcategories
    //
    // Does NOT delete:
    // - Editor
    //
    // Because Category.editorId belongs to the Category row,
    // deleting the Category automatically removes that
    // category-editor association.
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

    // Category list changed.
    revalidateTag(CACHE_TAGS.categories, "max");

    // Editor/category assignment data may have changed.
    revalidateTag(CACHE_TAGS.editors, "max");

    // Dashboard category page.
    revalidatePath("/dashboard/category");

    // Editor management page/list.
    revalidatePath("/dashboard/editors");

    // ============================================================
    // 7. SUCCESS
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
