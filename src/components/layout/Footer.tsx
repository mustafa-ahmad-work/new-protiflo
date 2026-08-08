"use client";

import { FaLinkedinIn, FaGithub, FaWhatsapp, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const socials = [
    { icon: FaGithub, href: "https://github.com/mustafa-ahmad-work", label: "GitHub" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FaWhatsapp, href: "https://wa.me/201092434027", label: "WhatsApp" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <footer className="py-16 border-t border-white/10 bg-bg-main relative z-10 text-text-muted">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-lg font-black text-white">مصطفى أحمد</h3>
              <p className="text-xs text-text-muted">مهندس برمجيات وتطوير الأنظمة الرقمية</p>
            </div>
          </div>

          {/* Nav Map */}
          <div className="flex flex-wrap gap-6 text-xs font-bold text-gray-200">
            <Link href="/#hero" className="hover:text-primary transition-colors">الرئيسية</Link>
            <Link href="/#about" className="hover:text-primary transition-colors">من أنا</Link>
            <Link href="/#services" className="hover:text-primary transition-colors">الخدمات</Link>
            <Link href="/#tech" className="hover:text-primary transition-colors">التقنيات</Link>
            <Link href="/#projects" className="hover:text-primary transition-colors">أعمالنا</Link>
            <Link href="/#contact" className="hover:text-primary transition-colors">تواصل معنا</Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-bg-surface border border-white/10 flex items-center justify-center text-gray-200 hover:text-white hover:border-primary hover:bg-primary transition-all shadow-sm"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>© {new Date().getFullYear()} مصطفى أحمد. جميع الحقوق محفوظة.</p>
          <p className="text-[10px]">مُصمَم ومُهندس وفق أعلى المعايير القياسية العالمية.</p>
        </div>
      </div>
    </footer>
  );
}
