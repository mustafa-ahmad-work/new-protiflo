"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Cpu, Layout, BookOpen, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/#hero", icon: Home },
  { name: "About", href: "/#about", icon: User },
  { name: "Services", href: "/#services", icon: Cpu },
  { name: "Works", href: "/#projects", icon: Layout },
  { name: "Blog", href: "/#blog", icon: BookOpen },
  { name: "Connect", href: "/#contact", icon: MessageSquare },
];

import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "hero";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id") || "hero";
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 md:top-6 md:bottom-auto z-[1000] w-[95%] md:w-max max-w-[98vw]">
      <div className="bg-[var(--nav-bg)] backdrop-blur-xl border border-[var(--border-main)] p-1 md:p-2 rounded-2xl md:rounded-full flex items-center justify-between md:justify-center gap-0.5 md:gap-2 shadow-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const sectionId = item.href.split('#')[1];
          const isActive = activeSection === sectionId;
          
          return (
            <a
              key={item.name}
              href={mounted ? item.href : item.href.replace(/^\//, "")}
              className={cn(
                "flex flex-col md:flex-row items-center gap-0.5 md:gap-2 flex-1 md:flex-initial py-1.5 px-1 md:py-2.5 md:px-5 rounded-xl md:rounded-full transition-all duration-300 min-w-0",
                isActive 
                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/10" 
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/5"
              )}
            >
              <Icon size={16} className="md:w-[18px] md:h-[18px]" />
              <span className="text-[8px] min-[380px]:text-[10px] md:text-sm font-bold tracking-tight truncate">{item.name}</span>
            </a>
          );
        })}
        <div className="ml-0.5 pl-0.5 border-l border-[var(--border-main)] shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
