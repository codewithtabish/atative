// src/app/actions/(category)/create-subcategory-action.ts

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { pingIndexNow } from "@/lib/index-now";
import prisma from "@/lib/prisam-client";
import { subcategorySchema } from "@/schemas/subcategory-schema";

type CreateSubcategoryResult =
  { success: true; subcategoryId: string } | { success: false; error: string };

const siteUrl = "https://www.alentah.com";

export async function createSubcategoryAction(formData: unknown): Promise<CreateSubcategoryResult> {
  // ── Auth guard ──────────────────────────────────────────────
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "You must be signed in.",
    };
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!dbUser || dbUser.role !== "ADMIN") {
    return {
      success: false,
      error: "You are not authorized to do this.",
    };
  }

  // ── Validate input ─────────────────────────────────────────
  const parsed = subcategorySchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data.",
    };
  }

  const { categoryId, name, slug, description, isActive, sortOrder } = parsed.data;

  try {
    // ── Check parent category ─────────────────────────────────
    const parentCategory = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!parentCategory) {
      return {
        success: false,
        error: "Selected category no longer exists.",
      };
    }

    // ── Check duplicate slug ──────────────────────────────────
    const existing = await prisma.subcategory.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return {
        success: false,
        error: "A subcategory with this slug already exists.",
      };
    }

    // ── Create subcategory ────────────────────────────────────
    const subcategory = await prisma.subcategory.create({
      data: {
        categoryId,
        name,
        slug,
        description: description || null,
        isActive,
        sortOrder,
      },
    });

    // ── Revalidate cache ──────────────────────────────────────
    revalidatePath("/dashboard/category");

    // ── Notify IndexNow ────────────────────────────────────────
    if (isActive && parentCategory.isActive) {
      const subcategoryUrl = `${siteUrl}/${parentCategory.slug}/${subcategory.slug}`;

      await pingIndexNow(subcategoryUrl);
    }

    return {
      success: true,
      subcategoryId: subcategory.id,
    };
  } catch (err) {
    console.error("[createSubcategory] Error:", err);

    return {
      success: false,
      error: "Something went wrong. Try again.",
    };
  }
}
