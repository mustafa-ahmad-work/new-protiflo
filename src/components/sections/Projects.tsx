"use client";

import { motion } from "framer-motion";
import { ExternalLink, ChevronRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import projectsData from "../../data/projects.json";
import { Reveal } from "../layout/Reveal";
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

        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <Section id="projects" className="bg-[var(--bg-main)] py-24 md:py-32">
      <SectionHeader 
        subtitle="PORTFOLIO" 
        title="Featured Projects" 
        description="A selection of engineered artifacts showcasing technical complexity and design precision."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {projects.map((project: any, i: number) => (
          <Reveal key={project.id} delay={i * 0.1}>
            <div className="glass-card group overflow-hidden flex flex-col h-full border-[var(--border-main)] hover:border-purple-500/20 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-none">
              {/* Image Showcase */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-40" />
                
                {/* Category Badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/5 text-[8px] font-black uppercase tracking-[0.3em] text-white">
                    {project.category || "Architecture"}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-10 flex flex-col flex-grow bg-[var(--bg-card)]/10 backdrop-blur-xl relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <h3 className="text-3xl font-black group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-[var(--text-main)] leading-tight tracking-tighter">
                        {project.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-black/[0.02] dark:bg-white/5 flex items-center justify-center text-[var(--text-muted)] group-hover:text-purple-500 transition-all">
                        <Sparkles size={18} />
                    </div>
                </div>

                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 flex-grow font-medium opacity-80">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-black/[0.01] dark:bg-white/5 border border-[var(--border-main)] text-[9px] font-black text-[var(--text-muted)] uppercase tracking-wider group-hover:border-purple-500/10 transition-all">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-purple-600 text-white text-[10px] font-black hover:bg-purple-700 transition-all uppercase tracking-[0.3em]"
                  >
                    Examine Artifact <ChevronRight size={18} />
                  </Link>
                  <div className="flex items-center gap-4">
                    <motion.a 
                      whileHover={{ y: -2 }}
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl bg-[var(--bg-alt)] border border-[var(--border-main)] text-[10px] font-black text-[var(--text-main)] hover:bg-purple-600/10 hover:text-purple-600 dark:hover:text-purple-400 transition-all uppercase tracking-widest"
                    >
                      <FaGithub size={18} /> Source
                    </motion.a>
                    <motion.a 
                      whileHover={{ y: -2 }}
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl bg-[var(--bg-alt)] border border-[var(--border-main)] text-[10px] font-black text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-all uppercase tracking-widest"
                    >
                      <ExternalLink size={18} /> Deploy
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
