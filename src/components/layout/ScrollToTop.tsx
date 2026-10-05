"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ScrollToTop() {
  const { isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          aria-label={isRTL ? "الرجوع لأعلى الصفحة" : "Scroll to top"}
          className="fixed bottom-6 right-6 z-999 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:bg-primary-hover cursor-pointer transition-all border border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
