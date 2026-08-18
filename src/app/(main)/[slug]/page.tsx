import { getTopCategoryPageBlogsAction } from "@/app/actions/(category)/get-top-category-blogs-action";
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

  return (
    <main>
      <section className="py-12 sm:py-16">
        <CategoryBlogComponent category={result.data} />
      </section>
    </main>
  );
}
