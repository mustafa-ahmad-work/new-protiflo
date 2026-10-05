import type { Metadata } from "next";
import projectsData from "@/data/projects.json";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectDetailsView, { FullProjectItem } from "@/features/Projects/ProjectDetailsView";
import { notFound } from "next/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mustafa-ahmad.com";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return projectsData.flatMap((project) => [
    { id: project.id.toString() },
    ...(project.slug ? [{ id: project.slug }] : []),
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find(
    (p) => p.id.toString() === id || p.slug === id || p.id === Number(id)
  );

  if (!project) {
    return {
      title: "المشروع غير موجود | Project Not Found",
    };
  }

  const projectTitle = project.ar?.title || project.title;
  const projectDesc = project.ar?.shortDescription || project.description;
  const canonicalUrl = `${siteUrl}/projects/${id}`;

  return {
    title: `${projectTitle} | مصطفى أحمد`,
    description: projectDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${projectTitle} | Mustafa Ahmad`,
      description: projectDesc,
      url: canonicalUrl,
      images: [
        {
          url: project.image || "/images/mustafa.png",
          width: 1200,
          height: 630,
          alt: projectTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${projectTitle} | Mustafa Ahmad`,
      description: projectDesc,
      images: [project.image || "/images/mustafa.png"],
    },
  };
}

export default async function ProjectDetails({ params }: PageProps) {
  const { id } = await params;

  const projectIndex = projectsData.findIndex(
    (p) => p.id.toString() === id || p.slug === id || p.id === Number(id)
  );

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex] as unknown as FullProjectItem;
  const prevProject = projectIndex > 0 ? (projectsData[projectIndex - 1] as unknown as FullProjectItem) : undefined;
  const nextProject = projectIndex < projectsData.length - 1 ? (projectsData[projectIndex + 1] as unknown as FullProjectItem) : undefined;

  const projectTitle = project.ar?.title || project.title;
  const projectDesc = project.ar?.shortDescription || project.description;
  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: projectTitle,
    description: projectDesc,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    url: `${siteUrl}/projects/${id}`,
    image: project.image ? `${siteUrl}${project.image}` : `${siteUrl}/images/mustafa.png`,
    author: {
      "@type": "Person",
      name: "Mustafa Ahmad",
      url: siteUrl,
    },
  };

  return (
    <main className="min-h-screen bg-bg-main text-text-main transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProject) }}
      />
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
