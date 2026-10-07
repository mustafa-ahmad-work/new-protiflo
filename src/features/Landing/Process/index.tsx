"use client";

import { Search, Compass, Code2, ShieldCheck, RefreshCw, Workflow } from "lucide-react";
import Section from "../../components/Section";
import { Reveal } from "../../../components/layout/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

const stepMeta = [
  {
    icon: Search,
    phaseAr: "المرحلة الأولى",
    phaseEn: "Phase 01",
    subtitleAr: "تحليل المشكلة والمتطلبات",
    subtitleEn: "Problem Analysis & Scoping",
    roleAr: "استيعاب الاحتياج الفعلي للأعمال",
    roleEn: "Core Business Understanding",
    deliverablesAr: ["تحليل المتطلبات", "تحديد النطاق", "استكشاف التحديات", "صياغة الأهداف"],
    deliverablesEn: ["Requirements Analysis", "Scope Definition", "Risk Assessment", "Goal Alignment"],
  },
  {
    icon: Compass,
    phaseAr: "المرحلة الثانية",
    phaseEn: "Phase 02",
    subtitleAr: "التخطيط والمعمارية البرمجية",
    subtitleEn: "Architecture & Data Modeling",
    roleAr: "هيكلة النظام وقواعد البيانات",
    roleEn: "System Mapping & ERD Design",
    deliverablesAr: ["تصميم المخطط (ERD)", "هيكلة الـ APIs", "اختيار الأدوات", "معمارية النظام"],
    deliverablesEn: ["Database Schema (ERD)", "API Contracts", "Tool Selection", "System Architecture"],
  },
  {
    icon: Code2,
    phaseAr: "المرحلة الثالثة",
    phaseEn: "Phase 03",
    subtitleAr: "التطوير البرمجي والتنفيذ",
    subtitleEn: "Implementation & Engineering",
    roleAr: "كتابة كود نظيف وتطوير تدريجي",
    roleEn: "Clean Code & Incremental Sprints",
    deliverablesAr: ["Laravel Backend", "RESTful APIs", "React Components", "Clean Code / OOP"],
    deliverablesEn: ["Laravel Backend", "RESTful APIs", "React Components", "Clean Code / OOP"],
  },
  {
    icon: ShieldCheck,
    phaseAr: "المرحلة الرابعة",
    phaseEn: "Phase 04",
    subtitleAr: "الاختبار ومراقبة الجودة",
    subtitleEn: "Quality Assurance & Testing",
    roleAr: "ضمان الاستقرار وسد الثغرات",
    roleEn: "Verifying Critical Paths & Logic",
    deliverablesAr: ["اختبار الوظائف", "فحص الصلاحيات والأمان", "معالجة الحالات الحدية", "مراقبة الأداء"],
    deliverablesEn: ["Unit & Feature Testing", "Security Checks", "Edge Cases", "Performance Monitoring"],
  },
  {
    icon: RefreshCw,
    phaseAr: "المرحلة الخامسة",
    phaseEn: "Phase 05",
    subtitleAr: "التحسين وإعادة الهيكلة",
    subtitleEn: "Refactoring & Evolution",
    roleAr: "تطوير مستمر واستدامة طويلة",
    roleEn: "Sustainable Code & Scaling",
    deliverablesAr: ["إعادة هيكلة الشيفرة", "تحسين الاستعلامات", "التوثيق البرمجي", "سهولة الصيانة"],
    deliverablesEn: ["Code Refactoring", "Query Optimization", "Documentation", "Future-Proofing"],
  },
];

export default function Process() {
  const { t, isRTL } = useLanguage();
  const rawSteps = t("process.steps", { returnObjects: true });
  const steps: ProcessStep[] = Array.isArray(rawSteps) ? (rawSteps as ProcessStep[]) : [];

  return (
    <Section className="border-t border-white/10 py-24 bg-bg-main">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/10 mb-4 sm:mb-5">
          <Workflow size={14} />
          <span>{t("process.badge")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug mb-3 sm:mb-4">
          {t("process.title")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
          {t("process.subtitle")}
        </p>
      </div>

      {/* Steps List - Exactly identical layout to Experience */}
      <div className="w-full max-sm:px-2">
        <div className="space-y-12">
          {steps.map((step: ProcessStep, i: number) => {
            const meta = stepMeta[i % stepMeta.length];
            const Icon = meta.icon;
            const phaseBadge = isRTL ? meta.phaseAr : meta.phaseEn;
            const phaseSubtitle = isRTL ? meta.subtitleAr : meta.subtitleEn;
            const stepRole = isRTL ? meta.roleAr : meta.roleEn;
            const deliverables = isRTL ? meta.deliverablesAr : meta.deliverablesEn;

            return (
              <Reveal key={i} delay={i * 0.1} width="100%">
                <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8 group w-full">
                  {/* Left Side: Meta Info */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl md:text-7xl font-black text-white/10 group-hover:text-primary/20 transition-colors">
                        0{i + 1}
                      </span>
                      <div className="h-0.5 grow bg-linear-to-r from-primary/40 to-transparent" />
                    </div>
                    <div className="space-y-2 px-2">
                      <div className="text-[11px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 w-fit px-3 py-1 rounded-md">
                        {phaseBadge}
                      </div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <Icon size={14} className="text-primary" />
                        {phaseSubtitle}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Content Card */}
                  <div className="relative">
                    <div className="glass-card p-8 sm:p-10 hover:border-primary/50 transition-all duration-500 relative bg-bg-surface border border-white/10 rounded-3xl shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="space-y-2">
                          <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-primary transition-colors tracking-tight">
                            {step.title}
                          </h3>
                          <div className="text-sm font-bold text-text-muted flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon size={14} className="text-primary" />
                            </div>
                            {stepRole}
                          </div>
                        </div>
                        {/* <div className="w-12 h-12 rounded-2xl bg-bg-main border border-white/10 flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/30 transition-all shadow-sm shrink-0">
                          <ArrowUpRight size={22} />
                        </div> */}
                      </div>

                      <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-8 font-normal">
                        {step.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {deliverables.map((item: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3.5 py-1.5 bg-bg-main border border-white/10 rounded-xl text-[10px] font-bold text-gray-200 uppercase tracking-wider group-hover:border-primary/30 transition-all"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
