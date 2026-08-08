"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('id', { ascending: true });
        if (error) {
          console.warn('Supabase testimonials fetch note:', error.message || error);
        } else if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err: any) {
        console.warn('Error fetching testimonials:', err?.message || err);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <Section id="testimonials" className="py-24 bg-bg-main border-t border-white/10">
      <SectionHeader 
        subtitle="آراء وتجارب الشركاء" 
        title="ماذا يقول عملاؤنا وشراؤنا" 
        description="ثقة نبنيها من خلال حلول تقنية متكاملة والتزام دقيق بالمواعيد والجودة."
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item, i) => (
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
                <Star key={idx} size={14} className="text-primary fill-[#5337FF]" />
              ))}
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-10 italic">
              "{item.content}"
            </p>
            <div className="mt-auto pt-6 border-t border-white/10 text-right">
              <h4 className="font-bold text-base text-white">{item.name}</h4>
              <p className="text-xs text-primary font-medium mt-1">{item.role}</p>
            </div>
          </motion.div>
        ))}

        {testimonials.length === 0 && (
          <div className="col-span-full text-center text-text-muted italic py-10">
            جاري إضافة تقييمات العملاء...
          </div>
        )}
      </div>
    </Section>
  );
}
