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

const ogImage = `${siteUrl}/images/og/atative-og.png`;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const result = await getTopCategoryPageBlogsAction(slug);

  if (!result.success) {
    return {
      title: "Category Not Found | ATATIVE",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const category = result.data;

  const categoryName = category.name;

  const description =
    category.description?.trim() ||
    `Explore the latest ${categoryName.toLowerCase()} news, guides, trends, tools, analysis, and insights on ATATIVE.`;

  const title = `${categoryName} | ATATIVE`;

  const canonicalUrl = `${siteUrl}/${category.slug}`;

  return {
    metadataBase: new URL(siteUrl),

    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

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
          alt: `${categoryName} | ATATIVE`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CategorySlug({ params }: PageProps) {
  const { slug } = await params;

  const result = await getTopCategoryPageBlogsAction(slug);

  if (!result.success) {
    notFound();
  }

  const category = result.data;

  return (
    <main>
      <nav aria-label="Breadcrumb" className="pt-8 sm:pt-10">
        <ol className="flex items-center gap-2 font-sans text-[18px] font-medium">
          <li>
            <Link href="/" className="text-foreground transition-colors hover:text-primary">
              Home
            </Link>
          </li>

          <li aria-hidden="true" className="text-muted-foreground">
            <ChevronRight className="size-5" />
          </li>

          <li aria-current="page" className="text-primary">
            {category.name}
          </li>
        </ol>
      </nav>

      <section className="pb-12 pt-10 sm:pb-16 sm:pt-12">
        <CategoryBlogComponent category={category} />
      </section>
    </main>
  );
}
