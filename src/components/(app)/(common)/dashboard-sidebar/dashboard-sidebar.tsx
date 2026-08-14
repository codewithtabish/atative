// src/components/dashboard/sidebar.tsx
"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  LayoutDashboard,
  Newspaper,
  PanelLeftClose,
  PanelLeftOpen,
  PenSquare,
  Tags,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState, useSyncExternalStore, type ComponentType } from "react";
import { ModeToggle } from "../theme/mode-toggle";

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  exact?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Users", href: "/dashboard/users", icon: Users },
  { label: "Category", href: "/dashboard/category", icon: Tags },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Blogs", href: "/dashboard/blogs", icon: Newspaper },
  { label: "Create Blog", href: "/dashboard/blogs/create", icon: PenSquare },
];

const STORAGE_KEY = "dashboard-sidebar-collapsed";

// A tiny external store around localStorage. useSyncExternalStore reads
// this directly during render (server snapshot on the first client render,
// real snapshot right after), so there's no mount effect + setState
// cascade and no hydration flash.
const collapsedListeners = new Set<() => void>();

function subscribeCollapsed(onChange: () => void) {
  collapsedListeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    collapsedListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getCollapsedSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

function getCollapsedServerSnapshot() {
  return false;
}

function setCollapsedStore(next: boolean) {
  window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  collapsedListeners.forEach((listener) => listener());
}

export function DasshboardSidebar() {
  const pathname = usePathname();
  const collapsed = useSyncExternalStore(
    subscribeCollapsed,
    getCollapsedSnapshot,
    getCollapsedServerSnapshot,
  );

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [marker, setMarker] = useState({ top: 0, height: 0, ready: false });

  const toggleCollapsed = () => setCollapsedStore(!collapsed);

  const isActive = (item: NavItem) =>
    item.exact ? pathname === item.href : pathname?.startsWith(item.href);

  // Slide the "ribbon" marker to whichever item is active
  useLayoutEffect(() => {
    const active = NAV_ITEMS.find(isActive);
    const el = active ? itemRefs.current.get(active.href) : null;
    if (el && listRef.current) {
      const listTop = listRef.current.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect();
      setMarker({
        top: elRect.top - listTop,
        height: elRect.height,
        ready: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, collapsed]);

  return (
    <aside
      className={cn(
        "group/sidebar sticky top-0 flex h-screen shrink-0 flex-col overflow-hidden border-r border-border bg-sidebar text-sidebar-foreground",
        "transition-[width] duration-300 ease-out",
        collapsed ? "w-[76px]" : "w-64",
      )}
    >
      {/* Nameplate */}
      <div className="relative flex h-20 shrink-0 items-center border-b border-sidebar-border px-5">
        <Link href="/dashboard" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-sidebar-primary/40 font-serif text-base font-semibold text-sidebar-primary">
            A
          </span>
          <span
            className={cn(
              "flex min-w-0 flex-col overflow-hidden transition-all duration-300",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
            )}
          >
            <span className="truncate font-serif text-[15px] font-semibold tracking-[0.14em] uppercase">
              Atative
            </span>
            <span className="truncate text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              Editorial Desk
            </span>
          </span>
        </Link>

        {/* Collapse toggle — sits on the rail edge like a page tab */}
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "absolute top-1/2 -right-3.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center",
            "rounded-full border border-sidebar-border bg-sidebar text-muted-foreground shadow-sm",
            "transition-colors hover:text-sidebar-primary hover:border-sidebar-primary/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-3.5 w-3.5" />
          ) : (
            <PanelLeftClose className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Section eyebrow */}
      <div
        className={cn(
          "px-5 pt-5 pb-2 text-[10px] font-medium tracking-[0.22em] text-muted-foreground uppercase transition-opacity duration-200",
          collapsed && "opacity-0",
        )}
      >
        Sections
      </div>

      {/* Nav */}
      <nav className="relative flex-1 px-3">
        <ul ref={listRef} className="relative flex flex-col gap-1">
          {/* Sliding ribbon marker */}
          <div
            aria-hidden
            className={cn(
              "absolute left-0 w-[3px] rounded-full bg-sidebar-primary transition-all duration-300 ease-out",
              marker.ready ? "opacity-100" : "opacity-0",
            )}
            style={{ top: marker.top, height: marker.height }}
          />

          {NAV_ITEMS.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <li
                key={item.href}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.href, el);
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-sm py-2.5 pl-4 pr-3 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
                      active && "text-sidebar-primary",
                      "group-hover:scale-[1.06]",
                    )}
                  />
                  <span
                    className={cn(
                      "overflow-hidden whitespace-nowrap transition-all duration-300",
                      collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Tooltip shown only when collapsed */}
                  {collapsed && (
                    <span
                      className={cn(
                        "pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap",
                        "rounded-sm border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md",
                        "scale-95 opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100",
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer rule */}
      <div
        className={cn(
          "flex items-center gap-3 border-t border-sidebar-border p-4",
          collapsed ? "flex-col" : "flex-row justify-between",
        )}
      >
        <p
          className={cn(
            "truncate text-[10px] tracking-[0.18em] text-muted-foreground uppercase transition-opacity duration-200",
            collapsed ? "hidden" : "block",
          )}
        >
          Vol. 01 — Est. 2026
        </p>
        <ModeToggle />
      </div>
    </aside>
  );
}
