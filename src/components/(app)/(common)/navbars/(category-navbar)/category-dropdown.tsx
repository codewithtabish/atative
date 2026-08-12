"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import type { RefObject } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Category } from "@/data/category";

type CategoryDropdownProps = {
  id: string;
  category: Category;
  isOpen: boolean;
  /** The category item wrapper — used to compute where the panel should sit. */
  anchorRef: RefObject<HTMLDivElement | null>;
  /** The chevron trigger button — focus returns here on Escape. */
  triggerRef: RefObject<HTMLButtonElement | null>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick: () => void;
};

/* ------------------------------------------------------------------ */
/*  Mount detection without setState-in-effect.                         */
/*                                                                        */
/*  createPortal needs document.body, which only exists on the client.   */
/*  useSyncExternalStore is the built-in tool for exactly this: it        */
/*  returns the server snapshot (false) during SSR and the initial        */
/*  client render — matching, so no hydration mismatch — then flips to    */
/*  the client snapshot (true) on its own once mounted. No effect, no     */
/*  setState call, no lint warning.                                       */
/* ------------------------------------------------------------------ */
function subscribeNoop() {
  return () => {};
}
function useIsMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

/* ------------------------------------------------------------------ */
/*  Rendered via a portal into document.body and positioned with        */
/*  `position: fixed`.                                                  */
/*                                                                        */
/*  Why: the nav rail needs `overflow-x-auto` to scroll horizontally,    */
/*  and in every browser that also clips vertical overflow — so an       */
/*  absolutely-positioned dropdown nested inside that rail gets cut      */
/*  off/invisible no matter how high its z-index is. Portaling out to    */
/*  <body> and computing screen coordinates from the trigger's own       */
/*  getBoundingClientRect() sidesteps that clipping entirely.            */
/* ------------------------------------------------------------------ */
export function CategoryDropdown({
  id,
  category,
  isOpen,
  anchorRef,
  triggerRef,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}: CategoryDropdownProps) {
  const shouldReduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
  const mounted = useIsMounted();

  const updatePosition = () => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const margin = 16;
    const panelWidth = panelRef.current?.offsetWidth ?? Math.min(window.innerWidth * 0.9, 512);

    let left = rect.left;
    if (left + panelWidth > window.innerWidth - margin) {
      left = Math.max(margin, window.innerWidth - panelWidth - margin);
    }

    setCoords({ top: rect.bottom + 8, left });
  };

  // Measure as soon as it opens, then re-measure one frame later once the
  // panel has actually rendered at its real width (first pass may use the
  // fallback width estimate above). Measuring DOM layout in response to
  // `isOpen` becoming true is the one case React's docs call out as a
  // legitimate reason to set state from an effect — there's no way to know
  // the anchor's screen position without asking the DOM. We deliberately
  // don't reset coords when isOpen goes false: the panel isn't rendered
  // while closed, so the stale value is harmless and just gets overwritten
  // fresh the next time it opens.
  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const raf = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Keep it glued to the trigger if the page scrolls or resizes while open.
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && coords && (
        <motion.div
          ref={panelRef}
          id={id}
          role="menu"
          aria-label={`${category.name} subcategories`}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -4, scale: shouldReduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onLinkClick();
              triggerRef.current?.focus();
            }
          }}
          style={{ position: "fixed", top: coords.top, left: coords.left }}
          className={cn(
            "z-50 w-[min(90vw,32rem)] origin-top-left",
            "rounded-lg border border-border/60 bg-background p-6 shadow-lg"
          )}
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {category.name}
          </p>

          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
            {category.subcategories.map((sub) => (
              <li key={sub.slug}>
                <Link
                  href={`/${category.slug}/${sub.slug}`}
                  role="menuitem"
                  onClick={onLinkClick}
                  className="group/link inline-flex items-center text-sm text-foreground/80 transition-colors duration-150 hover:text-primary"
                >
                  {sub.name}
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block -translate-x-1 opacity-0 transition-all duration-150 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
