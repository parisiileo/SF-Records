import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/header";
import StoreProvider from "@/lib/provider";

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <StoreProvider>
      <html lang={locale}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[2500px] mx-auto`}
        >
          <NextIntlClientProvider>
            <Header />
            <main className="xl:max-w-9/12 lg:max-w-10/12 max-w-11/12 mx-auto mt-64 mb-32 min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster position="top-center" />
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
