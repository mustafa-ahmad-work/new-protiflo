"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Section from "../layout/Section";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('settings').select('*').single();
      if (data) setSettings(data);
    }
    fetchSettings();
  }, []);

  const contactInfo = [
    { icon: MapPin, label: "Location", value: settings?.location || "Egypt, Quna" },
    { icon: Phone, label: "Phone", value: settings?.phone || "(+20) 01092434027" },
    { icon: Mail, label: "Email", value: settings?.email || "mustafa.ahmad.work@gmail.com" },
  ];

  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card p-12 md:p-24 relative overflow-hidden"
      >
        <div className="relative z-10 grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-purple-500 font-mono text-sm uppercase tracking-[0.3em] block mb-4">
              // GET IN TOUCH
            </span>
            <h2 className="text-5xl font-black mb-8 leading-tight text-[var(--text-main)]">
              Send Us a Note and<br />
              <span className="text-purple-500">Initiate the Dialogue!</span>
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-12 leading-relaxed max-w-md">
              We’d love to hear from you! Whether you have questions, feedback, or just want to connect, reach out and let’s make it happen.
            </p>

            <div className="space-y-8">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-[var(--text-main)] font-bold text-lg">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="Mostafa Ahmed" className="w-full bg-[var(--bg-alt)] border border-[var(--border-main)] rounded-xl px-5 py-4 focus:border-purple-500/50 outline-none transition-all text-[var(--text-main)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" placeholder="hello@example.com" className="w-full bg-[var(--bg-alt)] border border-[var(--border-main)] rounded-xl px-5 py-4 focus:border-purple-500/50 outline-none transition-all text-[var(--text-main)]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Subject</label>
                <input type="text" placeholder="Project Inquiry" className="w-full bg-[var(--bg-alt)] border border-[var(--border-main)] rounded-xl px-5 py-4 focus:border-purple-500/50 outline-none transition-all text-[var(--text-main)]" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest ml-1">Message</label>
                <textarea rows={4} placeholder="How can I help you?" className="w-full bg-[var(--bg-alt)] border border-[var(--border-main)] rounded-xl px-5 py-4 focus:border-purple-500/50 outline-none transition-all text-[var(--text-main)] resize-none"></textarea>
              </div>
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-purple-600/20">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
