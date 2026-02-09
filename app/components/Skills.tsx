"use client";
import { motion } from "framer-motion";
import { Database, Layout, Server, Cpu } from "lucide-react";

const skills = [
  {
    name: "Backend",
    icon: Server,
    items: ["Node.js", "TypeScript", "REST APIs", "GraphQL", "PHP"],
  },
  {
    name: "Frontend",
    icon: Layout,
    items: ["React", "Next.js", "Vue", "Nuxt", "Tailwind CSS"],
  },
  {
    name: "Database",
    icon: Database,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    name: "DevOps & Tools",
    icon: Cpu,
    items: ["AWS", "Docker", "Kubernetes", "Git", "CI/CD"],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="py-20 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            <span className="text-cyan-600 dark:text-cyan-400 font-mono">
              02.
            </span>{" "}
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-800/50 p-6 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/30 shadow-sm dark:shadow-none"
            >
              <div className="flex items-center gap-3 mb-4">
                <category.icon
                  className="text-cyan-600 dark:text-cyan-400"
                  size={24}
                />
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                  {category.name}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center text-slate-600 dark:text-slate-400 text-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                    {item}
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
