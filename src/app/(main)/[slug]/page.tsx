import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getTopCategoryPageBlogsAction } from "@/app/actions/(category)/get-top-category-blogs-action";

import { CategoryBlogComponent } from "@/components/(app)/(pages)/categorypage/category-blog-comp";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const siteUrl = "https://www.alentah.com";

/**
 * ============================================================
 * SEO METADATA
 * ============================================================
 */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const result = await getTopCategoryPageBlogsAction(slug);

  /**
   * If the category doesn't exist, don't index this URL.
   */
  if (!result.success) {
    return {
      title: "Category Not Found | Alentah",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const category = result.data;

  const categoryName = category.name;
  const categorySlug = category.slug;

  /**
   * Use the database description when available.
   * Otherwise generate a useful fallback.
   */
  const description =
    category.description?.trim() ||
    `Explore the latest ${categoryName.toLowerCase()} news, guides, trends, tools, analysis, and insights on Alentah.`;

  /**
   * Page title.
   *
   * Examples:
   *
   * AI | Alentah
   * Technology | Alentah
   * Robotics | Alentah
   */
  const title = `${categoryName} | Alentah`;

  /**
   * Absolute canonical URL.
   *
   * https://www.alentah.com/ai
   */
  const canonicalUrl = `${siteUrl}/${categorySlug}`;

  /**
   * Shared Alentah social image.
   *
   * Ideally create a 1200 × 630 Alentah OG image.
   */
  const ogImage = `${siteUrl}/images/og/alentah-og.png`;

  return {
    /**
     * ========================================================
     * BASIC SEO
     * ========================================================
     */

    title,

    description,

    metadataBase: new URL(siteUrl),

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

      siteName: "Alentah",

      title,

      description,

      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${categoryName} | Alentah`,
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
 * CATEGORY PAGE
 * ============================================================
 */

export default async function CategorySlug({ params }: PageProps) {
  const { slug } = await params;

  const result = await getTopCategoryPageBlogsAction(slug);

  /**
   * ==========================================================
   * NOT FOUND
   * ==========================================================
   */

  if (!result.success) {
    notFound();
  }

  const category = result.data;

  return (
    <main>
      {/* =====================================================
            BREADCRUMB
        ===================================================== */}

      <nav aria-label="Breadcrumb" className="pt-8 sm:pt-10">
        <ol className="flex items-center gap-2 font-sans text-[18px] font-medium">
          {/* Home */}

          <li>
            <Link href="/" className="text-foreground transition-colors hover:text-primary">
              Home
            </Link>
          </li>

          {/* Arrow */}

          <li aria-hidden="true" className="text-muted-foreground">
            <ChevronRight className="size-5" />
          </li>

          {/* Current Category */}

          <li aria-current="page" className="text-primary">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* =====================================================
            CATEGORY CONTENT
        ===================================================== */}

      <section className="pb-12 pt-10 sm:pb-16 sm:pt-12">
        <CategoryBlogComponent category={category} />
      </section>
    </main>
  );
}
