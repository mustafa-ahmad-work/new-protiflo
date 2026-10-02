"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowUpRight, FolderGit2 } from "lucide-react";
import Section from "../../components/Section";
import { Reveal } from "../../../components/layout/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Experience() {
  const { t } = useLanguage();
  const experiences = (t("experience.items", { returnObjects: true }) as any[]) || [];

  return (
    <Section id="experience">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4 sm:mb-5">
          <FolderGit2 size={14} />
          <span>{t("experience.badge")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug mb-3 sm:mb-4">
          {t("experience.title")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
          {t("experience.subtitle")}
        </p>
      </div>

      <div className="w-full">
        <div className="space-y-24">
          {experiences.map((exp: any, i: number) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 group">
                {/* Left Side: Meta Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl md:text-8xl font-black text-black/8 dark:text-white/10 group-hover:text-primary/20 transition-colors">
                      0{i + 1}
                    </span>
                    <div className="h-0.5 grow bg-linear-to-r from-primary/40 to-transparent" />
                  </div>
                  <div className="space-y-3 px-2">
                    <div className="text-[11px] font-black text-primary dark:text-primary uppercase tracking-[0.4em] bg-primary/5 dark:bg-primary/10 w-fit px-3 py-1 rounded-md">
                      {exp.period}
                    </div>
                    <div className="text-sm font-bold text-text-main flex items-center gap-2">
                      <MapPin size={14} className="text-primary" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Right Side: Content Card */}
                <div className="relative">
                  {/* Decorative Vertical Line */}
                  <div className="absolute -left-12 top-0 bottom-0 w-px bg-(--border-main) opacity-60 hidden lg:block" />

                  <div className="glass-card p-10 md:p-14 hover:border-primary/50 transition-all duration-700 relative bg-bg-card border-border-main shadow-2xl shadow-black/3 dark:shadow-none">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                      <div className="space-y-3">
                        <h3 className="text-3xl md:text-5xl font-black text-text-main group-hover:text-primary dark:group-hover:text-primary transition-colors tracking-tighter leading-none">
                          {exp.role}
                        </h3>
                        <div className="text-lg font-bold text-text-muted flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Briefcase size={16} className="text-primary" />
                          </div>
                          {exp.company}
                        </div>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/5 border border-border-main flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/30 transition-all shadow-sm">
                        <ArrowUpRight size={32} />
                      </div>
                    </div>

                    <p className="text-lg md:text-xl text-text-main dark:text-text-muted leading-relaxed mb-12 font-medium">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {exp.tech?.map((techItem: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-5 py-2.5 bg-black/3 dark:bg-white/5 border border-border-main rounded-2xl text-[10px] font-black text-text-main dark:text-text-muted uppercase tracking-widest group-hover:border-primary/40 transition-all"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
