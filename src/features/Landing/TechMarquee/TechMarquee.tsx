"use client";

import {
  SiLaravel, SiPhp, SiReact, SiJavascript,
  SiMysql, SiTailwindcss, SiGit, SiGithub,
  SiPython, SiLivewire
} from "react-icons/si";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { IconType } from "react-icons/lib";

const techStack = [
  { name: "Laravel", category: "Backend Framework", color: "#FF2D20", glow: "rgba(255, 45, 32, 0.2)", icon: SiLaravel },
  { name: "PHP", category: "Core Language", color: "#777BB4", glow: "rgba(119, 123, 180, 0.2)", icon: SiPhp },
  { name: "React.js", category: "UI Library", color: "#61DAFB", glow: "rgba(97, 218, 251, 0.2)", icon: SiReact },
  { name: "JavaScript", category: "Modern Web", color: "#F7DF1E", glow: "rgba(247, 223, 30, 0.2)", icon: SiJavascript },
  { name: "MySQL", category: "Relational DB", color: "#4479A1", glow: "rgba(68, 121, 161, 0.2)", icon: SiMysql },
  { name: "Tailwind CSS", category: "Modern Styling", color: "#06B6D4", glow: "rgba(6, 182, 212, 0.2)", icon: SiTailwindcss },
  { name: "Filament", category: "Admin Panels", color: "#FFA63D", glow: "rgba(255, 166, 61, 0.2)", icon: null },
  { name: "Livewire", category: "Full-Stack Laravel", color: "#FB70A9", glow: "rgba(251, 112, 169, 0.2)", icon: SiLivewire },
  { name: "Python", category: "Scripting & Backend", color: "#3776AB", glow: "rgba(55, 118, 171, 0.2)", icon: SiPython },
  { name: "Git", category: "Version Control", color: "#F05032", glow: "rgba(240, 80, 50, 0.2)", icon: SiGit },
  { name: "GitHub", category: "Repositories", color: "#FFFFFF", glow: "rgba(255, 255, 255, 0.15)", icon: SiGithub },
  { name: "Laragon", category: "Development Env", color: "#0E86D4", glow: "rgba(14, 134, 212, 0.2)", icon: null },
];

export default function TechMarquee() {
  const { t } = useLanguage();

  return (
    <section className="py-20 border-y border-white/10 to-bg-main z-20 relative overflow-hidden">

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center relative z-10">
        <Badge variant="primary">
          {t("marquee.badge")}
        </Badge>
        <h2 className="text-xl mt-3 sm:text-2xl md:text-3xl font-black text-white tracking-tight">
          {t("marquee.title")}
        </h2>
      </div>

      {/* Infinite Scrolling Marquee Track with synchronized parent hover pause */}
      <div className="marquee-group relative w-full overflow-hidden flex items-center py-4 select-none" dir="ltr">
        <div className="absolute left-0 inset-y-0 w-24 sm:w-40 bg-linear-to-r from-bg-main to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 sm:w-40 bg-linear-to-l from-bg-main to-transparent z-10 pointer-events-none" />

        <div className="flex shrink-0 animate-marquee items-center gap-5 pr-5">
          {techStack.map((item, index) => {
            const IconComponent = item?.icon;
            const isIcon = item.icon == null ? false : true;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-bg-surface/80 border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg shrink-0 cursor-default backdrop-blur-md relative overflow-hidden group/card hover:-translate-y-1"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* Tech Icon Container */}
                <div
                  className="w-10 h-10 rounded-xl bg-bg-main/80 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover/card:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: "rgba(22, 26, 38, 0.9)",
                  }}
                >
                  {IconComponent ? (
                    <IconComponent
                      size={22}
                      style={{ color: item.color }}
                      className="transition-all duration-300 group-hover/card:drop-shadow-[0_0_8px_currentColor]"
                    />
                  ) : (
                    <span
                      className="text-lg font-black"
                      style={{ color: item.color }}
                      aria-hidden="true"
                    >
                      {item.name === "Filament" ? "F" : "L"}
                    </span>
                  )}
                </div>


                {/* Tech Details */}
                <div className="text-start">
                  <span className="block text-xs sm:text-sm font-black text-white group-hover/card:text-primary transition-colors">
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

        <div aria-hidden="true" className="flex shrink-0 animate-marquee items-center gap-5 pr-5">
          {techStack.map((item, index) => {
            const IconComponent: IconType | null = item?.icon;
            const isIcon = item.icon == null ? false : true;
            return (
              <div
                key={`dup-${index}`}
                className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-bg-surface/80 border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-lg shrink-0 cursor-default backdrop-blur-md relative overflow-hidden group/card hover:-translate-y-1"
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl bg-bg-main/80 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover/card:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: "rgba(22, 26, 38, 0.9)",
                  }}
                >
                  {IconComponent ? (
                    <IconComponent
                      size={22}
                      style={{ color: item.color }}
                      className="transition-all duration-300 group-hover/card:drop-shadow-[0_0_8px_currentColor]"
                    />
                  ) : (
                    <span
                      className="text-lg font-black"
                      style={{ color: item.color }}
                      aria-hidden="true"
                    >
                      {item.name === "Filament" ? "F" : "L"}
                    </span>
                  )}
                </div>
                {/* Tech Icon Container */}

                {/* Tech Details */}
                <div className="text-start">
                  <span className="block text-xs sm:text-sm font-black text-white group-hover/card:text-primary transition-colors">
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
