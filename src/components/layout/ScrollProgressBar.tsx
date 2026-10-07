"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ScrollProgressBar() {
  const { isRTL } = useLanguage();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-primary shadow-[0_0_8px_rgba(83,55,255,0.8)] will-change-transform"
      style={{
        transform: "scaleX(0)",
        transformOrigin: isRTL ? "right" : "left",
      }}
      aria-hidden="true"
    />
  );
}

