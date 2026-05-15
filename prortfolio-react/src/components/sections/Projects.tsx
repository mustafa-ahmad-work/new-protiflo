"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import projectsData from "../../data/projects.json";

export default function Projects() {
  const [projects, setProjects] = useState(projectsData);
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
    <Section id="projects">
      <SectionHeader subtitle="PORTFOLIO" title="Featured Projects" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass-card group overflow-hidden flex flex-col h-full"
          >
            <div className="relative aspect-[1227/932] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors text-[var(--text-main)]">
                {project.title}
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[var(--bg-alt)] border border-[var(--border-main)] text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-alt)] border border-[var(--border-main)] text-sm font-bold text-[var(--text-main)] hover:bg-[var(--bg-card)] transition-all"
                >
                  <FaGithub size={18} /> GitHub
                </a>
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 text-white text-sm font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-600/20"
                >
                  <ExternalLink size={18} /> Visit
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
