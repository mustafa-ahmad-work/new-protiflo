"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

type CursorType = "default" | "pointer" | "text" | "not-allowed" | "grab" | "grabbing";

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  return null;
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  // Raw mouse coordinates (Direct 1:1, ZERO lag for pointer precision)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for subtle ambient glow aura
  const springConfig = { damping: 30, stiffness: 380, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const lastPosRef = useRef({ x: -100, y: -100 });
  const isClickingRef = useRef(false);

  useEffect(() => {
    isClickingRef.current = isClicking;
  }, [isClicking]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check fine pointer (mouse / trackpad)
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const timer = setTimeout(() => {
      setIsTouchDevice(!finePointer);
    }, 0);

    if (!finePointer) {
      return () => clearTimeout(timer);
    }

    // Completely hide the OS cursor across the entire application
    document.documentElement.classList.add("custom-cursor-active");

    const resolveCursorType = (target: HTMLElement | null, clicking: boolean): CursorType => {
      if (!target) return "default";

      // 1. Disabled / Not allowed
      if (
        target.closest(":disabled") ||
        target.closest('[aria-disabled="true"]') ||
        target.closest(".cursor-not-allowed") ||
        target.closest(".disabled")
      ) {
        return "not-allowed";
      }

      // 2. Interactive Elements (Pointer)
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input[type='submit']") ||
        target.closest("input[type='button']") ||
        target.closest("select") ||
        target.closest(".cursor-pointer") ||
        target.closest(".swiper-button-next") ||
        target.closest(".swiper-button-prev") ||
        target.closest(".swiper-pagination-bullet") ||
        target.closest("[data-cursor='pointer']")
      ) {
        return "pointer";
      }

      // 3. Text inputs, textarea, contenteditable (Typing mode)
      if (
        target.closest("input:not([type='button']):not([type='submit']):not([type='checkbox']):not([type='radio'])") ||
        target.closest("textarea") ||
        target.closest("[contenteditable='true']") ||
        target.closest(".cursor-text")
      ) {
        return "text";
      }

      // 4. Draggable / Grabbing areas (e.g. Swiper / Carousels)
      if (
        target.closest(".swiper") ||
        target.closest(".swiper-slide") ||
        target.closest(".cursor-grab") ||
        target.closest("[data-cursor='grab']")
      ) {
        return clicking ? "grabbing" : "grab";
      }

      // 5. Selectable readable text content (Paragraphs, Headings, Code)
      const tagName = target.tagName ? target.tagName.toLowerCase() : "";
      const textTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "label", "code", "pre", "blockquote", "figcaption"];
      if (textTags.includes(tagName) || target.closest("p, h1, h2, h3, h4, h5, h6, blockquote, code, pre")) {
        return "text";
      }

      // 6. Fallback to computed CSS cursor property
      try {
        const computedCursor = window.getComputedStyle(target).cursor;
        if (computedCursor === "pointer") return "pointer";
        if (computedCursor === "text") return "text";
        if (computedCursor === "not-allowed") return "not-allowed";
        if (computedCursor === "grab") return clicking ? "grabbing" : "grab";
      } catch {
        // ignore
      }

      return "default";
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const type = resolveCursorType(target, isClickingRef.current);
      setCursorType(type);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      isClickingRef.current = true;

      // Add a ripple feedback ring on click
      const newRipple: ClickRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-3), newRipple]);

      const target = e.target as HTMLElement | null;
      setCursorType(resolveCursorType(target, true));
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsClicking(false);
      isClickingRef.current = false;

      const target = e.target as HTMLElement | null;
      setCursorType(resolveCursorType(target, false));
    };

    const handleScroll = () => {
      if (lastPosRef.current.x >= 0 && lastPosRef.current.y >= 0) {
        const target = document.elementFromPoint(
          lastPosRef.current.x,
          lastPosRef.current.y
        ) as HTMLElement | null;
        setCursorType(resolveCursorType(target, isClickingRef.current));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Clean up ripples after 500ms
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 500);
    return () => clearTimeout(timer);
  }, [ripples]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 overflow-hidden select-none">
      {/* Click Feedback Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="fixed pointer-events-none rounded-full border border-primary bg-primary/20 shadow-[0_0_12px_var(--primary)]"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 32,
              height: 32,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Trailing Ambient Soft Glow (Hides gracefully on text to avoid visual noise) */}
      {/* <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary/25 blur-md pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "text" ? 0 : cursorType === "pointer" ? 36 : 24,
          height: cursorType === "text" ? 0 : cursorType === "pointer" ? 36 : 24,
          opacity: cursorType === "text" ? 0 : cursorType === "not-allowed" ? 0.3 : 0.65,
          backgroundColor:
            cursorType === "not-allowed"
              ? "rgba(239, 68, 68, 0.3)"
              : "var(--primary)",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 24,
        }}
      /> */}

      {/* Precision Zero-Lag Primary Cursor Icon */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: isClicking ? 0.88 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
        }}
      >
        {/* ==================== 1. DEFAULT STATE: Sleek Futuristic Arrow ==================== */}
        {cursorType === "default" && (
          <div
            className="relative"
            style={{
              transform: "translate(-2px, -2px)", // Hotspot at top-left tip (2, 2)
              transformOrigin: "2px 2px",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-[0_2px_8px_rgba(83,55,255,0.7)]"
            >
              <defs>
                <linearGradient id="cursorArrowGrad" x1="2" y1="2" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#4338CA" />
                </linearGradient>
              </defs>
              <path
                d="M2.5 1.5L9.5 21L13 13.5L20.5 10L2.5 1.5Z"
                fill="url(#cursorArrowGrad)"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}

        {/* ==================== 2. POINTER STATE: Sleek Interactive Pointing Hand ==================== */}
        {cursorType === "pointer" && (
          <div
            className="relative"
            style={{
              transform: "translate(-7px, -1px)", // Hotspot at index fingertip (7, 1)
              transformOrigin: "7px 1px",
            }}
          >
            <svg
              width="26"
              height="28"
              viewBox="0 0 26 28"
              fill="none"
              className="drop-shadow-[0_3px_10px_rgba(83,55,255,0.85)]"
            >
              <defs>
                <linearGradient id="cursorHandGrad" x1="4" y1="2" x2="24" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#4F46E5" />
                </linearGradient>
              </defs>
              <path
                d="M8.5 2C8.5 1.17 7.83 0.5 7 0.5S5.5 1.17 5.5 2V13.8L4.6 12.6C4 11.8 2.9 11.7 2.1 12.3C1.4 12.9 1.3 14 1.9 14.7L6.8 21.2C8.1 22.8 10.1 23.8 12.2 23.8H14.7C18.2 23.8 21 21 21 17.5V11C21 10.17 20.33 9.5 19.5 9.5C19.3 9.5 19.1 9.55 18.9 9.64C18.6 8.75 17.8 8.1 16.8 8.1C16.5 8.1 16.2 8.18 15.9 8.32C15.6 7.55 14.8 7 13.9 7C13.7 7 13.5 7.04 13.3 7.12V2C13.3 1.17 12.63 0.5 11.8 0.5S10.3 1.17 10.3 2V8.5H8.5V2Z"
                fill="url(#cursorHandGrad)"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            {/* Interactive fingertip target aura */}
            <motion.div
              className="absolute -top-1 left-1 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]"
              animate={{ scale: [1, 1.35, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* ==================== 3. TEXT / TYPING STATE: Glowing I-Beam ==================== */}
        {cursorType === "text" && (
          <div
            className="relative"
            style={{
              transform: "translate(-8px, -12px)", // Hotspot at exact center (8, 12)
            }}
          >
            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="drop-shadow-[0_0_8px_rgba(83,55,255,0.9)]"
            >
              <defs>
                <linearGradient id="cursorBeamGrad" x1="8" y1="2" x2="8" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              {/* Top serif crossbar */}
              <path d="M3 2.5H13" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M4 2.5H12" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" />

              {/* Vertical core stem */}
              <path d="M8 2.5V21.5" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M8 3.5V20.5" stroke="url(#cursorBeamGrad)" strokeWidth="1.6" strokeLinecap="round" />

              {/* Bottom serif crossbar */}
              <path d="M3 21.5H13" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M4 21.5H12" stroke="var(--primary)" strokeWidth="1.2" strokeLinecap="round" />

              {/* Center precision alignment dot */}
              <circle cx="8" cy="12" r="1.6" fill="#FFFFFF" />
            </svg>

            {/* Subtle typing heartbeat indicator */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/30 pointer-events-none"
              animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* ==================== 4. NOT-ALLOWED STATE: Red Prohibited Indicator ==================== */}
        {cursorType === "not-allowed" && (
          <div
            className="relative"
            style={{
              transform: "translate(-11px, -11px)", // Centered hotspot
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              className="drop-shadow-[0_0_10px_rgba(239,68,68,0.9)]"
            >
              <circle cx="11" cy="11" r="9" fill="rgba(239, 68, 68, 0.2)" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="11" cy="11" r="8.5" stroke="#EF4444" strokeWidth="2" />
              <line x1="4.8" y1="4.8" x2="17.2" y2="17.2" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="4.8" y1="4.8" x2="17.2" y2="17.2" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
        )}

        {/* ==================== 5. GRAB / GRABBING STATE: Drag Carousel Mode ==================== */}
        {(cursorType === "grab" || cursorType === "grabbing") && (
          <div
            className="relative"
            style={{
              transform: "translate(-14px, -14px)", // Centered hotspot
            }}
          >
            <motion.div
              animate={{ scale: cursorType === "grabbing" ? 0.9 : 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="drop-shadow-[0_2px_10px_rgba(83,55,255,0.8)]"
              >
                <rect
                  x="2"
                  y="2"
                  width="24"
                  height="24"
                  rx="12"
                  fill="rgba(83, 55, 255, 0.35)"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                {/* Horizontal arrows indicating draggable area */}
                <path
                  d="M8 14L11.5 10.5M8 14L11.5 17.5M20 14L16.5 10.5M20 14L16.5 17.5"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="14" cy="14" r="2" fill="#FFFFFF" />
              </svg>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
