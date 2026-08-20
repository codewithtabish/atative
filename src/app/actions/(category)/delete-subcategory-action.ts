"use server";

import { auth } from "@clerk/nextjs/server";

import { revalidatePath, revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";

import { pingIndexNow } from "@/lib/index-now";
import prisma from "@/lib/prisam-client";

type DeleteSubcategoryResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

const SITE_URL = "https://www.alentah.com";

export async function deleteSubcategoryAction(
  subcategoryId: string,
): Promise<DeleteSubcategoryResult> {
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
  // 3. VALIDATE SUBCATEGORY ID
  // ============================================================

  if (!subcategoryId?.trim()) {
    return {
      success: false,
      error: "Missing subcategory id.",
    };
  }

  try {
    // ============================================================
    // 4. FIND SUBCATEGORY
    // ============================================================

    const subcategory = await prisma.subcategory.findUnique({
      where: {
        id: subcategoryId,
      },
      select: {
        id: true,
        slug: true,
        category: {
          select: {
            slug: true,
          },
        },
      },
    });

    if (!subcategory) {
      return {
        success: false,
        error: "Subcategory not found.",
      };
    }

    // Save the public URL before deleting it.
    const subcategoryUrl = `${SITE_URL}/${subcategory.category.slug}/${subcategory.slug}`;

    // ============================================================
    // 5. DELETE SUBCATEGORY
    // ============================================================

    await prisma.subcategory.delete({
      where: {
        id: subcategoryId,
      },
    });

    // ============================================================
    // 6. REVALIDATE CACHE
    // ============================================================

    revalidateTag(CACHE_TAGS.categories, "max");

    revalidatePath("/dashboard/category");

    // ============================================================
    // 7. NOTIFY INDEXNOW
    // ============================================================

    await pingIndexNow(subcategoryUrl);

    // ============================================================
    // 8. SUCCESS
    // ============================================================

    return {
      success: true,
    };
  } catch (err) {
    console.error("[deleteSubcategoryAction] Error:", err);

    return {
      success: false,
      error: "Something went wrong. Try again.",
    };
  }
}
