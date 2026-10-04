"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ScrollProgressBar() {
  const { isRTL } = useLanguage();
  const { scrollYProgress } = useScroll();

  // Snappy yet smooth spring physics for the scroll bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3.5px] z-[9999] pointer-events-none bg-primary shadow-[0_0_12px_rgba(83,55,255,0.85)]"
      style={{
        scaleX,
        transformOrigin: isRTL ? "right" : "left",
      }}
      aria-hidden="true"
    />
  );
}
