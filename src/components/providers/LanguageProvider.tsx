"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

export type Language = "ar" | "en";
export type Direction = "rtl" | "ltr";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, options?: Record<string, any>) => any;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const [language, setLanguageState] = useState<Language>("ar");
  const [mounted, setMounted] = useState(false);
  const [, startTransition] = useTransition();

  const applyLanguage = (lang: Language) => {
    const dir: Direction = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language | null;
    let initialLang: Language = "ar";

    if (saved && (saved === "ar" || saved === "en")) {
      initialLang = saved;
    } else {
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (browserLang === "ar" || browserLang === "en") {
        initialLang = browserLang as Language;
      }
    }

    setLanguageState(initialLang);
    applyLanguage(initialLang);
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    startTransition(() => {
      setLanguageState(lang);
      localStorage.setItem("portfolio_lang", lang);
      applyLanguage(lang);
    });
  };

  const toggleLanguage = () => {
    const nextLang = language === "ar" ? "en" : "ar";
    setLanguage(nextLang);
  };

  const direction: Direction = language === "ar" ? "rtl" : "ltr";
  const isRTL = direction === "rtl";

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isRTL,
        setLanguage,
        toggleLanguage,
        t,
        mounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
