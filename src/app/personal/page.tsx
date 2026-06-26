import type { Metadata } from "next";
import { PhotoEssay } from "@/components/personal/photo-essay";
import { NowStrip } from "@/components/personal/now-strip";

export const metadata: Metadata = {
  title: "Personal — Liam Nance",
};

export default function PersonalPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        <h1 className="display-h1">Off the clock.</h1>
        <p className="body-lg measure mt-5">
          Currently obsessed with Greek myth, tennis serves, and the 2025 NBA playoffs.
        </p>
      </section>

      <PhotoEssay />

      <NowStrip />

      <section className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
        <h2 className="display-h2">Why I love this.</h2>
        <p className="body-lg measure mt-6">
          Computer science, for me, lives in the moment a problem becomes a model.
          A messy thing in the world (a stack of PDFs, a habit you can&apos;t kick,
          a court case you can&apos;t parse) gets re-described in objects, edges,
          and tradeoffs, and once it&apos;s described that way you can actually move
          it. That translation is the part I cannot put down. Everything else,
          the languages, the frameworks, the deploys, is just instrumentation
          for that one move. I&apos;m mostly here to keep practicing it.
        </p>
        <p className="body-lg measure mt-4 text-[var(--muted)]">
          (a real essay will replace this paragraph. probably while procrastinating an algorithms problem set.)
        </p>
      </section>
    </>
  );
}
