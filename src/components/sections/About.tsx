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
    <Section id="about" className="bg-bg-main py-24 md:py-32 border-t border-white/10">
      <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        <Reveal>
          <div className="relative group">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/20 aspect-square shadow-2xl transition-transform duration-700 group-hover:scale-[0.98] bg-bg-surface">
              <img
                src="/moustafa.jpg"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-1000 group-hover:scale-110"
                alt="مصطفى أحمد"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-2xl rounded-full -z-10 hidden md:block" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 blur-2xl rounded-full -z-10 hidden md:block" />
            
            {/* Design Element - Responsive Scale */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border border-primary/30 rounded-[3rem] -z-10 scale-100 group-hover:scale-[1.02] transition-transform duration-700 hidden sm:block" />
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.2}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-bg-surface px-4 py-1.5 rounded-full border border-white/10 inline-block mb-4">
              عن المهندس مصطفى أحمد
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">
              بناء هندسة برمجية متطورة <br />
              <span className="text-primary">تجمع الإتقان والإبداع</span>
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-text-muted text-base md:text-lg mb-8 leading-relaxed font-normal">
              {settings?.about_text || "مهندس برمجيات متخصص في بناء وتطوير الأنظمة الرقمية عالية الأداء والتطبيقات المتكاملة باستخدام أحدث التقنيات الهندسة. أركز على تقديم حلول برمجية آمنة، قابلة للتوسع، ومصممة بدقة لتلبية تطلعات الأعمال والشركات."}
            </p>
          </Reveal>

          <StaggerContainer>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10">
                {[
                { label: "التخصص", value: "هندسة الأنظمة وتطوير البرمجيات" },
                { label: "الموقع", value: settings?.location || "مصر، القاهرة / قنا" },
                { label: "منهجية العمل", value: "كود نظيف وقابل للتوسع" },
                { label: "الحالة", value: "متاح للمشاريع والتعاقدات" },
                ].map((item, i) => (
                <StaggerItem key={i}>
                    <h4 className="text-primary font-bold text-xs uppercase tracking-wider mb-1">
                    {item.label}
                    </h4>
                    <p className="text-white font-bold text-sm">{item.value}</p>
                </StaggerItem>
                ))}
            </div>
          </StaggerContainer>

          <Reveal delay={0.6}>
            <div className="flex flex-wrap gap-4">
                <motion.a 
                    href="#contact" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-xl shadow-[#5337FF]/30 text-xs"
                >
                    تواصل معي الآن <ArrowRight size={18} />
                </motion.a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
