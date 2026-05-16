"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Trash2, Edit3, Calendar, Clock
} from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminModal } from "@/components/admin/AdminModal";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success">("idle");
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
    setLoading(false);
  }

  const uploadImage = async (file: File) => {
    try {
      setSaveStatus("saving");
      setUploadProgress(10);
      const interval = setInterval(() => setUploadProgress(p => p < 90 ? p + 10 : p), 200);
      
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
    
    const { error } = id === 'new' 
      ? await supabase.from('posts').insert([payload])
      : await supabase.from('posts').update(payload).eq('id', id);

    if (error) {
      alert(error.message);
      setSaveStatus("idle");
    } else {
      setSaveStatus("success");
      await fetchPosts();
      setTimeout(() => { setSaveStatus("idle"); setEditingItem(null); }, 1500);
    }
  };

  const filtered = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full pb-20">
      <AdminHeader 
        title="Content Hub" 
        subtitle="Manage your articles and insights"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onAdd={() => setEditingItem({ id: 'new', title: '', excerpt: '', content: '', author: 'Mostafa Ahmed', date: 'Just now', image: '' })}
        addButtonLabel="Draft Post"
        progress={uploadProgress}
      />

      <div className="p-8 md:p-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center text-[var(--admin-muted)] animate-pulse uppercase font-black tracking-widest">Accessing Archives...</div>
          ) : filtered.map((post) => (
            <div 
              key={post.id}
              className="glass-card group flex flex-col h-full hover:border-purple-500/30 transition-all overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden border-b border-[var(--admin-border)]">
                <img src={post.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                   <button onClick={() => setEditingItem(post)} className="p-2.5 rounded-xl bg-[var(--admin-bg)]/80 backdrop-blur-md border border-[var(--admin-border)] text-[var(--admin-text)] hover:bg-purple-600 transition-all shadow-xl">
                      <Edit3 size={16} />
                   </button>
                   <button onClick={async () => { if(confirm("Delete?")) { await supabase.from('posts').delete().eq('id', post.id); fetchPosts(); } }} className="p-2.5 rounded-xl bg-[var(--admin-bg)]/80 backdrop-blur-md border border-[var(--admin-border)] text-[var(--admin-text)] hover:bg-red-600 transition-all shadow-xl">
                      <Trash2 size={16} />
                   </button>
                </div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-bold mb-4 line-clamp-2 text-[var(--admin-text)]">{post.title}</h3>
                <p className="text-xs text-[var(--admin-muted)] leading-relaxed line-clamp-3 mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--admin-border)] text-[10px] font-bold text-[var(--admin-muted)] uppercase tracking-widest">
                   <div className="flex items-center gap-2"><Calendar size={12} /> {new Date(post.created_at).toLocaleDateString()}</div>
                   <div className="flex items-center gap-2"><Heart size={12} className="text-red-500" fill="currentColor" /> {post.likes || 0}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminModal 
        isOpen={!!editingItem} 
        onClose={() => setEditingItem(null)}
        title={`${editingItem?.id === 'new' ? 'Draft' : 'Edit'} Masterpiece`}
        subtitle="Update article details"
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Title</label>
                <input type="text" value={editingItem?.title} onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-sm text-[var(--admin-text)]" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Excerpt</label>
                <textarea value={editingItem?.excerpt} onChange={(e) => setEditingItem({...editingItem, excerpt: e.target.value})} rows={3} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-4 focus:border-purple-500/50 outline-none text-sm resize-none text-[var(--admin-text)]" required />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Cover Image</label>
                <input type="file" onChange={async (e) => { if(e.target.files?.[0]) { const url = await uploadImage(e.target.files[0]); if(url) setEditingItem({...editingItem, image: url}); } }} className="w-full text-xs text-[var(--admin-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-600/10 file:text-purple-400" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Author</label>
                  <input type="text" value={editingItem?.author} onChange={(e) => setEditingItem({...editingItem, author: e.target.value})} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-3 text-xs text-[var(--admin-text)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Publish Date</label>
                  <input 
                    type="date" 
                    value={editingItem?.date?.split('T')[0] || new Date().toISOString().split('T')[0]} 
                    onChange={(e) => setEditingItem({...editingItem, date: e.target.value})} 
                    className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-2xl px-6 py-3 text-xs text-[var(--admin-text)] appearance-none" 
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--admin-muted)] uppercase tracking-widest ml-1">Full Content</label>
            <textarea value={editingItem?.content} onChange={(e) => setEditingItem({...editingItem, content: e.target.value})} rows={8} className="w-full bg-[var(--admin-card)] border border-[var(--admin-border)] rounded-3xl px-8 py-6 focus:border-purple-500/50 outline-none text-sm font-mono text-[var(--admin-text)]" required />
          </div>
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => setEditingItem(null)} className="flex-1 font-bold py-4 rounded-2xl border border-[var(--admin-border)] hover:bg-[var(--admin-card)] transition-all">Cancel</button>
            <button type="submit" className="flex-[2] font-black py-4 rounded-2xl bg-purple-600 text-white transition-all">{saveStatus === "saving" ? "Publishing..." : "Publish Post"}</button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
