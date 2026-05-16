"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, MousePointer2 } from "lucide-react";
import { FaLinkedinIn, FaWhatsapp, FaGithub, FaTwitter } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

export default function Hero() {
  const [settings, setSettings] = useState<any>(null);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*').single();
      if (data) setSettings(data);
    }
    fetchSettings();
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: settings?.github_url || "#", color: "hover:text-purple-400" },
    { icon: FaLinkedinIn, href: settings?.linkedin_url || "#", color: "hover:text-blue-400" },
    { icon: FaWhatsapp, href: settings?.whatsapp_url || "#", color: "hover:text-green-500" },
    { icon: FaTwitter, href: settings?.twitter_url || "#", color: "hover:text-sky-400" },
  ];

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[var(--bg-main)]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
        <div className="absolute top-[10%] right-[10%] w-[300px] h-[300px] bg-purple-600/5 blur-[80px] rounded-full hidden md:block" />
        <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] bg-blue-600/5 blur-[60px] rounded-full hidden md:block" />
        <div className="grid-overlay opacity-30" />
      </div>

      <div className="container relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            {settings?.hero_subtitle || "AVAILABLE FOR COLLABORATION"}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black mb-8 leading-[0.8] tracking-tighter text-[var(--text-main)] mix-blend-difference">
            {settings?.hero_title ? (
               <span className="block">
                 {settings.hero_title.split(' ').map((word: string, i: number) => (
                   <motion.span 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="inline-block mr-4 last:mr-0"
                   >
                     {word === "Digital" || word === "Architecture" ? (
                       <span className="gradient-text italic font-serif px-2">{word}</span>
                     ) : word}
                   </motion.span>
                 ))}
               </span>
            ) : (
              <>Crafting <span className="gradient-text italic font-serif">Digital</span><br />Architecture</>
            )}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, filter: "blur(5px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[var(--text-muted)] text-xl md:text-2xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
        >
          Architecting resilient <span className="text-[var(--text-main)] border-b border-purple-500/30">digital ecosystems</span> where engineering precision meets visionary design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            className="group bg-purple-600 text-white px-10 py-5 rounded-2xl font-black flex items-center gap-4 transition-all shadow-[0_20px_50px_rgba(168,85,247,0.3)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.5)]"
          >
            Start a Revolution <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </motion.a>
          
          <motion.a 
            href="#projects" 
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="group px-10 py-5 rounded-2xl border border-[var(--border-main)] hover:border-purple-500/50 text-[var(--text-main)] font-black transition-all backdrop-blur-xl bg-white/5 flex items-center gap-3"
          >
            Explore Artifacts <Sparkles size={18} className="group-hover:scale-125 transition-transform text-purple-400" />
          </motion.a>
        </motion.div>

        {/* Social Dock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center gap-6 mt-24"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              whileHover={{ y: -8, scale: 1.1 }}
              className={`w-14 h-14 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-card)]/50 backdrop-blur-md flex items-center justify-center text-[var(--text-muted)] transition-all duration-300 ${link.color} hover:border-purple-500/50 shadow-xl group`}
            >
              <link.icon size={22} className="group-hover:drop-shadow-[0_0_10px_currentColor]" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Decorative Mouse Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-20 hover:opacity-100 transition-opacity"
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-purple-500 to-transparent" />
        <span className="text-[7px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)] whitespace-nowrap">Explore Narrative</span>
      </motion.div>
    </section>
  );
}
