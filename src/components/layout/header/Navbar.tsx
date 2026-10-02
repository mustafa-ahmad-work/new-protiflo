"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: t("nav.home"), href: "/#hero" },
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.tech"), href: "/#tech" },
    { name: t("nav.projects"), href: "/#projects" },
    { name: t("nav.experience"), href: "/#experience" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-100 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
      <nav
        className={`pointer-events-auto flex items-center justify-between rounded-[20px] border border-white/20 bg-bg-surface/15 backdrop-blur-xl px-5 sm:px-6 py-3 shadow-2xl transition-all duration-300 ${
          scrolled ? "bg-bg-surface/40 shadow-black/40" : ""
        }`}
      >
        {/* Brand Name */}
        <Link href="/#hero" className="group shrink-0">
          <h1 className="text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors">
            {t("nav.brand")}
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1 bg-bg-main/80 p-1.5 rounded-full border border-white/10">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-gray-200 hover:text-white hover:bg-primary transition-all block"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions: Language Switcher, CTA & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <LanguageSwitcher className="hidden sm:inline-flex" />

          <a
            href="https://wa.me/201092434027"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 btn-primary px-4 sm:px-5 py-2 sm:py-2.5 text-xs"
          >
            <MessageCircle size={15} />
            <span>{t("nav.contactUs")}</span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white rounded-xl bg-white/5 border border-white/20 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto mt-3 rounded-[20px] border border-white/20 bg-bg-surface/95 backdrop-blur-2xl p-6 shadow-2xl lg:hidden flex flex-col gap-4"
          >
            {/* Language Switcher in Mobile Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-gray-300">
                {t("nav.home") === "الرئيسية" ? "اللغة / Language" : "Language / اللغة"}
              </span>
              <LanguageSwitcher />
            </div>

            <ul className="space-y-1.5">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl bg-white/5 text-sm font-bold text-gray-200 hover:bg-primary hover:text-white transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/201092434027"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 btn-primary py-3 text-sm mt-2"
            >
              <MessageCircle size={18} />
              <span>{t("nav.contactWhatsApp")}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
