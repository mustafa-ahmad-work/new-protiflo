"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative p-2 rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
        isLight
          ? "bg-slate-200/80 hover:bg-slate-300/80 border-slate-300 text-amber-600 shadow-sm"
          : "bg-white/5 hover:bg-white/10 border-white/15 text-indigo-300"
      } ${className}`}
      aria-label={isLight ? "تفعيل الوضع الداكن / Switch to dark mode" : "تفعيل الوضع الفاتح / Switch to light mode"}
      title={isLight ? "الوضع الداكن" : "الوضع الفاتح"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={18} className="text-amber-500 fill-amber-500/20" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ scale: 0.5, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={18} className="text-indigo-400 fill-indigo-400/20" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}

