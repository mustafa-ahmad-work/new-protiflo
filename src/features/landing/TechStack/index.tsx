"use client";

import { motion } from "framer-motion";
import {
  Server, Layout, Database, Wrench, GraduationCap,
  Code2, Layers, Cpu, CheckCircle2, ShieldCheck,
  Puzzle, Sparkles, Terminal, HardDrive
} from "lucide-react";
import {
  SiPhp, SiLaravel, SiReact, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiMysql, SiGit, SiGithub
} from "react-icons/si";
import Section from "../../components/Section";
import { StaggerContainer, StaggerItem, Reveal } from "../../../components/layout/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface LearningItem {
  title: string;
  desc: string;
}

const learningIcons = [
  { icon: Code2, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", hover: "hover:border-blue-500/40" },
  { icon: Layers, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", hover: "hover:border-purple-500/40" },
  { icon: Cpu, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", hover: "hover:border-emerald-500/40" },
  { icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", hover: "hover:border-amber-500/40" },
  { icon: Puzzle, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", hover: "hover:border-pink-500/40" },
];

export default function TechStack() {
  const { t } = useLanguage();
  const rawLearning = t("techSection.learningItems", { returnObjects: true });
  const learningItems: LearningItem[] = Array.isArray(rawLearning) ? (rawLearning as LearningItem[]) : [];

  return (
    <Section id="tech" className="py-24 bg-bg-main border-t border-white/10 relative overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4 sm:mb-5">
          <Sparkles size={14} />
          <span>{t("techSection.badge")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug mb-3 sm:mb-4">
          {t("techSection.title")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
          {t("techSection.subtitle")}
        </p>
      </div>

      {/* Symmetrical 2x2 Bento Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">

        {/* 1. Backend Architecture Card */}
        <Reveal delay={0.05}>
          <div className="h-full rounded-3xl p-7 sm:p-9 bg-bg-surface border border-white/10 hover:border-red-500/30 transition-all duration-300 relative overflow-hidden group shadow-xl flex flex-col justify-between">

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-bg-main border border-red-500/20 flex items-center justify-center text-red-400 shadow-md">
                    <Server size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{t("techSection.cards.backend.title")}</h3>
                    <p className="text-xs text-text-muted">{t("techSection.cards.backend.subtitle")}</p>
                  </div>
                </div>
              </div>

              {/* Technologies Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Laravel */}
                <div className="p-4.5 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-red-500/40 transition-all group/item hover:-translate-y-1 shadow-md">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <SiLaravel size={22} className="text-[#FF2D20]" />
                    </div>
                    <div>
                      <span className="text-base font-bold text-white group-hover/item:text-red-400 transition-colors block">
                        Laravel
                      </span>
                      <span className="text-[10px] text-text-muted">{t("techSection.cards.backend.laravelRole")}</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.backend.laravelDesc")}
                  </p>
                </div>

                {/* PHP */}
                <div className="p-4.5 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-indigo-400/40 transition-all group/item hover:-translate-y-1 shadow-md">
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <SiPhp size={22} className="text-[#777BB4]" />
                    </div>
                    <div>
                      <span className="text-base font-bold text-white group-hover/item:text-indigo-400 transition-colors block">
                        PHP
                      </span>
                      <span className="text-[10px] text-text-muted">{t("techSection.cards.backend.phpRole")}</span>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.backend.phpDesc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Insight Pill */}
            <div className="relative z-10 px-4 py-3 rounded-xl bg-bg-main/40 border border-dashed border-white/10 flex items-center gap-2.5 text-xs text-text-muted">
              <CheckCircle2 size={16} className="text-red-400 shrink-0" />
              <span>{t("techSection.cards.backend.insight")}</span>
            </div>
          </div>
        </Reveal>

        {/* 2. Frontend & User Interface Card */}
        <Reveal delay={0.1}>
          <div className="h-full rounded-3xl p-7 sm:p-9 bg-bg-surface border border-white/10 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden group shadow-xl flex flex-col justify-between">

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-bg-main border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-md">
                    <Layout size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{t("techSection.cards.frontend.title")}</h3>
                    <p className="text-xs text-text-muted">{t("techSection.cards.frontend.subtitle")}</p>
                  </div>
                </div>
              </div>

              {/* Technologies Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mb-6">
                {/* React */}
                <div className="p-3.5 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-cyan-400/40 transition-all group/item hover:-translate-y-1 shadow-md">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <SiReact size={18} className="text-[#61DAFB]" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover/item:text-cyan-400 transition-colors">
                      React
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.frontend.reactDesc")}
                  </p>
                </div>

                {/* JavaScript */}
                <div className="p-3.5 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-yellow-400/40 transition-all group/item hover:-translate-y-1 shadow-md">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                      <SiJavascript size={18} className="text-[#F7DF1E]" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover/item:text-yellow-400 transition-colors">
                      JavaScript
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.frontend.jsDesc")}
                  </p>
                </div>

                {/* Tailwind CSS */}
                <div className="p-3.5 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-sky-400/40 transition-all group/item hover:-translate-y-1 shadow-md">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
                      <SiTailwindcss size={18} className="text-[#06B6D4]" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover/item:text-sky-400 transition-colors">
                      Tailwind
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.frontend.tailwindDesc")}
                  </p>
                </div>

                {/* HTML5 */}
                <div className="p-3.5 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-orange-400/40 transition-all group/item hover:-translate-y-1 shadow-md">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                      <SiHtml5 size={18} className="text-[#E34F26]" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover/item:text-orange-400 transition-colors">
                      HTML5
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.frontend.htmlDesc")}
                  </p>
                </div>

                {/* CSS3 */}
                <div className="p-3.5 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-blue-400/40 transition-all group/item hover:-translate-y-1 shadow-md sm:col-span-2">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <SiCss size={18} className="text-[#1572B6]" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover/item:text-blue-400 transition-colors">
                      {t("techSection.cards.frontend.cssTitle")}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.frontend.cssDesc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Insight Pill */}
            <div className="relative z-10 px-4 py-3 rounded-xl bg-bg-main/40 border border-dashed border-white/10 flex items-center gap-2.5 text-xs text-text-muted">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
              <span>{t("techSection.cards.frontend.insight")}</span>
            </div>
          </div>
        </Reveal>

        {/* 3. Database Architecture Card */}
        <Reveal delay={0.15}>
          <div className="h-full rounded-3xl p-7 sm:p-9 bg-bg-surface border border-white/10 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group shadow-xl flex flex-col justify-between">

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-bg-main border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-md">
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{t("techSection.cards.database.title")}</h3>
                    <p className="text-xs text-text-muted">{t("techSection.cards.database.subtitle")}</p>
                  </div>
                </div>
              </div>

              {/* Technologies Items */}
              <div className="space-y-4 mb-6">
                <div className="p-4.5 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-blue-400/40 transition-all group/item hover:-translate-y-1 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                        <SiMysql size={24} className="text-[#4479A1]" />
                      </div>
                      <div>
                        <span className="text-base font-bold text-white group-hover/item:text-blue-400 transition-colors block">
                          MySQL
                        </span>
                        <span className="text-[10px] text-text-muted">{t("techSection.cards.database.mysqlRole")}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-text-muted px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                      RDBMS
                    </span>
                  </div>

                  <p className="text-xs text-text-muted leading-relaxed font-normal mb-4">
                    {t("techSection.cards.database.mysqlDesc")}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <HardDrive size={14} className="text-blue-400" />
                      <span>{t("techSection.cards.database.schema")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <Terminal size={14} className="text-blue-400" />
                      <span>{t("techSection.cards.database.queries")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                      <ShieldCheck size={14} className="text-blue-400" />
                      <span>{t("techSection.cards.database.integrity")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Insight Pill */}
            <div className="relative z-10 px-4 py-3 rounded-xl bg-bg-main/40 border border-dashed border-white/10 flex items-center gap-2.5 text-xs text-text-muted">
              <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
              <span>{t("techSection.cards.database.insight")}</span>
            </div>
          </div>
        </Reveal>

        {/* 4. Tools & Developer Workflow Card */}
        <Reveal delay={0.2}>
          <div className="h-full rounded-3xl p-7 sm:p-9 bg-bg-surface border border-white/10 hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden group shadow-xl flex flex-col justify-between">

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-bg-main border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-md">
                    <Wrench size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">{t("techSection.cards.tools.title")}</h3>
                    <p className="text-xs text-text-muted">{t("techSection.cards.tools.subtitle")}</p>
                  </div>
                </div>
              </div>

              {/* Technologies Items */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
                {/* Git */}
                <div className="p-4 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-orange-500/40 transition-all group/item hover:-translate-y-1 text-center flex flex-col items-center justify-center shadow-md">
                  <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-2.5">
                    <SiGit size={22} className="text-[#F05032]" />
                  </div>
                  <span className="text-sm font-bold text-white group-hover/item:text-orange-400 transition-colors mb-1">
                    Git
                  </span>
                  <p className="text-[11px] text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.tools.gitDesc")}
                  </p>
                </div>

                {/* GitHub */}
                <div className="p-4 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-white/40 transition-all group/item hover:-translate-y-1 text-center flex flex-col items-center justify-center shadow-md">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-2.5">
                    <SiGithub size={22} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-white group-hover/item:text-primary transition-colors mb-1">
                    GitHub
                  </span>
                  <p className="text-[11px] text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.tools.githubDesc")}
                  </p>
                </div>

                {/* Laragon */}
                <div className="p-4 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-blue-400/40 transition-all group/item hover:-translate-y-1 text-center flex flex-col items-center justify-center shadow-md">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-2.5">
                    <Server size={22} className="text-[#0E86D4]" />
                  </div>
                  <span className="text-sm font-bold text-white group-hover/item:text-blue-400 transition-colors mb-1">
                    Laragon
                  </span>
                  <p className="text-[11px] text-text-muted leading-relaxed font-normal">
                    {t("techSection.cards.tools.laragonDesc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Insight Pill */}
            <div className="relative z-10 px-4 py-3 rounded-xl bg-bg-main/40 border border-dashed border-white/10 flex items-center gap-2.5 text-xs text-text-muted">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
              <span>{t("techSection.cards.tools.insight")}</span>
            </div>
          </div>
        </Reveal>

      </div>

      {/* Section 2: Continuous Engineering Deepening ("أتعلم حاليًا") */}
      <Reveal delay={0.1}>
        <div className="relative rounded-3xl p-8 sm:p-12 bg-bg-card border-white/15 overflow-hidden shadow-2xl">
          {/* Ambient Corner Glow */}

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-3 shadow-sm">
                <GraduationCap size={16} />
                <span>{t("techSection.learningBadge")}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {t("techSection.learningTitle")}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl leading-relaxed">
              {t("techSection.learningSubtitle")}
            </p>
          </div>

          {/* 5 Engineering Topics */}
          <StaggerContainer staggerDelay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
              {learningItems.map((item, i) => {
                const meta = learningIcons[i % learningIcons.length];
                const Icon = meta.icon;
                return (
                  <StaggerItem key={i}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`p-6 rounded-2xl bg-bg-main/80 border border-white/10 ${meta.hover} transition-all duration-300 h-full flex flex-col justify-between group/learn shadow-lg`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className={`w-11 h-11 rounded-xl ${meta.bg} flex items-center justify-center ${meta.color} border ${meta.border} group-hover/learn:scale-110 transition-transform shadow-md`}>
                            <Icon size={20} />
                          </div>
                          <span className="text-xs font-black text-text-muted/40 group-hover/learn:text-primary transition-colors">
                            0{i + 1}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-black text-white mb-2.5 group-hover/learn:text-primary transition-colors">
                          {item.title}
                        </h4>

                        <p className="text-xs text-text-muted leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </Reveal>
    </Section>
  );
}

