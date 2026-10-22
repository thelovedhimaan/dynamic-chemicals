import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SupportChat } from "@/components/SupportChat";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const displayFont = Manrope({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Dynamic Chemicals | Industrial and Commercial Chemical Solutions", template: "%s | Dynamic Chemicals" },
  description: "Explore Dynamic Chemicals products, request customized multi-item orders, and track production and delivery online.",
  openGraph: { title: "Dynamic Chemicals", description: "Chemical products and application-led order support.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${bodyFont.className} ${bodyFont.variable} ${displayFont.variable}`}><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /><SupportChat /></body></html>;
}
