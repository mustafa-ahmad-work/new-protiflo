import projectsData from "@/data/projects.json";
import Navbar from "@/components/layout/header/Navbar";
import Footer from "@/components/layout/footer/Footer";
import ProjectDetailsView from "@/features/Projects/ProjectDetailsView";
import { notFound } from "next/navigation";

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let projectIndex = projectsData.findIndex(
    (p: any) => p.id.toString() === id || p.slug === id || p.id === Number(id)
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const prevProject = projectIndex > 0 ? projectsData[projectIndex - 1] : null;
  const nextProject = projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : null;

  return (
    <main className="min-h-screen bg-bg-main text-text-main transition-colors duration-300">
      <Navbar />

      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[-10%] w-[55%] h-[55%] bg-primary/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[45%] h-[45%] bg-blue-600/10 blur-[140px] rounded-full" />
      </div>

      <ProjectDetailsView
        baseProject={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />

      <Footer />
    </main>
  );
}
