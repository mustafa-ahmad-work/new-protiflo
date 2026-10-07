"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ScrollToTop() {
  const { isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setIsVisible(window.scrollY > 500);
      ticking = false;
    };
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          aria-label={isRTL ? "الرجوع لأعلى الصفحة" : "Scroll to top"}
          className="fixed bottom-6 right-6 z-999 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:bg-primary-hover cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 border border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
