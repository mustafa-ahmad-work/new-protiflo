"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server, Layout, Database, Wrench, GraduationCap,
  Sparkles, CheckCircle2,
  HardDrive, Terminal, ShieldCheck, Code2, Layers, Cpu, Puzzle,
  Layers3
} from "lucide-react";
import {
  SiPhp, SiLaravel, SiReact, SiJavascript, SiHtml5,
  SiTailwindcss, SiMysql, SiGit, SiGithub, SiLivewire, SiPython
} from "react-icons/si";
import Section from "../../components/Section";
import { Reveal, StaggerContainer, StaggerItem } from "../../../components/layout/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface LearningItem {
  title: string;
  desc: string;
}

interface TechItem {
  name: string;
  role: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }> | null;
  iconColor?: string;
}

interface TechCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; className?: string }> | null;
  accentColor: string;
  insight: string;
  items: TechItem[];
}

const learningIcons = [
  { icon: Code2, num: "01" },
  { icon: Layers, num: "02" },
  { icon: Cpu, num: "03" },
  { icon: ShieldCheck, num: "04" },
  { icon: Puzzle, num: "05" },
];

export default function TechStack() {
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("all");

  const rawLearning = t("techSection.learningItems", { returnObjects: true });
  const learningItems: LearningItem[] = Array.isArray(rawLearning) ? (rawLearning as LearningItem[]) : [];

  const categories: TechCategory[] = [
    {
      id: "backend",
      title: t("techSection.cards.backend.title"),
      subtitle: t("techSection.cards.backend.subtitle"),
      icon: Server,
      accentColor: "#5337FF",
      insight: t("techSection.cards.backend.insight"),
      items: [
        {
          name: "Laravel",
          role: t("techSection.cards.backend.laravelRole"),
          desc: t("techSection.cards.backend.laravelDesc"),
          icon: SiLaravel,
          iconColor: "#FF2D20",
        },
        {
          name: "PHP 8+",
          role: t("techSection.cards.backend.phpRole"),
          desc: t("techSection.cards.backend.phpDesc"),
          icon: SiPhp,
          iconColor: "#777BB4",
        },
        {
          name: "Filament PHP",
          role: isRTL ? "لوحات تحكم وإدارة عصرية" : "Modern Admin Panels",
          desc: t("techSection.cards.backend.filamentDesc"),
          icon: null,
        },
        {
          name: "Livewire",
          role: isRTL ? "واجهات تفاعلية حية" : "Real-time Reactivity",
          desc: t("techSection.cards.backend.livewireDesc"),
          icon: SiLivewire,
          iconColor: "#FB70A9",
        },
      ],
    },
    {
      id: "frontend",
      title: t("techSection.cards.frontend.title"),
      subtitle: t("techSection.cards.frontend.subtitle"),
      icon: Layout,
      accentColor: "#06B6D4",
      insight: t("techSection.cards.frontend.insight"),
      items: [
        {
          name: "React",
          role: isRTL ? "مكتبة واجهات تفاعلية" : "UI Library",
          desc: t("techSection.cards.frontend.reactDesc"),
          icon: SiReact,
          iconColor: "#61DAFB",
        },
        {
          name: "JavaScript (ES6+)",
          role: isRTL ? "منطق وبرمجة حديثة" : "Modern Scripting",
          desc: t("techSection.cards.frontend.jsDesc"),
          icon: SiJavascript,
          iconColor: "#F7DF1E",
        },
        {
          name: "Tailwind CSS",
          role: isRTL ? "تنسيق متجاوب وسريع" : "Utility-First Styling",
          desc: t("techSection.cards.frontend.tailwindDesc"),
          icon: SiTailwindcss,
          iconColor: "#06B6D4",
        },
        {
          name: "HTML5 & CSS3",
          role: isRTL ? "بنية دلالية وتخطيطات متقدمة" : "Semantic Standards & Grid",
          desc: t("techSection.cards.frontend.cssDesc"),
          icon: SiHtml5,
          iconColor: "#E34F26",
        },
      ],
    },
    {
      id: "database",
      title: t("techSection.cards.database.title"),
      subtitle: t("techSection.cards.database.subtitle"),
      icon: Database,
      accentColor: "#38BDF8",
      insight: t("techSection.cards.database.insight"),
      items: [
        {
          name: "MySQL RDBMS",
          role: t("techSection.cards.database.mysqlRole"),
          desc: t("techSection.cards.database.mysqlDesc"),
          icon: SiMysql,
          iconColor: "#4479A1",
        },
        {
          name: isRTL ? "تصميم المخططات والعلاقات" : "Relational Schema & ERD",
          role: "1:1, 1:N, M:N Architecture",
          desc: isRTL ? "هيكلة الجداول والمفاتيح الأساسية والأجنبية لضمان سلامة التخزين والربط المنطقي." : "Designing normalized schemas, primary/foreign keys, and relational constraints.",
          icon: HardDrive,
          iconColor: "#38BDF8",
        },
        {
          name: isRTL ? "الاستعلامات والفهارس" : "Indexing & Query Optimization",
          role: "High Performance",
          desc: isRTL ? "كتابة استعلامات سريعة واستخدام الـ Indexes لتسريع استرجاع البيانات وتقليل العبء." : "Optimizing queries and leveraging indexes for minimal execution time and server load.",
          icon: Terminal,
          iconColor: "#38BDF8",
        },
        {
          name: isRTL ? "سلامة البيانات ومعاملات ACID" : "Data Integrity & Transactions",
          role: "Atomic Reliability",
          desc: isRTL ? "الاعتماد على Database Transactions لضمان إتمام العمليات المترابطة بالكامل أو التراجع بأمان." : "Using DB transactions to ensure complex multi-step operations commit reliably or roll back safely.",
          icon: ShieldCheck,
          iconColor: "#38BDF8",
        },
      ],
    },
    {
      id: "tools",
      title: t("techSection.cards.tools.title"),
      subtitle: t("techSection.cards.tools.subtitle"),
      icon: Wrench,
      accentColor: "#F59E0B",
      insight: t("techSection.cards.tools.insight"),
      items: [
        {
          name: "Git",
          role: isRTL ? "تتبع التعديلات والفروع" : "Version Control",
          desc: t("techSection.cards.tools.gitDesc"),
          icon: SiGit,
          iconColor: "#F05032",
        },
        {
          name: "GitHub",
          role: isRTL ? "حفظ المستودعات والتعاون" : "Code Collaboration",
          desc: t("techSection.cards.tools.githubDesc"),
          icon: SiGithub,
          iconColor: "#FFFFFF",
        },
        {
          name: "Laragon",
          role: isRTL ? "بيئة خادم محلية سريعة" : "Local Dev Environment",
          desc: t("techSection.cards.tools.laragonDesc"),
          icon: null,
        },
        {
          name: "Python",
          role: isRTL ? "أتمتة وسكربتات برمجية" : "Automation & Scripts",
          desc: isRTL ? "بناء سكربتات للأتمتة ومعالجة البيانات والمهام الخلفية المساندة." : "Building utility scripts for automated tasks, data parsing, and backend workflows.",
          icon: SiPython,
          iconColor: "#3776AB",
        },
      ],
    },
  ];

  const filterTabs = [
    { id: "all", label: isRTL ? "كافة التقنيات" : "All Technologies", icon: Layers3 },
    { id: "backend", label: "Backend", icon: Server },
    { id: "frontend", label: "Frontend", icon: Layout },
    { id: "database", label: "Database", icon: Database },
    { id: "tools", label: isRTL ? "الأدوات والبيئة" : "Tools & DevOps", icon: Wrench },
  ];

  const displayedCategories = activeTab === "all"
    ? categories
    : categories.filter((c) => c.id === activeTab);

  return (
    <Section id="tech" className="py-24 bg-bg-main border-t border-white/10 relative w-full overflow-hidden">
      {/* Ambient background blur */}
      {/* <div
        className="absolute top-1/4 -left-20 w-125 h-125 bg-primary/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-20 w-125 h-125 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      /> */}

      <div className="w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4">
              <Sparkles size={14} />
              <span>{t("techSection.badge")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
              {t("techSection.title")}
            </h2>
            <p className="text-sm sm:text-base text-text-muted font-normal leading-relaxed">
              {t("techSection.subtitle")}
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1 px-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                    : "bg-bg-surface/80 border border-white/10 text-text-muted hover:text-white hover:border-white/20"
                    }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Categories Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-8 mb-20 ${activeTab === "all"
              ? "grid-cols-1 lg:grid-cols-2"
              : "grid-cols-1 max-w-4xl mx-auto"
              }`}
          >
            {displayedCategories.map((category) => {
              const CategoryIcon = category?.icon;
              return (
                <div
                  key={category.id}
                  className="rounded-3xl p-6 sm:p-8 bg-bg-surface border border-white/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
                >
                  {/* Subtle category accent gradient bar at top */}
                  {/* <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: category.accentColor }}
                  /> */}

                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/10">
                      <div className="flex items-center gap-3.5">
                        {
                          CategoryIcon ? <div
                            className="w-12 h-12 rounded-2xl bg-bg-main border border-white/10 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform"
                            style={{ color: category.accentColor }}
                          >
                            <CategoryIcon size={24} />
                          </div> :
                            <span
                              className="text-lg font-black"
                              style={{ color: category.accentColor }}
                              aria-hidden="true"
                            >
                              {category.title === "Filament" ? "F" : "L"}
                            </span>
                        }

                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            {category.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
                            {category.subtitle}
                          </p>
                        </div>
                      </div>
                      {/* <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-bg-main border border-white/10 text-text-muted">
                        {category.items.length} {isRTL ? "تقنيات" : "Techs"}
                      </span> */}
                    </div>

                    {/* Tech Items - 2x2 responsive grid inside category */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {category.items.map((tech) => {
                        const TechIcon = tech.icon;
                        return (
                          <div
                            key={tech.name}
                            className="p-4 rounded-2xl bg-bg-main/90 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group/item hover:bg-bg-main"
                          >
                            <div>
                              {/* Header: Icon + Name + Role */}
                              <div className="flex items-start gap-3 mb-2.5">
                                <div className="w-10 h-10 rounded-xl bg-bg-surface border border-white/10 flex items-center justify-center shrink-0 shadow-sm group-hover/item:scale-105 transition-transform">
                                  {TechIcon ? (
                                    <TechIcon
                                      size={20}
                                      className={tech.iconColor ? "" : "text-primary"}
                                      {...(tech.iconColor ? { style: { color: tech.iconColor } } : {})}
                                    />
                                  ) : null}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
                                    {tech.name}
                                  </h4>
                                  <span className="text-[10px] text-primary/90 font-medium inline-block mt-0.5">
                                    {tech.role}
                                  </span>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-xs text-text-muted leading-relaxed">
                                {tech.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Footer Architectural Insight */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2.5 text-xs text-text-muted bg-bg-main/40 -mx-6 -mb-6 p-4 sm:-mx-8 sm:-mb-8 sm:p-5">
                    <CheckCircle2 size={16} className="text-primary shrink-0" />
                    <span className="leading-relaxed font-medium text-gray-300">
                      {category.insight}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Continuous Engineering Deepening ("أتعلم حاليًا") */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl p-6 sm:p-10 bg-bg-surface border border-white/10 shadow-xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full mb-3 shadow-sm">
                  <GraduationCap size={16} />
                  <span>{t("techSection.learningBadge")}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {t("techSection.learningTitle")}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-xl leading-relaxed">
                {t("techSection.learningSubtitle")}
              </p>
            </div>

            {/* 5 Engineering Topics */}
            <StaggerContainer staggerDelay={0.08}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {learningItems.map((item, i) => {
                  const meta = learningIcons[i % learningIcons.length];
                  const Icon = meta.icon;
                  return (
                    <StaggerItem key={i}>
                      <div className="p-5 rounded-2xl bg-bg-main border border-white/10 hover:border-primary/40 transition-all duration-300 h-full flex flex-col justify-between group/learn shadow-md">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-bg-surface flex items-center justify-center text-primary border border-white/10 group-hover/learn:scale-110 transition-transform shadow-sm">
                              <Icon size={18} />
                            </div>
                            <span className="text-xs font-mono font-bold text-text-muted/40 group-hover/learn:text-primary transition-colors">
                              {meta.num}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-white mb-2 group-hover/learn:text-primary transition-colors">
                            {item.title}
                          </h4>

                          <p className="text-xs text-text-muted leading-relaxed font-normal">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </div>
            </StaggerContainer>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
