"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Section from "../layout/Section";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Reveal, StaggerContainer, StaggerItem } from "../layout/Reveal";

export default function About() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*').single();
      if (data) setSettings(data);
    }
    fetchSettings();
  }, []);

  return (
    <Section id="about" className="bg-[var(--bg-alt)]/30 py-24 md:py-32">
      <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        <Reveal>
          <div className="relative group">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-[var(--border-main)] aspect-square shadow-2xl transition-transform duration-700 group-hover:scale-[0.98]">
              <img
                src="/moustafa.jpg"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-1000 group-hover:scale-110"
                alt="Mostafa Ahmed"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/5 blur-2xl rounded-full -z-10 hidden md:block" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-500/5 blur-2xl rounded-full -z-10 hidden md:block" />
            
            {/* Design Element - Responsive Scale */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border border-purple-500/20 rounded-[3rem] -z-10 scale-100 group-hover:scale-[1.02] transition-transform duration-700 hidden sm:block" />
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.2}>
            <span className="text-purple-500 font-mono text-sm uppercase tracking-[0.4em] block mb-4">
              // THE ARCHITECT
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-[var(--text-main)]">
              Crafting Digital<br />
              Excellence
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-[var(--text-muted)] text-xl mb-10 leading-relaxed max-w-xl font-medium">
              {settings?.about_text || "I am a specialized Software Engineer focusing on building high-performance web ecosystems. My approach combines technical rigor with creative problem-solving."}
            </p>
          </Reveal>

          <StaggerContainer>
            <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12">
                {[
                { label: "Expertise", value: "Full-Stack Architecture" },
                { label: "Location", value: settings?.location || "Cairo, Egypt" },
                { label: "Philosophy", value: "Clean & Scalable Code" },
                { label: "Status", value: "Available for Hire" },
                ].map((item, i) => (
                <StaggerItem key={i}>
                    <h4 className="text-purple-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 font-mono">
                    {item.label}
                    </h4>
                    <p className="text-[var(--text-main)] font-black text-sm">{item.value}</p>
                </StaggerItem>
                ))}
            </div>
          </StaggerContainer>

          <Reveal delay={0.6}>
            <div className="flex flex-wrap gap-6">
                <motion.a 
                    href="#contact" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl shadow-purple-600/20"
                >
                    Let's Talk <ArrowRight size={20} />
                </motion.a>
                <motion.a 
                    href="#" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-2xl border border-[var(--border-main)] hover:border-purple-500/50 text-[var(--text-main)] font-black transition-all bg-[var(--bg-card)]/50 backdrop-blur-md flex items-center gap-3"
                >
                    Download Artifact <Download size={20} className="opacity-70" />
                </motion.a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
