"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    company: "TechCorp Inc.",
    role: "Senior Frontend Engineer",
    period: "2023 - Present",
    description: [
      "Lead a team of 5 developers in rebuilding the core product dashboard using Next.js and TypeScript.",
      "Improved site performance by 40% through code splitting and image optimization.",
      "Collaborated with designers to implement a new design system across 3 products.",
    ],
  },
  {
    company: "StartupX",
    role: "Full Stack Developer",
    period: "2021 - 2023",
    description: [
      "Developed and maintained multiple client-facing applications using React and Node.js.",
      "Implemented automated testing pipelines (CI/CD) reducing deployment errors by 25%.",
      "Mentored junior developers and conducted code reviews.",
    ],
  },
  {
    company: "WebSolutions Agency",
    role: "Junior Web Developer",
    period: "2019 - 2021",
    description: [
      "Built responsive websites for diverse clients using HTML, SCSS, and JavaScript.",
      "Worked closely with clients to gather requirements and deliver projects on time.",
      "Maintained legacy WordPress sites and implemented security updates.",
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="py-20 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono mr-2">
              04.
            </span>{" "}
            Where I've Worked
            <span className="ml-4 h-px bg-slate-300 dark:bg-slate-700 flex-grow max-w-xs"></span>
          </h2>
        </motion.div>

        <div className="relative border-l border-slate-300 dark:border-slate-700 ml-3 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-cyan-500 border border-slate-50 dark:border-slate-900 shadow-[0_0_0_4px_rgba(248,250,252,1)] dark:shadow-[0_0_0_4px_rgba(15,23,42,1)]"></div>

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {exp.role}{" "}
                  <span className="text-cyan-600 dark:text-cyan-400">
                    @ {exp.company}
                  </span>
                </h3>
                <span className="text-sm font-mono text-slate-500 dark:text-slate-400 flex items-center mt-1 sm:mt-0">
                  <Calendar size={14} className="mr-2" />
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2 mt-4">
                {exp.description.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start text-slate-600 dark:text-slate-400 text-base"
                  >
                    <span className="text-cyan-600 dark:text-cyan-500 mr-2 mt-1.5">
                      ▹
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
