"use client";

import { motion } from "framer-motion";
import {
  SiLaravel, SiReact, SiNextdotjs, SiTypescript,
  SiNodedotjs, SiPostgresql, SiDocker,
  SiCloudflare, SiSupabase, SiTailwindcss, SiRedis
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { Cpu } from "lucide-react";

const techStack = [
  { name: "Laravel", category: "Backend Framework", color: "#FF2D20", icon: SiLaravel },
  { name: "React.js", category: "Frontend Library", color: "#61DAFB", icon: SiReact },
  { name: "Next.js 15", category: "Full-Stack Framework", color: "#FFFFFF", icon: SiNextdotjs },
  { name: "TypeScript", category: "Typed JavaScript", color: "#3178C6", icon: SiTypescript },
  { name: "Node.js", category: "Server Environment", color: "#5FA04E", icon: SiNodedotjs },
  { name: "PostgreSQL", category: "Relational Database", color: "#4169E1", icon: SiPostgresql },
  { name: "Docker", category: "Containerization", color: "#2496ED", icon: SiDocker },
  { name: "AWS Cloud", category: "Cloud Infrastructure", color: "#FF9900", icon: FaAws },
  { name: "Cloudflare", category: "CDN & Edge Security", color: "#F38020", icon: SiCloudflare },
  { name: "Supabase", category: "BaaS & Realtime DB", color: "#3ECF8E", icon: SiSupabase },
  { name: "TailwindCSS", category: "Utility-First CSS", color: "#06B6D4", icon: SiTailwindcss },
  { name: "Redis", category: "Caching & In-Memory Storage", color: "#DC382D", icon: SiRedis },
];

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function TechMarquee() {
  const { t } = useLanguage();
  // Duplicate array for seamless infinite looping
  const marqueeItems = [...techStack, ...techStack];

  return (
    <section id="tech" className="py-24 border-y border-white/10 bg-transparent backdrop-blur-lg z-20 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4 sm:mb-5">
          <Cpu size={14} />
          <span>{t("marquee.badge")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug">
          {t("marquee.title")}
        </h2>
      </div>

      {/* Infinite Scrolling Marquee Track */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="absolute left-0 inset-y-0 w-32 bg-linear-to-r from-bg-main to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-32 bg-linear-to-l from-bg-main to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 animate-marquee items-center gap-6 py-4 pr-6">
          {techStack.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-4 rounded-[20px] bg-bg-surface border border-white/10 hover:border-primary/60 transition-all duration-300 shadow-xl shrink-0 group cursor-default backdrop-blur-md relative overflow-hidden"
              >
                {/* Tech Icon Container */}
                <div
                  className="w-11 h-11 rounded-xl bg-bg-main border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300"
                >
                  <IconComponent
                    size={24}
                    style={{ color: item.color }}
                    className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_currentColor]"
                  />
                </div>

                {/* Tech Details */}
                <div className="text-right">
                  <span className="block text-sm font-extrabold text-white group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="block text-[10px] text-text-muted font-medium mt-0.5">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div aria-hidden="true" className="flex shrink-0 animate-marquee items-center gap-6 py-4 pr-6">
          {techStack.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={`dup-${index}`}
                className="flex items-center gap-4 px-6 py-4 rounded-[20px] bg-bg-surface border border-white/10 hover:border-primary/60 transition-all duration-300 shadow-xl shrink-0 group cursor-default backdrop-blur-md relative overflow-hidden"
              >
                {/* Tech Icon Container */}
                <div
                  className="w-11 h-11 rounded-xl bg-bg-main border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300"
                >
                  <IconComponent
                    size={24}
                    style={{ color: item.color }}
                    className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_currentColor]"
                  />
                </div>

                {/* Tech Details */}
                <div className="text-right">
                  <span className="block text-sm font-extrabold text-white group-hover:text-primary transition-colors">
                    {item.name}
                  </span>
                  <span className="block text-[10px] text-text-muted font-medium mt-0.5">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
