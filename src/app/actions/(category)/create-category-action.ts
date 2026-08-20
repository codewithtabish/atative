// src/app/actions/category.ts

"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";
import { pingIndexNow } from "@/lib/index-now";
import prisma from "@/lib/prisam-client";
import { categorySchema } from "@/schemas/category-schema";

type CreateCategoryResult =
  { success: true; categoryId: string } | { success: false; error: string };

export async function createCategoryAction(formData: unknown): Promise<CreateCategoryResult> {
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
  const parsed = categorySchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data.",
    };
  }

  const { name, slug, description, isActive, sortOrder } = parsed.data;

  try {
    // ── Check duplicate slug ─────────────────────────────────
    const existing = await prisma.category.findUnique({
      where: {
        slug,
      },
    });

    if (existing) {
      return {
        success: false,
        error: "A category with this slug already exists.",
      };
    }

    // ── Create category ───────────────────────────────────────
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
        isActive,
        sortOrder,
      },
    });

    // ── Revalidate cache ──────────────────────────────────────
    revalidateTag(CACHE_TAGS.categories, "max");

    revalidatePath("/dashboard/items/create-category");
    revalidatePath("/dashboard");

    // ── Notify IndexNow ────────────────────────────────────────
    if (isActive) {
      await pingIndexNow(`/${category.slug}`);
    }

    return {
      success: true,
      categoryId: category.id,
    };
  } catch (err) {
    console.error("[createCategory] Error:", err);

    return {
      success: false,
      error: "Something went wrong. Try again.",
    };
  }
}
