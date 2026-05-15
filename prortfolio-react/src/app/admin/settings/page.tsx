"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Save, Globe, User, Share2, MapPin, 
  Github, Linkedin, Twitter, Zap,
  MessageCircle, Rocket, Code2, Trophy, Plus, Trash2
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");

  useEffect(() => {
    async function fetchSettings() {
      setLoading(true);
      const { data } = await supabase.from('settings').select('*').single();
      if (data) setSettings(data);
      setLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaveStatus("saving");
    const { id, created_at, updated_at, ...payload } = settings;
    const { error } = await supabase.from('settings').update(payload).eq('id', id);
    if (error) {
      alert(error.message);
      setSaveStatus("idle");
    } else {
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  const SectionTitle = ({ icon: Icon, title, subtitle }: any) => (
    <div className="flex items-center gap-4 mb-8 border-b border-[var(--admin-border)] pb-6">
      <div className="w-12 h-12 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-xl font-black text-[var(--admin-text)]">{title}</h3>
        <p className="text-[10px] text-[var(--admin-muted)] uppercase font-bold tracking-widest">{subtitle}</p>
      </div>
    </div>
  );

  const InputField = ({ label, value, onChange, placeholder, type = "text" }: any) => (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">{label}</label>
      {type === "textarea" ? (
        <textarea 
          value={value || ""} 
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-[var(--admin-text)] text-sm transition-all resize-none"
        />
      ) : (
        <input 
          type={type}
          value={value || ""} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-[var(--admin-text)] text-sm transition-all" 
        />
      )}
    </div>
  );

  if (loading) return <div className="p-20 text-center animate-pulse uppercase font-black text-[var(--admin-muted)] tracking-widest">Loading Site Engine...</div>;

  return (
    <div className="w-full pb-32">
      <AdminHeader 
        title="Site Commander" 
        subtitle="Manage every pixel and text on your landing page"
        searchTerm=""
        setSearchTerm={() => {}}
        onAdd={handleSave}
        addButtonLabel={saveStatus === "saving" ? "Syncing..." : saveStatus === "success" ? "Saved!" : "Save Changes"}
      />

      <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="glass-card p-10 border-[var(--admin-border)]">
          <SectionTitle icon={Rocket} title="Visual Identity" subtitle="Hero & Brand" />
          <div className="grid md:grid-cols-2 gap-8">
            <InputField label="Logo / Site Title" value={settings.site_title} onChange={(v:any) => setSettings({...settings, site_title: v})} />
            <InputField label="Hero Subtitle Badge" value={settings.hero_subtitle} onChange={(v:any) => setSettings({...settings, hero_subtitle: v})} />
            <div className="md:col-span-2">
              <InputField label="Main Hero Heading" value={settings.hero_title} onChange={(v:any) => setSettings({...settings, hero_title: v})} />
            </div>
          </div>
        </div>

        {/* About Section & Skills */}
        <div className="glass-card p-10 border-[var(--admin-border)]">
          <SectionTitle icon={Code2} title="Experience & Skills" subtitle="Core technical stack" />
          <div className="space-y-8">
            <InputField label="About Biography" type="textarea" value={settings.about_text} onChange={(v:any) => setSettings({...settings, about_text: v})} />
            
            <div className="space-y-4 pt-6 border-t border-[var(--admin-border)]">
              <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Technical Skills (Comma separated)</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {(Array.isArray(settings.skills) ? settings.skills : []).map((skill: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-purple-600/10 text-purple-400 rounded-lg text-xs font-bold border border-purple-500/20 flex items-center gap-2">
                    {skill}
                    <button onClick={() => {
                      const newSkills = settings.skills.filter((_: any, index: number) => index !== i);
                      setSettings({...settings, skills: newSkills});
                    }}><Trash2 size={10} /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Add skill (e.g. Docker)" 
                  onKeyDown={(e: any) => {
                    if (e.key === 'Enter') {
                      const val = e.target.value;
                      if (val) {
                        setSettings({...settings, skills: [...(settings.skills || []), val]});
                        e.target.value = '';
                      }
                    }
                  }}
                  className="bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-xl px-4 py-2 text-xs text-[var(--admin-text)] outline-none focus:border-purple-500/50" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Connectivity & Social */}
        <div className="glass-card p-10 border-[var(--admin-border)]">
          <SectionTitle icon={Share2} title="connectivity Hub" subtitle="Social & Contact Links" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InputField label="Email" value={settings.email} onChange={(v:any) => setSettings({...settings, email: v})} />
            <InputField label="WhatsApp URL" value={settings.whatsapp_url} onChange={(v:any) => setSettings({...settings, whatsapp_url: v})} />
            <InputField label="GitHub URL" value={settings.github_url} onChange={(v:any) => setSettings({...settings, github_url: v})} />
            <InputField label="LinkedIn URL" value={settings.linkedin_url} onChange={(v:any) => setSettings({...settings, linkedin_url: v})} />
            <InputField label="Twitter URL" value={settings.twitter_url} onChange={(v:any) => setSettings({...settings, twitter_url: v})} />
            <InputField label="Facebook URL" value={settings.facebook_url} onChange={(v:any) => setSettings({...settings, facebook_url: v})} />
          </div>
        </div>

        {/* Floating Save Button */}
        <div className="fixed bottom-8 right-8 z-[100]">
          <button 
            onClick={handleSave}
            className="bg-purple-600 text-white px-10 py-5 rounded-3xl font-black flex items-center gap-3 hover:bg-purple-700 transition-all shadow-2xl shadow-purple-600/40 transform active:scale-95"
          >
            <Save size={20} /> {saveStatus === "saving" ? "Syncing Data..." : "Deploy Changes"}
          </button>
        </div>

      </div>
    </div>
  );
}
