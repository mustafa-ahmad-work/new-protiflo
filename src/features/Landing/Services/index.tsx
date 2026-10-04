"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Globe, Server, Layout, Database, Code2, ArrowLeft, ArrowRight,
  ChevronLeft, ChevronRight, CheckCircle, Sparkles
} from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ServiceItem {
  title: string;
  desc: string;
  badge: string;
}

const serviceMeta = [
  {
    icon: Globe,
    techs: ["Laravel", "React", "Tailwind CSS", "MySQL"],
    featuresAr: [
      "بناء حلول ويب متكاملة مصممة خصيصاً لاحتياجات بيئة عملك",
      "أداء استثنائي وتوافق تام 100% مع كافة الشاشات والمقاسات",
      "تجربة مستخدم تفاعلية فائقة السرعة والاستجابة",
      "معمارية كود قابلة للتوسع والتطوير المستقبلي بسهولة"
    ],
    featuresEn: [
      "Custom full-stack web solutions tailored to your business",
      "100% responsive and tested across all modern screen resolutions",
      "Blazing fast user experience with fluid interaction",
      "Modular scalable code ready for long-term growth"
    ],
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
  },
  {
    icon: Server,
    techs: ["Laravel", "PHP 8.2+", "REST APIs", "Sanctum"],
    featuresAr: [
      "بناء وتصميم RESTful APIs عالية الأداء وموثقة بدقة",
      "نظام حماية وتوثيق (Authentication & RBAC) متعدد المستويات",
      "معالجة العمليات الحسابية ومنطق البيانات المعقد",
      "فصل كامل للمسؤوليات ومعمارية معتمدة على مبادئ Clean Code"
    ],
    featuresEn: [
      "High-throughput, secured, and well-documented REST APIs",
      "Robust Authentication & Role-Based Access Control",
      "Heavy transaction processing & background job queues",
      "Clean architecture with strict separation of concerns"
    ],
    iconColor: "text-red-400",
    borderColor: "border-red-500/30 hover:border-red-500/60",
  },
  {
    icon: Layout,
    techs: ["Filament PHP", "Livewire", "Laravel", "Tailwind"],
    featuresAr: [
      "لوحات تحكم تفاعلية لإدارة الأنظمة والمبيعات والمستخدمين",
      "جداول بيانات فورية مع فلاتر ذكية، بحث سريع، وتصدير Excel/PDF",
      "إدارة الصلاحيات وسجلات الأنشطة والتدقيق بدقة",
      "سرعة قياسية في الإنجاز مع ضمان أعلى استقرار في الإنتاج"
    ],
    featuresEn: [
      "Powerful administrative back-offices and operational hubs",
      "Real-time dynamic data tables with filters, search & exports",
      "Comprehensive role management and security audit trails",
      "Rapid time-to-market with rock-solid production stability"
    ],
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
  },
  {
    icon: Database,
    techs: ["MySQL", "ERD Modeling", "Indexing", "Optimization"],
    featuresAr: [
      "تصميم المخططات العلائقية والتطبيع (Relational Schema)",
      "تسريع الاستعلامات وبناء الفهارس الذكية لتحمل الضغط العالي",
      "ضمان تكامل وسلامة البيانات عبر ACID Transactions",
      "تجهيز قواعد البيانات للنمو ومعالجة مئات الآلاف من السجلات"
    ],
    featuresEn: [
      "Relational schema architecture and normalized ERD modeling",
      "Query execution optimization and intelligent composite indexing",
      "Data integrity guarantees via strict ACID transactions",
      "Architected to sustain hundreds of thousands of active records"
    ],
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/30 hover:border-cyan-500/60",
  },
  {
    icon: Code2,
    techs: ["React", "JavaScript ES6+", "Tailwind CSS", "Framer Motion"],
    featuresAr: [
      "واجهات استخدام حديثة بنظام المكونات القابلة لإعادة الاستخدام",
      "حركات وانتقالات انسيابية جذابة تعزز تفاعل الزوار",
      "تكامل فوري وسلس مع الـ APIs والخدمات الخارجية",
      "كود منظم وفق أحدث معايير الـ Frontend لسرعة التصفح"
    ],
    featuresEn: [
      "Component-based modern frontend user interfaces",
      "Fluid micro-animations that captivate users and elevate experience",
      "Seamless API integration with optimized client state",
      "Clean, scalable codebase prioritizing instant page loads"
    ],
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
  },
];

export default function Services() {
  const { t, isRTL } = useLanguage();
  const rawItems = (t("services.items", { returnObjects: true }) as ServiceItem[]) || [];

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  return (
    <section id="services" className="py-24 bg-bg-main relative overflow-hidden border-t border-white/10 w-full">
      {/* Dynamic 3D lighting atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-187.5 h-100 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4">
              <Sparkles size={14} />
              <span>{t("services.badge")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
              {t("services.title")}
            </h2>
            <p className="text-sm sm:text-base text-text-muted font-normal leading-relaxed">
              {t("services.subtitle")}
            </p>
          </div>

          {/* 3D Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="w-12 h-12 rounded-2xl bg-bg-surface/90 border border-white/15 hover:border-primary text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer group backdrop-blur-md"
              aria-label="Previous Service"
            >
              {isRTL ? (
                <ChevronRight size={22} className="group-hover:text-primary transition-colors" />
              ) : (
                <ChevronLeft size={22} className="group-hover:text-primary transition-colors" />
              )}
            </button>

            <span className="text-xs font-mono font-bold text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              {isRTL ? "3D حلول متكاملة" : "3D Solutions"}
            </span>

            <button
              onClick={() => swiperInstance?.slideNext()}
              className="w-12 h-12 rounded-2xl bg-bg-surface/90 border border-white/15 hover:border-primary text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl cursor-pointer group backdrop-blur-md"
              aria-label="Next Service"
            >
              {isRTL ? (
                <ChevronLeft size={22} className="group-hover:text-primary transition-colors" />
              ) : (
                <ChevronRight size={22} className="group-hover:text-primary transition-colors" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-Width 3D Carousel - MULTIPLE CARDS VISIBLE ACROSS SCREEN WITH EQUAL HEIGHT */}
      <div className="w-full relative z-10 px-2 sm:px-6 overflow-hidden">
        <Swiper
          dir={isRTL ? "rtl" : "ltr"}
          key={isRTL ? "services-rtl" : "services-ltr"}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.15}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
          speed={750}
          onSwiper={setSwiperInstance}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 140,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-3d-bullet",
            bulletActiveClass: "swiper-3d-bullet-active",
          }}
          className="w-full py-6 items-stretch"
        >
          {rawItems.map((service, index) => {
            const meta = serviceMeta[index % serviceMeta.length];
            const Icon = meta.icon;
            const features = isRTL ? meta.featuresAr : meta.featuresEn;

            return (
              <SwiperSlide
                key={index}
                className="h-auto! flex"
              >
                {/* 100% Equal Height Card */}
                <div className={`w-full h-full min-h-125 rounded-3xl p-6 sm:p-8 lg:p-9 flex flex-col justify-between group border-gray-800 transition-all duration-300 relative overflow-hidden bg-[#111827]/95 border shadow-2xl backdrop-blur-xl`}>

                  <div className="flex-1 flex flex-col">
                    {/* Top Header Row */}
                    <div className="w-full flex items-center justify-between mb-5 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-12 h-12 rounded-2xl bg-bg-main border border-white/15 flex items-center justify-center ${meta.iconColor} group-hover:scale-105 transition-transform duration-300 shadow-md shrink-0`}>
                          <Icon size={22} />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-0.5">
                            {service.badge}
                          </span>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <span className="text-2xl sm:text-3xl font-black text-white/20 font-mono shrink-0">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal mb-5">
                      {service.desc}
                    </p>

                    {/* Key Deliverables Box */}
                    <div className="space-y-2.5 mb-5 p-4 sm:p-5 rounded-2xl bg-bg-main/90 border border-white/10 flex-1">
                      <span className="text-xs font-bold text-gray-200 block mb-1">
                        {isRTL ? "ما يشمله الحل البرمجي والتنفيذي:" : "Key Deliverables & Specs:"}
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {features.map((feature, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-text-muted leading-relaxed">
                            <CheckCircle size={14} className="text-primary shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-5">
                      <span className="text-xs font-semibold text-gray-400 mr-1">
                        {isRTL ? "التقنيات:" : "Stack:"}
                      </span>
                      {meta.techs.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-lg bg-bg-main border border-white/10 text-[11px] font-medium text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action CTA Button */}
                  <div className="pt-3 border-t border-white/10">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary group-hover:text-white transition-colors w-full justify-between py-1"
                    >
                      <span>{t("services.requestService")}</span>
                      {isRTL ? (
                        <ArrowLeft size={16} className="group-hover:-translate-x-1.5 transition-transform" />
                      ) : (
                        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                      )}
                    </a>
                  </div>

                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
