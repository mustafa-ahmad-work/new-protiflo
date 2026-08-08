"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({ subtitle, title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-24", className)}>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-purple-500 font-mono text-sm uppercase tracking-[0.3em] block mb-4"
      >
        // {subtitle}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-black tracking-tight text-text-main"
      >
        {title}
      </motion.h2>
      {description && (
        <p className="text-text-muted mt-6 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
