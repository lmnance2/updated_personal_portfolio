import Link from "next/link";
import { HeroSplit } from "@/components/home/hero-split";

export default function Home() {
  return (
    <>
      <HeroSplit />

      {/* Below the fold: the editorial paragraph that does the IA work. */}
      <section className="relative">
        <div
          aria-hidden
          className="h-32"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, var(--accent), var(--bg))",
          }}
        />
        <div className="mx-auto max-w-3xl px-6 pb-24 pt-12 sm:px-8">
          <p className="display-h2 measure">
            This site has two halves: the professional side (the resume) and the personal side (the rest). There are also seven things hidden.
          </p>
          <div className="mt-12 flex flex-col gap-2 sm:flex-row sm:gap-10">
            <Link
              href="/professional"
              className="ui inline-flex items-center gap-2 text-[var(--accent-strong)] underline decoration-2 underline-offset-4 hover:opacity-80"
            >
              Read the resume side
            </Link>
            <Link
              href="/personal"
              className="ui inline-flex items-center gap-2 text-[var(--accent-strong)] underline decoration-2 underline-offset-4 hover:opacity-80"
            >
              Read the personal side
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
