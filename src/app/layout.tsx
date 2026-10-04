import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import LoadingScreen from "@/components/layout/LoadingScreen";
import NavigationProgress from "@/components/layout/NavigationProgress";
import { Suspense } from "react";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ScrollProgressBar from "@/components/layout/ScrollProgressBar";
import { SkipToContent } from "@/components/ui/SkipToContent";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mustafa-ahmad.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "مصطفى أحمد | مطور Full-Stack (Laravel & React)",
    template: "%s | مصطفى أحمد",
  },
  description:
    "مصطفى أحمد - مهندس برمجيات ومطور Full-Stack متخصص في بناء حلول الويب المتقدمة والأنظمة الإدارية ولوحات التحكم وتطبيقات الويب عالية الأداء باستخدام Laravel وReact وNext.js وPHP.",
  keywords: [
    "مصطفى أحمد",
    "Mustafa Ahmad",
    "مطور Full-Stack",
    "مطور لارافيل",
    "Laravel Developer",
    "React Developer",
    "Next.js Developer",
    "مهندس برمجيات",
    "Full Stack Software Engineer",
    "تطوير مواقع الويب",
    "أنظمة إدارية ولوحات تحكم",
    "ERP Systems",
    "RESTful API Development",
    "PHP Developer",
  ],
  authors: [{ name: "Mustafa Ahmad", url: siteUrl }],
  creator: "Mustafa Ahmad",
  publisher: "Mustafa Ahmad",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "ar": siteUrl,
      "en": `${siteUrl}?lang=en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "Mustafa Ahmad | Full-Stack Developer Portfolio",
    title: "مصطفى أحمد | مطور Full-Stack (Laravel & React)",
    description:
      "معرض أعمال مصطفى أحمد - مهندس برمجيات متخصص في بناء تطبيقات ويب احترافية وأنظمة متكاملة باستخدام Laravel وReact.",
    images: [
      {
        url: "/images/mustafa.png",
        width: 1200,
        height: 630,
        alt: "Mustafa Ahmad - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "مصطفى أحمد | مطور Full-Stack",
    description:
      "مهندس برمجيات ومطور Full-Stack متخصص في بناء حلول الويب المتقدمة والأنظمة الإدارية.",
    images: ["/images/mustafa.png"],
    creator: "@mustafa_ahmad",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mustafa Ahmad",
  alternateName: "مصطفى أحمد",
  jobTitle: "Full-Stack Developer & Software Engineer",
  url: siteUrl,
  image: `${siteUrl}/images/mustafa.png`,
  sameAs: [
    "https://github.com/mustafa-ahmad-work",
    "https://linkedin.com/in/mustafa-ahmad-work",
    "https://wa.me/201120354592",
  ],
  knowsAbout: [
    "Laravel",
    "PHP",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "REST APIs",
    "MySQL",
    "PostgreSQL",
    "ERP Architecture",
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mustafa Ahmad Portfolio",
  alternateName: "بورتفوليو مصطفى أحمد",
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${expoArabic.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="antialiased bg-bg-main text-text-main selection:bg-primary/30 selection:text-white">
        <SkipToContent />
        <CustomCursor />
        <SmoothScrollProvider>
          <LanguageProvider>
            <ScrollProgressBar />
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
