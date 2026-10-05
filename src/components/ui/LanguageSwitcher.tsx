"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "button" | "compact";
  id?: string;
}

export default function LanguageSwitcher({
  className = "",
  variant = "pill",
  id = "default",
}: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage, mounted } = useLanguage();

  if (!mounted) {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-full bg-bg-surface/60 border border-white/10 opacity-70 ${className}`}
        style={{ minWidth: variant === "compact" ? "65px" : "135px", height: "36px" }}
      />
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-bg-surface/80 hover:bg-bg-surface border border-white/20 text-xs font-bold text-white transition-all duration-200 shadow-md cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
        aria-label={language === "ar" ? "التبديل إلى اللغة الإنجليزية" : "Switch to Arabic language"}
        title={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      >
        <Globe size={13} className="text-primary shrink-0" />
        <span className="uppercase text-[11px] font-extrabold tracking-wider">
          {language === "ar" ? "EN" : "عربي"}
        </span>
      </button>
    );
  }

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-gray-200 hover:text-white transition-all duration-300 shadow-sm cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
        aria-label={language === "ar" ? "التبديل إلى اللغة الإنجليزية" : "Switch to Arabic language"}
        title={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
      >
        <Globe size={14} className="text-primary shrink-0" />
        <span>{language === "ar" ? "English" : "العربية"}</span>
      </button>
    );
  }

  const activeLayoutId = `activeLangTab_${id}`;

  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-bg-surface/80 border border-white/15 backdrop-blur-md shadow-lg shrink-0 ${className}`}
      dir="ltr"
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("ar")}
        className={`relative px-3 py-1 rounded-full text-xs font-bold transition-colors duration-200 flex items-center justify-center cursor-pointer ${
          language === "ar" ? "text-white" : "text-gray-400 hover:text-gray-200"
        }`}
        aria-pressed={language === "ar"}
      >
        {language === "ar" && (
          <motion.div
            layoutId={activeLayoutId}
            className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/40 -z-10"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <span>العربية</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`relative px-3 py-1 rounded-full text-xs font-bold transition-colors duration-200 flex items-center justify-center cursor-pointer ${
          language === "en" ? "text-white" : "text-gray-400 hover:text-gray-200"
        }`}
        aria-pressed={language === "en"}
      >
        {language === "en" && (
          <motion.div
            layoutId={activeLayoutId}
            className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/40 -z-10"
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
          />
        )}
        <span>English</span>
      </button>
    </div>
  );
}
