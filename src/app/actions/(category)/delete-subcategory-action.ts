// src/app/actions/(category)/delete-subcategory-action.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";
import prisma from "@/lib/prisam-client";

type DeleteSubcategoryResult = { success: true } | { success: false; error: string };

export async function deleteSubcategoryAction(
  subcategoryId: string,
): Promise<DeleteSubcategoryResult> {
  // ── Auth guard (defense-in-depth alongside middleware) ──
  const { userId } = await auth();
  if (!userId) {
    return { success: false, error: "You must be signed in." };
  }

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!dbUser || dbUser.role !== "ADMIN") {
    return { success: false, error: "You are not authorized to do this." };
  }

  if (!subcategoryId) {
    return { success: false, error: "Missing subcategory id." };
  }

  try {
    const subcategory = await prisma.subcategory.findUnique({
      where: { id: subcategoryId },
      select: { id: true },
    });

    if (!subcategory) {
      return { success: false, error: "Subcategory not found." };
    }

    await prisma.subcategory.delete({ where: { id: subcategoryId } });

    // Subcategories are nested inside the categories cache entry,
    // so the same tag covers both.
    revalidateTag(CACHE_TAGS.categories, "max");
    revalidatePath("/dashboard/category");
    // revalidatePath("/dashboard/category/create-subcategory");

    return { success: true };
  } catch (err) {
    console.error("[deleteSubcategory] Error:", err);
    return { success: false, error: "Something went wrong. Try again." };
  }
}
