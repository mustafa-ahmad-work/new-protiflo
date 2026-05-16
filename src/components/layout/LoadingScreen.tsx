"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  { text: 'Initializing Mostafa OS...', color: 'text-gray-400' },
  { text: 'Loading backend modules...', color: 'text-white' },
  { text: 'Injecting React hydration...', color: 'text-purple-400' },
  { text: 'Portfolio interface ready.', color: 'text-green-500 font-bold' },
];

export default function LoadingScreen() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenSplash");
    if (hasSeen) {
      setIsFinished(true);
      setShouldShow(false);
    } else {
      setShouldShow(true);
    }
  }, []);

  useEffect(() => {
    if (!shouldShow) return;

    if (visibleLines < terminalLines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 200 + Math.random() * 150);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsFinished(true);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines, shouldShow]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-[#050508] flex items-center justify-center p-6"
        >
          <div className="w-full max-w-[600px] bg-[#0c0c0e] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-[#1c1c20] px-4 py-3 flex items-center gap-1.5 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest">mostafa-os</span>
            </div>
            <div className="p-8 font-mono text-xs md:text-sm min-h-[200px]">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`mb-3 ${line.color}`}
                >
                  <span className="text-purple-500 mr-2">➜</span>
                  {line.text}
                </motion.div>
              ))}
              {visibleLines < terminalLines.length && (
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">➜</span>
                  <div className="w-2 h-4 bg-white/40 animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
