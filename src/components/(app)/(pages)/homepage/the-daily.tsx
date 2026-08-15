import Image from "next/image";
import Link from "next/link";

export default function TheDaily() {
  return (
    <section className="border-y border-border py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-14 lg:gap-20">
          {/* Left side – Portrait + Name */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="relative h-44 w-44 overflow-hidden rounded-full ring-4 ring-primary/20 sm:h-52 sm:w-52">
              <Image
                src="/images/real/tabish.jpg"
                alt="Tabish"
                fill
                className="object-cover"
                sizes="208px"
                priority
              />
            </div>

            <div className="mt-5">
              <h3 className="relative inline-block text-xl font-semibold tracking-tight">
                <span className="relative z-10">Tabish</span>
                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full bg-primary/40" />
              </h3>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Editor in Chief
              </p>
            </div>
          </div>

          {/* Right side – Text + Form */}
          <div className="max-w-md flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Daily</h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Ready to do everything better? Get daily tips, tricks, and tech guides from our expert
              team.
            </p>

            <form className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Email address"
                required
                className="h-12 w-full rounded-lg border border-border bg-transparent px-4 text-sm outline-none ring-ring placeholder:text-muted-foreground focus:ring-2 sm:flex-1"
              />
              <button
                type="submit"
                className="h-12 shrink-0 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Sign Up
              </button>
            </form>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              By clicking Sign Up, you confirm you are 16+ and agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 transition-colors hover:text-foreground"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
