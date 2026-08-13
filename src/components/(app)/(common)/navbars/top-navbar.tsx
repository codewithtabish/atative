"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants, type Transition } from "framer-motion";
import { Mail, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "../layout/container";
import AtativeHeaderLogo from "../logos/header-logo";

/* ------------------------------------------------------------------ */
/*  Logo assets — confirmed from public/images/logos/ file listing     */
/* ------------------------------------------------------------------ */
const LOGO = {
  desktopDark: "/images/logos/header_logo_desktop_light.png", // 1200×213
  desktopLight: "/images/logos/header_logo_desktop_dark.png", // 1200×213
  mobileLight: "/images/logos/header_logo_mobile_dark.png", // 800×142
  mobileDark: "/images/logos/header_logo_mobile_light.png", // 800×142
} as const;

/* ------------------------------------------------------------------ */
/*  Social brand icons                                                 */
/*                                                                      */
/*  lucide-react (checked: v1.31, current as of this writing) no        */
/*  longer ships brand/logo icons — Instagram, Facebook, YouTube, and   */
/*  Twitter/X were all removed, presumably over trademark concerns.     */
/*  If your installed version differs and still has them, feel free     */
/*  to swap these for the lucide imports instead. These are minimal     */
/*  monoline glyphs sized to match lucide's 24×24 / stroke proportions. */
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

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut", delay: 0.05 },
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
/*  Shared icon-button — used for social links, Newsletter, and Menu   */
/*  so all three read as one consistent "utility action" family.       */
/*  Sized up slightly (h-10 w-10, icon h-[18px]) for more presence.    */
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
/*  Shared vertical separator — used between the social-icon group     */
/*  and the newsletter/menu group, and again between newsletter/menu.  */
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
/*  Site header — first / top row only.                                */
/*  The category navigation row is intentionally not included here.    */
/* ------------------------------------------------------------------ */
export default function SiteTopHeader() {
  return (
    <header>
      <motion.div
        className="w-full border-b border-border/60"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* <Container> */}
        <div className="flex h-16 items-center justify-between gap-4 md:h-20 lg:h-24">
          {/* ---------------------------------------------------- */}
          {/* Logo                                                  */}
          {/* ---------------------------------------------------- */}
          <AtativeHeaderLogo />

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

            {/* Separator — between social icons and newsletter/menu group, desktop only */}
            <ActionSeparator desktopOnly />

            {/* Newsletter — always visible */}
            <HeaderActionButton as="button" label="Newsletter" icon={Mail} />

            {/* Separator — between newsletter and menu, always visible */}
            <ActionSeparator />

            {/* Menu trigger — always visible. Drawer/sheet wiring is
                  intentionally left out; hook onClick up when that
                  component exists. */}
            <HeaderActionButton as="button" label="Open menu" icon={Menu} />
          </motion.div>
        </div>
        {/* </Container> */}
      </motion.div>
    </header>
  );
}
