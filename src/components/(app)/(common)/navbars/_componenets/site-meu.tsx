"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from "./socials-links";

type SiteMenuProps = {
  children: ReactNode;
};

export function SiteMenu({ children }: SiteMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn(
            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-none",
            "text-foreground/65 transition-colors duration-200",
            "hover:bg-accent/50 hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <Menu className="h-[20px] w-[20px]" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-border bg-background p-0 text-foreground sm:max-w-sm [&>button]:hidden"
      >
        <SheetTitle className="sr-only">Site menu</SheetTitle>

        <div className="flex items-center justify-between px-5 pt-5">
          <SheetClose asChild>
            <button
              type="button"
              aria-label="Close menu"
              className="text-foreground transition-colors hover:text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        <form
          action="/search"
          method="GET"
          className="mx-5 mt-4 flex items-center gap-2 border-b border-border pb-3"
        >
          <input
            type="text"
            name="q"
            placeholder="Search Atative"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="text-foreground hover:text-muted-foreground"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        <div className="flex-1 overflow-y-auto px-5">{children}</div>

        <div className="flex items-center gap-2 border-t border-border/60 p-5">
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              onClick={() => setOpen(false)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border",
                "text-foreground/70 transition-colors hover:border-primary hover:text-primary",
              )}
            >
              <social.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
