// Mustard "currently" strip on /personal: three static columns Liam updates by hand.

export function NowStrip() {
  return (
    <section className="bg-[var(--spark)] py-20 text-[var(--fg)]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <Column label="Currently reading">
            <p className="display-h2" style={{ fontSize: "1.6rem", color: "var(--fg)" }}>
              Iron Gold
            </p>
            <p className="ui mt-1" style={{ color: "var(--fg)", opacity: 0.7 }}>
              Pierce Brown
            </p>
          </Column>

          <Column label="Currently watching">
            <p className="display-h2" style={{ fontSize: "1.6rem", color: "var(--fg)" }}>
              Vikings
            </p>
          </Column>

          <Column label="Currently building">
            <p className="display-h2" style={{ fontSize: "1.6rem", color: "var(--fg)" }}>
              Event Consolidator Website
            </p>
          </Column>
        </div>
      </div>
    </section>
  );
}

function Column({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="caption uppercase tracking-wider" style={{ color: "var(--fg)", opacity: 0.7 }}>
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
