import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  title: "Liam Nance. Undergrad CS, University of Illinois",
  description:
    "I write code. Sometimes it does something useful. The portfolio of Liam Nance, computer science student at UIUC.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={bricolage.variable}>
      <body className="min-h-dvh bg-[var(--bg)] text-[var(--fg)] antialiased">
        <SiteNav />
        <main id="main" className="pt-[64px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
