"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    // Only enable custom cursor on non-touch devices with fine precision pointers
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      document.documentElement.classList.add("custom-cursor-active");
    }
  }, []);

  return null;
}
