"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    // When path or search changes, trigger a quick loading bar
    setLoading(true);
    const endTimer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => {
      clearTimeout(endTimer);
    };
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 to-blue-500 z-10000 shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 pointer-events-none"
      style={{
        animation: "navProgress 0.4s ease-in-out forwards",
      }}
      aria-hidden="true"
    />
  );
}

