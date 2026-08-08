"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket, ShieldCheck, Zap, ArrowDown } from "lucide-react";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import { StaggerContainer, StaggerItem, Reveal } from "../layout/Reveal";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    desc: "We dive deep into your requirements, target audience, and business goals to map out the perfect digital strategy.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-500"
  },
  {
    icon: PenTool,
    title: "Design",
    desc: "Crafting intuitive, premium UI/UX designs that align with your brand identity and provide a seamless user experience.",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-500"
  },
  {
    icon: Code2,
    title: "Development",
    desc: "Transforming designs into high-performance code using modern frameworks like Laravel, React, and Next.js.",
    color: "from-emerald-500/20 to-emerald-600/20",
    iconColor: "text-emerald-500"
  },
  {
    icon: ShieldCheck,
    title: "QA & Testing",
    desc: "Rigorous testing across all devices and scenarios to ensure a bug-free, secure, and production-ready product.",
    color: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-500"
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "Deploying your application to optimized server environments with automated CI/CD pipelines.",
    color: "from-red-500/20 to-red-600/20",
    iconColor: "text-red-500"
  },
  {
    icon: Zap,
    title: "Optimization",
    desc: "Continuous monitoring and performance tuning to keep your platform running at peak efficiency.",
    color: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-500"
  }
];

export default function Process() {
  return (
    <Section id="process" className="bg-bg-main">
      <SectionHeader 
        subtitle="HOW I WORK" 
        title="Development Lifecycle" 
        description="A structured approach to bringing complex ideas to life with precision and speed."
      />
      
      <StaggerContainer staggerDelay={0.15}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {steps.map((step, i) => (
            <StaggerItem key={i}>
                <div className="glass-card p-12 relative overflow-hidden group h-full border-white/5 hover:border-purple-500/30 transition-all duration-700">
                    
                    {/* Background Progress Indicator */}
                    <div className="absolute top-[-20px] right-[-20px] text-[120px] font-black text-white/[0.02] italic leading-none group-hover:text-purple-500/[0.05] transition-all duration-700 select-none">
                    0{i + 1}
                    </div>

                    <div className={`w-16 h-16 rounded-[1.25rem] bg-white/5 flex items-center justify-center ${step.iconColor} border border-white/10 mb-10 group-hover:scale-110 group-hover:rotate-6 transition duration-500 shadow-2xl`}>
                    <step.icon size={30} />
                    </div>

                    <h3 className="text-2xl font-black text-text-main mb-6 tracking-tighter">{step.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed relative z-10 font-medium opacity-80">
                    {step.desc}
                    </p>

                    {/* Interactive Connection Line */}
                    {i < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[1px] bg-gradient-to-r from-purple-500/20 to-transparent z-10 group-hover:from-purple-500 transition-all duration-700" />
                    )}

                    {/* Hover Pulse */}
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent w-0 group-hover:w-full transition-all duration-1000" />
                </div>
            </StaggerItem>
            ))}
        </div>
      </StaggerContainer>
    </Section>
  );
}
