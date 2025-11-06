import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import AppBar from "@/components/app-bar";
import StatusBar from "@/components/status-bar";
import { editorSettings } from "@/lib/utils/editor-settings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "fluent-editor",
  description:
    "A modern, web-based RPG creation platform inspired by RPG Maker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={editorSettings.language} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} grid min-h-screen grid-rows-[2.25rem_1fr_1.5rem] antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={editorSettings.theme}
          enableSystem
        >
          <AppBar />
          <main className="row-start-2 overflow-hidden">{children}</main>
          <StatusBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
