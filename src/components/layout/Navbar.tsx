"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Menu, X, Sparkles, MessageCircle } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "الرئيسية", href: "/#hero" },
  { name: "من أنا", href: "/#about" },
  { name: "الخدمات", href: "/#services" },
  { name: "التقنيات", href: "/#tech" },
  { name: "أعمالنا", href: "/#projects" },
  { name: "تواصل معنا", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-[100] px-4 max-w-7xl mx-auto pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between rounded-[20px] border border-white/20 bg-bg-surface/90 backdrop-blur-md px-6 py-3.5 shadow-2xl transition-all duration-300">
        {/* Brand Name */}
        <Link href="/#hero" className="group">
          <h1 className="text-xl font-black tracking-tight text-white group-hover:text-primary transition-colors">
            مصطفى أحمد
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1 bg-bg-main/80 p-1.5 rounded-full border border-white/10">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="px-4 py-2 rounded-full text-xs font-bold text-gray-200 hover:text-white hover:bg-primary transition-all block"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/201092434027"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 btn-primary px-6 py-3 text-xs"
          >
            <MessageCircle size={16} />
            <span>تواصل معنا</span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white rounded-xl bg-white/5 border border-white/20"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="pointer-events-auto mt-3 rounded-[20px] border border-white/20 bg-bg-surface/95 backdrop-blur-xl p-6 shadow-2xl lg:hidden flex flex-col gap-4"
        >
          <ul className="space-y-2">
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
            className="w-full flex items-center justify-center gap-2 btn-primary py-3.5 text-sm"
          >
            <MessageCircle size={18} />
            <span>تواصل معنا عبر واتساب</span>
          </a>
        </motion.div>
      )}
    </header>
  );
}
