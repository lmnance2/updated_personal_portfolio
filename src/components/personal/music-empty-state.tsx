export function MusicEmptyState() {
  return (
    <div
      className="max-w-2xl rounded-md"
      style={{
        background: "var(--surface)",
        padding: "32px",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-block shrink-0 rounded-full"
          style={{ width: 8, height: 8, background: "var(--accent)" }}
          aria-hidden
        />
        <p
          style={{
            fontFamily: "var(--font-bricolage)",
            fontWeight: 700,
            fontSize: "1.75rem",
            color: "var(--fg)",
            lineHeight: 1.2,
          }}
        >
          A playlist of favorites lives here soon.
        </p>
      </div>
    </div>
  );
}
