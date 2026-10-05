import React from "react";

interface ScrollSectionProps {
  id?: string;
  minHeight?: string;
  rootMargin?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * ScrollSection provides high-performance scroll rendering:
 * - Server renders 100% of HTML content (perfect for SEO & crawlers)
 * - Uses native CSS content-visibility: auto to defer layout and paint for offscreen sections
 * - Uses contain-intrinsic-size to prevent layout shifts (CLS = 0)
 */
export default function ScrollSection({
  id,
  minHeight = "600px",
  className = "",
  children,
}: ScrollSectionProps) {
  return (
    <div
      id={id}
      className={`w-full ${className}`}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: `auto ${minHeight}`,
      }}
    >
      {children}
    </div>
  );
}
