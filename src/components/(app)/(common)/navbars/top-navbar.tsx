"use client";

import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { Mail, Menu } from "lucide-react";
import { useSyncExternalStore, type ComponentType } from "react";

import { cn } from "@/lib/utils";
import AtativeHeaderLogo from "../logos/header-logo";

/* ------------------------------------------------------------------ */
/*  Brand accent — pulled from the logo mark's default color so the    */
/*  ticker dots, hover states, and the mark itself read as one system. */
/* ------------------------------------------------------------------ */
const ACCENT = "#829A88";

/* ------------------------------------------------------------------ */
/*  Sections — the real category set for the publication. This drives  */
/*  the masthead ticker below, so it stays true if categories change.  */
/* ------------------------------------------------------------------ */
const SECTIONS = ["Ideas", "Trends", "Reviews", "Guides", "Insights", "Culture", "Technology"];

/* ------------------------------------------------------------------ */
/*  Social brand icons                                                 */
/*                                                                      */
/*  lucide-react no longer ships brand/logo glyphs (Instagram,          */
/*  Facebook, YouTube, X were removed over trademark concerns), so      */
/*  these are minimal monoline glyphs sized to match lucide's 24×24 /   */
/*  stroke proportions.                                                 */
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

/* ------------------------------------------------------------------ */
/*  Social links — data array, mapped below (no duplicated markup)     */
/*  ⚠️ Replace hrefs with your real ATATIVE social URLs.                */
/* ------------------------------------------------------------------ */
type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com/atative", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com/atative", icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com/@atative", icon: YoutubeIcon },
  { label: "X", href: "https://x.com/atative", icon: XIcon },
];

/* ------------------------------------------------------------------ */
/*  Framer Motion variants                                             */
/* ------------------------------------------------------------------ */
const headerVariants: Variants = {
  hidden: { y: -24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const actionsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const actionItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Masthead strip — a real newspaper convention, used for real        */
/*  reasons: the date grounds the page as a living publication, and    */
/*  the ticker surfaces the actual section set before anyone opens     */
/*  the menu. Both are true facts about the site, not decoration.      */
/* ------------------------------------------------------------------ */
function formatMastheadDate() {
  return new Date()
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .toUpperCase();
}

// No external source ever pushes an update, so the subscribe function is a
// no-op — this is just useSyncExternalStore's supported way of saying
// "this value only exists on the client," without the effect+setState
// pattern that causes an extra render pass on mount.
function subscribeToNothing() {
  return () => {};
}

function getServerDateSnapshot() {
  return null;
}

function MastheadDate() {
  // Server snapshot is null (avoids a timezone-driven hydration mismatch,
  // since the server may format in a different zone than the browser);
  // the client snapshot resolves on first client render, no effect needed.
  const formatted = useSyncExternalStore(
    subscribeToNothing,
    formatMastheadDate,
    getServerDateSnapshot,
  );

  // Reserves the space with a non-breaking space until the client value
  // is available, so the strip doesn't jump on hydration.
  return <span className="tabular-nums">{formatted ?? "\u00A0"}</span>;
}

function SectionTicker() {
  const shouldReduceMotion = useReducedMotion();
  const track = [...SECTIONS, ...SECTIONS];

  const tickerTransition: Transition = {
    duration: 26,
    repeat: Infinity,
    ease: "linear",
  };

  return (
    <div
      aria-hidden="true"
      className="group relative hidden h-full flex-1 items-center overflow-hidden md:flex"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={tickerTransition}
        style={{ willChange: "transform" }}
        whileHover={shouldReduceMotion ? undefined : { transition: { duration: 0 } }}
      >
        {track.map((section, i) => (
          <span key={`${section}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em]">{section}</span>
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared icon-button — used for social links and the menu trigger,   */
/*  so both read as one consistent "utility action" family.            */
/* ------------------------------------------------------------------ */
type HeaderActionButtonProps = {
  label: string;
  icon: ComponentType<{ className?: string }>;
} & (
  { as: "a"; href: string; onClick?: never } | { as?: "button"; href?: never; onClick?: () => void }
);

function HeaderActionButton(props: HeaderActionButtonProps) {
  const { label, icon: Icon } = props;

  const className = cn(
    "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-none",
    "border-b border-border/70 text-foreground/70",
    "transition-colors duration-200",
    "hover:border-border hover:bg-accent/40 hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );

  const hoverTransition: Transition = { duration: 0.2, ease: "easeOut" };

  const motionProps = {
    variants: actionItemVariants,
    whileHover: { scale: 1.08, transition: hoverTransition },
    whileTap: { scale: 0.92 },
  };

  if (props.as === "a") {
    return (
      <motion.a
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={className}
        {...motionProps}
      >
        <Icon className="h-[22px] w-[22px]" />
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={props.onClick}
      className={className}
      {...motionProps}
    >
      <Icon className="h-[22px] w-[22px]" />
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Subscribe — the one action a publication header should make        */
/*  impossible to miss, so it gets its own pill rather than sharing    */
/*  the quiet icon-button treatment used for secondary utilities.       */
/* ------------------------------------------------------------------ */
function SubscribeButton() {
  return (
    <>
      <motion.a
        href="#subscribe"
        variants={actionItemVariants}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "hidden items-center gap-2 rounded-full border border-foreground px-4 py-2",
          "text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground",
          "transition-colors duration-200 hover:bg-foreground hover:text-background",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "sm:inline-flex",
        )}
      >
        <Mail className="h-3.5 w-3.5" />
        Subscribe
      </motion.a>

      {/* Compact icon-only version for the narrowest screens. */}
      <HeaderActionButton as="button" label="Subscribe" icon={Mail} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared vertical separator                                          */
/* ------------------------------------------------------------------ */
function ActionSeparator({ desktopOnly = false }: { desktopOnly?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      variants={actionItemVariants}
      className={cn("h-6 w-px bg-border", desktopOnly ? "hidden lg:block" : "block")}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Site header — masthead strip + primary row.                        */
/*  The category navigation row is intentionally not included here.    */
/* ------------------------------------------------------------------ */
export default function SiteTopHeader() {
  return (
    <header>
      {/* Masthead strip — date + live section ticker. Flips with theme:
          bg-foreground/text-background means it's dark-on-light in light
          mode and light-on-dark in dark mode, so it never needs a
          hardcoded color of its own. */}
      <div className="hidden h-9 items-center gap-6 bg-foreground px-4 text-background sm:flex sm:px-6 lg:px-8">
        <MastheadDate />
        <SectionTicker />
        <a
          href="#subscribe"
          className="shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] underline-offset-4 hover:underline"
        >
          Subscribe
        </a>
      </div>

      <motion.div
        className="w-full border-b border-border/60"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 md:h-20 lg:h-24 lg:px-8">
          {/* ---------------------------------------------------- */}
          {/* Logo                                                  */}
          {/* ---------------------------------------------------- */}
          <div className="w-40 sm:w-48 md:w-56">
            <AtativeHeaderLogo />
          </div>

          {/* ---------------------------------------------------- */}
          {/* Actions                                               */}
          {/* ---------------------------------------------------- */}
          <motion.div
            className="flex items-center gap-3"
            variants={actionsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Social links — desktop only */}
            <div className="hidden items-center gap-3 lg:flex">
              {SOCIAL_LINKS.map((social) => (
                <HeaderActionButton
                  key={social.label}
                  as="a"
                  href={social.href}
                  label={social.label}
                  icon={social.icon}
                />
              ))}
            </div>

            {/* Separator — between social icons and subscribe/menu group */}
            <ActionSeparator desktopOnly />

            {/* Subscribe — always visible, in one of two forms */}
            <SubscribeButton />

            {/* Separator — between subscribe and menu, always visible */}
            <ActionSeparator />

            {/* Menu trigger — always visible. Drawer/sheet wiring is
                  intentionally left out; hook onClick up when that
                  component exists. */}
            <HeaderActionButton as="button" label="Open menu" icon={Menu} />
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
