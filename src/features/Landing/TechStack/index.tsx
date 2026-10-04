"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";

// Swiper core & effect styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Server, Layout, Database, Wrench, GraduationCap,
  Sparkles, CheckCircle2, ChevronLeft, ChevronRight,
  HardDrive, Terminal, ShieldCheck, Code2, Layers, Cpu, Puzzle
} from "lucide-react";
import {
  SiPhp, SiLaravel, SiReact, SiJavascript, SiHtml5,
  SiTailwindcss, SiMysql, SiGit, SiGithub, SiLivewire, SiPython
} from "react-icons/si";
import FilamentIcon from "@/components/ui/FilamentIcon";
import LaragonIcon from "@/components/ui/LaragonIcon";
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
  icon: React.ComponentType<{ size?: number; className?: string }>;
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
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  const rawLearning = t("techSection.learningItems", { returnObjects: true });
  const learningItems: LearningItem[] = Array.isArray(rawLearning) ? (rawLearning as LearningItem[]) : [];

  const categories: TechCategory[] = [
    {
      id: "backend",
      title: t("techSection.cards.backend.title"),
      subtitle: t("techSection.cards.backend.subtitle"),
      icon: Server,
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
          icon: FilamentIcon,
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
          icon: LaragonIcon,
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

  return (<>
    <Section id="tech" className="py-24 bg-bg-main border-t border-white/10 relative w-full overflow-hidden">
      {/* Header Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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

          {/* 3D Carousel Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="w-12 h-12 rounded-2xl bg-bg-surface border border-white/15 hover:border-primary text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer group"
              aria-label="Previous Slide"
            >
              {isRTL ? (
                <ChevronRight size={22} className="group-hover:text-primary transition-colors" />
              ) : (
                <ChevronLeft size={22} className="group-hover:text-primary transition-colors" />
              )}
            </button>

            <button
              onClick={() => swiperInstance?.slideNext()}
              className="w-12 h-12 rounded-2xl bg-bg-surface border border-white/15 hover:border-primary text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer group"
              aria-label="Next Slide"
            >
              {isRTL ? (
                <ChevronLeft size={22} className="group-hover:text-primary transition-colors" />
              ) : (
                <ChevronRight size={22} className="group-hover:text-primary transition-colors" />
              )}
            </button>
          </div>
        </div>
      </div>
    </Section>
    {/* Unconstrained 3D Carousel (Not bound to container, Full Viewport Width, Full Height Cards) */}
    <div className="w-full relative overflow-hidden mb-20">
      <Swiper
        dir={isRTL ? "rtl" : "ltr"}
        key={isRTL ? "tech-3d-rtl" : "tech-3d-ltr"}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={1.15}
        breakpoints={{
          640: {
            slidesPerView: 1.6,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 32,
          },
          1440: {
            slidesPerView: 3.2,
            spaceBetween: 40,
          },
        }}
        speed={650}
        onSwiper={setSwiperInstance}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        coverflowEffect={{
          rotate: 12,
          stretch: 0,
          depth: 160,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-3d-bullet",
          bulletActiveClass: "swiper-3d-bullet-active",
        }}
        className="w-full py-8 items-stretch!"
      >
        {categories.map((category) => {
          const CategoryIcon = category.icon;
          return (
            <SwiperSlide key={category.id} className="flex">
              <div className="w-full h-full rounded-3xl p-7 sm:p-9 bg-bg-surface border border-white/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between shadow-2xl select-none">
                <div>
                  {/* Card Header - Clean, Crisp, Zero Badges */}
                  <div className="flex items-center gap-4 pb-6 mb-6 border-b border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-bg-main border border-white/10 flex items-center justify-center text-primary shadow-md shrink-0">
                      <CategoryIcon size={26} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {category.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-muted mt-0.5 font-normal">
                        {category.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Tech Items List - Spacious, Clean Typography, Zero Badges */}
                  <div className="space-y-3.5">
                    {category.items.map((tech) => {
                      const TechIcon = tech.icon;
                      return (
                        <div
                          key={tech.name}
                          className="flex items-start gap-4 p-4 rounded-2xl bg-bg-main border border-white/10 hover:border-white/20 transition-all"
                        >
                          <div className="w-11 h-11 rounded-xl bg-bg-surface border border-white/10 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            {TechIcon ? (
                              <TechIcon
                                size={22}
                                className={tech.iconColor ? "" : "text-primary"}
                                {...(tech.iconColor ? { style: { color: tech.iconColor } } : {})}
                              />
                            ) : null}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2 mb-1">
                              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                                {tech.name}
                              </h4>
                              <span className="text-[11px] text-text-muted shrink-0 font-normal">
                                {tech.role}
                              </span>
                            </div>
                            <p className="text-xs text-text-muted leading-relaxed font-normal">
                              {tech.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card Footer Insight */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3 text-xs sm:text-sm text-text-muted">
                  <CheckCircle2 size={18} className="text-primary shrink-0" />
                  <span className="leading-relaxed">{category.insight}</span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
    <Section id="tech" className="py-24 bg-bg-main border-t border-white/10 relative w-full overflow-hidden">
      {/* Continuous Engineering Deepening ("أتعلم حاليًا") - Clean, Consistent, Zero Glow */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal delay={0.1}>
          <div className="rounded-3xl p-8 sm:p-12 bg-bg-surface border border-white/10 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {learningItems.map((item, i) => {
                  const meta = learningIcons[i % learningIcons.length];
                  const Icon = meta.icon;
                  return (
                    <StaggerItem key={i}>
                      <div className="p-6 rounded-2xl bg-bg-main border border-white/10 hover:border-primary/40 transition-all duration-300 h-full flex flex-col justify-between group/learn shadow-md">
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-11 h-11 rounded-xl bg-bg-surface flex items-center justify-center text-primary border border-white/10 group-hover/learn:scale-110 transition-transform shadow-sm">
                              <Icon size={20} />
                            </div>
                            <span className="text-xs font-mono font-bold text-text-muted/40 group-hover/learn:text-primary transition-colors">
                              {meta.num}
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-white mb-2.5 group-hover/learn:text-primary transition-colors">
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
  </>);
}
