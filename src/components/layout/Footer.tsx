"use client";

import { FaLinkedinIn, FaGithub, FaWhatsapp } from "react-icons/fa";
import { Mail, ArrowUpRight, MapPin, Terminal } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import ScrollToTop from "./ScrollToTop";

export default function Footer() {
  const { t, isRTL } = useLanguage();

  const socials = [
    { icon: FaGithub, href: "https://github.com/mustafa-ahmad-work", label: "GitHub" },
    { icon: FaLinkedinIn, href: "https://linkedin.com/in/mustafa-ahmad-work", label: "LinkedIn" },
    { icon: FaWhatsapp, href: "https://wa.me/201120354592", label: "WhatsApp" },
    { icon: Mail, href: "mailto:mustafa.ahmad.work@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { name: t("nav.home"), href: "/#hero" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.projects"), href: "/#projects" },
    { name: t("nav.process"), href: "/#process" },
    { name: t("nav.tech"), href: "/#tech" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  const coreSpecialties = [
    { name: isRTL ? "تطوير Laravel & PHP" : "Laravel & PHP Development", href: "/#tech" },
    { name: isRTL ? "واجهات React & Tailwind" : "React & Tailwind Frontend", href: "/#tech" },
    { name: isRTL ? "لوحات تحكم Filament" : "Filament Admin Systems", href: "/#tech" },
    { name: isRTL ? "هندسة قواعد بيانات MySQL" : "MySQL Schema & Optimization", href: "/#tech" },
    { name: isRTL ? "تصميم وتوثيق REST APIs" : "RESTful APIs Architecture", href: "/#services" },
  ];

  return (
    <footer className="pt-20 pb-8 border-t border-white/10 bg-bg-main relative z-10 overflow-hidden text-text-muted">
      <ScrollToTop />

      {/* Top subtle lighting beam */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Brand & Availability Column (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <Link href="/#hero" className="inline-block group">
                <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors tracking-tight">
                  {t("footer.brand")}
                </h3>
              </Link>
              <p className="text-xs text-primary font-bold tracking-wide mt-1">
                {t("footer.role")}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-sm font-normal">
              {t("footer.tagline")}
            </p>

            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{isRTL ? "متاح للعمل على مشاريع جديدة" : "Available for new projects"}</span>
            </div>

            {/* Location & Time */}
            <div className="flex items-center gap-2 text-xs text-text-muted pt-1">
              <MapPin size={13} className="text-primary" />
              <span>{isRTL ? "مصر • توقيت القاهرة (UTC+3)" : "Cairo, Egypt • UTC+3"}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              {isRTL ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Capabilities */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              {isRTL ? "التخصصات البرمجية" : "Specialties"}
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {coreSpecialties.map((item, idx) => (
                <li key={idx}>
                  <Link 
                    href={item.href} 
                    className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect & Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              {isRTL ? "تواصل معي" : "Connect"}
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              {isRTL ? "يسعدني دائماً مناقشة الأفكار والمشاريع الجديدة." : "Always open to discussing new software ideas & projects."}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-bg-surface border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-primary hover:bg-primary transition-all shadow-sm hover:scale-105"
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover transition-colors"
              >
                <span>{isRTL ? "بدء مناقشة مشروع" : "Start a project inquiry"}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Technical Signature */}
        <div className="pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>© 2026 {t("footer.copyright")}</p>
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <Terminal size={12} className="text-primary" />
            <span>Built with Next.js, React 19, Tailwind CSS & Framer Motion</span>
          </div>
        </div>

      </div>

      {/* Massive Laravel-Inspired Watermark Brand Typography across bottom */}
      <div 
        className="w-full overflow-hidden select-none pointer-events-none text-center pt-8 sm:pt-12" 
        dir="ltr"
      >
        <span 
          className="block font-black uppercase tracking-tighter leading-none text-[13vw] sm:text-[12vw] md:text-[11vw] bg-linear-to-b from-white/15 via-white/5 to-transparent bg-clip-text text-transparent opacity-80"
          style={{
            letterSpacing: "-0.04em",
          }}
        >
          MUSTAFA AHMAD
        </span>
      </div>

    </footer>
  );
}
