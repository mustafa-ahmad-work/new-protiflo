"use client";

import { motion } from "framer-motion";
import { FolderGit2, Quote, Star, Sparkles } from "lucide-react";
import Section from "../../components/Section";
import { useLanguage } from "@/components/providers/LanguageProvider";
import testimonialsData from "@/data/testimonials.json";

export default function Testimonials() {
  const { t, language } = useLanguage();
  const isEn = language === "en";

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
        {testimonialsData.map((item, i: number) => {
          const projectTitle = isEn ? item.project.en : item.project.ar;
          const roleTitle = isEn ? item.role.en : item.role.ar;
          const reviewContent = isEn ? item.content.en : item.content.ar;

          return (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 sm:p-9 flex flex-col group hover:border-primary/60 transition-all bg-bg-surface border border-white/10 rounded-3xl shadow-xl justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-bg-main border border-white/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-md">
                    <Quote size={22} className="text-primary" />
                  </div>
                  <div className="flex gap-1 bg-bg-main/60 px-2.5 py-1.5 rounded-full border border-white/10">
                    {[...Array(item.rating || 5)].map((_, idx) => (
                      <Star key={idx} size={13} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-200 text-sm leading-relaxed mb-8 font-normal">
                  &ldquo;{reviewContent}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-white/10 flex items-center gap-3">
                {/* <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 font-black text-xs">
                  <Sparkles size={16} />
                </div> */}
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-white group-hover:text-primary transition-colors truncate">
                    {projectTitle}
                  </h4>
                  <p className="text-xs text-text-muted font-medium mt-0.5 truncate">
                    {roleTitle}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
