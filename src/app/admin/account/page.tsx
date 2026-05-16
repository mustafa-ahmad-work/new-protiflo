"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, Lock, Save, ShieldCheck, CheckCircle2 } from "lucide-react";
import bcrypt from "bcryptjs";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AccountPage() {
  const [admin, setAdmin] = useState<any>({ username: "", password_hash: "" });
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");

  useEffect(() => {
    async function fetchAdmin() {
      setLoading(true);
      const { data } = await supabase.from('admins').select('*').limit(1).single();
      if (data) setAdmin(data);
      setLoading(false);
    }
    fetchAdmin();
  }, []);

  const handleUpdate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaveStatus("saving");

    const payload: any = { username: admin.username };
    
    if (newPassword) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);
      payload.password_hash = hash;
    }

    const { error } = await supabase
      .from('admins')
      .update(payload)
      .eq('id', admin.id);

    if (error) {
      alert(error.message);
      setSaveStatus("idle");
    } else {
      setSaveStatus("success");
      setNewPassword("");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }
  };

  return (
    <div className="w-full">
      <AdminHeader 
        title="Admin Account" 
        subtitle="Security & identity management"
        searchTerm=""
        setSearchTerm={() => {}}
        onAdd={handleUpdate}
        addButtonLabel={saveStatus === "saving" ? "Updating..." : saveStatus === "success" ? "Updated!" : "Update Account"}
      />

      <div className="p-8 md:p-12 max-w-2xl mx-auto space-y-8">
        <div className="glass-card p-10 border-[var(--admin-border)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[var(--admin-text)]">
            <ShieldCheck size={120} />
          </div>
          
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-3 text-[var(--admin-text)]">
            <User className="text-purple-500" /> Security Credentials
          </h3>
          
          <form onSubmit={handleUpdate} className="space-y-8 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" size={18} />
                <input 
                  type="text"
                  value={admin.username} 
                  onChange={(e) => setAdmin({...admin, username: e.target.value})} 
                  className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl pl-14 pr-6 py-4 focus:border-purple-500/50 outline-none transition-all text-[var(--admin-text)]"
                  placeholder="Admin Username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">New Password (leave blank to keep current)</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--admin-muted)]" size={18} />
                <input 
                  type="password"
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl pl-14 pr-6 py-4 focus:border-purple-500/50 outline-none transition-all text-[var(--admin-text)]"
                  placeholder="••••••••"
                />
              </div>
              <p className="text-[10px] text-[var(--admin-muted)] mt-2 px-1 italic">
                * Password will be automatically encrypted using Bcrypt before saving.
              </p>
            </div>

            {saveStatus === "success" && (
              <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20 animate-in fade-in slide-in-from-bottom-2">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold">Account updated successfully!</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
