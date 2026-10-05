"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Section from "../../components/Section";
import { Reveal, StaggerContainer, StaggerItem } from "../../../components/layout/Reveal";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/Badge";

export default function About() {
  const { t, isRTL } = useLanguage();

  const details = (t("about.details", { returnObjects: true }) as { label: string; value: string }[]) || [];

  return (
    <Section id="about" className="bg-bg-main py-24 md:py-32 border-t border-white/10">
      <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
        <Reveal>
          <div className="relative group">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl transition-transform duration-700 group-hover:scale-[0.98] bg-bg-surface">
              <Image
                src="/images/about.jpg"
                alt={isRTL ? "مصطفى أحمد - نبذة عن المطور وخبراتي التقنية" : "Mustafa Ahmad - About Me and Software Experience"}
                width={773}
                height={920}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 440px"
                className="w-full h-auto max-h-[550px] object-cover group-hover:grayscale-0 transition duration-1000 group-hover:scale-105"
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 blur-2xl rounded-full -z-10 hidden md:block" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/10 blur-2xl rounded-full -z-10 hidden md:block" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[105%] h-[105%] border border-primary/30 rounded-[3rem] -z-10 scale-100 group-hover:scale-[1.02] transition-transform duration-700 hidden sm:block" />
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.2}>
            <Badge variant="primary">
              {t("about.badge")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight text-white">
              {t("about.title")}
            </h2>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed font-normal">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
          </Reveal>

          <StaggerContainer>
            <div className="grid grid-cols-2 gap-y-5 gap-x-6 pt-2 pb-4">
              {details.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="p-3.5 rounded-2xl bg-bg-surface border border-white/10">
                    <h3 className="text-primary font-bold text-[11px] uppercase tracking-wider mb-1">
                      {item.label}
                    </h3>
                    <p className="text-white font-bold text-xs sm:text-sm">{item.value}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <Reveal delay={0.5}>
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href="#services"
                aria-label={t("about.cta")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-xl shadow-primary/30 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>{t("about.cta")}</span>
                {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </motion.a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
