type Tone = "opener" | "standard" | "quiet";

interface SectionDividerProps {
  name: string;
  tone: Tone;
  id?: string;
}

export function SectionDivider({ name, tone, id }: SectionDividerProps) {
  const paddingBottom =
    tone === "opener" ? "4rem" : tone === "standard" ? "2.5rem" : "1.5rem";

  return (
    <div
      id={id}
      className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8"
      style={{ paddingBottom }}
    >
      <h2
        style={{
          fontWeight: 800,
          fontSize: "clamp(3rem, 8vw, 5.5rem)",
          fontFamily: "var(--font-bricolage)",
          color: "var(--fg)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        {name}
      </h2>
    </div>
  );
}
