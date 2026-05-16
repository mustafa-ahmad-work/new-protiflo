"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import { supabase } from "@/lib/supabase";

function TerminalWindow({ title, items, delay }: { title: string, items: any[], delay: number }) {
  const [inputValue, setInputValue] = useState("");

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="h-full transform hover:scale-[1.02] transition-transform duration-500"
    >
      <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-2xl flex flex-col h-full shadow-2xl overflow-hidden group hover:border-purple-500/30">
        <div className="bg-[var(--bg-alt)] py-3 px-4 flex items-center justify-between border-b border-[var(--border-main)]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">{title}</div>
        </div>
        <div className="p-6 font-mono text-[13px] flex-grow bg-[var(--bg-card)]">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-green-500">➜</span>
            <span className="text-[var(--text-main)]">ls skills/</span>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
                <span className="text-purple-500/50">#</span>
                {typeof item === 'string' ? item : item.name}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-2 border-t border-[var(--border-main)] pt-4">
            <span className="text-green-500 font-bold">➜</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="..."
              className="bg-transparent border-none outline-none text-[var(--text-main)] w-full placeholder:text-[var(--text-muted)] opacity-50 focus:opacity-100 focus:ring-0"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechnicalArsenal() {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    async function fetchSkills() {
      const { data } = await supabase.from('settings').select('skills').single();
      if (data?.skills) setSkills(data.skills);
    }
    fetchSkills();
  }, []);

  // تقسيم المهارات لثلاث مجموعات للعرض
  const partSize = Math.ceil(skills.length / 3);
  const groups = [
    skills.slice(0, partSize),
    skills.slice(partSize, partSize * 2),
    skills.slice(partSize * 2)
  ];

  return (
    <Section id="skills" className="bg-[var(--bg-main)]">
      <SectionHeader subtitle="EXPERTISE" title="Technical Arsenal" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TerminalWindow title="Frontend" items={groups[0]} delay={0.1} />
        <TerminalWindow title="Backend" items={groups[1]} delay={0.2} />
        <TerminalWindow title="DevOps" items={groups[2]} delay={0.3} />
      </div>
    </Section>
  );
}
