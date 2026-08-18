import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  CategoryPageBlogItem,
  CategoryPageData,
} from "@/app/actions/(category)/get-top-category-blogs-action";
import { CategoryBlogMeta } from "./category-blog-metadat";
import { CategorySubcategorySelect } from "./category-subcategory-select";

type CategoryBlogComponentProps = {
  category: CategoryPageData;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function blogHref(categorySlug: string, blog: CategoryPageBlogItem) {
  return `/${categorySlug}/${blog.subcategory.slug}/${blog.slug}`;
}

export function CategoryBlogComponent({ category }: CategoryBlogComponentProps) {
  const [featuredBlog, ...restBlogs] = category.blogs;
  const gridBlogs = restBlogs.slice(0, 3);
  const moreBlogs = restBlogs.slice(3);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <Card className="h-fit border-border bg-card">
        <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
          <Badge
            variant="outline"
            className="border-primary px-4 py-1 text-sm font-bold uppercase tracking-widest text-primary"
          >
            {category.name}
          </Badge>

          <Avatar className="size-24 border border-border">
            <AvatarImage src={category.editor.imageUrl ?? undefined} alt={category.editor.name} />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials(category.editor.name)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <p className="font-semibold text-foreground">{category.editor.name}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {category.editor.isFake ? "Editorial Team" : "Senior Category Editor"}
            </p>
          </div>

          {category.editor.bio ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{category.editor.bio}</p>
          ) : null}

          <CategorySubcategorySelect
            categorySlug={category.slug}
            subcategories={category.subcategories}
          />
        </CardContent>
      </Card>

      {/* Main content */}
      <div className="space-y-10">
        {featuredBlog ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Link
              href={blogHref(category.slug, featuredBlog)}
              className="group relative block aspect-video overflow-hidden rounded-xl bg-muted"
            >
              <Image
                src={featuredBlog.bannerImage}
                alt={featuredBlog.bannerImageAlt ?? featuredBlog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <div className="flex flex-col justify-center gap-3">
              <Badge variant="secondary" className="w-fit uppercase text-xs">
                {featuredBlog.subcategory.name}
              </Badge>
              <Link href={blogHref(category.slug, featuredBlog)} className="group">
                <h2 className="text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {featuredBlog.title}
                </h2>
              </Link>
              {featuredBlog.shortDescription ? (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {featuredBlog.shortDescription}
                </p>
              ) : null}
              <CategoryBlogMeta
                author={featuredBlog.author}
                publishedAt={featuredBlog.publishedAt}
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No articles published yet.</p>
        )}

        {gridBlogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridBlogs.map((blog) => (
              <Link key={blog.id} href={blogHref(category.slug, blog)} className="group">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={blog.bannerImage}
                    alt={blog.bannerImageAlt ?? blog.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 space-y-2">
                  <Badge variant="secondary" className="w-fit uppercase text-xs">
                    {blog.subcategory.name}
                  </Badge>
                  <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    {blog.title}
                  </h3>
                  <CategoryBlogMeta author={blog.author} publishedAt={blog.publishedAt} />
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {moreBlogs.length > 0 ? (
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                More {category.name}
              </h2>
              <div className="h-px flex-1 bg-primary/40" />
            </div>

            <div className="space-y-6">
              {moreBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={blogHref(category.slug, blog)}
                  className="group flex items-start gap-4"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-md bg-muted sm:size-24">
                    <Image
                      src={blog.bannerImage}
                      alt={blog.bannerImageAlt ?? blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Badge variant="secondary" className="w-fit uppercase text-xs">
                      {blog.subcategory.name}
                    </Badge>
                    <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {blog.title}
                    </h3>
                    <CategoryBlogMeta author={blog.author} publishedAt={blog.publishedAt} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
