"use client";

import React, { useSyncExternalStore } from "react";
import { useInView } from "react-intersection-observer";

interface ScrollSectionProps {
  id?: string;
  minHeight?: string;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const subscribeHash = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
};

/**
 * ScrollSection provides high-performance, viewport-aware DOM rendering:
 * - Powered by modern `react-intersection-observer` (IntersectionObserver API).
 * - Only mounts and executes child components when approaching the viewport.
 * - Drastically slashes initial DOM size, hydration cost, and JS execution time.
 * - Employs CSS content-visibility: auto + contain-intrinsic-size for 0 Cumulative Layout Shift (CLS = 0).
 * - Proactively loads with a 300px rootMargin so users experience seamless 60/120fps scrolling.
 * - Automatically auto-mounts if targeted directly by URL hash anchor (#id).
 */
export default function ScrollSection({
  id,
  minHeight = "600px",
  rootMargin = "300px 0px",
  triggerOnce = true,
  className = "",
  fallback,
  children,
}: ScrollSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce,
    rootMargin,
  });

  // Track if URL hash directly matches this section (without triggering cascading render warnings)
  const isHashMatched = useSyncExternalStore(
    subscribeHash,
    () => (id && typeof window !== "undefined" ? window.location.hash === `#${id}` : false),
    () => false
  );

  const isVisible = inView || isHashMatched;

  return (
    <div
      ref={ref}
      id={id}
      className={`w-full ${className}`}
      style={{
        minHeight,
        contentVisibility: "auto",
        containIntrinsicSize: `auto ${minHeight}`,
      }}
    >
      {isVisible ? (
        children
      ) : (
        fallback || (
          <div
            className="w-full pointer-events-none transition-opacity duration-300"
            style={{ minHeight }}
            aria-hidden="true"
          />
        )
      )}
    </div>
  );
}
