"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Trash2, Edit3, Calendar
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminModal } from "@/components/admin/AdminModal";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    setProjects(data || []);
    setLoading(false);
  }

  const uploadImage = async (file: File) => {
    try {
      setSaveStatus("saving");
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress(prev => (prev < 90 ? prev + 10 : prev));
      }, 200);

      const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
      
      clearInterval(interval);
      if (uploadError) throw uploadError;

      setUploadProgress(100);
      const { data } = supabase.storage.from('images').getPublicUrl(fileName);
      setTimeout(() => setUploadProgress(0), 500);
      return data.publicUrl;
    } catch (error: any) {
      setUploadProgress(0);
      alert("Error: " + error.message);
      return null;
    } finally {
      setSaveStatus("idle");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    const { id, ...payload } = editingItem;
    if (typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map((t: string) => t.trim());

    const { error } = id === 'new' 
      ? await supabase.from('projects').insert([payload])
      : await supabase.from('projects').update(payload).eq('id', id);

    if (!error) {
      setSaveStatus("success");
      await fetchProjects();
      setTimeout(() => { setSaveStatus("idle"); setEditingItem(null); }, 1500);
    } else {
      alert(error.message);
      setSaveStatus("idle");
    }
  };

  const filtered = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full pb-20">
      <AdminHeader 
        title="Projects Inventory" 
        subtitle="Manage your digital architecture"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAdd={() => setEditingItem({ id: 'new', title: '', description: '', image: '', tags: [], github: '', live: '' })}
        addButtonLabel="Add New"
        progress={uploadProgress}
      />

      <div className="p-4 md:p-12 max-w-7xl mx-auto">
        <div className="glass-card overflow-hidden overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-[var(--admin-card)] border-b border-[var(--admin-border)]">
                <th className="px-8 py-5 text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest">Project</th>
                <th className="px-8 py-5 text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest">Date</th>
                <th className="px-8 py-5 text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--admin-border)]">
              {loading ? (
                <tr><td colSpan={3} className="p-20 text-center text-[var(--admin-muted)] animate-pulse">Syncing...</td></tr>
              ) : filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[var(--admin-card)] transition-colors group">
                  <td className="px-8 py-6 flex items-center gap-4">
                    <div className="w-16 h-12 rounded-xl overflow-hidden bg-black border border-[var(--admin-border)] flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[var(--admin-text)]">{item.title}</p>
                      <div className="flex gap-1 mt-1">
                        {item.tags?.slice(0, 2).map((t: string) => <span key={t} className="text-[8px] bg-[var(--admin-card)] px-1.5 py-0.5 rounded border border-[var(--admin-border)] text-[var(--admin-muted)]">{t}</span>)}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[10px] font-bold text-[var(--admin-muted)]">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setEditingItem(item)} className="p-2 rounded-lg bg-[var(--admin-card)] border border-[var(--admin-border)] text-[var(--admin-muted)] hover:text-[var(--admin-text)] transition-all"><Edit3 size={14} /></button>
                      <button onClick={async () => { if(confirm("Delete?")) await supabase.from('projects').delete().eq('id', item.id); fetchProjects(); }} className="p-2 rounded-lg bg-[var(--admin-card)] border border-[var(--admin-border)] text-[var(--admin-muted)] hover:text-red-400 transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal 
        isOpen={!!editingItem} 
        onClose={() => setEditingItem(null)}
        title={`${editingItem?.id === 'new' ? 'Initialize' : 'Configure'} Project`}
        subtitle="Update project specifications"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Title</label>
              <input type="text" value={editingItem?.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-sm text-[var(--admin-text)]" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Tags (comma separated)</label>
              <input type="text" value={Array.isArray(editingItem?.tags) ? editingItem.tags.join(', ') : editingItem?.tags} onChange={(e) => setEditingItem({...editingItem, tags: e.target.value})} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-sm text-[var(--admin-text)]" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Description</label>
            <textarea value={editingItem?.description} onChange={(e) => setEditingItem({...editingItem, description: e.target.value})} rows={3} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-sm resize-none text-[var(--admin-text)]" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Visual Asset</label>
            <input type="file" onChange={async (e) => { if(e.target.files?.[0]) { const url = await uploadImage(e.target.files[0]); if(url) setEditingItem({...editingItem, image: url}); } }} className="w-full text-xs text-[var(--admin-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-600/10 file:text-purple-400" />
          </div>
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => setEditingItem(null)} className="flex-1 font-bold py-4 rounded-2xl border border-[var(--admin-border)] hover:bg-[var(--admin-card)] transition-all text-[var(--admin-text)]">Cancel</button>
            <button type="submit" className="flex-[2] font-black py-4 rounded-2xl bg-purple-600 text-white transition-all">{saveStatus === "saving" ? "Saving..." : "Deploy"}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
