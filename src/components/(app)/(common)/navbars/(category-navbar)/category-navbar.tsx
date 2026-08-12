
import { categories } from "@/data/category";
import { CategoryNavRail } from "./category-nav-rail";

/* ------------------------------------------------------------------ */
/*  CategoryNavbar — Server Component.                                 */
/*                                                                      */
/*  This is the second header row: the horizontally-scrolling category  */
/*  rail with hover/tap mega-menu dropdowns.                            */
/*                                                                      */
/*  Kept as a plain Server Component: it does no client-side work       */
/*  itself, it just reads the static category data and hands it to the  */
/*  smallest possible Client Component (CategoryNavRail) that actually  */
/*  needs interactivity (scroll position, open dropdown, hover state).  */
/* ------------------------------------------------------------------ */
export function CategoryNavbar() {
  return (
    <nav aria-label="Category navigation" className="w-full border-b border-border/60 bg-background">
      {/* <Container> */}
        <CategoryNavRail categories={categories} />
      {/* </Container> */}
    </nav>
  );
}

export default CategoryNavbar;
