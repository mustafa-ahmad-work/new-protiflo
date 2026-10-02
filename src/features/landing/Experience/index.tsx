"use client";

import { Briefcase, MapPin, ArrowUpRight, FolderGit2 } from "lucide-react";
import Section from "../../components/Section";
import { Reveal } from "../../../components/layout/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tech: string[];
}

export default function Experience() {
  const { t } = useLanguage();
  const experiences = (t("experience.items", { returnObjects: true }) as ExperienceItem[]) || [];

  return (
    <Section id="experience" className="border-t border-white/10 py-24">
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

      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="space-y-12">
          {experiences.map((exp: ExperienceItem, i: number) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="grid lg:grid-cols-[1fr_2.5fr] gap-8 group">
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
                      {exp.period}
                    </div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <MapPin size={14} className="text-primary" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Right Side: Content Card */}
                <div className="relative">
                  <div className="glass-card p-8 sm:p-10 hover:border-primary/50 transition-all duration-500 relative bg-bg-surface border border-white/10 rounded-3xl shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-primary transition-colors tracking-tight">
                          {exp.role}
                        </h3>
                        <div className="text-sm font-bold text-text-muted flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Briefcase size={14} className="text-primary" />
                          </div>
                          {exp.company}
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-bg-main border border-white/10 flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary/30 transition-all shadow-sm shrink-0">
                        <ArrowUpRight size={22} />
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-8 font-normal">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech?.map((techItem: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-bg-main border border-white/10 rounded-xl text-[10px] font-bold text-gray-200 uppercase tracking-wider group-hover:border-primary/30 transition-all"
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
