import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavigationProgress from "@/components/layout/NavigationProgress";
import { Suspense } from "react";

const expoArabic = localFont({
  src: [
    {
      path: "../../public/fonts/ExpoArabic-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ExpoArabic-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-expo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "مصطفى أحمد | مطور Full-Stack",
  description: "مصطفى أحمد - مطور Full-Stack. أبني تطبيقات ويب وأنظمة إدارية وعملية باستخدام Laravel وPHP وReact وJavaScript.",
};

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${expoArabic.variable}`}>
      <body className="antialiased bg-bg-main text-text-main selection:bg-primary/30 selection:text-white">
        <CustomCursor />
        <SmoothScrollProvider>
          <LanguageProvider>
            <ThemeProvider>
              <LoadingScreen />
              <Suspense fallback={null}>
                <NavigationProgress />
              </Suspense>
              {children}
            </ThemeProvider>
          </LanguageProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
