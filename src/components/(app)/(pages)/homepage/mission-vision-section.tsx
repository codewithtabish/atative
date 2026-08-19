import { Compass, Target } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Brand pillars — edit the copy anytime.
 */
const PILLARS = [
  {
    icon: Compass,
    title: "Our Vision",
    copy: "A world where AI and emerging technology are understood, not just consumed. We want Alentah to be the place readers turn to before they adopt a new tool, not after they've already been burned by one.",
  },
  {
    icon: Target,
    title: "Our Mission",
    copy: "We test, question, and explain the software, AI tools, and hardware shaping how people work and create — cutting through hype with hands-on reporting, plain-language guides, and honest reviews.",
  },
];

export function MissionVisionSection() {
  return (
    <section
      aria-labelledby="mission-vision-heading"
      className="relative overflow-hidden rounded-2xl border border-border"
    >
      {/* Soft primary wash (light, never dark) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-primary/12 via-primary/5 to-transparent"
      />

      {/* Top accent bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/40"
      />

      {/* Decorative soft blobs */}
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary/8 blur-3xl"
      />

      <div className="relative px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="mission-vision-heading"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          >
            What Alentah Stands For
          </h2>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            Two ideas guide every story we publish.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2 sm:gap-6">
          {PILLARS.map(({ icon: Icon, title, copy }) => (
            <Card
              key={title}
              className={cn(
                "border-border/80 bg-background/80 shadow-sm backdrop-blur-sm",
                "transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/30",
              )}
            >
              <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
