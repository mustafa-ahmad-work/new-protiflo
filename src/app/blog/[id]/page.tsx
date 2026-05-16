import { supabase } from "@/lib/supabase";
import { 
  ChevronLeft, Globe, MoreHorizontal, 
  ThumbsUp, MessageSquare, Repeat2, Send, 
  Plus, ArrowLeft
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PostInteractions } from "@/components/blog/PostInteractions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-[#e1e1e3] selection:bg-purple-500/30">
      <Navbar />
      
      <div className="pt-32 pb-32 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/#blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-all mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to feed</span>
          </Link>

          {/* LinkedIn-Style Post Card */}
          <div className="bg-[#111114] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
            
            {/* Post Header */}
            <div className="p-4 flex items-start justify-between">
              <div className="flex gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <img src="/moustafa.jpg" alt={post.author} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-[#111114] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-white hover:text-purple-400 hover:underline cursor-pointer transition-all">
                      {post.author}
                    </h3>
                    <span className="text-[10px] text-gray-500 font-medium">• 1st</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-tight mt-0.5">Software Engineer | Laravel & React & Next.js</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>•</span>
                    <Globe size={10} />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="text-gray-500 hover:text-white p-2">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 py-2 space-y-4">
              <h1 className="text-xl font-black text-white leading-snug">
                {post.title}
              </h1>
              <div className="text-[13px] leading-relaxed whitespace-pre-wrap text-gray-300">
                {post.content}
              </div>
            </div>

            {/* Post Image */}
            <div className="mt-4 border-y border-white/5">
              <img src={post.image} alt={post.title} className="w-full object-cover max-h-[600px]" />
            </div>

            {/* Interaction Stats */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-1">
                 <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-[#111114]">
                      <ThumbsUp size={8} fill="white" className="text-white" />
                    </div>
                 </div>
                 <span className="text-[11px] text-gray-500 ml-1">{post.likes || 0} reactions</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-1 flex items-center justify-between">
               <PostInteractions postId={id} initialLikes={post.likes || 0} />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
