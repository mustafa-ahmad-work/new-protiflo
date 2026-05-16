"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, ArrowUpRight } from "lucide-react";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import { Reveal } from "../layout/Reveal";

const experiences = [
  {
    company: "Freelance / Self-Employed",
    role: "Senior Full-Stack Developer",
    period: "2022 - PRESENT",
    location: "Global / Remote",
    description: "Architecting high-scale digital ecosystems and leading the technical delivery of premium SaaS platforms with a focus on Fintech and AI integration.",
    tech: ["Next.js 15", "Laravel 11", "AWS", "Redis"]
  },
  {
    company: "TechFlow Solutions",
    role: "Full-Stack Engineer",
    period: "2020 - 2021",
    location: "Cairo, Egypt",
    description: "Engineered core infrastructure for high-traffic enterprise solutions. Specialized in real-time systems and database optimization.",
    tech: ["React", "PHP", "MySQL", "WebSockets"]
  },
  {
    company: "Digital Core Agency",
    role: "Backend Specialist",
    period: "2018 - 2020",
    location: "Alexandria, Egypt",
    description: "Developed robust API architectures and secured cloud environments for large-scale mobile applications.",
    tech: ["Node.js", "Docker", "PostgreSQL", "OAuth2"]
  }
];

export default function Experience() {
  return (
    <Section id="experience" className="bg-[var(--bg-main)] transition-colors duration-300">
      <SectionHeader 
        subtitle="CAREER EVOLUTION" 
        title="Professional Experience" 
        description="A journey of technical mastery and architectural innovation."
      />
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-24">
          {experiences.map((exp, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 group">
                {/* Left Side: Meta Info */}
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <span className="text-5xl md:text-8xl font-black text-black/[0.08] dark:text-white/[0.1] group-hover:text-purple-500/20 transition-colors">0{i + 1}</span>
                      <div className="h-[2px] flex-grow bg-gradient-to-r from-purple-500/40 to-transparent" />
                   </div>
                   <div className="space-y-3 px-2">
                      <div className="text-[11px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-[0.4em] bg-purple-500/5 dark:bg-purple-500/10 w-fit px-3 py-1 rounded-md">
                        {exp.period}
                      </div>
                      <div className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
                        <MapPin size={14} className="text-purple-500" />
                        {exp.location}
                      </div>
                   </div>
                </div>

                {/* Right Side: Content Card */}
                <div className="relative">
                   {/* Decorative Vertical Line */}
                   <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-[var(--border-main)] opacity-60 hidden lg:block" />
                   
                   <div className="glass-card p-10 md:p-14 hover:border-purple-500/50 transition-all duration-700 relative bg-[var(--bg-card)] border-[var(--border-main)] shadow-2xl shadow-black/[0.03] dark:shadow-none">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                         <div className="space-y-3">
                            <h3 className="text-3xl md:text-5xl font-black text-[var(--text-main)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors tracking-tighter leading-none">
                               {exp.role}
                            </h3>
                            <div className="text-lg font-bold text-[var(--text-muted)] flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                  <Briefcase size={16} className="text-purple-500" />
                               </div>
                               {exp.company}
                            </div>
                         </div>
                         <div className="w-16 h-16 rounded-2xl bg-black/[0.05] dark:bg-white/5 border border-[var(--border-main)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-purple-500 group-hover:border-purple-500/30 transition-all shadow-sm">
                            <ArrowUpRight size={32} />
                         </div>
                      </div>

                      <p className="text-lg md:text-xl text-[var(--text-main)] dark:text-[var(--text-muted)] leading-relaxed mb-12 font-medium">
                         {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-3">
                         {exp.tech.map((t, idx) => (
                            <span key={idx} className="px-5 py-2.5 bg-black/[0.03] dark:bg-white/[0.05] border border-[var(--border-main)] rounded-2xl text-[10px] font-black text-[var(--text-main)] dark:text-[var(--text-muted)] uppercase tracking-widest group-hover:border-purple-500/40 transition-all">
                               {t}
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
