"use client";

import { Minus, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { CategoryListItem } from "@/app/actions/(category)/get-all-categories-action";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Social Icons                                                       */
/* ------------------------------------------------------------------ */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.1H9.4v2.8h2.4V21" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <path d="M10.7 9.6v4.8l4.3-2.4-4.3-2.4Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.53 2.5h3.2l-7 8 8.24 11h-6.45l-5.05-6.63L4.6 21.5H1.4l7.49-8.56L1 2.5h6.61l4.56 6.06 5.36-6.06Zm-1.12 17.02h1.77L7.66 4.38H5.76l10.65 15.14Z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/atative", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com/atative", icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com/@atative", icon: YoutubeIcon },
  { label: "X", href: "https://x.com/atative", icon: XIcon },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
type MobileMenuProps = {
  categories: CategoryListItem[];
  trigger: React.ReactNode;
};

export default function MobileMenu({ categories, trigger }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState("");

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return categories;

    const q = query.toLowerCase().trim();

    return categories
      .map((cat) => {
        const nameMatch = cat.name.toLowerCase().includes(q);
        const matchedSubs = cat.subcategories?.filter((sub) => sub.name.toLowerCase().includes(q));

        if (nameMatch || (matchedSubs && matchedSubs.length > 0)) {
          return {
            ...cat,
            subcategories: nameMatch ? cat.subcategories : matchedSubs,
          };
        }
        return null;
      })
      .filter(Boolean) as CategoryListItem[];
  }, [categories, query]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent
        side="right"
        className={cn(
          "flex w-full max-w-sm flex-col border-l border-border bg-background p-0",
          // Hide the default shadcn close button
          "[&>button]:hidden",
        )}
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
          <SheetTitle className="text-base font-semibold tracking-wide">Menu</SheetTitle>

          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1.5 text-foreground transition-colors hover:bg-accent"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </SheetHeader>

        {/* Search */}
        <div className="border-b border-border px-5 py-4">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Atative"
              className="w-full border-b border-border bg-transparent py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <Search className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          <nav className="space-y-0.5">
            {filteredCategories.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No results found</p>
            ) : (
              filteredCategories.map((category) => {
                const activeSubs = category.subcategories?.filter((s) => s.isActive) ?? [];
                const hasSubs = activeSubs.length > 0;
                const isOpen = expanded[category.id] || !!query;

                return (
                  <div key={category.id}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/category/${category.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex-1 py-3 text-[13px] font-medium uppercase tracking-[0.08em] text-foreground transition-colors hover:text-primary"
                      >
                        {category.name}
                      </Link>

                      {hasSubs && (
                        <button
                          onClick={() => toggleExpand(category.id)}
                          className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          aria-label={isOpen ? "Collapse" : "Expand"}
                        >
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </button>
                      )}
                    </div>

                    {hasSubs && isOpen && (
                      <div className="mb-2 ml-3 space-y-0.5 border-l border-border pl-4">
                        {activeSubs.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/category/${category.slug}/${sub.slug}`}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </nav>
        </div>

        {/* Social icons */}
        <div className="border-t border-border px-5 py-5">
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md border border-border",
                    "text-foreground transition-colors hover:bg-accent hover:text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
