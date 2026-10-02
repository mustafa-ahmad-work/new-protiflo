"use client";

import { motion } from "framer-motion";
import { FolderGit2, Quote, Star } from "lucide-react";
import Section from "../../components/Section";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Testimonials() {
  const { t } = useLanguage();
  const testimonials = (t("testimonials.items", { returnObjects: true }) as any[]) || [];

  return (
    <Section id="testimonials" className="border-t border-white/10">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4 sm:mb-5">
          <FolderGit2 size={14} />
          <span>{t("testimonials.badge")}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-snug mb-3 sm:mb-4">
          {t("testimonials.title")}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
          {t("testimonials.subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item: any, i: number) => (
          <motion.div
            key={item.id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card p-10 flex flex-col group hover:border-primary/60 transition-all bg-bg-surface border border-white/10 rounded-[20px]"
          >
            <div className="mb-6">
              <Quote size={40} className="text-primary/30 group-hover:text-primary transition-colors" />
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(item.rating || 5)].map((_, idx) => (
                <Star key={idx} size={14} className="text-primary fill-primary" />
              ))}
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-10 italic">
              "{item.content}"
            </p>
            <div className="mt-auto pt-6 border-t border-white/10">
              <h4 className="font-bold text-base text-white">{item.name}</h4>
              <p className="text-xs text-primary font-medium mt-1">{item.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
