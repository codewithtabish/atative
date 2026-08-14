// src/components/(app)/(common)/navbars/full-navbar.tsx

import { Suspense } from "react";

import { getAllCategoriesAction } from "@/app/actions/(category)/get-all-categories-action";
import SpecialDayBanner from "./_componenets/special-day-navbar";
import CategoryNavBar from "./category-navbar";
import SiteTopHeader from "./top-navbar";

async function NavbarContent() {
  const result = await getAllCategoriesAction();

  const categories =
    result.success && result.categories ? result.categories.filter((c) => c.isActive) : [];

  return (
    <>
      <SpecialDayBanner />
      <SiteTopHeader categories={categories} />
      <CategoryNavBar />
    </>
  );
}

function NavbarFallback() {
  return (
    <div className="w-full border-b border-border/50 bg-background/80">
      {/* Simple skeleton that matches your header height */}
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 md:h-[4.5rem] lg:h-20">
        <div className="h-8 w-36 animate-pulse rounded bg-muted sm:w-48" />
        <div className="flex items-center gap-3">
          <div className="hidden h-9 w-9 animate-pulse rounded-full bg-muted lg:block" />
          <div className="hidden h-9 w-9 animate-pulse rounded-full bg-muted lg:block" />
          <div className="h-9 w-24 animate-pulse rounded-full bg-muted" />
          <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function FullNavbar() {
  return (
    <Suspense fallback={<NavbarFallback />}>
      <NavbarContent />
    </Suspense>
  );
}
