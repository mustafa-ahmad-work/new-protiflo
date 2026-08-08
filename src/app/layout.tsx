import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavigationProgress from "@/components/layout/NavigationProgress";
import { Suspense } from "react";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "مصطفى أحمد | مهندس برمجيات وتطوير الأنظمة الرقمية",
  description: "نبني البرمجيات التي تدفع أعمالك للأمام. نحوّل أفكارك إلى منتجات رقمية سريعة، قابلة للتوسع، ومصممة لتحقيق نتائج حقيقية.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${tajawal.variable}`} data-scroll-behavior="smooth">
      <body className="antialiased bg-bg-main text-text-main selection:bg-primary/30 selection:text-white" style={{ fontFamily: '"Expo Arabic", "expoArabic", sans-serif' }}>
        <ThemeProvider>
          <LoadingScreen />
          <Suspense fallback={null}>
            <NavigationProgress />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
