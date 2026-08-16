import { BlogCommentsSkeleton } from "@/app/actions/(blog)/blog-comments-skeleton";
import { getBlogBySlugAction } from "@/app/actions/(blog)/get-blog-by-slug-action";
import { BlogContentContainer } from "@/components/(app)/(common)/layout/blog-content-container";
import { BlogPreviewer } from "@/components/(app)/(dashbaord)/blog/blog-previewr";
import { BlogComments } from "@/components/(app)/(pages)/blog/blog-comment";
import BlogHeader from "@/components/(app)/(pages)/blog/single-blog-header";
import TheDaily from "@/components/(app)/(pages)/homepage/the-daily";
import { TableOfContentsItem } from "@/schemas/blog-schema";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;

  const result = await getBlogBySlugAction(slug);

  if (!result.success) {
    notFound();
  }

  const { blog } = result;

  return (
    <main>
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

      {/* Blog content will come here */}
    </main>
  );
}
