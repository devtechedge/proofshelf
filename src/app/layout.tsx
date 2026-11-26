import type { Metadata, Viewport } from "next";
import { Manrope, Roboto_Mono, Unbounded } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  display: "optional",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "optional",
});

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "optional",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const themeScript = `(function(){try{var saved=localStorage.getItem('proofshelf-theme');var theme=saved||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ProofShelf | Test the claim. Read the evidence.",
    template: "%s | ProofShelf",
  },
  description:
    "A playable supplement evidence literacy game. Sort 100 claim cards, calibrate confidence, and learn what the research can actually support.",
  applicationName: "ProofShelf",
  manifest: "/manifest.webmanifest",
  keywords: ["supplement evidence", "health literacy", "evidence cards", "supplement safety", "science game"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title: "ProofShelf | Test the claim. Read the evidence.",
    description: "100 supplement claim cards. Four verdicts. One better-calibrated evidence filter.",
    images: [{ url: "/og.png", width: 1280, height: 640, alt: "ProofShelf supplement evidence card game" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProofShelf | Test the claim. Read the evidence.",
    description: "A playable supplement evidence literacy game with sourced claim cards.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0b18" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
