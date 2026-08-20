import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getSubcategoryPageBlogsAction } from "@/app/actions/(category)/get-top-subcategory-blogs-action";
import { SubcategoryBlogData } from "@/components/(app)/(pages)/subcategorypage/subcategory-blog-data";
import { SubcategoryBlogSkeleton } from "@/components/(app)/(pages)/subcategorypage/subcategory-blog-skeleton";

type PageProps = {
  params: Promise<{
    slug: string;
    subcategory: string;
  }>;
};

const siteUrl = "https://www.alentah.com";

const ogImage = `${siteUrl}/images/og/atative-og.png`;

/**
 * ============================================================
 * DYNAMIC SUBCATEGORY SEO METADATA
 * ============================================================
 */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: categorySlug, subcategory: subcategorySlug } = await params;

  const result = await getSubcategoryPageBlogsAction(subcategorySlug);

  /**
   * ==========================================================
   * SUBCATEGORY NOT FOUND
   * ==========================================================
   */

  if (!result.success) {
    return {
      title: "Subcategory Not Found | ATATIVE",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const subcategory = result.data;

  const categoryName = subcategory.category.name;
  const subcategoryName = subcategory.name;

  /**
   * ==========================================================
   * DYNAMIC TITLE
   * ==========================================================
   */

  const title = `${subcategoryName} — Latest News, Guides & Insights`;

  /**
   * ==========================================================
   * DYNAMIC DESCRIPTION
   *
   * Prefer the description stored in the database.
   * If there is no description, generate one automatically.
   * ==========================================================
   */

  const description =
    subcategory.description?.trim() ||
    `Explore the latest ${subcategoryName.toLowerCase()} news, guides, analysis, reviews, and insights from ${categoryName} on ATATIVE.`;

  /**
   * ==========================================================
   * DYNAMIC CANONICAL URL
   *
   * Example:
   * https://atative.com/ai/generative-ai
   * ==========================================================
   */

  const canonicalUrl = `${siteUrl}/${categorySlug}/${subcategorySlug}`;

  return {
    /**
     * ========================================================
     * BASIC SEO
     * ========================================================
     */

    metadataBase: new URL(siteUrl),

    title,
    description,

    /**
     * ========================================================
     * CANONICAL
     * ========================================================
     */

    alternates: {
      canonical: canonicalUrl,
    },

    /**
     * ========================================================
     * ROBOTS
     * ========================================================
     */

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    /**
     * ========================================================
     * OPEN GRAPH
     * ========================================================
     */

    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: "ATATIVE",

      title,
      description,

      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${subcategoryName} | ATATIVE`,
        },
      ],
    },

    /**
     * ========================================================
     * TWITTER / X
     * ========================================================
     */

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * ============================================================
 * SUBCATEGORY PAGE
 * ============================================================
 */

export default async function SubcategoryPage({ params }: PageProps) {
  const { slug: categorySlug, subcategory: subcategorySlug } = await params;

  /**
   * ==========================================================
   * VALIDATE SUBCATEGORY
   * ==========================================================
   */

  const result = await getSubcategoryPageBlogsAction(subcategorySlug);

  if (!result.success) {
    notFound();
  }

  return (
    <main>
      <Suspense
        key={`${categorySlug}-${subcategorySlug}`}
        fallback={
          <div className="pb-12 pt-10 sm:pb-16 sm:pt-12">
            <SubcategoryBlogSkeleton />
          </div>
        }
      >
        <SubcategoryBlogData categorySlug={categorySlug} subcategorySlug={subcategorySlug} />
      </Suspense>
    </main>
  );
}
