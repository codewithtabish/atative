import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { getTopCategoryPageBlogsAction } from "@/app/actions/(category)/get-top-category-blogs-action";

import { Container } from "@/components/(app)/(common)/layout/container";
import { CategoryBlogComponent } from "@/components/(app)/(pages)/categorypage/category-blog-comp";

import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategorySlug({ params }: PageProps) {
  const { slug } = await params;

  const result = await getTopCategoryPageBlogsAction(slug);

  if (!result.success) {
    notFound();
  }

  const { category } = {
    category: result.data,
  };

  return (
    <main>
      <Container>
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

            {/* Current category */}

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
      </Container>
    </main>
  );
}
