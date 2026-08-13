"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import { Mail, Menu } from "lucide-react";
import { useSyncExternalStore, type ComponentType } from "react";

import { cn } from "@/lib/utils";
import AtativeHeaderLogo from "../logos/header-logo";

/* ------------------------------------------------------------------ */
/*  Brand accent — matches --primary (sage) from your theme            */
/* ------------------------------------------------------------------ */
const ACCENT = "#829A88";

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */
const SECTIONS = ["Ideas", "Trends", "Reviews", "Guides", "Insights", "Culture", "Technology"];

/* ------------------------------------------------------------------ */
/*  Social brand icons                                                 */
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
/*  Social links                                                       */
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
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const actionsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.12 },
  },
};

const actionItemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  Masthead                                                           */
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

function subscribeToNothing() {
  return () => {};
}

function getServerDateSnapshot() {
  return null;
}

function MastheadDate() {
  const formatted = useSyncExternalStore(
    subscribeToNothing,
    formatMastheadDate,
    getServerDateSnapshot,
  );

  return <span className="tabular-nums tracking-[0.04em]">{formatted ?? "\u00A0"}</span>;
}

function SectionTicker() {
  const shouldReduceMotion = useReducedMotion();
  const track = [...SECTIONS, ...SECTIONS];

  const tickerTransition: Transition = {
    duration: 28,
    repeat: Infinity,
    ease: "linear",
  };

  return (
    <div
      aria-hidden="true"
      className="group relative hidden h-full flex-1 items-center overflow-hidden md:flex"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <motion.div
        className="flex shrink-0 items-center gap-7 pr-7"
        animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={tickerTransition}
        style={{ willChange: "transform" }}
        whileHover={shouldReduceMotion ? undefined : { transition: { duration: 0 } }}
      >
        {track.map((section, i) => (
          <span key={`${section}-${i}`} className="flex items-center gap-7 whitespace-nowrap">
            <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] opacity-90">
              {section}
            </span>
            <span
              aria-hidden="true"
              className="h-[3px] w-[3px] rounded-full opacity-80"
              style={{ backgroundColor: ACCENT }}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared icon-button                                                 */
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
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-none",
    "text-foreground/65 transition-colors duration-200",
    "hover:bg-accent/50 hover:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );

  const hoverTransition: Transition = { duration: 0.18, ease: "easeOut" };

  const motionProps = {
    variants: actionItemVariants,
    whileHover: { scale: 1.06, transition: hoverTransition },
    whileTap: { scale: 0.94 },
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
        <Icon className="h-[20px] w-[20px]" />
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
      <Icon className="h-[20px] w-[20px]" />
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared pill button styles (Subscribe + Sign in)                    */
/*  Hover → primary in both light & dark mode                          */
/* ------------------------------------------------------------------ */
const pillButtonClass = cn(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full",
  "border border-foreground/80 bg-transparent",
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground whitespace-nowrap",
  "transition-all duration-200",
  "hover:border-primary hover:bg-primary hover:text-primary-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

/* ------------------------------------------------------------------ */
/*  Subscribe — hidden on small screens                                */
/* ------------------------------------------------------------------ */
function SubscribeButton() {
  return (
    <motion.a
      href="#subscribe"
      variants={actionItemVariants}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(pillButtonClass, "hidden px-4 py-2 sm:inline-flex")}
    >
      <Mail className="h-3.5 w-3.5 opacity-80" />
      Subscribe
    </motion.a>
  );
}

/* ------------------------------------------------------------------ */
/*  Auth — Sign in + UserButton                                        */
/* ------------------------------------------------------------------ */
function AuthActions() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <motion.button
            type="button"
            variants={actionItemVariants}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={cn(pillButtonClass, "px-3.5 py-2 sm:px-4")}
          >
            Sign in
          </motion.button>
        </SignInButton>
      </Show>

      <Show when="signed-in">
        <motion.div variants={actionItemVariants} className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "h-9 w-9 ring-1 ring-border hover:ring-primary/40 transition-shadow duration-200",
                userButtonPopoverCard:
                  "shadow-lg border border-border bg-popover text-popover-foreground",
                userButtonPopoverActionButton: "hover:bg-accent",
                userButtonPopoverActionButtonText: "text-foreground",
                userButtonPopoverFooter: "hidden",
              },
            }}
          />
        </motion.div>
      </Show>
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
      className={cn("h-5 w-px bg-border/80", desktopOnly ? "hidden lg:block" : "hidden sm:block")}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Site header                                                        */
/* ------------------------------------------------------------------ */
export default function SiteTopHeader() {
  return (
    <header className="relative z-40">
      {/* Masthead strip — inverted so it always contrasts with the page */}
      <div className="hidden h-9 items-center gap-6 bg-foreground px-4 text-background sm:flex sm:px-6 lg:px-8">
        <MastheadDate />
        <SectionTicker />
        <a
          href="#subscribe"
          className="shrink-0 text-[10.5px] font-medium uppercase tracking-[0.16em] opacity-90 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
        >
          Subscribe
        </a>
      </div>

      {/* Primary header row */}
      <motion.div
        className="w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 md:h-[4.5rem] lg:h-20 lg:px-8">
          {/* Logo */}
          <div className="min-w-0 w-36 sm:w-48 md:w-52 lg:w-56">
            <AtativeHeaderLogo />
          </div>

          {/* Actions */}
          <motion.div
            className="flex shrink-0 items-center gap-1.5 sm:gap-2.5"
            variants={actionsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Socials — large screens only */}
            <div className="hidden items-center gap-0.5 lg:flex">
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

            <ActionSeparator desktopOnly />

            {/* Subscribe — hidden on mobile */}
            <SubscribeButton />

            <ActionSeparator />

            {/* Auth */}
            <AuthActions />

            <ActionSeparator />

            {/* Menu */}
            <HeaderActionButton as="button" label="Open menu" icon={Menu} />
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
