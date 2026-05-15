"use client";

import { motion } from "framer-motion";
import {
  Package,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  User,
  Zap,
  MessageSquare,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
  isOpen,
  setIsOpen,
  theme,
  toggleTheme,
}: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Overview", icon: ShieldCheck },
    { id: "projects", label: "Projects", icon: Package },
    { id: "blog", label: "Blog Posts", icon: FileText },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "account", label: "Account", icon: User },
  ];

  const isDark = theme === "dark";

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 w-72 border-r border-[var(--admin-border)] p-8 flex flex-col z-[110] transition-all duration-500 bg-[var(--admin-bg)]",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Brand */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-purple-500 mb-2">
            <Zap size={16} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Pro Access</span>
          </div>
          <h2 className="text-2xl font-black tracking-tighter text-[var(--admin-text)]">
            MOSTAFA <span className="text-[var(--admin-muted)]">AHMED</span>
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-grow space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest opacity-50">Main Engine</p>
          </div>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between group px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden",
                activeTab === item.id
                  ? "bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-500/5"
                  : "text-[var(--admin-muted)] hover:text-[var(--admin-text)] hover:bg-[var(--admin-card)] border border-transparent",
              )}
            >
              <div className="flex items-center gap-4 relative z-10">
                <item.icon
                  size={18}
                  className={cn(
                    "transition-transform duration-300",
                    activeTab === item.id
                      ? "scale-110"
                      : "group-hover:scale-110",
                  )}
                />
                <span className="font-bold text-sm tracking-tight">
                  {item.label}
                </span>
              </div>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTabNav"
                  className="absolute inset-0 bg-purple-600/5 -z-10"
                />
              )}
              <ChevronRight
                size={14}
                className={cn(
                  "transition-transform duration-300 opacity-0 group-hover:opacity-100",
                  activeTab === item.id && "opacity-100 translate-x-1",
                )}
              />
            </button>
          ))}
        </nav>

        {/* Large Theme Toggle & Profile */}
        <div className="mt-auto pt-6 space-y-4">
          
          {/* Large Theme Switcher */}
          <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-3xl p-1.5 flex relative">
            <motion.div 
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-purple-600 rounded-2xl shadow-lg shadow-purple-600/20"
              animate={{ x: isDark ? "0%" : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button 
              onClick={() => isDark || toggleTheme()} 
              className={cn("flex-1 py-3 flex items-center justify-center gap-2 rounded-2xl relative z-10 transition-colors", isDark ? "text-white" : "text-[var(--admin-muted)]")}
            >
              <Moon size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Dark</span>
            </button>
            <button 
              onClick={() => isDark && toggleTheme()} 
              className={cn("flex-1 py-3 flex items-center justify-center gap-2 rounded-2xl relative z-10 transition-colors", !isDark ? "text-white" : "text-[var(--admin-muted)]")}
            >
              <Sun size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Light</span>
            </button>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--admin-card)] border border-[var(--admin-border)] group hover:border-purple-500/30 transition-all">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-500/30">
              <img
                src="/moustafa.jpg"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-grow">
              <p className="text-xs font-bold truncate text-[var(--admin-text)]">Mostafa Ahmed</p>
              <p className="text-[9px] text-[var(--admin-muted)] truncate uppercase tracking-tighter">
                Chief Architect
              </p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-xl text-[var(--admin-muted)] hover:text-red-400 hover:bg-red-400/10 transition-all"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
