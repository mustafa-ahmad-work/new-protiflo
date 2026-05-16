"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Trash2, Edit3, Star, Quote
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminModal } from "@/components/admin/AdminModal";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    setTestimonials(data || []);
    setLoading(false);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    const { id, ...payload } = editingItem;
    
    const { error } = id === 'new' 
      ? await supabase.from('testimonials').insert([payload])
      : await supabase.from('testimonials').update(payload).eq('id', id);

    if (error) {
      alert(error.message);
      setSaveStatus("idle");
    } else {
      setSaveStatus("success");
      await fetchTestimonials();
      setTimeout(() => { setSaveStatus("idle"); setEditingItem(null); }, 1500);
    }
  };

  const filtered = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full pb-20">
      <AdminHeader 
        title="Client Feedback" 
        subtitle="Manage public perception"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAdd={() => setEditingItem({ id: 'new', name: '', role: '', content: '', rating: 5 })}
        addButtonLabel="New Feedback"
      />

      <div className="p-8 md:p-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center text-[var(--admin-muted)] animate-pulse uppercase font-black tracking-widest">Accessing Archives...</div>
          ) : filtered.map((item) => (
            <div 
              key={item.id}
              className="glass-card p-8 border-[var(--admin-border)] relative group hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold uppercase">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--admin-text)]">{item.name}</h4>
                    <p className="text-[10px] text-[var(--admin-muted)] uppercase tracking-widest font-black">{item.role}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => setEditingItem(item)} className="p-2 rounded-lg bg-[var(--admin-card)] border border-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-all"><Edit3 size={14} /></button>
                   <button onClick={async () => { if(confirm("Delete?")) { await supabase.from('testimonials').delete().eq('id', item.id); fetchTestimonials(); } }} className="p-2 rounded-lg bg-[var(--admin-card)] border border-[var(--admin-border)] text-[var(--admin-muted)] hover:text-red-400 transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="relative">
                <Quote size={40} className="absolute -left-2 -top-4 text-purple-500/10 -z-10" />
                <p className="text-sm text-[var(--admin-muted)] leading-relaxed italic line-clamp-3">"{item.content}"</p>
              </div>
              <div className="mt-6 flex items-center gap-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="#a855f7" className="text-purple-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminModal 
        isOpen={!!editingItem} 
        onClose={() => setEditingItem(null)}
        title={`${editingItem?.id === 'new' ? 'Record' : 'Edit'} Feedback`}
        subtitle="Words that build trust"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Client Name</label>
              <input type="text" value={editingItem?.name} onChange={(e) => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-sm text-[var(--admin-text)]" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Role / Company</label>
              <input type="text" value={editingItem?.role} onChange={(e) => setEditingItem({...editingItem, role: e.target.value})} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-sm text-[var(--admin-text)]" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Content</label>
            <textarea value={editingItem?.content} onChange={(e) => setEditingItem({...editingItem, content: e.target.value})} rows={4} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-sm resize-none text-[var(--admin-text)]" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Rating (1-5)</label>
            <select value={editingItem?.rating} onChange={(e) => setEditingItem({...editingItem, rating: parseInt(e.target.value)})} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-sm text-[var(--admin-text)] appearance-none">
              {[5,4,3,2,1].map(n => <option key={n} value={n} className="bg-[var(--admin-bg)]">{n} Stars</option>)}
            </select>
          </div>
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => setEditingItem(null)} className="flex-1 font-bold py-4 rounded-2xl border border-[var(--admin-border)] hover:bg-[var(--admin-card)] transition-all">Cancel</button>
            <button type="submit" className="flex-[2] font-black py-4 rounded-2xl bg-purple-600 text-white transition-all">{saveStatus === "saving" ? "Saving..." : "Save Feedback"}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
