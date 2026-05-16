"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalLines = [
  { text: 'Initializing Mostafa OS v2.0...', color: 'text-gray-500' },
  { text: 'Loading backend modules (Laravel 10.x)...', color: 'text-white' },
  { text: 'Injecting React.js hydration layers...', color: 'text-purple-400' },
  { text: 'Establishing secure MySQL handshake...', color: 'text-green-500' },
  { text: 'Optimizing V8 engine performance...', color: 'text-yellow-500' },
  { text: 'Starting Portfolio interface...', color: 'text-white' },
  { text: 'Done! Welcome, visitor.', color: 'text-green-500 font-bold' },
];

export default function LoadingScreen() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 400 + Math.random() * 300);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsFinished(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4"
        >
          <div className="terminal-window w-full max-w-[700px] bg-[#0f0f12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="terminal-header bg-[#1c1c20] p-4 flex items-center gap-2 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-gray-500 font-mono">mostafa-os — zsh</span>
            </div>
            <div className="terminal-body p-6 font-mono text-sm min-h-[300px]">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={`mb-2 ${line.color}`}>
                  <span className="text-purple-500 mr-2">➜</span>
                  {line.text}
                </div>
              ))}
              {visibleLines < terminalLines.length && (
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">➜</span>
                  <div className="w-2 h-5 bg-white/50 animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
