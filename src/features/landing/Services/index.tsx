"use client";

import { motion } from "framer-motion";
import { 
  Globe, Smartphone, Layout, Palette, Database, 
  Code2, ShieldAlert, Kanban, CloudLightning, ArrowLeft, ArrowRight 
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const serviceIcons = [
  Globe,
  Smartphone,
  Layout,
  Palette,
  Database,
  Code2,
  ShieldAlert,
  Kanban,
  CloudLightning,
];

export default function Services() {
  const { t, isRTL } = useLanguage();
  const rawItems = (t("services.items", { returnObjects: true }) as any[]) || [];

  return (
    <section id="services" className="py-24 bg-bg-main relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4 sm:mb-5">
            <span>{t("services.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug mb-3 sm:mb-4">
            {t("services.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rawItems.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-card p-8 flex flex-col items-start justify-between group hover:border-primary/60 relative overflow-hidden bg-bg-surface border border-white/10 rounded-[20px]"
              >
                {/* Top Badge & Icon */}
                <div className="w-full flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-bg-main border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all shadow-md">
                    <Icon size={26} />
                  </div>
                  <span className="text-[10px] font-bold text-text-muted bg-bg-main px-3 py-1 rounded-full border border-white/10">
                    {service.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed font-normal">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Action */}
                <a
                  href="https://wa.me/201092434027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-white transition-colors pt-4 border-t border-white/10 w-full justify-between"
                >
                  <span>{t("services.requestService")}</span>
                  {isRTL ? (
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  )}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
