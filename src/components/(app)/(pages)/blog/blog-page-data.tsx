import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { BlogCommentsSkeleton } from "@/app/actions/(blog)/blog-comments-skeleton";
import { getBlogBySlugAction } from "@/app/actions/(blog)/get-blog-by-slug-action";
import { BlogContentContainer } from "@/components/(app)/(common)/layout/blog-content-container";
import { BlogPreviewer } from "@/components/(app)/(dashbaord)/blog/blog-previewr";
import { BlogComments } from "@/components/(app)/(pages)/blog/blog-comment";
import BlogHeader from "@/components/(app)/(pages)/blog/single-blog-header";
import TheDaily from "@/components/(app)/(pages)/homepage/the-daily";
import { TableOfContentsItem } from "@/schemas/blog-schema";

type BlogPostDataProps = {
  blogslug: string;
};

export async function BlogPostData({ blogslug }: BlogPostDataProps) {
  const result = await getBlogBySlugAction(blogslug);

  if (!result.success) {
    notFound();
  }

  const { blog } = result;

  return (
    <>
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl px-4 pt-8 sm:pt-10">
        <ol className="flex flex-wrap items-center gap-2 font-sans text-sm font-medium sm:text-base">
          <li>
            <Link href="/" className="text-foreground transition-colors hover:text-primary">
              Home
            </Link>
          </li>

          <li aria-hidden="true" className="text-muted-foreground">
            <ChevronRight className="size-4" />
          </li>

          <li>
            <Link
              href={`/${blog.category.slug}`}
              className="text-foreground transition-colors hover:text-primary"
            >
              {blog.category.name}
            </Link>
          </li>

          <li aria-hidden="true" className="text-muted-foreground">
            <ChevronRight className="size-4" />
          </li>

          <li>
            <Link
              href={`/${blog.category.slug}/${blog.subcategory.slug}`}
              className="text-foreground transition-colors hover:text-primary"
            >
              {blog.subcategory.name}
            </Link>
          </li>

          <li aria-hidden="true" className="text-muted-foreground">
            <ChevronRight className="size-4" />
          </li>

          <li aria-current="page" className="truncate text-primary">
            {blog.title}
          </li>
        </ol>
      </nav>

      <BlogHeader
        title={blog.title}
        shortDescription={blog.shortDescription}
        publishedAt={blog.publishedAt}
        type={blog.type}
        readingTime={blog.readingTime}
        bannerImage={blog.bannerImage}
        bannerImageAlt={blog.bannerImageAlt}
        author={blog.author}
        category={blog.category}
        subcategory={blog.subcategory}
      />
      <BlogContentContainer>
        <BlogPreviewer
          content={blog.content}
          tableOfContents={
            Array.isArray(blog.tableOfContents)
              ? (blog.tableOfContents as TableOfContentsItem[])
              : undefined
          }
        />
        <hr />
        <Suspense fallback={<BlogCommentsSkeleton />}>
          <BlogComments blogId={blog.id} blogSlug={blog.slug} />
        </Suspense>
        <TheDaily />
      </BlogContentContainer>
    </>
  );
}
