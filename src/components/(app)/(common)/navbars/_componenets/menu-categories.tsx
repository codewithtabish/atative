import { Plus } from "lucide-react";
import Link from "next/link";

import { getAllCategoriesAction } from "@/app/actions/(category)/get-all-categories-action";

export default async function MenuCategories() {
  const result = await getAllCategoriesAction();
  const categories = result.success ? result.categories.filter((c) => c.isActive) : [];

  if (categories.length === 0) {
    return <p className="py-4 text-sm text-muted-foreground">No categories yet.</p>;
  }

  return (
    <nav aria-label="Site categories" className="flex flex-col">
      {categories.map((category) => {
        const activeSubs = category.subcategories.filter((s) => s.isActive);

        if (activeSubs.length === 0) {
          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="border-b border-border/60 py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-foreground transition-colors hover:text-primary"
            >
              {category.name}
            </Link>
          );
        }

        return (
          <details key={category.id} className="group border-b border-border/60">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-foreground [&::-webkit-details-marker]:hidden">
              <Link
                href={`/category/${category.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-45" />
            </summary>

            <ul className="flex flex-col gap-3 pb-4 pl-1">
              {activeSubs.map((sub) => (
                <li key={sub.id}>
                  <Link
                    href={`/category/${category.slug}/${sub.slug}`}
                    className="text-sm font-medium uppercase tracking-[0.04em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </nav>
  );
}
