// src/app/actions/(category)/delete-category-action.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";
import prisma from "@/lib/prisam-client";

type DeleteCategoryResult = { success: true } | { success: false; error: string };

export async function deleteCategoryAction(categoryId: string): Promise<DeleteCategoryResult> {
  // ── Auth guard (defense-in-depth alongside middleware) ──
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser || dbUser.role !== "ADMIN") {
    return { success: false, error: "You are not authorized to do this." };
  }

  if (!categoryId) {
    return { success: false, error: "Missing category id." };
  }

  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true },
    });

    if (!category) {
      return { success: false, error: "Category not found." };
    }

    // Cascade delete: subcategories first, then the category itself.
    // Wrapped in a transaction so it's all-or-nothing — if either
    // delete fails, nothing gets removed.
    await prisma.$transaction([
      prisma.subcategory.deleteMany({ where: { categoryId } }),
      prisma.category.delete({ where: { id: categoryId } }),
    ]);

    revalidateTag(CACHE_TAGS.categories, "max");
    revalidatePath("/dashboard/category");

    return { success: true };
  } catch (err) {
    console.error("[deleteCategory] Error:", err);
    return { success: false, error: "Something went wrong. Try again." };
  }
}
