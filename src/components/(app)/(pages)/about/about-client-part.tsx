"use client";

import { ChevronDown, ChevronUp, Link2, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { EditorListItem } from "@/app/actions/(editor)/get-all-editors";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "../../(common)/logos/social-icons";

/* ------------------------------------------------------------------ */
/*  Expandable Text                                                   */
/* ------------------------------------------------------------------ */

export function ExpandableText({ text, label }: { text: string | null; label?: string }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const shouldClamp = text.length > 120;

  return (
    <div>
      {label && (
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      )}
      <p
        className={`text-sm leading-relaxed text-muted-foreground ${expanded ? "" : "line-clamp-3"}`}
      >
        {text}
      </p>
      {shouldClamp && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-1.5 inline-flex items-center gap-1 rounded text-xs font-semibold text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          {expanded ? "Show less" : "Show more"}
          {expanded ? (
            <ChevronUp className="h-3 w-3" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-3 w-3" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Editor Social Popover                                             */
/* ------------------------------------------------------------------ */

interface SocialLink {
  key: string;
  url: string;
  label: string;
  Icon: React.ElementType;
}

export function EditorSocialPopover({ editor }: { editor: EditorListItem }) {
  const socials = [
    { key: "linkedin", url: editor.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
    { key: "twitter", url: editor.twitter, label: "X", Icon: XIcon },
    { key: "github", url: editor.github, label: "GitHub", Icon: GithubIcon },
    { key: "instagram", url: editor.instagram, label: "Instagram", Icon: InstagramIcon },
    { key: "facebook", url: editor.facebook, label: "Facebook", Icon: FacebookIcon },
    { key: "website", url: editor.website, label: "Website", Icon: Link2 },
  ].filter((s) => Boolean(s.url)) as SocialLink[];

  if (socials.length === 0) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={`View social profiles for ${editor.name}`}
        >
          <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
          Connect
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="start">
        <div className="px-2 pt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Connect
        </div>
        <div className="mt-1 flex flex-col">
          {socials.map((social) => (
            <a
              key={social.key}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <social.Icon className="h-4 w-4 text-muted-foreground" />
              <span>{social.label}</span>
            </a>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ------------------------------------------------------------------ */
/*  Editor Initials Fallback                                          */
/* ------------------------------------------------------------------ */

export function EditorInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <span className="text-2xl font-bold text-muted-foreground">{initials}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Editor Image                                                      */
/* ------------------------------------------------------------------ */

export function EditorImage({ editor }: { editor: EditorListItem }) {
  return (
    <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm sm:h-32 sm:w-32">
      {editor.imageUrl ? (
        <Image
          src={editor.imageUrl}
          alt={`Portrait of ${editor.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 112px, 128px"
        />
      ) : (
        <EditorInitials name={editor.name} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Editor Location                                                   */
/* ------------------------------------------------------------------ */

export function EditorLocation({ location }: { location: string | null }) {
  if (!location) return null;

  return (
    <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
      {location}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Editor Categories                                                 */
/* ------------------------------------------------------------------ */

export function EditorCategories({ categories }: { categories: EditorListItem["categories"] }) {
  if (categories.length === 0) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {categories.map((cat) => (
        <span
          key={cat.id}
          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-primary"
        >
          {cat.name}
        </span>
      ))}
    </div>
  );
}
