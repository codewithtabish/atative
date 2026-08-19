import { Skeleton } from "@/components/ui/skeleton";

function HeroSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Skeleton className="aspect-16/10 w-full rounded-lg" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="space-y-5 lg:border-l lg:border-border lg:pl-8">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-px w-full" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-16 w-16 shrink-0 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendingSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-3 h-px w-full" />
      <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-4/3 w-full rounded-md" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-3 h-px w-full" />
      <div className="mt-6 space-y-4">
        <Skeleton className="aspect-21/9 w-full rounded-lg" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Fallback rendered by <Suspense> while the homepage's cached blog data
 * resolves. Mirrors the hero / trending / featured layout so there's no
 * layout shift once the real content streams in.
 */
export function HomeFeedSkeleton() {
  return (
    <div className="space-y-16 md:space-y-20" aria-busy="true" aria-live="polite">
      <HeroSkeleton />
      <TrendingSkeleton />
      <FeaturedSkeleton />
    </div>
  );
}
