import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { EasterEggProvider } from "@/components/easter-eggs/easter-egg-provider";
import { EasterEggLayer } from "@/components/easter-eggs/easter-egg-layer";
import { PartyModeProvider } from "@/components/party/party-mode-provider";
import { PartyOverlay } from "@/components/party/party-overlay";
import { ConsoleGreeting } from "@/components/easter-eggs/console-greeting";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Liam Nance — undergrad CS, University of Illinois",
  description:
    "I write code. Sometimes it does something useful. The portfolio of Liam Nance, computer science student at UIUC.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh bg-[var(--bg)] text-[var(--fg)] antialiased">
        <EasterEggProvider>
          <PartyModeProvider>
            <SiteNav />
            <main id="main" className="pt-[64px]">
              {children}
            </main>
            <Footer />
            <EasterEggLayer />
            <PartyOverlay />
            <ConsoleGreeting />
          </PartyModeProvider>
        </EasterEggProvider>
      </body>
    </html>
  );
}
