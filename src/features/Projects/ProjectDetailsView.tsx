"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { ExternalLink, ArrowLeft, ArrowRight, Target, Layout } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function ProjectDetailsView({ baseProject }: { baseProject: any }) {
  const { t, isRTL, language } = useLanguage();
  const isAr = language === "ar";

  const translatedItems = (t("projects.items", { returnObjects: true }) as any[]) || [];
  const found = translatedItems.find((item: any) => Number(item.id) === Number(baseProject.id));

  const project = {
    ...baseProject,
    title: found?.title || baseProject.title,
    description: found?.description || baseProject.description,
    category: found?.category || baseProject.category,
  };

  const challengeText = isAr
    ? "بناء بنية برمجية فائقة الأداء تحافظ على تكامل المعمارية الهندسية وتضمن تجربة مستخدم سلسة واستجابة فورية عبر مختلف الأجهزة والمتصفحات."
    : "Building a high-performance system that maintains architectural integrity while delivering a seamless user experience across all devices.";

  const solutionText = isAr
    ? "تطبيق معمارية برمجية معيارية تجمع بين أحدث أطر العمل التفاعلية، وتصميم قواعد بيانات محسنة للتعامل مع آلاف الطلبات، ونظام تصميم UI/UX مدروس بعناية."
    : "Implementation of a modular architecture using modern reactive frameworks, optimized database structures, and a polished UI/UX design system.";

  return (
    <article className="relative pt-32 pb-32">
      {/* Navigation & Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-all mb-12 group"
        >
          {isRTL ? (
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          ) : (
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          )}
          <span className="text-xs font-black uppercase tracking-widest">{t("projectDetails.back")}</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg border border-primary/20">
                {project.category || t("projectDetails.caseStudy")}
              </span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                {project.duration || "2024"}
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-white">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-text-muted leading-relaxed max-w-xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-primary-hover transition-all shadow-xl shadow-primary/30 text-xs"
                >
                  <ExternalLink size={18} /> {t("projectDetails.launchProject")}
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-bg-surface border border-white/15 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-white/10 transition-all text-xs"
                >
                  <FaGithub size={18} /> {t("projectDetails.sourceCode")}
                </a>
              )}
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                  {t("projectDetails.myRole")}
                </p>
                <p className="text-sm font-bold text-white">
                  {isAr ? "كبير مهندسي البرمجيات Full-Stack" : "Lead Full-Stack Engineer"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                  {t("projectDetails.timeline")}
                </p>
                <p className="text-sm font-bold text-white">
                  {isAr ? "نظام منجز ومُختبر بالكامل" : "Fully Delivered & Tested"}
                </p>
              </div>
            </div>
          </div>

          <div className="relative group w-full">
            <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-blue-600/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/15 shadow-2xl bg-bg-surface">
              <img src={project.image} alt={project.title} className="w-full h-auto object-contain block mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Section */}
      <section className="py-24 bg-bg-surface/50 border-y border-white/10">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 lg:gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-3xl font-black text-white">
                {isAr ? "التحدي الهندسي" : "The Challenge"}
              </h3>
              <p className="text-base text-text-muted leading-relaxed">
                {challengeText}
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 border border-blue-500/20 mb-6">
                <Layout size={24} />
              </div>
              <h3 className="text-3xl font-black text-white">
                {isAr ? "الحل والتنفيذ" : "The Solution"}
              </h3>
              <p className="text-base text-text-muted leading-relaxed">
                {solutionText}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-black text-white uppercase tracking-widest">
              {t("projectDetails.coreTech")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {project.tags?.map((tag: string) => (
                <div
                  key={tag}
                  className="flex items-center gap-3 p-4 bg-bg-main rounded-2xl border border-white/10 group hover:border-primary/50 transition-all"
                >
                  <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                  <span className="text-xs font-bold text-gray-200 group-hover:text-white">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pt-20 pb-10 px-6 text-center">
        <div className="max-w-4xl mx-auto p-12 md:p-16 rounded-[3rem] bg-linear-to-b from-primary/10 to-transparent border border-white/10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 text-white">
            {t("projectDetails.readyToBuild")}
          </h2>
          <p className="text-text-muted max-w-xl mx-auto mb-8 text-sm md:text-base">
            {t("projectDetails.discussProject")}
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-primary/30 text-xs"
          >
            <span>{t("nav.contactUs")}</span>
            {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
          </Link>
        </div>
      </section>
    </article>
  );
}
