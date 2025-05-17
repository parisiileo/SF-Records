import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SF Records",
  description: "SF Records | Buy your favorite vinyls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[2500px] mx-auto`}
      >
        <Header />
        <main className="xl:max-w-9/12 lg:max-w-10/12 max-w-11/12 mx-auto mt-24 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
