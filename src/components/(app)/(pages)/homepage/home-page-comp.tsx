import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import {
  getHomeBlogsAction,
  type HomeBlogListItem,
} from "@/app/actions/(blog)/get-home-blogs-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { HomeFeedSkeleton } from "./home-feed-skeleton";
import { MissionVisionSection } from "./mission-vision-section";
import TheDaily from "./the-daily";

/* -------------------------------------------------------------------------- */
/* Formatting helpers                                                         */
/* -------------------------------------------------------------------------- */

const TYPE_LABELS: Record<HomeBlogListItem["type"], string> = {
  ARTICLE: "Article",
  NEWS: "News",
  OPINION: "Opinion",
  ANALYSIS: "Analysis",
  GUIDE: "Guide",
  REVIEW: "Review",
  INTERVIEW: "Interview",
};

function formatDate(date: Date | null): string | null {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

function getAuthorName(author: HomeBlogListItem["author"]): string {
  const name = [author.firstName, author.lastName].filter(Boolean).join(" ").trim();

  return name || "Alentah Editorial";
}

function getAuthorInitials(author: HomeBlogListItem["author"]): string {
  const name = getAuthorName(author);

  if (name === "Alentah Editorial") return "AE";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getArticleUrl(slug: string): string {
  return `/blogs/${slug}`;
}

function getCategoryUrl(slug: string): string {
  return `/categories/${slug}`;
}

/* -------------------------------------------------------------------------- */
/* Selection helpers                                                          */
/* -------------------------------------------------------------------------- */

function takeUnique(
  blogs: HomeBlogListItem[],
  used: Set<string>,
  count: number,
): HomeBlogListItem[] {
  const picked: HomeBlogListItem[] = [];

  for (const blog of blogs) {
    if (picked.length >= count) break;
    if (used.has(blog.id)) continue;

    picked.push(blog);
    used.add(blog.id);
  }

  return picked;
}

function filterUnusedByType(
  blogs: HomeBlogListItem[],
  used: Set<string>,
  types: HomeBlogListItem["type"][],
): HomeBlogListItem[] {
  return blogs.filter((blog) => !used.has(blog.id) && types.includes(blog.type));
}

/* -------------------------------------------------------------------------- */
/* Shared bits                                                                */
/* -------------------------------------------------------------------------- */

function Eyebrow({ label, href, className }: { label: string; href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-block text-xs font-semibold uppercase tracking-wider text-primary hover:underline",
        className,
      )}
    >
      {label}
    </Link>
  );
}

function ByLine({
  blog,
  className,
  showAvatar = true,
}: {
  blog: HomeBlogListItem;
  className?: string;
  showAvatar?: boolean;
}) {
  const date = formatDate(blog.publishedAt);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground",
        className,
      )}
    >
      <span className="flex items-center gap-2">
        {showAvatar && (
          <Avatar className="h-6 w-6">
            <AvatarImage src={blog.author.imageUrl ?? undefined} alt={getAuthorName(blog.author)} />
            <AvatarFallback className="text-[10px]">
              {getAuthorInitials(blog.author)}
            </AvatarFallback>
          </Avatar>
        )}

        {getAuthorName(blog.author)}
      </span>

      {date && (
        <>
          <span aria-hidden="true">·</span>

          <time dateTime={new Date(blog.publishedAt as unknown as string).toISOString()}>
            {date}
          </time>
        </>
      )}

      {blog.readingTime !== null && (
        <>
          <span aria-hidden="true">·</span>

          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {blog.readingTime} min read
          </span>
        </>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero — lead story + Latest rail                                            */
/* -------------------------------------------------------------------------- */

function HeroSection({ hero, latest }: { hero: HomeBlogListItem; latest: HomeBlogListItem[] }) {
  return (
    <section aria-labelledby="hero-heading" className="grid gap-10 lg:grid-cols-3">
      <h1 id="hero-heading" className="sr-only">
        Alentah — latest stories
      </h1>

      <article className="group lg:col-span-2">
        <Link href={getArticleUrl(hero.slug)} className="block">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={hero.bannerImage}
              alt={hero.bannerImageAlt ?? hero.title}
              fill
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="mt-4 space-y-3">
          <Eyebrow label={hero.category.name} href={getCategoryUrl(hero.category.slug)} />

          <Link href={getArticleUrl(hero.slug)}>
            <h2 className="text-3xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary md:text-4xl">
              {hero.title}
            </h2>
          </Link>

          {hero.shortDescription && (
            <p className="line-clamp-2 max-w-2xl text-base text-muted-foreground">
              {hero.shortDescription}
            </p>
          )}

          <ByLine blog={hero} />
        </div>
      </article>

      <aside aria-labelledby="latest-heading" className="lg:border-l lg:border-border lg:pl-8">
        <h2 id="latest-heading" className="text-sm font-bold uppercase tracking-widest">
          Latest
        </h2>

        <Separator className="mt-3" />

        <ul className="mt-4 space-y-5">
          {latest.map((blog) => (
            <li key={blog.id}>
              <article className="group flex items-start gap-3">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <Eyebrow
                    label={blog.category.name}
                    href={getCategoryUrl(blog.category.slug)}
                    className="text-[11px]"
                  />

                  <Link href={getArticleUrl(blog.slug)}>
                    <h3 className="line-clamp-3 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                      {blog.title}
                    </h3>
                  </Link>

                  {formatDate(blog.publishedAt) && (
                    <p className="text-xs text-muted-foreground">{formatDate(blog.publishedAt)}</p>
                  )}
                </div>

                <Link
                  href={getArticleUrl(blog.slug)}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted"
                  aria-label={blog.title}
                >
                  <Image
                    src={blog.bannerImage}
                    alt={blog.bannerImageAlt ?? blog.title}
                    fill
                    sizes="64px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Trending                                                                    */
/* -------------------------------------------------------------------------- */

function TrendingSection({ items }: { items: HomeBlogListItem[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="trending-heading">
      <h2 id="trending-heading" className="text-sm font-bold uppercase tracking-widest">
        Trending Now
      </h2>

      <Separator className="mt-3" />

      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((blog) => (
          <article key={blog.id} className="group">
            <Link href={getArticleUrl(blog.slug)} className="block" aria-label={blog.title}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted">
                <Image
                  src={blog.bannerImage}
                  alt={blog.bannerImageAlt ?? blog.title}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="mt-3 space-y-1.5">
              <Eyebrow
                label={blog.category.name}
                href={getCategoryUrl(blog.category.slug)}
                className="text-[11px]"
              />

              <Link href={getArticleUrl(blog.slug)}>
                <h3 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                  {blog.title}
                </h3>
              </Link>

              <p className="text-xs text-muted-foreground">{getAuthorName(blog.author)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Featured block — big story + supporting grid                              */
/* -------------------------------------------------------------------------- */

function FeaturedSection({
  label,
  feature,
  supporting,
}: {
  label: string;
  feature: HomeBlogListItem;
  supporting: HomeBlogListItem[];
}) {
  return (
    <section aria-labelledby="featured-heading">
      <h2 id="featured-heading" className="text-sm font-bold uppercase tracking-widest">
        Featured: {label}
      </h2>

      <Separator className="mt-3" />

      <article className="group mt-6">
        <Link href={getArticleUrl(feature.slug)} className="block" aria-label={feature.title}>
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={feature.bannerImage}
              alt={feature.bannerImageAlt ?? feature.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="mt-4 space-y-2">
          <Eyebrow label={feature.category.name} href={getCategoryUrl(feature.category.slug)} />

          <Link href={getArticleUrl(feature.slug)}>
            <h3 className="text-2xl font-bold leading-tight transition-colors group-hover:text-primary">
              {feature.title}
            </h3>
          </Link>

          <ByLine blog={feature} />
        </div>
      </article>

      {supporting.length > 0 && (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {supporting.map((blog) => (
            <article key={blog.id} className="group">
              <div className="space-y-2">
                <Eyebrow
                  label={blog.category.name}
                  href={getCategoryUrl(blog.category.slug)}
                  className="text-[11px]"
                />

                <Link href={getArticleUrl(blog.slug)}>
                  <h4 className="line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                    {blog.title}
                  </h4>
                </Link>

                <ByLine blog={blog} showAvatar={false} className="text-xs" />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Editorial section                                                           */
/* -------------------------------------------------------------------------- */

function EditorialSection({
  title,
  feature,
  list,
}: {
  title: string;
  feature: HomeBlogListItem;
  list: HomeBlogListItem[];
}) {
  return (
    <section aria-labelledby={`section-${feature.id}-heading`}>
      <h2
        id={`section-${feature.id}-heading`}
        className="text-sm font-bold uppercase tracking-widest"
      >
        {title}
      </h2>

      <Separator className="mt-3" />

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <article className="group lg:col-span-2">
          <Link href={getArticleUrl(feature.slug)} className="block" aria-label={feature.title}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={feature.bannerImage}
                alt={feature.bannerImageAlt ?? feature.title}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          <div className="mt-4 space-y-2">
            <Eyebrow label={feature.category.name} href={getCategoryUrl(feature.category.slug)} />

            <Link href={getArticleUrl(feature.slug)}>
              <h3 className="text-2xl font-bold leading-tight transition-colors group-hover:text-primary">
                {feature.title}
              </h3>
            </Link>

            <ByLine blog={feature} />
          </div>
        </article>

        {list.length > 0 && (
          <ul className="space-y-5 lg:border-l lg:border-border lg:pl-8">
            {list.map((blog) => (
              <li key={blog.id}>
                <article className="group space-y-1.5">
                  <Eyebrow
                    label={blog.category.name}
                    href={getCategoryUrl(blog.category.slug)}
                    className="text-[11px]"
                  />

                  <Link href={getArticleUrl(blog.slug)}>
                    <h4 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                      {blog.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-muted-foreground">
                    {TYPE_LABELS[blog.type]}
                    {getAuthorName(blog.author) && ` · ${getAuthorName(blog.author)}`}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* More stories                                                               */
/* -------------------------------------------------------------------------- */

function MoreStoriesSection({ items }: { items: HomeBlogListItem[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="more-heading">
      <h2 id="more-heading" className="text-sm font-bold uppercase tracking-widest">
        More Stories
      </h2>

      <Separator className="mt-3" />

      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((blog) => (
          <article key={blog.id} className="group">
            <Link href={getArticleUrl(blog.slug)} className="block" aria-label={blog.title}>
              <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
                <Image
                  src={blog.bannerImage}
                  alt={blog.bannerImageAlt ?? blog.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <div className="mt-3 space-y-1.5">
              <Eyebrow
                label={blog.category.name}
                href={getCategoryUrl(blog.category.slug)}
                className="text-[11px]"
              />

              <Link href={getArticleUrl(blog.slug)}>
                <h3 className="line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                  {blog.title}
                </h3>
              </Link>

              <ByLine blog={blog} showAvatar={false} className="text-xs" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Error / empty states                                                       */
/* -------------------------------------------------------------------------- */

function HomeErrorState() {
  return (
    <div className="py-24 text-center">
      <p className="text-lg font-semibold text-foreground">
        We couldn&apos;t load the latest stories right now.
      </p>

      <p className="mt-2 text-sm text-muted-foreground">Please try again shortly.</p>
    </div>
  );
}

function HomeEmptyState() {
  return (
    <div className="py-24 text-center">
      <p className="text-lg font-semibold text-foreground">There are no published stories yet.</p>

      <p className="mt-2 text-sm text-muted-foreground">Check back soon for new coverage.</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Data-driven feed                                                           */
/* -------------------------------------------------------------------------- */

async function HomeFeed() {
  const result = await getHomeBlogsAction();

  if (!result.success) {
    return <HomeErrorState />;
  }

  const blogs = result.blogs;

  if (blogs.length === 0) {
    return <HomeEmptyState />;
  }

  const used = new Set<string>();

  // Hero: prefer an actual featured article, fall back to the newest story.
  const featuredPool = blogs.filter((blog) => blog.featured);
  const heroBlog = featuredPool[0] ?? blogs[0];

  used.add(heroBlog.id);

  const latestSidebar = takeUnique(blogs, used, Math.min(5, blogs.length - used.size));

  const trendingBlogs = takeUnique(blogs, used, Math.min(5, blogs.length - used.size));

  // Second-tier featured block.
  const secondaryFeature =
    featuredPool.find((blog) => !used.has(blog.id)) ?? blogs.find((blog) => !used.has(blog.id));

  let secondarySupporting: HomeBlogListItem[] = [];

  if (secondaryFeature) {
    used.add(secondaryFeature.id);

    secondarySupporting = takeUnique(blogs, used, Math.min(3, blogs.length - used.size));
  }

  // Type-driven editorial sections.
  const typeGroups: {
    title: string;
    types: HomeBlogListItem["type"][];
  }[] = [
    {
      title: "News & Opinion",
      types: ["NEWS", "OPINION"],
    },
    {
      title: "Guides",
      types: ["GUIDE"],
    },
    {
      title: "Reviews",
      types: ["REVIEW"],
    },
    {
      title: "Analysis",
      types: ["ANALYSIS"],
    },
    {
      title: "Interviews",
      types: ["INTERVIEW"],
    },
  ];

  const editorialSections = typeGroups
    .map(({ title, types }) => {
      const candidates = filterUnusedByType(blogs, used, types);

      if (candidates.length < 3) return null;

      const [feature, ...rest] = candidates;

      used.add(feature.id);

      const list = takeUnique(rest, used, Math.min(4, rest.length));

      return {
        title,
        feature,
        list,
      };
    })
    .filter(
      (
        section,
      ): section is {
        title: string;
        feature: HomeBlogListItem;
        list: HomeBlogListItem[];
      } => section !== null,
    );

  const remaining = blogs.filter((blog) => !used.has(blog.id)).slice(0, 6);

  return (
    <div className="space-y-16 md:space-y-20">
      <HeroSection hero={heroBlog} latest={latestSidebar} />

      <TrendingSection items={trendingBlogs} />

      {secondaryFeature && (
        <FeaturedSection
          label={secondaryFeature.category.name}
          feature={secondaryFeature}
          supporting={secondarySupporting}
        />
      )}

      {editorialSections.map((section) => (
        <EditorialSection
          key={section.feature.id}
          title={section.title}
          feature={section.feature}
          list={section.list}
        />
      ))}

      <MoreStoriesSection items={remaining} />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Homepage                                                                   */
/* -------------------------------------------------------------------------- */

export function HomePageComp() {
  return (
    <div className="space-y-16 py-10 md:space-y-20 md:py-14">
      <Suspense fallback={<HomeFeedSkeleton />}>
        <HomeFeed />
      </Suspense>

      <TheDaily />

      <MissionVisionSection />
    </div>
  );
}
