"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { 
  Package, FileText, TrendingUp, 
  Activity, Calendar, ArrowUpRight, Zap, Menu
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import { motion } from "framer-motion";
import { useAdmin } from "@/components/providers/AdminProvider";

const chartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export default function DashboardPage() {
  const { setSidebarOpen } = useAdmin();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ projects: 0, posts: 0 });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    async function fetchStats() {
      const { count: projCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: postCount } = await supabase.from('posts').select('*', { count: 'exact', head: true });
      
      const { data: recentProj } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(3);
      const { data: recentPosts } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(3);
      
      setStats({ projects: projCount || 0, posts: postCount || 0 });
      
      const combined = [
        ...(recentProj?.map(p => ({ ...p, type: 'project' })) || []),
        ...(recentPosts?.map(p => ({ ...p, type: 'blog' })) || [])
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      setRecentActivity(combined.slice(0, 5));
    }
    fetchStats();
  }, []);

  return (
    <div className="w-full pb-20 bg-[var(--admin-bg)] text-[var(--admin-text)]">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-[var(--admin-bg)]/80 backdrop-blur-2xl border-b border-[var(--admin-border)] p-8 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-xl bg-[var(--admin-card)] border border-[var(--admin-border)] text-[var(--admin-muted)]"
          >
            <Menu size={20} />
          </button>
          <div>
            <div className="flex items-center gap-2 text-purple-500 mb-1">
              <Zap size={14} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Live</span>
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-[var(--admin-text)]">Command <span className="text-[var(--admin-muted)]">Center</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-3 flex items-center gap-3">
            <Calendar size={16} className="text-[var(--admin-muted)]" />
            <span className="text-xs font-bold text-[var(--admin-text)]">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </header>

      <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-10">
        
        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard label="Total Projects" value={stats.projects} icon={Package} color="bg-blue-600" trend="+12%" />
          <AdminStatCard label="Blog Articles" value={stats.posts} icon={FileText} color="bg-purple-600" trend="+5%" />
          <AdminStatCard label="Traffic (Mock)" value="2.4k" icon={TrendingUp} color="bg-orange-600" trend="+18%" />
          <AdminStatCard label="Server Status" value="Healthy" icon={Activity} color="bg-green-600" trend="100%" />
        </div>

        {/* Charts & Analytics Row */}
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card p-10 border-[var(--admin-border)] flex flex-col h-[450px]"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-bold text-[var(--admin-text)]">Performance Analytics</h3>
                <p className="text-xs text-[var(--admin-muted)] mt-1">Activity metrics for the current period</p>
              </div>
            </div>
            <div className="flex-grow relative min-h-[300px] w-full overflow-hidden">
              {mounted && (
                <div className="absolute inset-0">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={50}>
                    <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--admin-muted)', fontSize: 10}} dy={10} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: '12px' }}
                      itemStyle={{ color: '#a855f7', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-10 border-[var(--admin-border)] flex flex-col"
          >
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-[var(--admin-text)]">
              <Activity className="text-purple-500" size={20} />
              Activity Feed
            </h3>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--admin-border)]">
              {recentActivity.map((item) => (
                <div key={`${item.type}-${item.id}`} className="relative pl-10">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-[var(--admin-bg)] flex items-center justify-center z-10 ${item.type === 'project' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                    {item.type === 'project' ? <Package size={10} /> : <FileText size={10} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--admin-text)]">
                      {item.type === 'project' ? 'Project Updated' : 'New Blog Post'}
                    </p>
                    <p className="text-xs text-[var(--admin-muted)] mt-0.5 truncate">{item.title}</p>
                    <p className="text-[10px] text-[var(--admin-muted)] mt-1 uppercase font-black opacity-50">{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Tools Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: "Asset Manager", desc: "Manage Supabase Storage", icon: Activity, color: "text-green-400" },
            { label: "System Config", desc: "Adjust core engine variables", icon: Zap, color: "text-orange-400" },
          ].map((tool, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-[2rem] bg-[var(--admin-card)] border border-[var(--admin-border)] hover:border-purple-500/30 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--admin-bg)] flex items-center justify-center group-hover:bg-purple-600/10 transition-colors">
                  <tool.icon className={tool.color} size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--admin-text)]">{tool.label}</h4>
                  <p className="text-[10px] text-[var(--admin-muted)]">{tool.desc}</p>
                </div>
                <ArrowUpRight size={16} className="ml-auto text-[var(--admin-muted)] group-hover:text-[var(--admin-text)] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
