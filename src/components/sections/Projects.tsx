"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowLeft, Sparkles, FolderGit2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import projectsData from "../../data/projects.json";
import Link from "next/link";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>(projectsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('id', { ascending: true });

        if (error) {
          console.warn('Supabase projects fetch note:', error.message || error);
        } else if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err: any) {
        console.warn('Error fetching projects:', err?.message || err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-bg-main relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-5">
            <FolderGit2 size={14} />
            <span>معرض الأعمال الفاخرة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-snug mb-4">
            أبرز المشروعات والأنظمة الرقمية
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            مجموعة من الأنظمة والتطبيقات المصممة بأعلى درجات الدقة الهندسية والجمالية.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project: any, i: number) => (
            <motion.div
              key={project.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card group overflow-hidden flex flex-col h-full border border-white/10 hover:border-primary/60 transition-all duration-500 rounded-[24px] bg-bg-surface"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] overflow-hidden bg-bg-main">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252A3B] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 right-4 px-3 py-1 bg-bg-main/90 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold text-white">
                  {project.category || "نظام متكامل"}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <div className="p-2 rounded-xl bg-bg-main border border-white/10 text-primary">
                      <Sparkles size={18} />
                    </div>
                  </div>

                  <p className="text-sm text-text-muted leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-bg-main border border-white/10 text-[10px] font-bold text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    href={`/projects/${project.id}`}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-white text-xs font-bold transition-all shadow-md shadow-[#5337FF]/30"
                  >
                    <span>تفاصيل المشروع</span>
                    <ArrowLeft size={16} />
                  </Link>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial p-3.5 rounded-full bg-bg-main border border-white/10 text-gray-200 hover:text-white hover:border-primary/60 transition-all flex items-center justify-center"
                        title="كود المصدر"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial p-3.5 rounded-full bg-bg-main border border-white/10 text-gray-200 hover:text-white hover:border-primary/60 transition-all flex items-center justify-center gap-2 text-xs font-bold"
                      >
                        <ExternalLink size={16} />
                        <span>معاينة</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
