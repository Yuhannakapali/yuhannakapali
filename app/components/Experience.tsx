"use client";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const experiences = [
  {
    company: "GoGroup",
    role: "Senior Software Engineer",
    period: "Jan 2024 - Present",
    description: [
      "Backend development using Node.js and TypeScript, designing and implementing robust REST APIs and service components to support core operational workflows.",
      "Architect, deploy, and maintain services in AWS, ensuring scalable, resilient environments for production-grade railway operations.",
      "Collaborate with cross-functional teams to optimize performance, improve data flow reliability, and support continuous delivery in a monolithic application handling complex domain logic.",
      "Improve system observability and operational efficiency through feature enhancements, bug fixes, and performance tuning based on real usage patterns and internal metrics.",
    ],
  },
  {
    company: "Moichor",
    role: "Software Engineer",
    period: "Jul 2022 - Aug 2023",
    description: [
      "Built and deployed a full-stack web application using Node.js (backend) and React (frontend) to support key features of Moichor's diagnostic platform.",
      "Leveraged Webpack and Babel to optimize bundling and ensure efficient, performant client-side execution.",
      "Designed and implemented RESTful APIs using Node.js and Express, enabling reliable data access and integration with diagnostic services and platform workflows.",
      "Developed serverless functions on Lambda, enhancing scalability and reducing operational overhead for event-driven processes.",
    ],
  },
  {
    company: "Kotuko",
    role: "Software Engineer",
    period: "Apr 2021 - Jun 2022",
    description: [
      "Worked within a cross-functional Agile team, contributing to the design, development, and delivery of scalable web applications using TypeScript, GraphQL, React, Next.js, PostgreSQL, and NoSQL technologies.",
      "Applied functional programming principles to enhance code readability, modularity, and maintainability across the backend and frontend codebase.",
      "Implemented real-time features using WebSockets, enabling live updates and interactive experiences for end users.",
      "Structured data access with clean, maintainable patterns that improved development velocity and reduced technical debt.",
    ],
  },
  {
    company: "Kodiary",
    role: "Software Engineer",
    period: "Jul 2020 - Mar 2021",
    description: [
      "Worked with agile methodology using technologies: JavaScript, TypeScript, REST, MySQL, Vue, Nuxt, PHP, SOAP.",
      "Applied functional programming principles to improve code clarity, predictability, and long-term maintainability across the application.",
      "Implemented widget-driven development to ensure optimized data flow.",
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
