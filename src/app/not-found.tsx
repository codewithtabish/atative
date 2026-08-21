import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Big faded 404 */}
      <h1 className="pointer-events-none absolute select-none text-[12rem] font-bold leading-none text-foreground/5 sm:text-[16rem]">
        404
      </h1>

      <div className="relative z-10 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lost in the digital void</h2>

        <p className="mx-auto max-w-md text-muted-foreground">
          The page you’re looking for doesn’t exist, was removed, or never existed in the first
          place.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 pt-6 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Home
          </Link>

          <Link
            href="/technology"
            className="inline-flex h-11 items-center justify-center rounded-full border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Explore Technology
          </Link>
        </div>
      </div>
    </section>
  );
}
