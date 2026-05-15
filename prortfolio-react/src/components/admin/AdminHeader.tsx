"use client";

import { Search, Plus, Menu } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  onAdd: () => void;
  addButtonLabel: string;
  progress?: number;
  onMenuClick?: () => void;
}

export function AdminHeader({ 
  title, subtitle, searchTerm, setSearchTerm, onAdd, addButtonLabel, progress = 0, onMenuClick 
}: AdminHeaderProps) {
  return (
    <div className="sticky top-0 z-50">
      <header className="bg-[var(--admin-bg)]/80 backdrop-blur-2xl border-b border-[var(--admin-border)] p-6 md:p-8 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-4">
            <button 
              onClick={onMenuClick}
              className="p-2 -ml-2 rounded-xl bg-[var(--admin-card)] border border-[var(--admin-border)] lg:hidden text-[var(--admin-muted)]"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-[var(--admin-text)]">{title}</h1>
              <p className="text-[9px] md:text-[10px] uppercase font-bold text-[var(--admin-muted)] tracking-widest mt-1">{subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onAdd}
            className="md:hidden bg-purple-600 text-white p-2.5 rounded-xl font-bold shadow-xl shadow-purple-600/20"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" size={16} />
            <input 
              type="text" 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl pl-12 pr-6 py-2.5 text-sm focus:border-purple-500/50 outline-none w-full md:w-64 transition-all text-[var(--admin-text)]"
            />
          </div>
          <button 
            onClick={onAdd}
            className="hidden md:flex bg-purple-600 text-white px-6 py-2.5 rounded-xl font-bold items-center gap-2 hover:bg-purple-700 transition-all text-sm shadow-xl shadow-purple-600/20"
          >
            <Plus size={16} /> {addButtonLabel}
          </button>
        </div>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--admin-border)]">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>
    </div>
  );
}
