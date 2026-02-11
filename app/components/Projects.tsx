"use client";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import { projects } from "../lib/projects";
import Link from "next/link";

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
            Some Things I&apos;ve Built
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
              {/* <div className="w-full md:w-3/5 relative group">
                <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-500/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300 z-10"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div> */}

              <div className="w-full md:w-3/5 relative group cursor-pointer">
                <Link href={`/project/${project.id}`}>
                  <div className="relative rounded-lg overflow-hidden border border-slate-800">
                    <div className="absolute inset-0 bg-cyan-500/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300 z-10"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                    />
                  </div>
                </Link>
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
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <Link
                      href={`/project/${project.id}`}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-xs uppercase tracking-wider"
                    >
                      Read Case Study <ArrowRight size={14} />
                    </Link>
                  </div>
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
