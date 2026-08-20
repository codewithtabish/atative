import Link from "next/link";

import {
  ArrowUpRight,
  BookOpen,
  Bot,
  BrainCircuit,
  Code2,
  Cpu,
  Feather,
  Globe,
  Layers,
  Lightbulb,
  MessageSquareQuote,
  Newspaper,
  Palette,
  Radio,
  Search,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import { getAllEditorsAction } from "@/app/actions/(editor)/get-all-editors";
import { Container } from "@/components/(app)/(common)/layout/container";
import {
  EditorCategories,
  EditorImage,
  EditorLocation,
  EditorSocialPopover,
  ExpandableText,
} from "./about-client-part";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const COVERAGE_AREAS = [
  {
    icon: <BrainCircuit className="h-5 w-5" aria-hidden="true" />,
    title: "Artificial Intelligence",
    description:
      "Models, research, agents, and the ideas shaping the next generation of computing.",
  },
  {
    icon: <Sparkles className="h-5 w-5" aria-hidden="true" />,
    title: "AI Tools",
    description:
      "Practical products and services that help people create, automate, and solve problems.",
  },
  {
    icon: <Bot className="h-5 w-5" aria-hidden="true" />,
    title: "Robotics",
    description:
      "Autonomous systems, embodied AI, hardware, and intelligence in the physical world.",
  },
  {
    icon: <Code2 className="h-5 w-5" aria-hidden="true" />,
    title: "Software",
    description:
      "Apps, platforms, developer tools, and operating systems changing how people work.",
  },
  {
    icon: <Cpu className="h-5 w-5" aria-hidden="true" />,
    title: "Technology",
    description: "Hardware, infrastructure, networks, and the systems powering modern life.",
  },
  {
    icon: <Workflow className="h-5 w-5" aria-hidden="true" />,
    title: "Productivity",
    description: "Tools, workflows, systems, and ideas for working more effectively.",
  },
  {
    icon: <Palette className="h-5 w-5" aria-hidden="true" />,
    title: "Creativity",
    description: "Technology for writing, design, media, music, and visual creation.",
  },
  {
    icon: <Lightbulb className="h-5 w-5" aria-hidden="true" />,
    title: "Emerging Technologies",
    description: "Early-stage ideas and technologies that may shape what comes next.",
  },
  {
    icon: <Globe className="h-5 w-5" aria-hidden="true" />,
    title: "Digital Culture",
    description: "How technology intersects with society, communication, and everyday life.",
  },
];

const CONTENT_FORMATS = [
  { icon: <Radio className="h-4 w-4" aria-hidden="true" />, title: "News" },
  { icon: <Newspaper className="h-4 w-4" aria-hidden="true" />, title: "Articles" },
  { icon: <BookOpen className="h-4 w-4" aria-hidden="true" />, title: "Guides" },
  { icon: <Search className="h-4 w-4" aria-hidden="true" />, title: "Reviews" },
  { icon: <Layers className="h-4 w-4" aria-hidden="true" />, title: "Analysis" },
  { icon: <Feather className="h-4 w-4" aria-hidden="true" />, title: "Opinions" },
  { icon: <MessageSquareQuote className="h-4 w-4" aria-hidden="true" />, title: "Interviews" },
];

const EDITORIAL_VALUES = [
  {
    title: "Clarity",
    description: "We make complicated subjects easier to understand without unnecessary jargon.",
  },
  {
    title: "Context",
    description: "We look beyond headlines to explain why developments matter.",
  },
  {
    title: "Curiosity",
    description: "We explore new ideas with an open and thoughtful mindset.",
  },
  {
    title: "Practicality",
    description: "We focus on technology that can be useful in the real world.",
  },
  {
    title: "Responsibility",
    description: "We aim to communicate technology carefully without unnecessary hype.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helper components                                                 */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 block text-sm font-medium uppercase tracking-widest text-primary">
      {children}
    </span>
  );
}

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
      {children}
    </h2>
  );
}

function BodyText({
  children,
  className = "",
  large = false,
}: {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
}) {
  return (
    <p
      className={`${large ? "text-lg leading-8" : "text-base leading-7"} text-muted-foreground ${className}`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Visual                                                       */
/* ------------------------------------------------------------------ */

function HeroVisual() {
  return (
    <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none select-none">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Floating card 1 */}
      <div className="absolute top-8 left-8 w-44 rounded-xl border border-border bg-card p-4 shadow-sm -rotate-6">
        <div className="mb-2 h-1.5 w-10 rounded-full bg-primary/30" />
        <div className="mb-1.5 h-1.5 w-full rounded-full bg-muted" />
        <div className="mb-1.5 h-1.5 w-5/6 rounded-full bg-muted" />
        <div className="h-1.5 w-4/6 rounded-full bg-muted" />
      </div>
      {/* Floating card 2 */}
      <div className="absolute top-28 right-4 w-40 rounded-xl border border-border bg-card p-3 shadow-sm rotate-[5deg]">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AI</span>
        <div className="mt-1.5 h-1 w-full rounded-full bg-muted" />
        <div className="mt-1 h-1 w-3/4 rounded-full bg-muted" />
      </div>
      {/* Floating card 3 */}
      <div className="absolute bottom-20 left-16 w-36 rounded-xl border border-border bg-card p-3 shadow-sm rotate-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
          Robotics
        </span>
        <div className="mt-1.5 h-1 w-full rounded-full bg-muted" />
        <div className="mt-1 h-1 w-2/3 rounded-full bg-muted" />
      </div>
      {/* Connection line */}
      <div className="absolute top-20 left-32 h-24 w-px bg-linear-to-b from-primary/20 to-transparent rotate-25" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */

export async function AboutPage() {
  const result = await getAllEditorsAction();
  const activeEditors = result.success ? result.editors.filter((e) => e.isActive) : [];

  return (
    <Container>
      <div className="pb-24 pt-16 md:pb-32 md:pt-24">
        {/* ========================================================= */}
        Hero
        {/* ========================================================= */}
        <section className="relative mb-24 md:mb-32" aria-labelledby="about-hero-heading">
          <HeroVisual />

          <div className="relative z-10 max-w-3xl">
            <Eyebrow>About Alentah</Eyebrow>
            <h1
              id="about-hero-heading"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Technology is moving fast. We help you understand where it is going.
            </h1>
            <BodyText large className="mt-8 max-w-2xl">
              Alentah is a modern digital publication exploring the technologies, ideas, tools, and
              people shaping what comes next. We exist to make complicated technology
              understandable, useful, and interesting.
            </BodyText>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-primary"
              >
                Explore stories
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#editorial-team"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline focus-visible:outline-primary"
              >
                Meet the editors
              </a>
            </div>
          </div>
        </section>
        {/* ========================================================= */}
        What is Alentah
        {/* ========================================================= */}
        <section className="mb-24 md:mb-32" aria-labelledby="what-is-heading">
          <div className="max-w-3xl">
            <Eyebrow>What is Alentah?</Eyebrow>
            <SectionTitle id="what-is-heading">
              A publication for understanding what comes next.
            </SectionTitle>
            <div className="mt-8 space-y-6">
              <BodyText large>
                Alentah explores the technologies and ideas changing how people work, create, learn,
                communicate, and live. We cover artificial intelligence, robotics, software,
                emerging technologies, and the culture forming around them.
              </BodyText>
              <BodyText>
                We believe the most interesting technology stories are not just about products and
                announcements. They are about what these developments mean for real people, real
                work, and real creativity. Our goal is to explain the complex clearly, cover the
                meaningful thoughtfully, and help readers navigate a rapidly changing landscape.
              </BodyText>
            </div>
          </div>
        </section>
        {/* ========================================================= */}
        Vision + Mission
        {/* ========================================================= */}
        <section className="mb-24 md:mb-32" aria-labelledby="vision-heading">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
              <Eyebrow>Our Vision</Eyebrow>
              <h3
                id="vision-heading"
                className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              >
                To become a trusted destination for understanding the technologies and ideas shaping
                the future.
              </h3>
              <BodyText className="mt-4">
                We want to help readers better understand emerging technology, navigate rapid
                change, and connect technical developments with real-world impact.
              </BodyText>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
              <Eyebrow>Our Mission</Eyebrow>
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                To explain, explore, and thoughtfully cover the technologies, tools, and ideas
                changing how people work, create, learn, and live.
              </h3>
              <BodyText className="mt-4">
                We aim to give readers context rather than simply headlines, making technology more
                understandable and useful in the process.
              </BodyText>
            </div>
          </div>
        </section>
        {/* ========================================================= */}
        Coverage
        {/* ======================================================== */}
        <section className="mb-24 md:mb-32" aria-labelledby="coverage-heading">
          <Eyebrow>Our coverage</Eyebrow>
          <SectionTitle id="coverage-heading">What we explore</SectionTitle>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COVERAGE_AREAS.map((area) => (
              <div
                key={area.title}
                className="group rounded-xl border border-border bg-card p-5 text-card-foreground transition-colors hover:bg-muted/50"
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 text-primary">
                  {area.icon}
                </div>
                <h3 className="text-base font-semibold text-foreground">{area.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>
              </div>
            ))}
          </div>

          {/* Formats */}
          <div className="mt-12 rounded-xl border border-border bg-muted/50 p-6 md:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              How we publish
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {CONTENT_FORMATS.map((format) => (
                <span
                  key={format.title}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-foreground"
                >
                  {format.icon}
                  {format.title}
                </span>
              ))}
            </div>
          </div>
        </section>
        {/* ========================================================= */}
        Editorial Values
        {/* ========================================================= */}
        <section className="mb-24 md:mb-32" aria-labelledby="values-heading">
          <Eyebrow>How we think</Eyebrow>
          <SectionTitle id="values-heading">Editorial values</SectionTitle>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EDITORIAL_VALUES.map((value) => (
              <div key={value.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* ========================================================= */}
        Editorial Team
        {/* ========================================================= */}
        <section
          id="editorial-team"
          className="mb-24 scroll-mt-28 md:mb-32"
          aria-labelledby="team-heading"
        >
          <Eyebrow>The team</Eyebrow>
          <SectionTitle id="team-heading">The people behind Alentah.</SectionTitle>
          <BodyText className="mt-4 max-w-2xl">
            Alentah&apos;s coverage is shaped by editors who focus on different areas of technology
            and emerging ideas. Each editor brings their own perspective, curiosity, and expertise
            to the publication.
          </BodyText>

          {!result.success ? (
            <div className="mt-10 rounded-xl border border-border bg-muted/50 p-10 text-center">
              <Users className="mx-auto mb-4 h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <p className="text-base font-medium text-foreground">
                Our editorial team information is temporarily unavailable.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Please check back soon.</p>
            </div>
          ) : activeEditors.length === 0 ? (
            <div className="mt-10 rounded-xl border border-border bg-muted/50 p-10 text-center">
              <Users className="mx-auto mb-4 h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <p className="text-base font-medium text-foreground">
                Our editorial team information will appear here soon.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {activeEditors.map((editor) => (
                <article
                  key={editor.id}
                  className="group flex flex-col rounded-2xl border bg-linear-to-r-card text-card-foreground transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  {/* Top accent */}
                  <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="p-6 md:p-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                      <EditorImage editor={editor} />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                          {editor.name}
                        </h3>
                        <EditorLocation location={editor.location} />
                        <EditorCategories categories={editor.categories} />
                      </div>
                    </div>

                    <div className="mt-5">
                      <ExpandableText text={editor.bio} label="Bio" />
                    </div>

                    <div className="mt-4">
                      <ExpandableText text={editor.experience} label="Experience" />
                    </div>

                    <EditorSocialPopover editor={editor} />
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between border-t border-border bg-muted/30 px-6 py-3 md:px-7">
                    <span className="text-xs text-muted-foreground">
                      Contributing since{" "}
                      {new Date(editor.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {editor.categoryCount}{" "}
                      {editor.categoryCount === 1 ? "category" : "categories"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
        {/* ========================================================= */}
        {/* ========================================================= */}
        <section
          className="rounded-2xl bg-primary p-8 text-primary-foreground md:p-12"
          aria-labelledby="cta-heading"
        >
          <h2 id="cta-heading" className="text-2xl font-bold tracking-tight md:text-3xl">
            Stay curious.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-primary-foreground/90">
            Explore the latest ideas, tools, and technologies shaping what comes next.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-5 py-2.5 text-sm font-medium text-primary transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-foreground"
            >
              Visit Alentah
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </Container>
  );
}
