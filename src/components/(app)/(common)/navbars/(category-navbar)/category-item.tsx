"use client";

import { useId, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { CategoryDropdown } from "./category-dropdown";
import { Category } from "@/data/category";

type CategoryItemProps = {
  category: Category;
  isActive: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onCancelClose: () => void;
  onScheduleClose: () => void;
};

export function CategoryItem({
  category,
  isActive,
  isOpen,
  onOpen,
  onClose,
  onCancelClose,
  onScheduleClose,
}: CategoryItemProps) {
  const dropdownId = useId();
  const itemRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasSubcategories = category.subcategories.length > 0;

  return (
    <div
      ref={itemRef}
      className="group relative shrink-0"
      onMouseEnter={() => hasSubcategories && onOpen()}
      onMouseLeave={() => hasSubcategories && onScheduleClose()}
    >
      <div className="flex items-center gap-0.5">
        {/* Category link — real, crawlable <Link>, not a click handler */}
        <Link
          href={`/${category.slug}`}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "relative py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200",
            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {category.name}
          {/* Underline indicator — active is permanent, hover animates 0% -> 100% */}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-primary transition-transform duration-200 ease-out",
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            )}
          />
        </Link>

        {/* Dropdown trigger — sibling of the Link, never nested inside it */}
        {hasSubcategories && (
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={isOpen}
            aria-controls={dropdownId}
            aria-label={`${category.name} submenu`}
            onClick={() => (isOpen ? onClose() : onOpen())}
            className={cn(
              "rounded-sm p-1 transition-colors duration-200",
              "text-muted-foreground/70 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            <ChevronDown
              className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")}
            />
          </button>
        )}
      </div>

      {hasSubcategories && (
        <CategoryDropdown
          id={dropdownId}
          category={category}
          isOpen={isOpen}
          anchorRef={itemRef}
          triggerRef={triggerRef}
          onMouseEnter={onCancelClose}
          onMouseLeave={onScheduleClose}
          onLinkClick={onClose}
        />
      )}
    </div>
  );
}
