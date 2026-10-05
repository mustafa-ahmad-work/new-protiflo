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
}
