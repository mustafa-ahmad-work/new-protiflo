"use client";

import { motion } from "framer-motion";
import { Globe, Clock } from "lucide-react";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const initialPosts = [
  {
    id: 1,
    title: "Mastering Laravel Design Patterns",
    excerpt: "Mastering Laravel design patterns is the key to building scalable applications. In this post, I dive deep into how Compound Components...",
    date: "1w",
    author: "Mostafa Ahmed",
    image: "https://picsum.photos/seed/laravel/600/350",
  },
  {
    id: 2,
    title: "React Hooks Optimization",
    excerpt: "React hooks are powerful, but are you using them correctly? I've seen many developers struggle with useMemo and useCallback...",
    date: "3d",
    author: "Mostafa Ahmed",
    image: "https://picsum.photos/seed/react/600/350",
  },
  {
    id: 3,
    title: "The Importance of Clean Code",
    excerpt: "Why you should care about code quality over speed, and how it impacts the long-term success of your project...",
    date: "2w",
    author: "Mostafa Ahmed",
    image: "https://picsum.photos/seed/clean/600/350",
  },
];

export default function Blog() {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);
  return (
    <Section id="blog">
      <SectionHeader subtitle="INSIGHTS" title="Latest Insights" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card flex flex-col p-0 overflow-hidden group hover:border-purple-500/30"
          >
            <div className="p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-white/10">
                <img src="/moustafa.jpg" className="rounded-full" alt="" />
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--text-main)] flex items-center gap-1">
                  {post.author} <span className="text-[10px] text-[var(--text-muted)] font-normal">• 1st</span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)]">Software Engineer | Laravel & React</div>
                <div className="text-[9px] text-[var(--text-muted)] opacity-70 flex items-center gap-1">
                  {post.date?.includes('-') ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : post.date} • <Globe size={10} />
                </div>
              </div>
            </div>

            <div className="px-5 pb-4 flex-grow">
              <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <button className="text-xs text-purple-400 font-bold hover:underline mt-2">see more</button>
            </div>

            <div className="border-t border-white/5 overflow-hidden aspect-[16/9]">
              <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
