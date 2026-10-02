"use client";

import { Search, Compass, Code2, ShieldCheck, RefreshCw, Quote, Workflow } from "lucide-react";
import Section from "../../components/Section";
import { StaggerContainer, StaggerItem } from "../../../components/layout/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

const stepIcons = [
  { icon: Search, color: "text-blue-400" },
  { icon: Compass, color: "text-purple-400" },
  { icon: Code2, color: "text-emerald-400" },
  { icon: ShieldCheck, color: "text-amber-400" },
  { icon: RefreshCw, color: "text-sky-400" },
];

export default function Process() {
  const { t } = useLanguage();
  const steps = (t("process.steps", { returnObjects: true }) as ProcessStep[]) || [];

  return (
    <Section id="process" className="bg-bg-main border-t border-white/10 py-24">
      {/* Section Header */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4 sm:mb-5">
          <Workflow size={14} />
          <span>{t("process.badge")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug mb-3 sm:mb-4">
          {t("process.title")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
          {t("process.subtitle")}
        </p>
      </div>

      {/* Steps Grid */}
      <StaggerContainer staggerDelay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 px-4 mb-16">
          {steps.map((step, i) => {
            const meta = stepIcons[i % stepIcons.length];
            const Icon = meta.icon;
            return (
              <StaggerItem key={i}>
                <div className="glass-card p-6 sm:p-7 relative overflow-hidden group h-full border border-white/10 hover:border-primary/50 transition-all duration-500 rounded-3xl bg-bg-surface flex flex-col justify-between">
                  {/* Step Number in Watermark */}
                  <div className="absolute -top-3 -right-2 text-6xl font-black text-white/5 group-hover:text-primary/10 transition-all select-none pointer-events-none">
                    {step.step || `0${i + 1}`}
                  </div>

                  <div>
                    <div className={`w-12 h-12 rounded-2xl bg-bg-main flex items-center justify-center ${meta.color} border border-white/10 mb-6 group-hover:scale-110 transition duration-300 shadow-md`}>
                      <Icon size={22} />
                    </div>

                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase block mb-1.5">
                      {step.step || `0${i + 1}`}
                    </span>

                    <h3 className="text-xl font-black text-white mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs text-text-muted leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </div>
      </StaggerContainer>
    </Section>
  );
}
