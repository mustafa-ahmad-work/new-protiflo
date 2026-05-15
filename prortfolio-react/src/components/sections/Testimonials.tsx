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
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .order('id', { ascending: true });
      if (data && data.length > 0) {
        setTestimonials(data);
      }
    }
    fetchTestimonials();
  }, []);

  return (
    <Section id="testimonials">
      <SectionHeader 
        subtitle="TESTIMONIALS" 
        title="Client Voices" 
        description="Trusted by industry leaders and entrepreneurs worldwide."
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item, i) => (
          <motion.div
            key={item.id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card p-10 flex flex-col group hover:border-purple-500/50 transition-all"
          >
            <div className="mb-6">
              <Quote size={40} className="text-purple-500/20 group-hover:text-purple-500/40 transition-colors" />
            </div>
            <div className="flex gap-1 mb-6">
              {[...Array(item.rating || 5)].map((_, idx) => (
                <Star key={idx} size={14} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-10 italic">
              "{item.content}"
            </p>
            <div className="mt-auto pt-6 border-t border-[var(--border-main)] text-right">
              <h4 className="font-bold text-base text-[var(--text-main)]">{item.name}</h4>
              <p className="text-xs text-purple-400 font-mono mt-1">{item.role}</p>
            </div>
          </motion.div>
        ))}

        {testimonials.length === 0 && (
          <div className="col-span-full text-center text-gray-500 italic py-10">
            No testimonials added yet...
          </div>
        )}
      </div>
    </Section>
  );
}
