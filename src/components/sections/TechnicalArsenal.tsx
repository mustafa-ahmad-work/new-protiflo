"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import { supabase } from "@/lib/supabase";
import { StaggerContainer, StaggerItem } from "../layout/Reveal";

function MacTerminal({ title, items, delay }: { title: string, items: any[], delay: number }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (inputValue.toLowerCase() === "admin") {
        window.location.href = "/login";
      }
      setInputValue("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      {/* Mac Terminal Window */}
      <div className={`bg-[#0c0c0e]/90 backdrop-blur-2xl border border-white/10 rounded-xl flex flex-col h-full overflow-hidden transition-all duration-500 shadow-xl ${isFocused ? 'border-purple-500/40 ring-1 ring-purple-500/20' : ''}`}>
        
        {/* Terminal Header */}
        <div className="bg-[#1e1e21] py-3 px-5 flex items-center relative border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[inset_0_0_2px_rgba(0,0,0,0.2)]"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title} — zsh</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-8 font-mono text-[13px] flex-grow text-gray-300">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-emerald-400 font-black">➜</span>
            <span className="text-purple-400 font-bold">~</span>
            <span className="text-white">ls {title.toLowerCase()}/</span>
          </div>

          <StaggerContainer staggerDelay={0.04}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
                {items.map((item, i) => (
                <StaggerItem key={i}>
                    <div className="flex items-center gap-3 hover:text-white transition-colors cursor-default">
                        <span className="text-gray-600 font-black">#</span>
                        <span className="font-medium">{typeof item === 'string' ? item : item.name}</span>
                    </div>
                </StaggerItem>
                ))}
            </ul>
          </StaggerContainer>

          <div className="mt-10 flex items-center gap-3 pt-6 border-t border-white/5">
            <span className="text-emerald-400 font-black">➜</span>
            <span className="text-purple-400 font-bold">~</span>
            <div className="flex-grow flex items-center">
                <input
                    type="text"
                    value={inputValue}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="await run..."
                    className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-600 transition-all font-mono"
                    spellCheck={false}
                    autoComplete="off"
                />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechnicalArsenal() {
  const defaultSkills = [
    "React.js", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "HTML5/CSS3",
    "Node.js", "Express.js", "Laravel", "PHP", "RESTful APIs", "MySQL",
    "Git / GitHub", "Docker", "Vercel", "Firebase", "PostgreSQL", "Supabase"
  ];
  const [skills, setSkills] = useState<string[]>(defaultSkills);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase.from('settings').select('skills').single();
        if (data?.skills && data.skills.length > 0 && !error) {
          setSkills(data.skills);
        }
      } catch (err) {
        // Fallback to defaultSkills already initialized in state
      }
    }
    fetchSkills();
  }, []);

  const partSize = Math.ceil(skills.length / 3);
  const groups = [
    skills.slice(0, partSize),
    skills.slice(partSize, partSize * 2),
    skills.slice(partSize * 2)
  ];

  return (
    <Section id="skills" className="bg-bg-main">
      <SectionHeader 
        subtitle="EXPERTISE" 
        title="Technical Arsenal" 
        description="A specialized stack engineered for modern performance and architectural integrity."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4 max-w-7xl mx-auto">
        <MacTerminal title="Frontend" items={groups[0]} delay={0.1} />
        <MacTerminal title="Backend" items={groups[1]} delay={0.2} />
        <MacTerminal title="DevOps" items={groups[2]} delay={0.3} />
      </div>
    </Section>
  );
}
