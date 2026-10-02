"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Section from "../../components/Section";
import { Reveal, StaggerContainer, StaggerItem } from "../../../components/layout/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function About() {
  const { language, isRTL } = useLanguage();

  const isAr = language === "ar";

  const details = isAr
    ? [
      { label: "التخصص", value: "هندسة الأنظمة وتطوير البرمجيات" },
      { label: "الموقع", value: "مصر، القاهرة / قنا" },
      { label: "منهجية العمل", value: "كود نظيف وقابل للتوسع" },
      { label: "الحالة", value: "متاح للمشاريع والتعاقدات" },
    ]
    : [
      { label: "Specialty", value: "Systems Architecture & Full-Stack" },
      { label: "Location", value: "Egypt, Cairo / Qena" },
      { label: "Methodology", value: "Clean, Scalable Architecture" },
      { label: "Availability", value: "Open for Contracts & Projects" },
    ];

  return (
    <Section id="about" className="bg-bg-main py-24 md:py-32 border-t border-white/10">
      <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        <Reveal>
          <div className="relative group">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/20 aspect-square shadow-2xl transition-transform duration-700 group-hover:scale-[0.98] bg-bg-surface">
              <img
                src="/moustafa.jpg"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-1000 group-hover:scale-110"
                alt="Mustafa Ahmad"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-2xl rounded-full -z-10 hidden md:block" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 blur-2xl rounded-full -z-10 hidden md:block" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border border-primary/30 rounded-[3rem] -z-10 scale-100 group-hover:scale-[1.02] transition-transform duration-700 hidden sm:block" />
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={0.2}>
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-bg-surface px-4 py-1.5 rounded-full border border-white/10 inline-block mb-4">
              {isAr ? "عن المهندس مصطفى أحمد" : "About Eng. Mustafa Ahmad"}
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-white">
              {isAr ? (
                <>
                  بناء هندسة برمجية متطورة <br />
                  <span className="text-primary">تجمع الإتقان والإبداع</span>
                </>
              ) : (
                <>
                  Architecting Modern Software <br />
                  <span className="text-primary">Blending Precision & Innovation</span>
                </>
              )}
            </h2>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-text-muted text-base md:text-lg mb-8 leading-relaxed font-normal">
              {isAr
                ? "مهندس برمجيات متخصص في بناء وتطوير الأنظمة الرقمية عالية الأداء والتطبيقات المتكاملة باستخدام أحدث التقنيات الهندسية. أركز على تقديم حلول برمجية آمنة، قابلة للتوسع، ومصممة بدقة لتلبية تطلعات الأعمال والشركات."
                : "Software engineer specialized in building high-performance digital systems and full-stack applications with cutting-edge engineering standards. Focused on delivering secure, scalable, and meticulously designed software that drives measurable business results."}
            </p>
          </Reveal>

          <StaggerContainer>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8 mb-10">
              {details.map((item, i) => (
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
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-xl shadow-primary/30 text-xs"
              >
                <span>{isAr ? "تواصل معي الآن" : "Get In Touch Now"}</span>
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </motion.a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
