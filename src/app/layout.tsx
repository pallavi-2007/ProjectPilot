import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import NextAuthProvider from "@/app/components/NextAuthProvider";
import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "ProjectPilot",
  description: "AI-powered final-year project idea generator and mentor.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-white">
        <NextAuthProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
