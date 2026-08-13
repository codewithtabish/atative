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

  const labelClassName = cn(
    "relative py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200",
    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
  );

  const underline = (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-primary transition-transform duration-200 ease-out",
        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
      )}
    />
  );

  return (
    <div
      ref={itemRef}
      className="group relative shrink-0"
      onMouseEnter={() => hasSubcategories && onOpen()}
      onMouseLeave={() => hasSubcategories && onScheduleClose()}
    >
      {hasSubcategories ? (
        // Category with subcategories: a button that only toggles the
        // dropdown. It never navigates — the category itself has no page
        // of its own here, only its subcategories do.
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={dropdownId}
          onClick={() => (isOpen ? onClose() : onOpen())}
          className={cn(labelClassName, "flex items-center gap-2")}
        >
          {category.name}
          <ChevronDown
            className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")}
          />
          {underline}
        </button>
      ) : (
        // Fallback for a category with no subcategories at all — nothing to
        // toggle open, so this is the one case where it stays a real link.
        <Link
          href={`/${category.slug}`}
          aria-current={isActive ? "page" : undefined}
          className={labelClassName}
        >
          {category.name}
          {underline}
        </Link>
      )}

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
