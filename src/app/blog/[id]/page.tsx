import { supabase } from "@/lib/supabase";
import { Globe, MoreHorizontal, ThumbsUp, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PostInteractions } from "@/components/blog/PostInteractions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-main text-text-main transition-colors duration-300 selection:bg-purple-500/30">
      <Navbar />

      <div className="pt-32 pb-32 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text-main transition-all mb-8 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-sm font-medium">Back to feed</span>
          </Link>

          {/* LinkedIn-Style Post Card */}
          <div className="bg-bg-card border border-border-main rounded-xl overflow-hidden shadow-md transition-all duration-300">
            {/* Post Header */}
            <div className="p-5 flex items-start justify-between bg-black/[0.01] dark:bg-white/[0.02]">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border-main bg-[var(--bg-alt)]">
                    <img
                      src="/moustafa.jpg"
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-text-main hover:text-purple-600 dark:hover:text-purple-400 hover:underline cursor-pointer transition-all">
                      {post.author}
                    </h3>
                    <span className="text-[10px] text-text-muted font-bold">
                      • 1st
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-tight mt-0.5 font-medium">
                    Software Engineer | Laravel & React & Next.js
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-text-muted mt-1.5 font-bold">
                    <span>
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                    <span className="opacity-40">•</span>
                    <Globe size={11} className="opacity-70" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="text-text-muted hover:text-text-main p-2 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-6 py-4 space-y-5">
              <h1 className="text-2xl md:text-3xl font-black text-text-main leading-tight tracking-tight">
                {post.title}
              </h1>
              <div className="text-[15px] md:text-[16px] leading-relaxed whitespace-pre-wrap text-text-main dark:text-gray-300 font-medium">
                {post.content}
              </div>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="mt-4 border-y border-border-main bg-black/[0.02] dark:bg-white/[0.02]">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full object-cover max-h-[700px] block mx-auto transition-transform duration-700"
                />
              </div>
            )}

            {/* Interaction Stats */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-border-main">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center border-2 border-[var(--bg-card)]">
                    <ThumbsUp size={10} fill="white" className="text-white" />
                  </div>
                </div>
                <span className="text-[11px] text-text-muted font-bold">
                  {post.likes || 0} reactions
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-1 flex items-center justify-between bg-bg-card transition-colors duration-300">
              <PostInteractions postId={id} initialLikes={post.likes || 0} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
