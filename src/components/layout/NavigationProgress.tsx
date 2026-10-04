"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When path or search changes, trigger a quick "loading" bar
    const startTimer = setTimeout(() => {
      setLoading(true);
    }, 0);

    const endTimer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: "100%", opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed top-0 left-0 h-1 bg-linear-to-r from-purple-500 to-blue-500 z-10000 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        />
      )}
    </AnimatePresence>
  );
}
