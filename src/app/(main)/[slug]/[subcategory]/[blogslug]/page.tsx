import type { Metadata } from "next";
import { Suspense } from "react";

import { getBlogBySlugAction } from "@/app/actions/(blog)/get-blog-by-slug-action";

import { BlogPostData } from "@/components/(app)/(pages)/blog/blog-page-data";
import { BlogPostSkeleton } from "@/components/(app)/(pages)/blog/blog-page-skeleton";

type PageProps = {
  params: Promise<{
    slug: string;
    subcategory: string;
    blogslug: string;
  }>;
};

// ============================================================
// SEO METADATA
// ============================================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { blogslug } = await params;

  const result = await getBlogBySlugAction(blogslug);

  // ==========================================================
  // BLOG NOT FOUND
  // ==========================================================

  if (!result.success || !result.blog) {
    return {
      title: "Article Not Found | Alentah",
      description: "The requested article could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const blog = result.blog;

  // ==========================================================
  // SEO VALUES
  // ==========================================================

  const title = blog.seo?.metaTitle || blog.title;

  const description =
    blog.seo?.metaDescription || blog.shortDescription || `Read ${blog.title} on Alentah.`;

  const canonicalUrl =
    blog.seo?.canonicalUrl ||
    `https://www.alentah.com/${blog.category.slug}/${blog.subcategory.slug}/${blog.slug}`;

  // ==========================================================
  // OPEN GRAPH
  // ==========================================================

  const ogTitle = blog.seo?.ogTitle || title;

  const ogDescription = blog.seo?.ogDescription || description;

  const ogImage = blog.seo?.ogImage || blog.bannerImage;

  // ==========================================================
  // TWITTER
  // ==========================================================

  const twitterTitle = blog.seo?.twitterTitle || title;

  const twitterDescription = blog.seo?.twitterDescription || description;

  const twitterImage = blog.seo?.twitterImage || ogImage;

  // ==========================================================
  // AUTHOR
  // ==========================================================

  const authorName =
    [blog.author?.firstName, blog.author?.lastName].filter(Boolean).join(" ") || "Alentah";

  // ==========================================================
  // KEYWORDS
  // ==========================================================

  const keywords = blog.tags?.length ? blog.tags.map((item) => item.tag.name) : undefined;

  // ==========================================================
  // METADATA
  // ==========================================================

  return {
    // --------------------------------------------------------
    // Basic
    // --------------------------------------------------------

    title,

    description,

    keywords,

    authors: [
      {
        name: authorName,
      },
    ],

    creator: "Alentah",

    publisher: "Alentah",

    // --------------------------------------------------------
    // Canonical
    // --------------------------------------------------------

    alternates: {
      canonical: canonicalUrl,
    },

    // --------------------------------------------------------
    // Robots
    // --------------------------------------------------------

    robots: {
      index: !blog.seo?.noIndex,

      follow: !blog.seo?.noFollow,

      googleBot: {
        index: !blog.seo?.noIndex,

        follow: !blog.seo?.noFollow,

        "max-image-preview": "large",

        "max-snippet": -1,

        "max-video-preview": -1,
      },
    },

    // --------------------------------------------------------
    // Open Graph
    // --------------------------------------------------------

    openGraph: {
      type: "article",

      locale: "en_US",

      url: canonicalUrl,

      siteName: "Alentah",

      title: ogTitle,

      description: ogDescription,

      images: ogImage
        ? [
            {
              url: ogImage,

              width: 1200,

              height: 630,

              alt: blog.bannerImageAlt || blog.title,
            },
          ]
        : undefined,

      publishedTime: blog.publishedAt ? blog.publishedAt.toISOString() : undefined,

      authors: [authorName],

      section: blog.category.name,
    },

    // --------------------------------------------------------
    // Twitter
    // --------------------------------------------------------

    twitter: {
      card: "summary_large_image",

      title: twitterTitle,

      description: twitterDescription,

      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}

// ============================================================
// PAGE
// ============================================================

export default async function SingleBlogPage({ params }: PageProps) {
  const { blogslug } = await params;

  return (
    <main>
      <Suspense key={blogslug} fallback={<BlogPostSkeleton />}>
        <BlogPostData blogslug={blogslug} />
      </Suspense>
    </main>
  );
}
