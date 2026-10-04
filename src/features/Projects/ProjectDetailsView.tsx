"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, ArrowLeft, ArrowRight, Target, Layout, CheckCircle2,
  AlertCircle, Sparkles, Workflow, Layers, ShieldCheck, ChevronLeft,
  ChevronRight, Maximize2, X, MessageCircle, Code2
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

export interface ProjectWorkflowItem {
  step?: number | string;
  title: string;
  desc: string;
}

export interface ProjectFeatureItem {
  title: string;
  desc: string;
}

export interface ProjectCustomSectionItem {
  title: string;
  content: string;
}

export interface ProjectLocalizedContent {
  title?: string;
  category?: string;
  shortDescription?: string;
  fullDescription?: string;
  problem?: string;
  solution?: string;
  goals?: string[];
  workflow?: ProjectWorkflowItem[];
  features?: ProjectFeatureItem[];
  customSections?: ProjectCustomSectionItem[];
  [key: string]: unknown;
}

export interface FullProjectItem {
  id: number | string;
  slug?: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  images?: string[];
  tags: string[];
  github?: string;
  live?: string;
  isPrivate?: boolean;
  duration?: string;
  ar?: ProjectLocalizedContent;
  en?: ProjectLocalizedContent;
}

interface ProjectDetailsViewProps {
  baseProject: FullProjectItem;
  prevProject?: FullProjectItem;
  nextProject?: FullProjectItem;
}

export default function ProjectDetailsView({
  baseProject,
  prevProject,
  nextProject,
}: ProjectDetailsViewProps) {
  const { isRTL, language } = useLanguage();
  const isEn = language === "en";
  const localized = (isEn ? baseProject.en || baseProject : baseProject.ar || baseProject) as ProjectLocalizedContent;

  const title = (localized.title || baseProject.title) as string;
  const category = (localized.category || baseProject.category) as string;
  const description = (localized.fullDescription || localized.shortDescription || baseProject.description) as string;
  const problem = (localized.problem || "") as string;
  const solution = (localized.solution || "") as string;
  const goals: string[] = Array.isArray(localized.goals) ? localized.goals : [];
  const workflow: ProjectWorkflowItem[] = Array.isArray(localized.workflow) ? localized.workflow : [];
  const features: ProjectFeatureItem[] = Array.isArray(localized.features) ? localized.features : [];
  const customSections: ProjectCustomSectionItem[] = Array.isArray(localized.customSections) ? localized.customSections : [];

  // Gallery images support (any number of images)
  const imageList: string[] =
    Array.isArray(baseProject.images) && baseProject.images.length > 0
      ? baseProject.images
      : [baseProject.image || "/images/projects/1.png"];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prevLocalized = prevProject ? (isEn ? prevProject.en || prevProject : prevProject.ar || prevProject) : null;
  const nextLocalized = nextProject ? (isEn ? nextProject.en || nextProject : nextProject.ar || nextProject) : null;

  return (
    <article className="relative pt-28 sm:pt-36 pb-24 overflow-hidden">
      {/* 1. Header & Breadcrumb */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 relative z-10">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white bg-bg-surface/80 hover:bg-bg-surface px-4 py-2 rounded-full border border-white/10 transition-all group"
          >
            {isRTL ? (
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-primary" />
            ) : (
              <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform text-primary" />
            )}
            <span>{isEn ? "Back to All Projects" : "العودة إلى كافة المشاريع"}</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-muted px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {baseProject.duration || "2024 — 2025"}
            </span>
          </div>
        </div>

        {/* Hero Title & Description */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-xs font-black text-primary">
            <Sparkles size={14} />
            <span>{category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2]">
            {title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-text-muted leading-relaxed font-normal">
            {description}
          </p>

          {/* Action Links & CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {baseProject.live && baseProject.live !== "#" && (
              <a
                href={baseProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-7 py-3 text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary/30"
              >
                <ExternalLink size={15} />
                <span>{isEn ? "Live Project Preview" : "معاينة المشروع أونلاين"}</span>
              </a>
            )}

            {baseProject.github && !baseProject.isPrivate && (
              <a
                href={baseProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bg-surface hover:bg-bg-surface/80 text-white border border-white/15 px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <FaGithub size={16} />
                <span>{isEn ? "Source Code" : "الكود المصدري"}</span>
              </a>
            )}

            <a
              href="https://wa.me/201120354592"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/10 px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
            >
              <MessageCircle size={15} className="text-[#25D366]" />
              <span>{isEn ? "Discuss Similar Project" : "طلب مشروع مماثل"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Interactive Image Gallery (Supports ANY number of images) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 relative z-10">
        <div className="bg-bg-surface/90 border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
          {/* Main Featured Image */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-bg-main border border-white/10 group shadow-inner">
            <Image
              src={imageList[activeImageIndex] || imageList[0]}
              alt={`${title} - Preview ${activeImageIndex + 1}`}
              width={800}
              height={450}
              className="object-cover h-full w-full transition-all duration-700 group-hover:scale-[1.02]"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-bg-main/70 via-transparent to-transparent opacity-40 pointer-events-none" />

            {/* Quick Fullscreen Button */}
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 p-2.5 rounded-xl bg-bg-main/80 hover:bg-bg-main text-white border border-white/20 shadow-lg backdrop-blur-md transition-all cursor-pointer group-hover:scale-105"
              aria-label={isEn ? "Open full size image" : "عرض الصورة بالحجم الكامل"}
              title={isEn ? "Expand" : "تكبير"}
            >
              <Maximize2 size={16} />
            </button>

            {/* Image Counter Badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-bg-main/85 text-xs font-bold text-white border border-white/15 backdrop-blur-md">
              {activeImageIndex + 1} / {imageList.length}
            </div>

            {/* Navigation Arrows if more than 1 image */}
            {imageList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-bg-main/80 hover:bg-primary text-white border border-white/15 transition-all shadow-xl"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-bg-main/80 hover:bg-primary text-white border border-white/15 transition-all shadow-xl"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails Row (if multiple images) */}
          {imageList.length > 1 && (
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {imageList.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 sm:w-32 aspect-video rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${activeImageIndex === idx
                    ? "border-primary scale-105 shadow-md shadow-primary/40"
                    : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>

            <div
              className="relative max-w-6xl max-h-[85vh] w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageList[activeImageIndex]}
                alt="Enlarged project screenshot"
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Problem & Solution Section (Bento Grid) */}
      {(problem || solution) && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Challenge / Problem */}
            {problem && (
              <div className="p-8 sm:p-10 rounded-3xl bg-bg-surface border border-red-500/20 shadow-xl flex flex-col justify-between group hover:border-red-500/40 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 shadow-md">
                    <AlertCircle size={24} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-red-400 block mb-2">
                    {isEn ? "The Engineering Challenge" : "التحدي والمشكلة"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-4 leading-snug">
                    {isEn ? "Root Problem & Pain Points" : "جوهر المشكلة قبل المشروع"}
                  </h3>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
                    {problem}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-red-300/80">
                  <ShieldCheck size={16} className="text-red-400 shrink-0" />
                  <span>{isEn ? "Solved with systematic architecture" : "تم التغلب عليها بهندسة برمجية مدروسة"}</span>
                </div>
              </div>
            )}

            {/* The Solution */}
            {solution && (
              <div className="p-8 sm:p-10 rounded-3xl bg-bg-surface border border-emerald-500/20 shadow-xl flex flex-col justify-between group hover:border-emerald-500/40 transition-all">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 shadow-md">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400 block mb-2">
                    {isEn ? "The Implemented Solution" : "الحل الهندسي المبتكر"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-4 leading-snug">
                    {isEn ? "Architectural & Functional Resolution" : "المنهجية والحل البرمجي"}
                  </h3>
                  <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal">
                    {solution}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-300/80">
                  <Sparkles size={16} className="text-emerald-400 shrink-0" />
                  <span>{isEn ? "Sustainable, scalable system delivery" : "حل مستدام وقابل للتطوير والنمو"}</span>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. Project Goals & Objectives */}
      {goals.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-bg-surface border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Target size={20} />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isEn ? "Project Objectives & Impact" : "أهداف المشروع والنتائج المحققة"}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted">
                  {isEn ? "Key functional and business targets" : "الغايات التشغيلية والهندسية التي تحققت"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {goals.map((goal, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-bg-main/80 border border-white/10 flex items-start gap-4 hover:border-primary/40 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={16} />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal pt-1">
                    {goal}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Step-by-Step Workflow & Execution Roadmap */}
      {workflow.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4">
              <Workflow size={14} />
              <span>{isEn ? "Development Roadmap" : "مسار العمل والتنفيذ"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {isEn ? "How the Project Was Built" : "المسار الهندسي خطوة بخطوة"}
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-2">
              {isEn
                ? "A structured development lifecycle from concept to deployment"
                : "منهجية مرحلية تضمن جودة الكود، أمان المنظومة، واستقرار الأداء"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-bg-surface border border-white/10 hover:border-primary/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div className="absolute -top-3 -right-2 text-6xl font-black text-white/5 select-none pointer-events-none group-hover:text-primary/10 transition-colors">
                  {item.step || `0${idx + 1}`}
                </div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-bg-main border border-white/10 flex items-center justify-center text-primary mb-6 shadow-md group-hover:scale-105 transition-transform">
                    <Layers size={22} />
                  </div>
                  <span className="text-[10px] font-black text-primary tracking-widest uppercase block mb-1.5">
                    {item.step || `0${idx + 1}`}
                  </span>
                  <h4 className="text-lg font-black text-white mb-2.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Key Features & Capabilities */}
      {features.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 relative z-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-bg-surface border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center text-primary shadow-md">
                <Layout size={24} />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {isEn ? "Core Features & Capabilities" : "أبرز المميزات والخصائص التفاعلية"}
                </h3>
                <p className="text-xs sm:text-sm text-text-muted">
                  {isEn ? "Capabilities engineered to empower users" : "الوظائف والخصائص المدمجة لخدمة المستخدم"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-primary/40 transition-all flex flex-col justify-between group shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={18} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Dynamic Custom Sections (Allows ANY custom sections from JSON!) */}
      {customSections.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 relative z-10">
          <div className="space-y-8">
            {customSections.map((sec, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 rounded-3xl bg-linear-to-br from-bg-surface via-bg-surface to-bg-main border border-primary/25 shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {sec.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal max-w-4xl">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. Technologies Used */}
      {baseProject.tags && baseProject.tags.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-24 relative z-10">
          <div className="p-8 sm:p-10 rounded-3xl bg-bg-surface border border-white/10 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Code2 size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {isEn ? "Core Technologies & Architecture" : "التقنيات والمكتبات المستخدمة"}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {baseProject.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-xl bg-bg-main border border-white/15 text-xs font-bold text-gray-200 hover:text-white hover:border-primary/50 transition-all shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Previous / Next Project Navigation & Call to Action */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.id}`}
              className="p-6 rounded-2xl bg-bg-surface border border-white/10 hover:border-primary/60 transition-all group flex items-center gap-4 shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-bg-main border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                  {isEn ? "Previous Project" : "المشروع السابق"}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-primary transition-colors truncate">
                  {prevLocalized?.title || prevProject.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="p-6 rounded-2xl bg-bg-surface border border-white/10 hover:border-primary/60 transition-all group flex items-center justify-between gap-4 shadow-lg text-end"
            >
              <div className="overflow-hidden grow">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                  {isEn ? "Next Project" : "المشروع التالي"}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-primary transition-colors truncate">
                  {nextLocalized?.title || nextProject.title}
                </h4>
              </div>
              <div className="w-11 h-11 rounded-xl bg-bg-main border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="rounded-3xl p-10 sm:p-14 bg-bg-card border border-primary/30 text-center shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            {isEn ? "Have a similar vision or project to build?" : "هل لديك فكرة أو مشروع ترغب في تنفيذه؟"}
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            {isEn
              ? "Let's turn your vision into a robust, high-performance web application or management system."
              : "يسعدني مناقشة تفاصيل مشروعك وبناء تطبيق أو نظام إداري مخصص بأعلى المعايير الهندسية."}
          </p>
          <a
            href="https://wa.me/201120354592"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-xs sm:text-sm font-bold shadow-xl shadow-primary/30"
          >
            <MessageCircle size={18} />
            <span>{isEn ? "Start Direct WhatsApp Conversation" : "تواصل معي مباشرة عبر الواتساب"}</span>
          </a>
        </div>
      </section>
    </article>
  );
}
