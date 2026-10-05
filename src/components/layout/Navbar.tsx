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
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.projects"), href: "/#projects" },
    { name: t("nav.process"), href: "/#process" },
    { name: t("nav.tech"), href: "/#tech" },
    { name: t("nav.contact"), href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pointer-events-none">
      <nav
        aria-label="التنقل الرئيسي / Main Navigation"
        className={`pointer-events-auto flex items-center justify-between gap-2 rounded-[20px] border border-border-main bg-bg-surface/70 backdrop-blur-xl px-3.5 sm:px-6 py-2.5 sm:py-3 shadow-xl transition-all duration-300 ${
          scrolled ? "shadow-2xl border-primary/30" : ""
        }`}
      >
        {/* Brand Name - Semantic span instead of h1 */}
        <Link
          href="/#hero"
          className="group shrink min-w-0 mr-1 sm:mr-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        >
          <span className="text-sm xs:text-base sm:text-xl font-black tracking-tight text-text-main group-hover:text-primary transition-colors truncate max-w-[140px] xs:max-w-[190px] sm:max-w-none block">
            {t("nav.brand")}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1 bg-bg-main/60 p-1.5 rounded-full border border-border-subtle">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold text-text-muted hover:text-text-main hover:bg-primary/10 transition-all block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions: Theme Toggle, Language Switcher, CTA & Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Theme Toggle Button */}
          {/* <ThemeToggle /> */}

          {/* Mobile Compact Language Switcher */}
          <LanguageSwitcher id="header-mobile" variant="compact" className="sm:hidden" />

          {/* Desktop Pill Language Switcher */}
          <LanguageSwitcher id="header-desktop" className="hidden! sm:inline-flex!" />

          <a
            href="https://wa.me/201120354592"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 btn-primary px-4 sm:px-5 py-2 sm:py-2.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <MessageCircle size={15} />
            <span>{t("nav.contactUs")}</span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-text-muted hover:text-text-main rounded-xl bg-bg-surface border border-border-subtle transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={mobileOpen ? "إغلاق القائمة / Close menu" : "فتح القائمة / Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto mt-2 rounded-[20px] border border-border-main bg-bg-surface/95 backdrop-blur-2xl p-5 sm:p-6 shadow-2xl lg:hidden flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Theme & Language Switcher in Mobile Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <span className="text-xs font-bold text-text-muted">
                {t("nav.home") === "الرئيسية" ? "المظهر واللغة" : "Theme & Language"}
              </span>
              <div className="flex items-center gap-2">
                {/* <ThemeToggle /> */}
                <LanguageSwitcher id="drawer-menu" />
              </div>
            </div>

            <ul className="space-y-1.5">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-xl bg-bg-main/50 border border-border-subtle text-sm font-bold text-text-main hover:bg-primary hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/201120354592"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 btn-primary py-3 text-sm mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
