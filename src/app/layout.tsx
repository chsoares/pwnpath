import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "PwnPath // Structured Hacking Trails",
  description:
    "Curated HackTheBox challenges organized into progressive learning paths for offensive and defensive security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="min-h-screen font-mono antialiased">
        <header className="sticky top-0 z-50 border-b border-drac-border bg-drac-bg2/90 backdrop-blur-md">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
            <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight">
              <span className="flex gap-1.5">
                <span className="inline-block h-3 w-3 rounded-full bg-drac-red" />
                <span className="inline-block h-3 w-3 rounded-full bg-drac-yellow" />
                <span className="inline-block h-3 w-3 rounded-full bg-drac-green" />
              </span>
              <span className="ml-2 text-drac-muted">root@</span>
              <span className="text-drac-green">pwnpath</span>
              <span className="text-drac-muted">:~$</span>
            </Link>
            <div className="flex items-center gap-5 text-sm text-drac-muted">
              <Link
                href="/"
                className="flex items-center gap-1.5 transition-colors hover:text-drac-pink"
              >
                <span className="material-symbols-outlined text-base">route</span>
                trails
              </Link>
              <Link
                href="/cheatsheets"
                className="flex items-center gap-1.5 transition-colors hover:text-drac-pink"
              >
                <span className="material-symbols-outlined text-base">terminal</span>
                cheatsheets
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
        <footer className="border-t border-drac-border py-8 text-center text-xs text-drac-muted">
          <span className="text-drac-green">root@pwnpath</span>
          <span className="text-drac-muted">:~$ </span>
          <span className="text-drac-fg/60">logout</span>
          <span className="text-drac-muted"> // </span>
          <span className="text-drac-fg/40">structured trails for HackTheBox</span>
        </footer>
      </body>
    </html>
  );
}
