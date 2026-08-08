"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Code2, Rocket } from "lucide-react";
import DotGrid from "@/components/ui/DotGrid";

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center pt-36 pb-24 overflow-hidden bg-bg-main"
    >
      {/* Interactive React Bits DotGrid Backdrop */}
      <div className="absolute inset-0 z-0 opacity-40">
        <DotGrid
          dotSize={12}
          gap={24}
          baseColor="#363C4B"
          activeColor="#5337FF"
          proximity={140}
          shockRadius={240}
          shockStrength={6}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Radiant Backdrop Lights */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-primary/20 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 blur-[140px] rounded-full" />
      </div>

      <div className="container relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Animated Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a 
            href="https://wa.me/201092434027" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hero-badge-pill inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-bg-surface text-xs font-bold text-gray-200 hover:border-primary/60 transition-all mb-8 cursor-pointer group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span>متاح للمشاريع الجديدة والتعاون الرقمي</span>
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-primary" />
          </a>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.25] tracking-tight max-w-4xl mx-auto">
            نبني البرمجيات <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-[var(--text-muted)] to-[var(--primary)] bg-clip-text text-transparent">
              التي تدفع أعمالك للأمام
            </span>
          </h1>

          <p className="text-base sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed font-normal">
            نحوّل أفكارك إلى منتجات رقمية سريعة، قابلة للتوسع، ومصممة لتحقيق نتائج حقيقية.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto"
        >
          <a
            href="https://wa.me/201092434027"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-xs"
          >
            <Rocket size={18} />
            <span>ابدأ مشروعك</span>
          </a>

          <a
            href="#projects"
            className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-xs"
          >
            <Sparkles size={18} className="text-primary" />
            <span>استكشف أعمالنا</span>
          </a>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-text-muted"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>هندسة أنظمة متكاملة</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>أكواد عالية الأداء والسرعة</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>دعم وحماية متواصلة</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
