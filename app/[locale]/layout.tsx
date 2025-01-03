import type { Metadata } from "next";
import "@/public/style/globals.css";
import "@/public/style/tiptap.scss";

import "react-photo-view/dist/react-photo-view.css";
import { Inter as _font } from "next/font/google";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/toaster";
import ThemeProviders from "@/context/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { ReactQueryClientProvider } from "@/context/query-provider";
import { QueryParamsProvider } from "@/context/query-params-provider";
const font = _font({ subsets: ["latin"] });
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }
  const messages = await getMessages();
  setRequestLocale(locale);
  return (
    <html lang={locale} data-theme="dark">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={cn(font.className)}
      >
        <ReactQueryClientProvider>
          <NextIntlClientProvider messages={messages}>
            <QueryParamsProvider>
              <ThemeProviders
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                {children}
                <Toaster />
              </ThemeProviders>
            </QueryParamsProvider>
          </NextIntlClientProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
