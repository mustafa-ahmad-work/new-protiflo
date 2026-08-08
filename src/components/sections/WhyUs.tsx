"use client";

import { motion } from "framer-motion";
import {
  Zap, ShieldCheck, Code2, Search, Gauge,
  Server, Lock, CheckCircle2
} from "lucide-react";

const features = [
  {
    title: "نقلة نوعية لمشروعك",
    desc: "حقق قفزة كبيرة في مشروعك من خلال حلولنا البرمجية المتقدمة والتصميمات الفاخرة.",
    icon: Zap,
    color: "#465FF1"
  },
  {
    title: "فحص شامل للأمان",
    desc: "نضمن لك موقعاً وتطبيقاً خالياً من الثغرات بإجراء اختبارات أمان دقيقة وتشفير عالي.",
    icon: ShieldCheck,
    color: "#A999FF"
  },
  {
    title: "كود قابل للتطوير والتوسع",
    desc: "نحرص على كتابة كود نظيف ومرن، مما يتيح لك إضافة ميزات جديدة وتوسيع مشروعك بسهولة.",
    icon: Code2,
    color: "#3ECF8E"
  },
  {
    title: "تهيئة محركات البحث (SEO)",
    desc: "نبني هيكلاً برمجياً متوافقاً 100% مع معايير Google لضمان تصدر نتائج البحث الأولى.",
    icon: Search,
    color: "#F38020"
  },
  {
    title: "أداء وسرعة فائقة",
    desc: "أوقات تحميل متناهية السرعة تحقق تجربة مستخدم مثالية وترفع من نسبة التفاعل.",
    icon: Gauge,
    color: "#61DAFB"
  },
  {
    title: "استضافة وإدارة سيرفرات",
    desc: "إدارة متكاملة للسيرفرات السحابية وقواعد البيانات لضمان عمل منصتك على مدار 24 ساعة.",
    icon: Server,
    color: "#FF9900"
  },
];

const checklist = [
  "شيفرة برمجية نظيفة وسريعة التحميل.",
  "تحسين عناصر الميتا وهيكلة البيانات Meta Tags.",
  "تعزيز تجربة المستخدم المستهدفة UI/UX.",
  "تأمين كامل ضد هجمات الثغرات الأمنية.",
  "نتائج ملحوظة وزيادة معدل التحويلات.",
  "توثيق وشرح شامل للنظام لسهولة التطوير."
];

export default function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-bg-main border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest bg-primary px-5 py-2 rounded-full border border-white/20 shadow-lg shadow-primary/30 mb-5">
            <span>نعمل بإتقان</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-snug mb-4">
            لماذا نكون الخيار الأمثل لمشروعك؟
          </h2>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed">
            نجمع بين الهندسة البرمجية المتطورة والرؤية التسويقية الثاقبة لبناء منتجات رقمية فريدة.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-bg-surface p-8 rounded-[20px] border border-white/10 hover:border-primary/60 transition-all group flex flex-col items-start justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-bg-main border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <Icon size={24} style={{ color: item.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Split Showcase Banner (Rascoda Style) */}
        <div className="bg-bg-surface border border-white/10 rounded-[24px] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-white bg-primary px-4 py-1.5 rounded-full border border-white/20 shadow-md">
              <Lock size={14} />
              <span>جودة ومعايير عالمية</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              تهيئة مشروعك الرقمي لأعلى درجات الأداء والموثوقية
            </h3>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              نركز على بناء بنية برمجية متطورة تمزج بين سرعة التحميل، قوة الأمان، والتهيئة الدقيقة لمحركات البحث لضمان نجاح مشروعك واستمراريته.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {checklist.map((check, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-gray-200">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-bg-main rounded-[20px] p-8 border border-white/10 flex flex-col justify-center space-y-6">
            <div className="p-4 bg-bg-surface rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-xs text-text-muted">معدل أداء الكود والسرعة</span>
              <span className="text-sm font-bold text-primary">99.8% (سرعة استجابة فائقة)</span>
            </div>
            <div className="p-4 bg-bg-surface rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-xs text-text-muted">معايير الأمان والتشفير</span>
              <span className="text-sm font-bold text-primary">A+ أعلى حماية وأمان</span>
            </div>
            <div className="p-4 bg-bg-surface rounded-xl border border-white/10 flex items-center justify-between">
              <span className="text-xs text-text-muted">توافقية محركات البحث</span>
              <span className="text-sm font-bold text-primary">100% متوافق مع SEO</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
