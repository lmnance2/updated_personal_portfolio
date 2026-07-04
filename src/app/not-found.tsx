import type { Metadata } from "next";
import Link from "next/link";
import { BasketballToy } from "@/components/not-found/basketball-toy";

export const metadata: Metadata = {
  title: "404. Liam Nance",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="display-h1">404. You took a wrong turn.</h1>
      <p className="body-lg mt-5 text-[var(--muted)]">
        The page doesn&apos;t exist, but here is a basketball.
      </p>

      <div className="mt-10 w-full">
        <BasketballToy />
      </div>

      <ul className="mt-12 space-y-2">
        <li>
          <Link
            href="/"
            className="ui inline-flex items-center gap-1 text-[var(--fg)] hover:text-[var(--accent-strong)]"
          >
            Home &rarr;
          </Link>
        </li>
        <li>
          <Link
            href="/professional"
            className="ui inline-flex items-center gap-1 text-[var(--fg)] hover:text-[var(--accent-strong)]"
          >
            Professional &rarr;
          </Link>
        </li>
        <li>
          <Link
            href="/personal"
            className="ui inline-flex items-center gap-1 text-[var(--fg)] hover:text-[var(--accent-strong)]"
          >
            Personal &rarr;
          </Link>
        </li>
      </ul>
    </section>
  );
}
