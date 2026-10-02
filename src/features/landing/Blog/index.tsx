"use client";

import { motion } from "framer-motion";
import { Globe, Clock, Heart } from "lucide-react";
import Section from "../../components/Section";
import SectionHeader from "../../components/SectionHeader";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Blog() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = { "data": [], "error": { 'message': '' } };
        if (error) {
          console.warn('Supabase posts fetch note:', error.message || error);
        } else if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (err: any) {
        console.warn('Error fetching posts:', err?.message || err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <Section id="blog">
      <SectionHeader subtitle={t("blog.badge")} title={t("blog.title")} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center animate-pulse text-text-muted font-black uppercase tracking-widest">
            {t("blog.fetching")}
          </div>
        ) : posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card flex flex-col p-0 overflow-hidden group hover:border-purple-500/30"
          >
            <div className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-white/10 overflow-hidden">
                <img src="/moustafa.jpg" className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <div className="text-sm font-bold text-text-main flex items-center gap-1">
                  {post.author} <span className="text-[10px] text-text-muted font-normal">• 1st</span>
                </div>
                <div className="text-[10px] text-text-muted">Software Engineer | Laravel & React</div>
                <div className="text-[9px] text-text-muted opacity-70 flex items-center gap-1">
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • <Globe size={10} />
                </div>
              </div>
            </div>

            <div className="px-5 pb-4 grow">
              <h3 className="text-lg font-black mb-3 text-text-main group-hover:text-purple-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.id}`}
                className="inline-block text-xs text-purple-400 font-black hover:text-purple-300 mt-4 uppercase tracking-widest"
              >
                {t("blog.readArticle")}
              </Link>
            </div>

            <Link href={`/blog/${post.id}`} className="block border-t border-white/5 overflow-hidden aspect-video relative">
              <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-[10px] font-bold text-white">
                <Heart size={12} fill="#ef4444" className="text-red-500" />
                {post.likes || 0}
              </div>
            </Link>
          </motion.article>
        ))}

        {posts.length === 0 && loading && (
          <div className="col-span-full text-center text-text-muted py-10">
            {t("blog.adding")}
          </div>
        )}

        {posts.length === 0 && !loading && (
          <div className="col-span-full text-center text-text-muted py-10">
            {t("blog.empty")}
          </div>
        )}
      </div>
    </Section>
  );
}
