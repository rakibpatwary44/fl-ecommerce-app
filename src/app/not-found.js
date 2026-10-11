import Link from "next/link";
import { ArrowLeft, PackageSearch } from "lucide-react";

export const metadata = {
  title: "Page not found | TachStore",
  description: "We couldn't find the page you were looking for.",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20 sm:px-10">
      <section className="w-full max-w-xl text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
          <PackageSearch aria-hidden="true" className="h-10 w-10" strokeWidth={1.6} />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. It may have been
          moved or the link may be incorrect.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-red-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to TachStore
        </Link>
      </section>
    </main>
  );
}
