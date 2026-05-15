"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Section from "../layout/Section";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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
    <Section id="about" className="bg-[var(--bg-alt)]">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-[var(--border-main)] aspect-square shadow-2xl">
            <img
              src="/moustafa.jpg"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-1000"
              alt="Mostafa Ahmed"
            />
          </div>
          <div className="hidden md:block absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full -z-10 animate-pulse" />
          <div className="hidden md:block absolute -bottom-10 -right-10 w-60 h-60 bg-purple-500/10 blur-3xl rounded-full -z-10 animate-pulse" style={{ animationDelay: "2s" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-purple-500 font-mono text-sm uppercase tracking-[0.3em] block mb-4">
            // THE ARCHITECT
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight text-[var(--text-main)]">
            Crafting Digital<br />
            <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-[var(--text-muted)] text-lg mb-10 leading-relaxed max-w-xl">
            {settings?.about_text || "I am a specialized Software Engineer focusing on building high-performance web ecosystems. My approach combines technical rigor with creative problem-solving to deliver scalable, secure, and intuitive applications."}
          </p>

          <div className="grid grid-cols-2 gap-y-8 gap-x-12 mb-12">
            {[
              { label: "Expertise", value: "Full-Stack Architecture" },
              { label: "Location", value: settings?.location || "Cairo, Egypt" },
              { label: "Philosophy", value: "Clean & Scalable Code" },
              { label: "Status", value: "Available for Hire" },
            ].map((item, i) => (
              <div key={i}>
                <h4 className="text-purple-500 font-bold text-[10px] uppercase tracking-widest mb-2 font-mono">
                  {item.label}
                </h4>
                <p className="text-[var(--text-main)] font-semibold text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-purple-600/20">
              Let's Talk <ArrowRight size={18} />
            </a>
            <a href="#" className="px-8 py-4 rounded-2xl border border-[var(--border-main)] hover:border-[var(--primary)] text-[var(--text-main)] font-bold transition-all bg-[var(--bg-card)] flex items-center gap-2">
              Download Resume <Download size={16} className="opacity-70" />
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
