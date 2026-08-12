"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// next-themes renders an inline <script> to set the theme class before
// hydration, which prevents a flash of the wrong theme on load. React 19
// now warns whenever a <script> tag is rendered inside a component tree —
// but the script still runs correctly during SSR, so this is a known
// false positive (see https://github.com/pacocoursey/next-themes/issues/385
// and https://github.com/shadcn-ui/ui/issues/10104). next-themes hasn't
// been updated in over a year, so this is filtered here rather than fixed
// upstream. Dev-only — production builds don't log this anyway.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
      return
    }
    originalError.apply(console, args)
  }
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
