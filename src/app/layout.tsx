import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PwnPath — Structured DFIR Learning Trails",
  description:
    "Curated HackTheBox challenges organized into progressive learning paths for defensive security and digital forensics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              <span className="text-emerald-400">Pwn</span>Path
            </Link>
            <div className="flex items-center gap-6 text-sm text-zinc-400">
              <Link
                href="/"
                className="transition-colors hover:text-zinc-200"
              >
                Trails
              </Link>
              <Link
                href="/cheatsheets"
                className="transition-colors hover:text-zinc-200"
              >
                Cheatsheets
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
        <footer className="border-t border-zinc-800 py-8 text-center text-xs text-zinc-500">
          PwnPath — Structured learning paths for HackTheBox DFIR content
        </footer>
      </body>
    </html>
  );
}
