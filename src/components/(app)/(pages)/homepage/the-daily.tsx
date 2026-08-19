"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "../../(common)/logos/social-icons";

const socialLinks = [
  {
    name: "Website",
    href: "https://codewithtabish.com/",
    type: "website",
  },
  {
    name: "GitHub",
    href: "https://github.com/",
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: LinkedinIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: InstagramIcon,
  },
  {
    name: "X",
    href: "https://x.com/",
    icon: XIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: FacebookIcon,
  },
];

export default function TheDaily() {
  const [socialOpen, setSocialOpen] = useState(false);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (socialRef.current && !socialRef.current.contains(event.target as Node)) {
        setSocialOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSocialOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <section className="border-y border-border py-14 sm:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="flex w-full flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-14 lg:gap-20">
          {/* Left — Editor */}
          <div className="flex shrink-0 flex-col items-center text-center md:items-start md:text-left">
            {/* Transparent portrait */}
            <div className="relative h-48 w-48 sm:h-52 sm:w-42">
              <Image
                src="/images/real/tabishtwo.png"
                alt="Talha Tabish"
                fill
                priority
                className="object-center"
                sizes="(max-width: 640px) 192px, 208px"
              />
            </div>

            <div className="mt-4">
              {/* Name + Social */}
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <h3 className="relative inline-block text-xl font-semibold tracking-tight">
                  <span className="relative z-10">Talha Tabish</span>

                  <span className="absolute bottom-1 left-0 z-0 h-2.5 w-full bg-primary/40" />
                </h3>

                {/* Social button */}
                <div className="relative" ref={socialRef}>
                  <button
                    type="button"
                    aria-label="Open Talha Tabish social links"
                    aria-expanded={socialOpen}
                    onClick={() => setSocialOpen((open) => !open)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <span className="text-sm font-semibold leading-none">@</span>
                  </button>

                  {/* Social popover */}
                  {socialOpen && (
                    <div
                      role="menu"
                      className="absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-xl border border-border bg-background p-3 text-left shadow-xl shadow-black/10 md:left-0 md:translate-x-0"
                    >
                      <div className="mb-2 px-2">
                        <p className="text-sm font-semibold text-foreground">Talha Tabish</p>

                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          Software Engineer &amp; Full-Stack Developer
                        </p>
                      </div>

                      <div className="space-y-0.5">
                        {socialLinks.map((social) => {
                          const Icon = social.icon;

                          return (
                            <Link
                              key={social.name}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              role="menuitem"
                              onClick={() => setSocialOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                            >
                              {social.type === "website" ? (
                                <span className="flex h-5 w-5 items-center justify-center text-xs font-bold">
                                  ↗
                                </span>
                              ) : Icon ? (
                                <Icon className="h-4.5 w-4.5" />
                              ) : null}

                              <span>{social.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Role */}
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Editor in Chief
              </p>

              {/* Short bio */}
              <p className="mt-3 max-w-[290px] text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
                Software engineer and full-stack developer building modern digital experiences,
                products, and ideas.
              </p>

              {/* Personal website */}
              <Link
                href="https://codewithtabish.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
              >
                <span>codewithtabish.com</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* Right — The Daily */}
          <div className="w-full max-w-md flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Daily</h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ready to do everything better? Get daily tips, tricks, and tech guides from our expert
              team.
            </p>

            <form className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Email address"
                required
                aria-label="Email address"
                className="h-12 w-full rounded-lg border border-border bg-transparent px-4 text-sm text-foreground outline-none ring-ring placeholder:text-muted-foreground focus:ring-2 sm:flex-1"
              />

              <button
                type="submit"
                className="h-12 shrink-0 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              By clicking Sign Up, you confirm you are 16+ and agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
