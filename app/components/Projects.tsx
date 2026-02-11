"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "RailSync",
    description:
      "A comprehensive analytics dashboard for online retailers. Features real-time sales tracking, inventory management, and customizable reporting widgets.",
    tech: ["React", "TypeScript", "Tailwind", "Recharts"],
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/railsync.png`,
    github: "#",
    live: "https://www.railsync.app/",
  },
  {
    title: "Arianna",
    description:
      "A productivity application designed for remote teams. Includes drag-and-drop task management, team chat, and file sharing capabilities.",
    tech: ["Next.js", "Supabase", "Framer Motion", "Radix UI"],
    image: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/Arriana.jpg`,
    github: "#",
    live: "#",
  },
  {
    title: "CodeSnippet Share",
    description:
      "A social platform for developers to share and discover code snippets. Syntax highlighting, commenting system, and user profiles included.",
    tech: ["Vue.js", "Firebase", "Tailwind", "Prism.js"],
    image:
      "https://images.unsplash.com/photo-1753998943228-73470750c597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb2RlJTIwZWRpdG9yJTIwc2NyZWVuJTIwZGFyayUyMG1vZGV8ZW58MXx8fHwxNzcwNjE2OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    github: "#",
    live: "#",
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono mr-2">
              03.
            </span>{" "}
            Some Things I've Built
            <span className="ml-4 h-px bg-slate-300 dark:bg-slate-700 grow max-w-xs"></span>
          </h2>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
            >
              {/* Image Side */}
              <div className="w-full md:w-3/5 relative group">
                <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-500/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300 z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div
                className={`w-full md:w-2/5 flex flex-col ${index % 2 === 0 ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}
              >
                <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm mb-2">
                  Featured Project
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  {project.title}
                </h3>

                <div
                  className={`bg-slate-100 dark:bg-slate-800 p-6 rounded-lg text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 shadow-xl ${index % 2 === 0 ? "md:-ml-16 z-20" : "md:-mr-16 z-20"}`}
                >
                  {project.description}
                </div>

                <ul
                  className={`flex flex-wrap gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 mb-6 ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
                >
                  {project.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    className="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.live}
                    className="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
