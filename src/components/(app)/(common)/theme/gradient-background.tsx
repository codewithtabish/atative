"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  static?: boolean;
}

export function GradientBackground({
  static: isStatic = false,
  className,
  ...props
}: GradientBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background",
        className
      )}
      {...props}
    >
      {/* two small, separated glows — radial falloff does the softening,
          not a big blur, so they stay distinct instead of merging into fog */}
      <div className="absolute inset-0 mix-blend-screen">
        <div
          className={cn(
            "absolute top-[-6%] left-[2%] h-[32vw] w-[32vw] rounded-full",
            "bg-[radial-gradient(circle,var(--primary)_0%,transparent_72%)] opacity-[0.16]",
            !isStatic && "motion-safe:animate-[drift-a_30s_ease-in-out_infinite]"
          )}
        />
        <div
          className={cn(
            "absolute top-[4%] right-[-4%] h-[26vw] w-[26vw] rounded-full",
            "bg-[radial-gradient(circle,var(--accent)_0%,transparent_72%)] opacity-[0.14]",
            !isStatic && "motion-safe:animate-[drift-b_36s_ease-in-out_infinite]"
          )}
        />
      </div>

      {/* everything below the header stays calm and near-black on purpose */}

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}