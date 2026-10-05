"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, Lightbulb, TrendingUp, Quote, CheckCircle2 } from "lucide-react";
import Section from "../../components/Section";
import { Reveal, StaggerContainer, StaggerItem } from "../../../components/layout/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface PillarItem {
  title: string;
  desc: string;
  badge?: string;
}

const pillarIcons = [
  {
    icon: Compass,
    accent: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
    badge: "System Thinking",
  },
  {
    icon: Lightbulb,
    accent: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/40",
    badge: "Problem Solving",
  },
  {
    icon: TrendingUp,
    accent: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    hoverBorder: "hover:border-purple-500/40",
    badge: "Architecture",
  },
];

export default function BeyondCode() {
  const { t } = useLanguage();
  const rawPillars = t("beyondCode.pillars", { returnObjects: true });
  const pillars: PillarItem[] = Array.isArray(rawPillars) ? (rawPillars as PillarItem[]) : [];

  return (
    <Section id="beyond-code" className="py-24 bg-bg-main border-t border-white/10 relative overflow-hidden">
      {/* Background Ambience Glow */}
      {/* <div
        className="absolute top-1/3 -left-32 w-96 h-96 bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-0"
        aria-hidden="true"
      /> */}

      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/10 mb-4 sm:mb-5">
          <Sparkles size={14} />
          <span>{t("beyondCode.badge")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug mb-3 sm:mb-4">
          {t("beyondCode.title")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-primary font-bold max-w-2xl leading-relaxed">
          {t("beyondCode.subtitle")}
        </p>
      </div>

      {/* Main 2-Column Balanced Layout filling 7xl container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Philosophy & Golden Quote (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <Reveal>
            <div className="p-8 sm:p-10 rounded-3xl bg-bg-surface border border-white/10 relative overflow-hidden shadow-xl h-full flex flex-col justify-between">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-primary mb-4">
                  <CheckCircle2 size={16} />
                  <span>{t("beyondCode.philosophyBadge")}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-5 leading-snug">
                  {t("beyondCode.philosophyTitle")}
                </h3>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal mb-8">
                  {t("beyondCode.p1")}
                </p>
              </div>

              {/* Callout Box */}
              <div className="relative z-10 p-6 rounded-2xl bg-bg-main/80 border border-primary/20 bg-linear-to-br from-primary/5 via-transparent to-purple-500/5">
                <div className="flex items-start gap-3">
                  <Quote size={28} className="text-primary shrink-0 opacity-80 mt-1" />
                  <div>
                    <p className="text-sm sm:text-base text-white font-medium leading-relaxed italic mb-3">
                      &quot;{t("beyondCode.p2")}&quot;
                    </p>
                    <span className="text-xs font-bold text-primary block">
                      {t("beyondCode.quoteAuthor")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: 3 Structured Engineering Pillars (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5">
          <StaggerContainer staggerDelay={0.1}>
            <div className="flex flex-col gap-4 h-full justify-between">
              {pillars.map((pillar: PillarItem, i: number) => {
                const meta = pillarIcons[i % pillarIcons.length];
                const Icon = meta.icon;
                const badgeText = pillar.badge || meta.badge;
                return (
                  <StaggerItem key={i}>
                    <motion.div
                      whileHover={{ x: -4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`p-6 sm:p-7 rounded-3xl bg-bg-surface border border-white/10 ${meta.hoverBorder} transition-all duration-300 relative overflow-hidden group shadow-lg`}
                    >
                      <div className="flex items-start gap-5">
                        <div
                          className={`w-14 h-14 rounded-2xl ${meta.bg} ${meta.border} border flex items-center justify-center shrink-0 ${meta.accent} group-hover:scale-105 transition-transform shadow-md`}
                        >
                          <Icon size={26} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <h3 className="text-base sm:text-lg font-black text-white group-hover:text-primary transition-colors">
                              {pillar.title}
                            </h3>
                            <span className="text-[10px] font-bold text-text-muted px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                              {badgeText}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </div>
    </Section>
  );
}
