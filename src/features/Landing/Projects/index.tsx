"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft, ArrowRight, FolderGit2, Lock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import projectsData from "../../../data/projects.json";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface LocalizedProjectData {
  title?: string;
  category?: string;
  shortDescription?: string;
  description?: string;
  fullDescription?: string;
}

interface ProjectItem {
  id: number;
  slug?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  isPrivate?: boolean;
  duration?: string;
  ar?: LocalizedProjectData;
  en?: LocalizedProjectData;
}

export default function Projects() {
  const { t, isRTL, language } = useLanguage();
  const [projects] = useState<ProjectItem[]>(projectsData as unknown as ProjectItem[]);

  const getTranslatedProject = (baseProject: ProjectItem): ProjectItem => {
    const langKey = language === "en" ? "en" : "ar";
    const localized = baseProject[langKey];
    if (localized) {
      return {
        ...baseProject,
        title: localized.title || baseProject.title,
        description: localized.shortDescription || localized.description || baseProject.description,
        category: localized.category || baseProject.category,
      };
    }
    return baseProject;
  };

  return (
    <section id="projects" className="py-24 bg-bg-main relative overflow-hidden border-t border-border-subtle">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/10 mb-4 sm:mb-5">
            <FolderGit2 size={14} />
            <span>{t("projects.badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-text-main leading-snug mb-3 sm:mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((baseProject: ProjectItem, i: number) => {
            const project = getTranslatedProject(baseProject);
            return (
              <motion.div
                key={project.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card group overflow-hidden flex flex-col h-full border border-white/10 hover:border-primary/60 transition-all duration-500 rounded-3xl bg-bg-surface"
              >
                {/* Image Banner */}
                <div className="relative overflow-hidden bg-bg-main">
                  <Image
                    width={800}
                    height={450}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#252A3B] via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-bg-main/90 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white flex items-center gap-1.5">
                    {project.isPrivate && <Lock size={10} className="text-amber-400" />}
                    <span>{project.category || t("projects.defaultCategory")}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex flex-col grow justify-between space-y-6">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors leading-snug">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-5 font-normal">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-bg-main border border-white/10 text-[10px] font-bold text-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href={`/projects/${project.id}`}
                      className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-md shadow-primary/30"
                    >
                      <span>{t("projects.details")}</span>
                      {isRTL ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
                    </Link>

                    {!project.isPrivate && (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-initial p-3 rounded-full bg-bg-main border border-white/10 text-gray-200 hover:text-white hover:border-primary/60 transition-all flex items-center justify-center"
                            title={t("projects.sourceCode")}
                          >
                            <FaGithub size={16} />
                          </a>
                        )}
                        {project.live && project.live !== "#" && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-initial p-3 rounded-full bg-bg-main border border-white/10 text-gray-200 hover:text-white hover:border-primary/60 transition-all flex items-center justify-center gap-1.5 text-xs font-bold"
                          >
                            <ExternalLink size={15} />
                            <span>{t("projects.preview")}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
