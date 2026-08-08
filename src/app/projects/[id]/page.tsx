import { supabase } from "@/lib/supabase";
import projectsData from "@/data/projects.json";
import { 
  ExternalLink, Target, Cpu, Layout, ChevronRight,
  ArrowLeft
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let project = null;
  try {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (data) project = data;
  } catch (err) {
    // Ignore Supabase fetch errors
  }

  if (!project) {
    project = projectsData.find((p: any) => p.id.toString() === id || p.id === Number(id));
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-main text-text-main transition-colors duration-300">
      <Navbar />
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <article className="relative pt-32 pb-32">
        {/* Navigation & Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <Link 
            href="/#projects"
            className="inline-flex items-center gap-2 text-text-muted hover:text-purple-500 transition-all mb-12 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Portfolio</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-purple-600/10 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-purple-500/20">
                  {project.category || "Case Study"}
                </span>
                <div className="w-1 h-1 rounded-full bg-black/10 dark:bg-white/20" />
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
                  {project.duration || "2024"}
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-text-main">
                {project.title}
              </h1>

              <p className="text-xl text-text-muted leading-relaxed max-w-xl">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href={project.live} 
                  target="_blank"
                  className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-purple-700 transition-all shadow-2xl shadow-purple-600/30"
                >
                  <ExternalLink size={20} /> Launch Project
                </a>
                <a 
                  href={project.github} 
                  target="_blank"
                  className="bg-[var(--bg-alt)] border border-border-main text-text-main px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-bg-card transition-all"
                >
                  <FaGithub size={20} /> Source Code
                </a>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-8 pt-12 border-t border-border-main">
                <div>
                  <p className="text-[10px] font-black text-purple-600 dark:text-purple-500 uppercase tracking-widest mb-2">My Role</p>
                  <p className="text-sm font-bold text-text-main">{project.role || "Lead Full-Stack Engineer"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-purple-600 dark:text-purple-500 uppercase tracking-widest mb-2">Duration</p>
                  <p className="text-sm font-bold text-text-main">{project.duration || "3 Months"}</p>
                </div>
              </div>
            </div>

            <div className="relative group w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden border border-border-main shadow-2xl bg-black/[0.03] dark:bg-white/[0.03]">
                <img src={project.image} alt={project.title} className="w-full h-auto object-contain block mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Section */}
        <section className="py-24 bg-[var(--bg-alt)]/30 border-y border-border-main px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
            <div className="space-y-12">
               <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600 dark:text-purple-500 border border-purple-500/20 mb-6">
                    <Target size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-text-main">The Challenge</h3>
                  <p className="text-lg text-text-muted leading-relaxed">
                    {project.challenge || "Building a high-performance system that maintains architectural integrity while delivering a seamless user experience across all devices."}
                  </p>
               </div>
               
               <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-500 border border-blue-500/20 mb-6">
                    <Layout size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-text-main">The Solution</h3>
                  <p className="text-lg text-text-muted leading-relaxed">
                    {project.solution || "Implementation of a modular architecture using modern reactive frameworks, optimized database structures, and a polished UI/UX design system."}
                  </p>
               </div>
            </div>

            <div className="space-y-8">
               <h3 className="text-xl font-black text-text-main uppercase tracking-widest">Technologies Utilized</h3>
               <div className="grid grid-cols-2 gap-4">
                  {project.tags?.map((tag: string) => (
                    <div key={tag} className="flex items-center gap-3 p-4 bg-bg-card rounded-2xl border border-border-main group hover:border-purple-500/30 transition-all">
                       <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:scale-150 transition-transform" />
                       <span className="text-xs font-bold text-text-muted group-hover:text-text-main">{tag}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col items-center text-center mb-20 space-y-4">
                  <span className="text-xs font-black text-purple-600 dark:text-purple-500 uppercase tracking-[0.4em]">Visual Showcase</span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-main">Product Exhibition</h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.gallery.map((img: string, i: number) => (
                    <div 
                      key={i} 
                      className={`relative rounded-[2.5rem] overflow-hidden border border-border-main group shadow-xl bg-bg-card ${i % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-square md:aspect-video'}`}
                    >
                       <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={`Showcase ${i}`} />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  ))}
               </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="pt-20 pb-10 px-6 text-center">
          <div className="max-w-4xl mx-auto p-20 rounded-[3rem] bg-gradient-to-b from-purple-600/5 to-transparent border border-border-main">
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-text-main">Next Masterpiece?</h2>
             <Link 
              href="/#projects" 
              className="inline-flex items-center gap-4 text-xl font-bold text-purple-600 dark:text-purple-400 hover:text-text-main transition-all group"
             >
               Browse Complete Portfolio <ChevronRight className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </section>

      </article>

      <Footer />
    </main>
  );
}
