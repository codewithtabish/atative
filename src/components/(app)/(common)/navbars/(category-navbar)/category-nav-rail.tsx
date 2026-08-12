"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { CategoryItem } from "./category-item";
import { Category } from "@/data/category";

/* ------------------------------------------------------------------ */
/*  How long the dropdown stays open after the pointer leaves before    */
/*  it closes — gives the user time to move diagonally into the panel.  */
/* ------------------------------------------------------------------ */
const CLOSE_DELAY_MS = 150;

/** How far each arrow-button click scrolls the rail. */
const SCROLL_STEP_PX = 240;

type CategoryNavRailProps = {
  categories: Category[];
};

export function CategoryNavRail({ categories }: CategoryNavRailProps) {
  const pathname = usePathname();

  const scrollRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  /* ---------------------------------------------------------------- */
  /*  Edge-fade / arrow-visibility detection — recompute on scroll,     */
  /*  resize, and mount. showLeftFade/showRightFade double as both the  */
  /*  fade-gradient visibility AND the scroll-arrow visibility, so the   */
  /*  arrow only ever appears when there's actually more to scroll to.  */
  /* ---------------------------------------------------------------- */
  const updateFades = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftFade(el.scrollLeft > 4);
    setShowRightFade(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateFades();
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateFades();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateFades);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateFades);
    };
  }, [updateFades, categories.length]);

  /* ---------------------------------------------------------------- */
  /*  Escape closes whatever dropdown is open, from anywhere.           */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenSlug(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Clicking anywhere outside the rail closes the open dropdown.      */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const el = scrollRef.current;
      if (el && !el.contains(event.target as Node)) setOpenSlug(null);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => setOpenSlug(null), CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  const scrollByStep = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -SCROLL_STEP_PX : SCROLL_STEP_PX,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Left fade + scroll arrow — only shown once the rail has been scrolled */}
      <div
        aria-hidden={!showLeftFade}
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 flex w-14 items-center bg-gradient-to-r from-background via-background/80 to-transparent transition-opacity duration-200",
          showLeftFade ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          type="button"
          tabIndex={showLeftFade ? 0 : -1}
          aria-label="Scroll categories left"
          onClick={() => scrollByStep("left")}
          className={cn(
            "pointer-events-auto ml-0.5 flex h-7 w-7 items-center justify-center rounded-full",
            "border border-border/70 bg-background text-foreground/70 shadow-sm",
            "transition-colors duration-200 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Right fade + scroll arrow — the primary "hey, this scrolls" affordance */}
      <div
        aria-hidden={!showRightFade}
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 flex w-14 items-center justify-end bg-gradient-to-l from-background via-background/80 to-transparent transition-opacity duration-200",
          showRightFade ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          type="button"
          tabIndex={showRightFade ? 0 : -1}
          aria-label="Scroll categories right"
          onClick={() => scrollByStep("right")}
          className={cn(
            "pointer-events-auto mr-0.5 flex h-7 w-7 items-center justify-center rounded-full",
            "border border-border/70 bg-background text-foreground/70 shadow-sm",
            "transition-colors duration-200 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className={cn(
          "flex items-center gap-6 overflow-x-auto whitespace-nowrap py-2.5 lg:gap-8",
          // Hide scrollbar visually across browsers while keeping it scrollable/keyboard-navigable
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {categories.map((category) => {
          const href = `/${category.slug}`;
          const isActive = pathname === href || pathname?.startsWith(`${href}/`);

          return (
            <CategoryItem
              key={category.slug}
              category={category}
              isActive={Boolean(isActive)}
              isOpen={openSlug === category.slug}
              onOpen={() => {
                cancelClose();
                setOpenSlug(category.slug);
              }}
              onClose={() =>
                setOpenSlug((current) => (current === category.slug ? null : current))
              }
              onCancelClose={cancelClose}
              onScheduleClose={scheduleClose}
            />
          );
        })}
      </div>
    </div>
  );
}
