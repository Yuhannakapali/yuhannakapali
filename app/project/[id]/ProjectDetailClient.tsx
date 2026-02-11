"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Code,
  Target,
  Cpu,
  CheckCircle,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
  problem: string;
  technicalDescription: string;
  features?: string[];
};

type ProjectDetailClientProps = {
  project: Project;
};

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mb-8 font-mono text-sm group"
        >
          <ArrowLeft
            size={16}
            className="mr-2 group-hover:-translate-x-1 transition-transform"
          />
          Back to Projects
        </button>

        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-400 text-sm font-mono rounded-full border border-slate-300 dark:border-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 mt-8">
            <a
              href={project.github}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-cyan-600 dark:hover:border-cyan-400 pb-0.5"
            >
              <Github size={20} />
              <span>View Source</span>
            </a>
            <a
              href={project.live}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-cyan-600 dark:hover:border-cyan-400 pb-0.5"
            >
              <ExternalLink size={20} />
              <span>Live Demo</span>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900">
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-10">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Target
                  className="text-cyan-600 dark:text-cyan-400"
                  size={24}
                />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  The Problem
                </h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {project.problem}
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="text-cyan-600 dark:text-cyan-400" size={24} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Technical Solution
                </h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {project.technicalDescription}
              </p>
            </section>
          </div>
        </div>

        <section className="bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-300 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center">
            <Code className="text-cyan-600 dark:text-cyan-400 mr-3" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.features?.map((feature, idx) => (
              <div key={idx} className="flex items-start">
                <CheckCircle
                  className="text-cyan-600 dark:text-cyan-500 mr-3 mt-1 shrink-0"
                  size={18}
                />
                <span className="text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>
      </motion.div>
    </main>
  );
}
