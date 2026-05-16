import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Mostafa Ahmed | Software Engineer",
  description: "Crafting Digital Architecture with Laravel & React",
};

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavigationProgress from "@/components/layout/NavigationProgress";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
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
