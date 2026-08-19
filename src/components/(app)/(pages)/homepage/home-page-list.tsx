import { getHomeBlogsAction, HomeBlogListItem } from "@/app/actions/(blog)/get-home-blogs";
import { CACHE_TAGS } from "@/lib/cache-keys";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import TheDaily from "./the-daily";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatDate(date: Date | null) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function readingTimeLabel(minutes: number | null) {
  if (!minutes) return null;

  return `${minutes} min read`;
}

function authorName(author: HomeBlogListItem["author"]) {
  return [author.firstName, author.lastName].filter(Boolean).join(" ") || "Anonymous";
}

// ─────────────────────────────────────────────
// Blog URL
// ─────────────────────────────────────────────

function blogHref(blog: HomeBlogListItem) {
  return `/${blog.category.slug}/${blog.subcategory.slug}/${blog.slug}`;
}

// ─────────────────────────────────────────────
// Small reusable cards
// ─────────────────────────────────────────────

function TrendingCard({ blog }: { blog: HomeBlogListItem }) {
  return (
    <Link
      href={blogHref(blog)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={blog.bannerImage}
          alt={blog.bannerImageAlt || blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-900 backdrop-blur">
          {blog.category.name}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug transition-colors group-hover:text-primary">
          {blog.title}
        </h3>

        <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-muted-foreground">
          <span>{authorName(blog.author)}</span>
          <span>·</span>
          <span>{readingTimeLabel(blog.readingTime)}</span>
        </div>
      </div>
    </Link>
  );
}

function CategoryArticle({ blog, large = false }: { blog: HomeBlogListItem; large?: boolean }) {
  return (
    <Link
      href={blogHref(blog)}
      className={`group flex gap-4 ${large ? "flex-col" : "items-start"}`}
    >
      <div
        className={`relative overflow-hidden rounded-xl ${
          large ? "aspect-[16/10] w-full" : "h-20 w-28 shrink-0"
        }`}
      >
        <Image
          src={blog.bannerImage}
          alt={blog.bannerImageAlt || blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={large ? "(max-width: 768px) 100vw, 50vw" : "112px"}
        />
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
          {blog.category.name}
        </span>

        <h4
          className={`mt-1 font-semibold leading-snug transition-colors group-hover:text-primary ${
            large ? "line-clamp-2 text-lg" : "line-clamp-2 text-sm"
          }`}
        >
          {blog.title}
        </h4>

        {large && blog.shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{blog.shortDescription}</p>
        )}

        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{authorName(blog.author)}</span>
          <span>·</span>
          <span>{readingTimeLabel(blog.readingTime)}</span>
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default async function HomeBlog() {
  "use cache";

  cacheLife("max");
  cacheTag(CACHE_TAGS.homeScreen);

  const result = await getHomeBlogsAction();

  if (!result.success) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">{result.error}</p>
      </div>
    );
  }

  const blogs = result.blogs;

  const hero = blogs[0] ?? null;
  const secondary = blogs[1] ?? null;
  const latestItems = blogs.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ════════════════════════════════════════
          TOP STORIES
      ════════════════════════════════════════ */}

      <section className="pb-16 pt-10">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Top Stories
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* HERO */}

          <div className="lg:col-span-8">
            {hero ? (
              <Link
                href={blogHref(hero)}
                className="group relative block overflow-hidden rounded-3xl"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={hero.bannerImage}
                    alt={hero.bannerImageAlt || hero.title}
                    fill
                    priority
                    loading="eager"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                      {hero.category.name}
                    </span>

                    {hero.featured && (
                      <span className="rounded-full bg-amber-400/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                        Featured
                      </span>
                    )}
                  </div>

                  <h1 className="max-w-2xl text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[2.6rem]">
                    {hero.title}
                  </h1>

                  {hero.shortDescription && (
                    <p className="mt-3 max-w-xl text-sm text-zinc-200 sm:text-base">
                      {hero.shortDescription}
                    </p>
                  )}

                  <div className="mt-5 flex items-center gap-3 text-sm text-zinc-300">
                    <span className="font-medium text-white">{authorName(hero.author)}</span>

                    <span>·</span>

                    <span>{readingTimeLabel(hero.readingTime)}</span>

                    {hero.publishedAt && (
                      <>
                        <span>·</span>
                        <span>{formatDate(hero.publishedAt)}</span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex aspect-16/10 items-center justify-center rounded-3xl border border-dashed border-border">
                <p className="text-muted-foreground">No featured story yet</p>
              </div>
            )}
          </div>

          {/* LATEST SIDEBAR */}

          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Latest
              </h3>

              <div className="space-y-5">
                {latestItems.map((blog) => (
                  <Link key={blog.id} href={blogHref(blog)} className="group flex gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={blog.bannerImage}
                        alt={blog.bannerImageAlt || blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="64px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                        {blog.category.name}
                      </span>

                      <h4 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                        {blog.title}
                      </h4>
                    </div>
                  </Link>
                ))}

                {latestItems.length === 0 && (
                  <p className="text-sm text-muted-foreground">Nothing published yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRENDING NOW
      ════════════════════════════════════════ */}

      <section className="border-y border-border py-14">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="text-xl">✦</span>

            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Trending Now
            </h2>

            <span className="text-xl">✦</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {blogs.slice(0, 4).map((blog) => (
              <TrendingCard key={blog.id} blog={blog} />
            ))}

            {blogs.length < 4 &&
              Array.from({ length: 4 - blogs.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex aspect-[3/4] items-center justify-center rounded-2xl border border-dashed border-border"
                >
                  <span className="text-xs text-muted-foreground">Coming soon</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          EXPLORE + EDITOR'S PICK
      ════════════════════════════════════════ */}

      <section className="py-16">
        <div className="mb-10 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            ✦ Explore Atative ✦
          </h2>

          <p className="mt-3 text-lg text-muted-foreground">Discover ideas worth your attention.</p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["AI", "Tech", "Code", "Design", "Life"].map((cat) => (
              <Link
                key={cat}
                href={`/${cat.toLowerCase()}`}
                className="rounded-full border border-border px-5 py-2 text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {secondary && (
          <Link
            href={blogHref(secondary)}
            className="group mx-auto block max-w-3xl overflow-hidden rounded-3xl border border-border shadow-sm"
          >
            <div className="relative aspect-21/9">
              <Image
                src={secondary.bannerImage}
                alt={secondary.bannerImageAlt || secondary.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 768px"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                  Editor&apos;s Pick
                </span>

                <h3 className="text-xl font-bold text-white sm:text-2xl">{secondary.title}</h3>
              </div>
            </div>
          </Link>
        )}
      </section>

      {/* ════════════════════════════════════════
          FROM THE CATEGORIES
      ════════════════════════════════════════ */}

      {blogs.length > 0 && (
        <section className="border-t border-border py-16">
          <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            ✦ From the Categories ✦
          </h2>

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {hero?.category.name || "Featured"}
              </h3>

              {hero && <CategoryArticle blog={hero} large />}
            </div>

            <div>
              <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {secondary?.category.name || "More"}
              </h3>

              {secondary && <CategoryArticle blog={secondary} large />}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════
          THE DAILY
      ════════════════════════════════════════ */}

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            The Daily
          </h2>

          <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            A little smarter, every day.
          </p>

          <p className="mt-3 text-muted-foreground">
            Get the best ideas, guides & stories from ATATIVE.
          </p>

          <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none ring-ring focus:ring-2 sm:max-w-xs"
              required
            />

            <button
              type="submit"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <TheDaily />

      {/* ════════════════════════════════════════
          MOST READ
      ════════════════════════════════════════ */}

      <section className="border-t border-border py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            ✦ Most Read ✦
          </h2>

          <ol className="space-y-5">
            {blogs.slice(0, 5).map((blog, index) => (
              <li key={blog.id}>
                <Link href={blogHref(blog)} className="group flex items-start gap-5">
                  <span className="mt-0.5 text-2xl font-bold tabular-nums text-muted-foreground/40 transition-colors group-hover:text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="text-base font-semibold leading-snug transition-colors group-hover:text-primary">
                      {blog.title}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {authorName(blog.author)} · {readingTimeLabel(blog.readingTime)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}

            {blogs.length === 0 && (
              <p className="text-center text-muted-foreground">No articles yet.</p>
            )}
          </ol>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER STRIP
      ════════════════════════════════════════ */}

      <footer className="border-t border-border py-10 text-center">
        <p className="text-sm font-semibold tracking-tight">ATATIVE</p>

        <p className="mt-1 text-xs text-muted-foreground">Ideas · Guides · Trends · Insights</p>
      </footer>
    </div>
  );
}
