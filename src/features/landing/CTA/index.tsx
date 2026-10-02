"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles, Send } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function CTA() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-24 relative overflow-hidden bg-bg-main">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-8 sm:p-14 lg:p-20 rounded-3xl text-center border border-white/10 shadow-2xl overflow-hidden relative bg-bg-surface"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 bg-primary rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 shadow-md shadow-primary/30"
          >
            <Sparkles size={14} /> <span>{t("cta.badge")}</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-snug text-white max-w-4xl mx-auto">
            {t("cta.title")} <br />
            <span className="text-primary">{t("cta.titleHighlight")}</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
            {t("cta.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold flex items-center gap-3 transition-all text-xs shadow-lg shadow-primary/30"
            >
              <span>{t("cta.startProject")}</span>
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </motion.a>
            <motion.a
              href="https://wa.me/201092434027"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-bg-main border border-white/20 text-white rounded-full font-bold flex items-center gap-3 hover:bg-white/10 transition-all text-xs"
            >
              <Send size={18} className="text-primary" /> <span>{t("cta.whatsappConsult")}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
