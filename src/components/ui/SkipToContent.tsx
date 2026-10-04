import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-9999 px-4 py-2 bg-primary text-white font-bold rounded-xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all"
    >
      تخطي إلى المحتوى الرئيسي / Skip to main content
    </a>
  );
}
