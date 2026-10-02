import projectsData from "@/data/projects.json";
import Navbar from "@/components/layout/header/Navbar";
import Footer from "@/components/layout/footer/Footer";
import ProjectDetailsView from "@/features/Projects/ProjectDetailsView";
import { notFound } from "next/navigation";

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let project = projectsData.find((p: any) => p.id.toString() === id || p.id === Number(id));

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

      <ProjectDetailsView baseProject={project} />

      <Footer />
    </main>
  );
}
