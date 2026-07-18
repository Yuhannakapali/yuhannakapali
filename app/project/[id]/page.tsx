import Link from "next/link";
import { projects } from "../../lib/projects";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ProjectDetailClient } from "./ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center text-slate-900 dark:text-white">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <Link
          href="/"
          className="text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen text-slate-600 dark:text-slate-300 selection:bg-cyan-300 selection:text-slate-900 flex flex-col">
      <Navbar />
      <ProjectDetailClient project={project} />
      <Footer />
    </div>
  );
}
