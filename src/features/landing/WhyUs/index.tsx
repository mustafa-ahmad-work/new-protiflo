"use client";

import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Code2, Search, Gauge,
  Server, Lock, CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const featureIcons = [
  { icon: Zap, color: "#465FF1" },
  { icon: ShieldCheck, color: "#A999FF" },
  { icon: Code2, color: "#3ECF8E" },
  { icon: Search, color: "#F38020" },
  { icon: Gauge, color: "#61DAFB" },
  { icon: Server, color: "#FF9900" },
];

export default function WhyUs() {
  const { t } = useLanguage();
  const features = (t("whyUs.features", { returnObjects: true }) as any[]) || [];
  const checklist = (t("whyUs.checklist", { returnObjects: true }) as string[]) || [];

  console.log(features);

  return (
    <section id="why-us" className="py-24 bg-bg-main border-t border-white/10 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4 sm:mb-5">
            <span>{t("whyUs.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug mb-3 sm:mb-4">
            {t("whyUs.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
            {t("whyUs.subtitle")}
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((item, idx) => {
            const meta = featureIcons[idx % featureIcons.length];
            const Icon = meta.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-bg-surface p-8 rounded-[20px] border border-white/10 hover:border-primary/60 transition-all group flex flex-col items-start justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-bg-main border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Icon size={24} style={{ color: meta.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed font-normal">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Split Showcase Banner */}
        <div className="bg-bg-surface border border-white/10 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-white bg-primary px-4 py-1.5 rounded-full border border-white/20 shadow-md">
              <Lock size={14} />
              <span>{t("whyUs.bannerBadge")}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {t("whyUs.bannerTitle")}
            </h3>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              {t("whyUs.bannerDesc")}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {checklist.map((check, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-gray-200">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-main rounded-[20px] p-8 border border-white/10 flex flex-col justify-center space-y-6">
            <div className="p-4 bg-bg-surface rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-xs text-text-muted">{t("whyUs.stats.speedLabel")}</span>
              <span className="text-sm font-bold text-primary">{t("whyUs.stats.speedValue")}</span>
            </div>
            <div className="p-4 bg-bg-surface rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-xs text-text-muted">{t("whyUs.stats.securityLabel")}</span>
              <span className="text-sm font-bold text-primary">{t("whyUs.stats.securityValue")}</span>
            </div>
            <div className="p-4 bg-bg-surface rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-xs text-text-muted">{t("whyUs.stats.seoLabel")}</span>
              <span className="text-sm font-bold text-primary">{t("whyUs.stats.seoValue")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
