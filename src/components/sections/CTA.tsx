"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Send } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-bg-main">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[140px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-12 md:p-24 rounded-[24px] text-center border border-white/10 shadow-2xl overflow-hidden relative bg-bg-surface"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-primary rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-8 shadow-md shadow-[#5337FF]/30"
          >
            <Sparkles size={14} /> <span>دعنا نبدأ الآن</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight text-white max-w-4xl mx-auto">
            ابنِ حضورك ونظامك الرقمي <br />
            <span className="text-primary">بأعلى معايير الإتقان والجودة</span>
          </h2>
          
          <p className="text-base md:text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
            نحوّل الرؤى والأفكار البرمجية إلى منتجات وأنظمة سريعة، موثوقة، وقابلة للتوسع الاستثماري.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold flex items-center gap-3 transition-all text-xs shadow-lg shadow-[#5337FF]/30"
            >
              <span>تواصل لبدء المشروع</span> <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="https://wa.me/201092434027"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-bg-main border border-white/20 text-white rounded-full font-bold flex items-center gap-3 hover:bg-white/10 transition-all text-xs"
            >
              <Send size={18} className="text-primary" /> <span>استشارة مباشرة عبر الواتساب</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
