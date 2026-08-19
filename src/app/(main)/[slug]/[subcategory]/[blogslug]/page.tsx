import { BlogPostData } from "@/components/(app)/(pages)/blog/blog-page-data";
import { BlogPostSkeleton } from "@/components/(app)/(pages)/blog/blog-page-skeleton";
import { Suspense } from "react";

type PageProps = {
  params: Promise<{
    slug: string;
    subcategory: string;
    blogslug: string;
  }>;
};

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
