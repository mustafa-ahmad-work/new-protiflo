"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Send } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[var(--bg-main)]">
      {/* Background Decorative Elements - Very Subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-12 md:p-32 rounded-[4rem] text-center border-[var(--border-main)] shadow-sm overflow-hidden relative bg-[var(--bg-card)]/40"
        >
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.01] pointer-events-none" style={{ backgroundImage: "url('/grid.svg')" }} />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-purple-600/10 rounded-full border border-purple-500/10 text-purple-500 dark:text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12"
          >
            <Sparkles size={14} /> Final Destination
          </motion.div>
          
          <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-12 leading-[0.9] text-[var(--text-main)] max-w-4xl mx-auto">
            Build your <span className="gradient-text italic font-serif">digital legacy</span> with precision.
          </h2>
          
          <p className="text-lg md:text-2xl text-[var(--text-muted)] mb-16 max-w-2xl mx-auto leading-relaxed font-medium opacity-90">
            Architecting the future of your business through technical excellence and visionary engineering.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <motion.a
              href="#contact"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 bg-purple-600 text-white rounded-3xl font-black flex items-center gap-4 hover:bg-purple-700 transition-all text-xs uppercase tracking-widest shadow-sm"
            >
              Initialize Project <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="mailto:contact@mostafa.dev"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 bg-[var(--bg-card)] border border-[var(--border-main)] text-[var(--text-main)] rounded-3xl font-black flex items-center gap-4 hover:bg-[var(--bg-alt)] transition-all text-xs uppercase tracking-widest"
            >
              <Send size={20} /> Direct Comms
            </motion.a>
          </div>
          
          {/* Decorative Corner Glows - Responsive */}
          <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-purple-600/[0.05] blur-[100px] rounded-full pointer-events-none hidden md:block" />
          <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-blue-600/[0.03] blur-[100px] rounded-full pointer-events-none hidden md:block" />
        </motion.div>
      </div>
    </section>
  );
}
