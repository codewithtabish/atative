import { Suspense } from "react";

import { Container } from "@/components/(app)/(common)/layout/container";
import { SubcategoryBlogData } from "@/components/(app)/(pages)/subcategorypage/subcategory-blog-data";
import { SubcategoryBlogSkeleton } from "@/components/(app)/(pages)/subcategorypage/subcategory-blog-skeleton";

type PageProps = {
  params: Promise<{
    slug: string;
    subcategory: string;
  }>;
};

export default async function SubcategoryPage({ params }: PageProps) {
  const { slug: categorySlug, subcategory: subcategorySlug } = await params;

  return (
    <main>
      <Container>
        <Suspense
          key={subcategorySlug}
          fallback={
            <div className="pb-12 pt-10 sm:pb-16 sm:pt-12">
              <SubcategoryBlogSkeleton />
            </div>
          }
        >
          <SubcategoryBlogData categorySlug={categorySlug} subcategorySlug={subcategorySlug} />
        </Suspense>
      </Container>
    </main>
  );
}
