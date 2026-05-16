"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ThumbsUp, MessageSquare, Repeat2, Send, Share2, ChevronLeft } from "lucide-react";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export function PostInteractions({ postId, initialLikes }: { postId: string, initialLikes: number }) {
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (likedPosts.includes(postId)) {
      setHasLiked(true);
    }
  }, [postId]);

  const handleLike = async () => {
    if (hasLiked) return;

    try {
      const newCount = likesCount + 1;
      const { error } = await supabase
        .from('posts')
        .update({ likes: newCount })
        .eq('id', postId);

      if (!error) {
        setLikesCount(newCount);
        setHasLiked(true);
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        likedPosts.push(postId);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    setShowShareModal(false);
  };

  return (
    <div className="flex w-full">
      <div className="flex items-center justify-between w-full px-2 py-1">
        <button 
          onClick={handleLike}
          className={`flex flex-1 items-center justify-center gap-2 py-3 rounded-lg transition-all hover:bg-[var(--bg-alt)] font-bold text-xs ${hasLiked ? 'text-blue-500' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
        >
          <ThumbsUp size={18} fill={hasLiked ? "currentColor" : "none"} />
          <span>Like</span>
        </button>

        <button 
          onClick={() => setShowShareModal(true)}
          className="flex flex-1 items-center justify-center gap-2 py-3 rounded-lg transition-all hover:bg-[var(--bg-alt)] text-[var(--text-muted)] hover:text-[var(--text-main)] font-bold text-xs"
        >
          <Send size={18} />
          <span>Share</span>
        </button>
      </div>

      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-main)] rounded-[2rem] p-10 overflow-hidden"
            >
              <h3 className="text-2xl font-black mb-2 text-[var(--text-main)]">Share Insight</h3>
              <p className="text-[var(--text-muted)] text-sm mb-8">Spread the knowledge across your networks.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#0077b5]/10 text-[#0077b5] border border-[#0077b5]/20 font-bold hover:bg-[#0077b5]/20 transition-all">
                  <FaLinkedinIn size={20} /> LinkedIn
                </button>
                <button className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#1da1f2]/10 text-[#1da1f2] border border-[#1da1f2]/20 font-bold hover:bg-[#1da1f2]/20 transition-all">
                  <FaTwitter size={20} /> Twitter
                </button>
              </div>

              <div className="flex items-center gap-2 p-2 bg-[var(--bg-alt)] rounded-xl border border-[var(--border-main)]">
                <input 
                  type="text" 
                  readOnly 
                  value={typeof window !== 'undefined' ? window.location.href : ''} 
                  className="flex-grow bg-transparent border-none outline-none text-[10px] px-4 text-[var(--text-muted)]"
                />
                <button 
                  onClick={copyLink}
                  className="bg-purple-600 text-white px-6 py-2.5 rounded-lg text-xs font-black hover:bg-purple-700 transition-all"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
