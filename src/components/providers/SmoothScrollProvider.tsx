"use client";

import { useEffect } from "react";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only enable Lenis on desktop pointer devices; mobile touch devices have native 120Hz hardware scrolling
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let lenisInstance: import("lenis").default | null = null;
    let destroyed = false;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        autoRaf: true,
        autoToggle: true,
      });
    });

    return () => {
      destroyed = true;
      lenisInstance?.destroy();
    };
  }, []);

  return <>{children}</>;
}

