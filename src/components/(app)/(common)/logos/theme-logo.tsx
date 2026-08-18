// src/components/(app)/(common)/logos/theme-logo.tsx
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

type ThemeLogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function ThemeLogo({
  className,
  width = 400,
  height = 100,
  priority = false,
}: ThemeLogoProps) {
  return (
    <>
      <Image
        src="/images/logos/dark.webp"
        alt="Alentah Technology"
        width={width}
        height={height}
        priority={priority}
        className={cn("h-full w-auto object-contain object-left dark:hidden", className)}
      />
      <Image
        src="/images/logos/light.webp"
        alt="Alentah Technology"
        width={width}
        height={height}
        priority={priority}
        className={cn("hidden h-full w-auto object-contain object-left dark:block", className)}
      />
    </>
  );
}
