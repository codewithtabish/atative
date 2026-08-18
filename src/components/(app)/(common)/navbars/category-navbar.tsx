import Link from "next/link";

import { getAllCategoriesAction } from "@/app/actions/(category)/get-all-categories-action";
import { cn } from "@/lib/utils";

export default async function CategoryNavBar() {
  const result = await getAllCategoriesAction();

  if (!result.success || !result.categories.length) {
    return null;
  }

  // Only show active categories
  const categories = result.categories.filter((cat) => cat.isActive);

  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="Categories"
      className="hidden border-b border-border/40 bg-background/80 backdrop-blur-md md:block"
    >
      <div className="relative">
        {/* Horizontal scroll container – no visible scrollbar */}
        <div
          className={cn(
            "flex items-center gap-16  font-bold overflow-x-auto px-4 sm:px-6 lg:px-8",
            "scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden",
          )}
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className={cn(
                "shrink-0 whitespace-nowrap  font-bold px-4 py-3.5",
                "text-[14px] font-medium uppercase tracking-[0.1em]",
                "text-muted-foreground transition-colors duration-200",
                "hover:text-foreground",
                "border-b-2 border-transparent hover:border-primary/60",
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Optional subtle fade on the right when content overflows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"
        />
      </div>
    </nav>
  );
}
