"use client";

import { motion } from "framer-motion";
import { 
  Globe, Smartphone, Layout, Palette, Database, 
  Code2, ShieldAlert, Kanban, CloudLightning, ArrowLeft 
} from "lucide-react";

const services = [
  {
    title: "برمجة وتطوير المواقع",
    desc: "نطوّر مواقع ويب تفاعلية عالية الأداء وسريعة الاستجابة تناسب متطلبات أعمالك، باستخدام أحدث تقنيات Next.js و React.",
    icon: Globe,
    badge: "Web Dev"
  },
  {
    title: "برمجة وتطوير التطبيقات",
    desc: "نصمم ونطوّر تطبيقات هواتف ذكية متخصصة (iOS & Android) تتميز بالسرعة والسهولة وتلبي التوقعات العالية للمستخدمين.",
    icon: Smartphone,
    badge: "Mobile Apps"
  },
  {
    title: "تصميم واجهة المستخدم UI & UX",
    desc: "نبتكر واجهات مستخدم جذابة وسلسة تعزز من تجربة العميل وترفع من نسب التفاعل والتحويل داخل منصتك.",
    icon: Layout,
    badge: "UI/UX Design"
  },
  {
    title: "تصميم الهوية والبراندنج",
    desc: "نبتكر هوية بصرية متكاملة وفريدة تعكس قيم مشروعك وتميّز علامتك التجارية في السوق الرقمي.",
    icon: Palette,
    badge: "Branding"
  },
  {
    title: "هندسة الأنظمة وقواعد البيانات",
    desc: "نبني بنية تحتية برمجية متينة وقواعد بيانات مهيأة للتوسع والتعامل مع ملايين السجلات بكفاءة وسرعة عالية.",
    icon: Database,
    badge: "System Architecture"
  },
  {
    title: "تطوير وتأمين APIs والميكروسيرفيس",
    desc: "نبني واجهات برمجة تطبيقات (REST APIs) آمنة للغاية ومشفرة لربط الأنظمة والتطبيقات بسلاسة.",
    icon: Code2,
    badge: "APIs & Backend"
  },
  {
    title: "اختبار الأمان وسد الثغرات",
    desc: "نفحص موقعك وتطبيقك بدقة لكشف الثغرات الأمنية وضمان حماية بيانات عملائك وفق أعلى المعايير.",
    icon: ShieldAlert,
    badge: "Security Audit"
  },
  {
    title: "إدارة وتتبع المشاريع البرمجية",
    desc: "نوفر نظام متابعة مخصص لتحديثات المشروعات، مما يضمن لك الاطلاع على سير العمل فورياً وبمنتهى الشفافية.",
    icon: Kanban,
    badge: "Agile Management"
  },
  {
    title: "تحسين الأداء والاستضافة السحابية",
    desc: "نُحسّن سرعة تحميل الموقع وإدارة السيرفرات السحابية (AWS / Cloudflare) لضمان أداء مستقر على مدار الساعة.",
    icon: CloudLightning,
    badge: "Cloud & DevOps"
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg-main relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-5">
            <span>خدماتنا المتخصصة</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-snug mb-4">
            حلول برمجية متكاملة نتميّز بإتقانها
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-2xl font-normal leading-relaxed">
            نقدم مجموعة متكاملة من الخدمات التقنية المصممة لتلبية تطلعاتك وتحقيق قفزة نوعية لمشروعك.
          </p>
        </div>

        {/* Services Grid (Rascoda Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-card p-8 flex flex-col items-start justify-between group hover:border-primary/60 relative overflow-hidden bg-bg-surface border border-white/10 rounded-[20px]"
              >
                {/* Top Badge & Icon */}
                <div className="w-full flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-bg-main border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-all shadow-md">
                    <Icon size={26} />
                  </div>
                  <span className="text-[10px] font-bold text-text-muted bg-bg-main px-3 py-1 rounded-full border border-white/10">
                    {service.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed font-normal">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Action */}
                <a
                  href="https://wa.me/201092434027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-white transition-colors pt-4 border-t border-white/10 w-full justify-between"
                >
                  <span>طلب الخدمة الآن</span>
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
