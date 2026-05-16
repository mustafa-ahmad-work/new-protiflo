"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function AdminModal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-3xl",
}: AdminModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative w-full ${maxWidth} bg-[var(--admin-bg)] border border-[var(--admin-border)] rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl my-auto transition-colors max-h-[95vh] overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-8 md:mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[var(--admin-text)]">
                  {title}
                </h2>
                <p className="text-[10px] md:text-xs text-[var(--admin-muted)] mt-1 uppercase tracking-widest">
                  {subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 rounded-full hover:bg-[var(--admin-card)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-all"
              >
                <X size={24} />
              </button>
            </div>
            <div className="text-[var(--admin-text)]">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
