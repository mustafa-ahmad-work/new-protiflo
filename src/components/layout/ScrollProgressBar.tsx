"use client";

import { motion, useScroll } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ScrollProgressBar() {
  const { isRTL } = useLanguage();
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-primary shadow-[0_0_8px_rgba(83,55,255,0.8)]"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: isRTL ? "right" : "left",
      }}
      aria-hidden="true"
    />
  );
}
