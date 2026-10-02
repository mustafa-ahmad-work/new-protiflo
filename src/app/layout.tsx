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
  title: "مصطفى أحمد | مهندس برمجيات وتطوير الأنظمة الرقمية",
  description: "نبني البرمجيات التي تدفع أعمالك للأمام. نحوّل أفكارك إلى منتجات رقمية سريعة، قابلة للتوسع، ومصممة لتحقيق نتائج حقيقية.",
};

import { LanguageProvider } from "@/components/providers/LanguageProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${expoArabic.variable}`} data-scroll-behavior="smooth">
      <body className="antialiased bg-bg-main text-text-main selection:bg-primary/30 selection:text-white">
        <LanguageProvider>
          <ThemeProvider>
            <LoadingScreen />
            <Suspense fallback={null}>
              <NavigationProgress />
            </Suspense>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
