import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-5xl py-8 sm:py-10 lg:py-12">
        {/* Blog Header */}
        <div className="space-y-6">
          {/* Category */}
          <Skeleton className="h-5 w-24 rounded-full" />

          {/* Title */}
          <div className="space-y-3">
            <Skeleton className="h-10 w-full max-w-4xl rounded-lg sm:h-12 lg:h-14" />
            <Skeleton className="h-10 w-4/5 max-w-3xl rounded-lg sm:h-12 lg:h-14" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-full max-w-3xl" />
            <Skeleton className="h-5 w-4/5 max-w-2xl" />
          </div>

          {/* Author / Meta */}
          <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="size-10 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="mt-10">
          <Skeleton className="aspect-video w-full rounded-2xl" />
        </div>

        {/* Content */}
        <div className="mt-10">
          <div className="mx-auto w-full max-w-[820px] space-y-8">
            {/* Paragraph */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[92%]" />
              <Skeleton className="h-4 w-[86%]" />
            </div>

            {/* Heading */}
            <div className="space-y-3 pt-4">
              <Skeleton className="h-8 w-3/5 rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[94%]" />
              <Skeleton className="h-4 w-[88%]" />
            </div>

            {/* Paragraph */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[96%]" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[82%]" />
            </div>

            {/* Image */}
            <Skeleton className="aspect-video w-full rounded-xl" />

            {/* More content */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[94%]" />
              <Skeleton className="h-4 w-[80%]" />
            </div>

            {/* Another heading */}
            <div className="space-y-3 pt-4">
              <Skeleton className="h-8 w-1/2 rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[84%]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
