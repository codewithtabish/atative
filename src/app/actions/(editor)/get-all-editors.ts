// src/app/actions/(editor)/get-all-editors-action.ts
"use server";

import { cacheLife, cacheTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-keys";
import prisma from "@/lib/prisam-client";

export type EditorListItem = {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  location: string | null;
  isActive: boolean;
  categoryCount: number;
  createdAt: Date;
};

type GetAllEditorsResult =
  { success: true; editors: EditorListItem[] } | { success: false; error: string };

async function getCachedEditors() {
  "use cache";
  cacheLife("max");
  cacheTag(CACHE_TAGS.editors);

  const editors = await prisma.editor.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      location: true,
      isActive: true,
      createdAt: true,
      _count: {
        select: { categories: true },
      },
    },
    orderBy: [{ createdAt: "desc" }],
  });

  return editors.map((editor) => ({
    id: editor.id,
    name: editor.name,
    email: editor.email,
    imageUrl: editor.imageUrl,
    location: editor.location,
    isActive: editor.isActive,
    categoryCount: editor._count.categories,
    createdAt: editor.createdAt,
  }));
}

export async function getAllEditorsAction(): Promise<GetAllEditorsResult> {
  try {
    const editors = await getCachedEditors();
    return { success: true, editors };
  } catch (err) {
    console.error("[getAllEditors] Error:", err);
    return { success: false, error: "Failed to load editors." };
  }
}
