"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaTelegramPlane, FaGithub, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Hero() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*').single();
      if (data) setSettings(data);
    }
    fetchSettings();
  }, []);

  const socialLinks = [
    { icon: FaGithub, href: settings?.github_url || "https://github.com", color: "hover:text-white" },
    { icon: FaLinkedinIn, href: settings?.linkedin_url || "https://linkedin.com", color: "hover:text-blue-400" },
    { icon: FaWhatsapp, href: settings?.whatsapp_url || `https://wa.me/${settings?.phone || "+201120354592"}`, color: "hover:text-green-500" },
    { icon: FaTwitter, href: settings?.twitter_url || "#", color: "hover:text-sky-400" },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      <div className="grid-overlay" />
      <div className="glow-orb top-[-10%] right-[-10%]" />
      <div className="glow-orb bottom-[20%] left-[-10%] opacity-40" style={{ animationDelay: "-5s" }} />

      <div className="container relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-bold mb-8 animate-pulse uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            {settings?.hero_subtitle || "AVAILABLE FOR COLLABORATION"}
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl lg:text-9xl font-black mb-6 leading-[1] md:leading-[0.85] tracking-tighter"
        >
          {settings?.hero_title ? (
             <>
               {settings.hero_title.split(' ').slice(0, 2).join(' ')} <span className="gradient-text">{settings.hero_title.split(' ').slice(2, 3).join(' ')}</span><br />
               {settings.hero_title.split(' ').slice(3).join(' ')}
             </>
          ) : (
            <>Crafting <span className="gradient-text">Digital</span><br />Architecture</>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[var(--text-muted)] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I'm <span className="text-[var(--text-main)] font-bold">Mostafa Ahmed</span>. {settings?.about_text?.substring(0, 100) || "A Software Engineer building scalable systems with Laravel and immersive frontends with React."}...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a href="#contact" className="group bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl shadow-purple-600/20">
            Let's Build Together <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#projects" className="px-8 py-4 rounded-full border border-[var(--border-main)] hover:border-purple-500/30 text-[var(--text-main)] font-bold transition-all backdrop-blur-sm bg-white/5">
            View Portfolio
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-4 mt-16"
        >
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-muted)] transition-all duration-300 ${link.color} hover:bg-[var(--bg-alt)] hover:border-[var(--primary)]`}
            >
              <link.icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
