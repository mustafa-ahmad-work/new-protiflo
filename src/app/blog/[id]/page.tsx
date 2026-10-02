import { Globe, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/header/Navbar";
import Footer from "@/components/layout/footer/Footer";
import { PostInteractions } from "@/features/Blog/PostInteractions";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post: any = null;

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
                  <h3 className="font-bold text-base leading-tight text-text-main">
                    {post.author}
                  </h3>
                  <p className="text-xs text-text-muted">
                    Software Engineer | Laravel & React
                  </p>
                  <p className="text-[10px] text-text-muted mt-1 flex items-center gap-1">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    • <Globe size={11} />
                  </p>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-5 py-3 space-y-4">
              <h1 className="text-xl md:text-2xl font-black text-text-main tracking-tight leading-snug">
                {post.title}
              </h1>
              <div className="text-sm md:text-base text-text-main dark:text-gray-300 leading-relaxed font-normal whitespace-pre-wrap">
                {post.content}
              </div>
            </div>

            {/* Post Media (Image) */}
            {post.image && (
              <div className="mt-3 border-y border-border-main overflow-hidden bg-black/5 dark:bg-black/20">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full max-h-[500px] object-cover"
                />
              </div>
            )}

            {/* Post Stats */}
            <div className="px-5 py-2.5 flex items-center justify-between text-xs text-text-muted border-b border-border-main/50">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-full bg-blue-500 text-white text-[8px]">
                  👍
                </span>
                <span>{post.likes || 0}</span>
              </div>
            </div>

            {/* Post Action Buttons */}
            <div className="px-2 py-1 flex items-center justify-around border-t border-border-main/50">
              <PostInteractions postId={id} initialLikes={post.likes || 0} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
