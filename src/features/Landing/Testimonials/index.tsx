"use client";

import { motion } from "framer-motion";
import { Quote, Star, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/components/providers/LanguageProvider";
import testimonialsData from "@/data/testimonials.json";
import type { TestimonialItem } from "@/types";
import SectionHeader from "@/features/components/SectionHeader";
import Section from "@/features/components/Section";

export default function Testimonials() {
  const { t, language } = useLanguage();
  const isEn = language === "en";

  const testimonials = testimonialsData as unknown as TestimonialItem[];

  return (
    <Section id="testimonials" className="border-t border-border-subtle bg-bg-main relative">
      <SectionHeader
        subtitle={t("testimonials.badge")}
        title={t("testimonials.title")}
        description={t("testimonials.subtitle")}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item, i: number) => {
          const projectTitle = isEn ? item.project.en : item.project.ar;
          const roleTitle = isEn ? item.role.en : item.role.ar;
          const clientName = item.clientName ? (isEn ? item.clientName.en : item.clientName.ar) : null;
          const reviewContent = isEn ? item.content.en : item.content.ar;
          // const initials = clientName ? clientName.slice(0, 2) : "🌟";

          return (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="h-full"
            >
              <Card
                variant="glass"
                className="p-7 sm:p-8 flex flex-col justify-between h-full group hover:border-primary/60 transition-all shadow-lg"
              >
                <div>
                  {/* Top Bar: Quote icon & Stars + Verified Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-xs">
                      <Quote size={20} className="text-primary" />
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge variant="success" size="sm" icon={<CheckCircle2 size={11} />}>
                        {isEn ? "Verified" : "موثق"}
                      </Badge>
                      <div className="flex gap-1 bg-bg-surface/80 px-2.5 py-1.5 rounded-full border border-border-subtle">
                        {[...Array(item.rating || 5)].map((_, idx) => (
                          <Star key={idx} size={12} className="text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-text-muted text-sm leading-relaxed mb-6 font-normal italic">
                    &ldquo;{reviewContent}&rdquo;
                  </p>
                </div>

                {/* Client Info Footer */}
                <div className="pt-4 border-t border-border-subtle flex items-center gap-3">
                  {/* <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-primary/20 to-blue-500/20 border border-primary/30 flex items-center justify-center text-primary font-black text-xs shrink-0 shadow-xs">
                    {initials}
                  </div> */}
                  <div className="overflow-hidden">
                    {clientName && (
                      <h3 className="font-bold text-sm text-text-main group-hover:text-primary transition-colors truncate">
                        {clientName}
                      </h3>
                    )}
                    <p className="text-xs text-primary font-semibold truncate">
                      {projectTitle}
                    </p>
                    <p className="text-[11px] text-text-muted truncate mt-0.5">
                      {roleTitle}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
