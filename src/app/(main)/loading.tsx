export default function HomeLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-zinc-50 dark:bg-zinc-950">
      {/* ════════════════════════════════════════
          TOP STORIES
      ════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-800" />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* HERO skeleton */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-zinc-200 dark:bg-zinc-800">
              <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6 sm:p-8 md:p-10">
                <div className="h-5 w-24 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-8 w-4/5 rounded bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-8 w-3/5 rounded bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-4 w-2/3 rounded bg-zinc-300/80 dark:bg-zinc-700/80" />
                <div className="mt-4 flex gap-3">
                  <div className="h-4 w-24 rounded bg-zinc-300 dark:bg-zinc-700" />
                  <div className="h-4 w-16 rounded bg-zinc-300 dark:bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>

          {/* LATEST sidebar skeleton */}
          <div className="lg:col-span-4">
            <div className="mb-6 h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 w-14 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRENDING NOW
      ════════════════════════════════════════ */}
      <section className="border-y border-zinc-200 bg-white py-14 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-center">
            <div className="h-4 w-36 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
              >
                <div className="aspect-[4/3] bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          EXPLORE + EDITOR'S PICK
      ════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4 text-center">
          <div className="mx-auto h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mx-auto h-5 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-9 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
        </div>

        {/* Editor's Pick skeleton */}
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800">
          <div className="relative aspect-[21/9] bg-zinc-200 dark:bg-zinc-800">
            <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6 sm:p-8">
              <div className="h-5 w-28 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <div className="h-7 w-4/5 rounded bg-zinc-300 dark:bg-zinc-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FROM THE CATEGORIES
      ════════════════════════════════════════ */}
      <section className="border-t border-zinc-200 bg-zinc-100/50 py-16 dark:border-zinc-800 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex justify-center">
            <div className="h-4 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {[1, 2].map((col) => (
              <div key={col}>
                <div className="mb-6 h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-4">
                  <div className="aspect-[16/10] w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          THE DAILY
      ════════════════════════════════════════ */}
      <section className="border-t border-zinc-200 py-20 dark:border-zinc-800">
        <div className="mx-auto max-w-2xl space-y-4 px-4 text-center">
          <div className="mx-auto h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mx-auto h-8 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mx-auto h-4 w-80 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="h-12 w-full max-w-xs rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-12 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          MOST READ
      ════════════════════════════════════════ */}
      <section className="border-t border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 flex justify-center">
            <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="h-8 w-8 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-4 w-40 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <div className="mx-auto h-5 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="mx-auto mt-2 h-3 w-48 rounded bg-zinc-200 dark:bg-zinc-800" />
      </footer>
    </div>
  );
}
