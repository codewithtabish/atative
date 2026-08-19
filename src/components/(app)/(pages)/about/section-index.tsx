"use client";

import { useEffect, useRef, useState } from "react";

export interface SectionIndexItem {
  id: string;
  label: string;
}

interface SectionIndexProps {
  items: SectionIndexItem[];
}

/**
 * A running contents rail, the kind long-form print features carry in the
 * margin so a reader can see where they are in the piece and jump ahead.
 * It is functional navigation, not a decorative numbered list — it only
 * appears once a reader has scrolled past the hero, and it tracks scroll
 * position via IntersectionObserver rather than guessing from scrollY.
 *
 * Hidden below lg: on mobile/tablet the vertical rail has nowhere honest
 * to live, so it simply doesn't render there.
 */
export function SectionIndex({ items }: SectionIndexProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const heroSentinel = document.getElementById("about-hero-sentinel");
    if (heroSentinel) {
      const visibilityObserver = new IntersectionObserver(
        ([entry]) => setIsVisible(!entry.isIntersecting),
        { rootMargin: "-10% 0px 0px 0px" },
      );
      visibilityObserver.observe(heroSentinel);
      observerRef.current = visibilityObserver;
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) sectionObserver.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
      sectionObserver.disconnect();
    };
  }, [items]);

  return (
    <nav
      aria-label="Sections on this page"
      className={`fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:block xl:left-10 ${
        isVisible ? "opacity-100 translate-x-0" : "pointer-events-none -translate-x-2 opacity-0"
      } transition-all duration-500 ease-out`}
    >
      <ol className="relative flex flex-col gap-5 border-l border-border pl-5">
        {items.map((item, index) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[21px] top-1 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  isActive ? "bg-primary" : "bg-border"
                }`}
              />
              <a
                href={`#${item.id}`}
                className={`group flex items-baseline gap-2 text-xs leading-tight transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`max-w-[9rem] ${isActive ? "italic" : ""}`}>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
