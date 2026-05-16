"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: string;
}

export function AdminStatCard({ label, value, icon: Icon, color, trend }: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-card p-8 border-[var(--admin-border)] relative overflow-hidden group transition-all"
    >
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${color} opacity-[0.05] group-hover:opacity-[0.1] transition-opacity blur-2xl`} />
      
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className={`p-3 rounded-2xl ${color.replace('bg-', 'bg-opacity-10 ')} border border-[var(--admin-border)]`}>
          <Icon size={20} className={color.replace('bg-', 'text-')} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-black text-green-500 bg-green-500/5 px-2 py-1 rounded-lg border border-green-500/10">
            <ArrowUpRight size={10} />
            {trend}
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <p className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-black tracking-tight text-[var(--admin-text)]">{value}</h3>
      </div>
    </motion.div>
  );
}
